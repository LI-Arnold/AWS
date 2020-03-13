var form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  var nom = form.elements.nom.value;
  var prenom = form.elements.prenom.value;
  var pseudo = form.elements.pseudo.value;
  var email = form.elements.email.value;
  var mdp1 = form.elements.mdp1.value;
  var mdp2 = form.elements.mdp2.value;
  if ( mdp1 === mdp2){
  console.log(
    "Vous vous appelé" + nom + prenom + "votre pseudo est " + pseudo +  "le mot de passe" + mdp + "votre email "+ email + " repeatemail = "  + repeatemail
  );
}
else {
        message = "Erreur : les mots de passe saisis sont différents";
    }
  document.getElementById("infoMdp").textContent = message;
  e.preventDefault();
});

