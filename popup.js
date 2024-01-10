// Récupération de la liste de sites depuis le stockage local du navigateur
let savedList = localStorage.getItem("sites");

// Conversion des données récupérées (format JSON) en une liste JavaScript
let websiteList = JSON.parse(savedList);

// Vérification si la liste récupérée est un tableau
if (Array.isArray(websiteList)) {
  // Parcours de chaque élément de la liste récupérée
  for (let i = 0; i < websiteList.length; i++) {
    // Ajout de chaque site web à la section HTML avec l'ID "arrayWebsite"
    document.getElementById("arrayWebsite").innerHTML += `<div class="site">${websiteList[i]}</div>`;
  }
} else {
  // Si la liste récupérée n'est pas un tableau, initialisation d'une liste vide
  websiteList = [];
}

// Ajout d'un événement au bouton avec l'ID "buttonAdd"
document.getElementById("buttonAdd").addEventListener("click", function () {
  // Récupération de la valeur de l'input
  let valeurInput = document.getElementById("inputAdd").value;

  // Vérification si l'input n'est pas vide et commence par 'www.'
  if (valeurInput.length > 0 && valeurInput.startsWith("www.")) {
    // Ajout du site web à la liste récupérée
    websiteList.push(valeurInput);
    // Mise à jour de l'affichage dans la section HTML avec l'ID "arrayWebsite"
    let oldHTML = document.getElementById("arrayWebsite").innerHTML;
    document.getElementById("arrayWebsite").innerHTML =
      `<div class="site">${websiteList[websiteList.length - 1]}</div>` +
      oldHTML;
    // Réinitialisation de la valeur de l'input
    document.getElementById("inputAdd").value = "";
  } else {
    // Alerte si l'input est vide ou ne commence pas par 'www.'
    alert(`Votre site doit commencer par "www."`);
  }
  // Conversion de la liste en format JSON
  let sitesJSON = JSON.stringify(websiteList);
  // Stockage des données dans le stockage local du navigateur
  localStorage.setItem("sites", sitesJSON);
});

// Ce bout de code serait généralement retiré à la fin, il permet de vider le stockage local
document.getElementById("buttonReset").addEventListener("click", function () {
  // Effacement de toutes les données stockées dans le stockage local du navigateur
  localStorage.clear();
});



// Ajouter un boutton a droite de chaque link afin de pouvoir le supprimer de la liste
//linker la liste avec la liste dans le backf