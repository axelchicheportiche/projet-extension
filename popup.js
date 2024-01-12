async function getWebsiteList() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('websiteList', (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.websiteList);
        }
      });
    });
  }

  async function main() {
    try {
      // Récupérer la liste des sites web
      let websiteList = await getWebsiteList();
        console.log(websiteList)
      // Votre code existant pour afficher la liste ou initialiser une liste vide
      if (Array.isArray(websiteList)) {
        for (let i = 0; i < websiteList.length; i++) {
          document.getElementById("arrayWebsite").innerHTML += `<div class="site">${websiteList[i]}</div>`;
        }
      } else {
        websiteList = [];
      }

      // Ajouter un écouteur d'événement pour le bouton d'ajout
      document.getElementById("buttonAdd").addEventListener("click", function () {
        let valeurInput = document.getElementById("inputAdd").value;
        if (valeurInput.length > 0 && valeurInput.startsWith("https://www.")) {
          websiteList.unshift(valeurInput);

          let oldHTML = document.getElementById("arrayWebsite").innerHTML;
          document.getElementById("arrayWebsite").innerHTML =
            `<div class="site">${websiteList[0]}</div>`+ oldHTML;
          document.getElementById("inputAdd").value = "";

          // Mettre à jour la liste dans le stockage local
          chrome.storage.local.set({ websiteList: websiteList }, function() {
            // Envoyer un message pour indiquer que la liste a été mise à jour
            chrome.runtime.sendMessage({ action: "popupListUpdate", nouvelleListe: websiteList });
          });

        } else {
          alert(`Votre site doit commencer par "https://www."`);
        }

        // Afficher la liste mise à jour dans la console
        console.log(websiteList);
      });

    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des sites web:", error);
    }
  }

  // Appel de la fonction principale asynchrone
  main();
