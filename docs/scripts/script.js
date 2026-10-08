// Liste des mots et des phrases pour le jeu 

const listeMots = ["Coccinelle", "Automne", "Fraîcheur"];
const listePhrases = ["Soyez les bienvenus dans ma demeure.", "Ma petite Pâquerette !", "L'imagination vous mène partout."];

/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nombreQuestions) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score}/${nombreQuestions}`;
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */ 
function afficherProposition(proposition){
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition

}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score de l'exercice clavier&body= Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Exercice Clavier pour apprendre à taper plus rapidement les mots.`
    location.href = mailto
}   


/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function verifierChamp(nom){
    if (nom.length < 2) {
        throw new Error("Le nom est trop court.")
    }
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function verifierEmail(email){
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'adresse email n'est pas valide.")
    }
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {

    let spanErreurMessage = document.getElementById("erreurMessage")
    
    if (!spanErreurMessage) {
        let zonePartage = document.querySelector(".zonePartage")
        spanErreurMessage = document.createElement("span") 
        spanErreurMessage.id = "erreurMessage"
        
        zonePartage.appendChild(spanErreurMessage)
    } 
    
    spanErreurMessage.innerText = message
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail){
    try {

        // On récupère les deux champs et on affiche leur valeur
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        verifierChamp(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        verifierEmail(email)        
        afficherMessageErreur("") // On efface le message d'erreur si tout est bon
        afficherEmail(nom, email, scoreEmail)

        
    } catch (erreur) {
        // gérer l'erreur
        afficherMessageErreur(erreur.message)
    }
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */ 
function lancerJeu() {
    // Cette variable contient le score de l'utilisateur, il commence à zéro.
    let score = 0  
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    
    afficherProposition(listeProposition[i])
    
    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        console.log(inputEcriture.value)
        if (inputEcriture.value === listeProposition[i]){
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition('Le jeu est terminé !')
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    });

    // Gestion de l'événement change sur les boutons radios.
    let btnRadioChoix = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < btnRadioChoix.length; index++) {
        btnRadioChoix[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
            listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct.
            afficherProposition(listeProposition[i])
        }) 
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector('form');
    form.addEventListener("submit", (event) => {
        // On empêche le comportement par défaut
        event.preventDefault();
        let scoreEmail = `${score}` / `${i}`
        gererFormulaire(scoreEmail)

    });

    afficherResultat(score, i)

}


