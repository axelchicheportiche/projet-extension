const websiteList = [
  "https://www.veja-store.com/fr_fr/c/homme",
  "https://www.facebook.com/",
  "https://www.lemonde.fr/",
];

let flagRescue = localStorage.getItem("flag");
let timeRescue = localStorage.getItem("time");

console.log(flagRescue);
console.log(timeRescue);

let timeNew = new Date().getTime();

if (timeNew - parseInt(timeRescue) > 120000) {
  console.log("le flag redevient null");
  flagRescue = null;
}

for (let i = 0; i < websiteList.length; i++) {
  if (window.location.href.startsWith(websiteList[i]) && flagRescue === null) {
    document.querySelector("body").innerHTML = `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Décompte de 30 secondes</title>
        <style> body {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          text-align: center;
          padding: 50px;
          background-color: rgb(39, 37, 37);

      }

      .countdown {

          font-size: 24px;
          font-weight: bold;
          color: #f91818;
          border: 2px solid #353434;
          border-radius: 20px;
          background-color: #000;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }

      img {
          margin-bottom: 15px;
          border-radius: 20px;
      }</style>
    </head>
    <body>

    <div class="countdown">
    <h1>Vous devez attendre 30 secondes 😈</h1>
    <p id="countdown">30</p>
    <img src="https://media1.tenor.com/m/0yli7fSvvL0AAAAC/raccoon-yes.gif">
    </div>
      <button id="buttonReset2">reset</button>

    </body>
    </html>`;

    // compteur :

    let seconds = 20;
    let timer = setInterval(updateCountdown, 1000);

    function updateCountdown() {
      document.getElementById("countdown").textContent = seconds;
      if (seconds === 0) {
        clearInterval(timer);

        flag = 1;
        let time = new Date().getTime();
        localStorage.setItem("flag", 1);
        localStorage.setItem("time", time.toString());
        window.location.reload();
      } else {
        seconds--;
      }
    }
  }
}

//A virer plus tard, utile juste pour les tests
document.getElementById("buttonReset2").addEventListener("click", function () {
  // Effacement de toutes les données stockées dans le stockage local du navigateur
  localStorage.clear();
});





//Save de la prev avant merge

// function executeOnPageLoad(){

//   const websiteList = [
//     "https://www.veja-store.com/fr_fr/c/homme",
//     "https://www.facebook.com/",
//     "https://www.lemonde.fr/",
//   ];

//   for (let i = 0; i < websiteList.length; i++) {
//     if (window.location.href.startsWith(websiteList[i])) {
//       var images = document.getElementsByTagName("img");
//       for (var k = 0, l = images.length; k < l; k++) {
//         images[k].src =
//           "https://i.pinimg.com/originals/8a/39/03/8a390326148f845c0e26c23d56b7fde9.gif";
//       }
//     }
//   }}

//   window.onload = executeOnPageLoad;

//save =
// if (window.location.href === "https://www.veja-store.com/fr_fr/c/homme"|| window.location.href.startsWith('https://www.facebook.com/')) {
//   var images = document.getElementsByTagName("img");
//   for (var i = 0, l = images.length; i < l; i++) {
//     images[i].src = "https://i.pinimg.com/originals/8a/39/03/8a390326148f845c0e26c23d56b7fde9.gif"
//   }
// }

// //Bonus = afficher mot de passe =
// const mdp = document.getElementsByTagName('input')
// for (var i = 0, l = mdp.length; i < l; i++) {
//     mdp[i].type = "text"
//   }
