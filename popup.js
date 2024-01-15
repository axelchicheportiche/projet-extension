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
      //  afficher la liste
      if (Array.isArray(websiteList)) {
        for (let i = websiteList.length - 1; i >= 0; i--) {
          document.getElementById("arrayWebsite").innerHTML += `<div class="site">${websiteList[i]}<button id="erase${[i]}"> - </button></div>`;
        }
      } else {
        websiteList = [];
      }

      // Ajouter un écouteur d'événement pour le bouton d'ajout
      document.getElementById("buttonAdd").addEventListener("click", function () {
        let valeurInput = document.getElementById("inputAdd").value;
        if (valeurInput.length > 0 && valeurInput.startsWith("https://www.")) {
          websiteList.push(valeurInput);

          let oldHTML = document.getElementById("arrayWebsite").innerHTML;
          document.getElementById("arrayWebsite").innerHTML =
            `<div class="site">${websiteList[websiteList.length-1]}<button id="erase${websiteList.length-1}">-</div>`+ oldHTML;
            console.log(websiteList)
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


      //EFFACER ELEMENT DE LA LISTE
      for (let i = 0; i < websiteList.length; i++) {
        let eraseButton = document.getElementById(`erase${i}`);
        eraseButton.addEventListener("click", function () {
          websiteList.splice(i,1)
          // Mettre à jour la liste dans le stockage local
          chrome.storage.local.set({ websiteList: websiteList }, function() {
            // Envoyer un message pour indiquer que la liste a été mise à jour
            chrome.runtime.sendMessage({ action: "popupListUpdate", nouvelleListe: websiteList });
          });
          console.log("check tab", websiteList)
          document.getElementById("arrayWebsite").innerHTML ="";
          for (let i = websiteList.length - 1; i >= 0; i--) {
            document.getElementById("arrayWebsite").innerHTML += `<div class="site">${websiteList[i]}<button id="erase${[i]}"> - </button></div>`;
          }
            console.log(`Bouton ${eraseButton.id} cliqué.`);
            location.reload()
        });
    }
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des sites web:", error);
    }
  }


  // Appel de la fonction principale asynchrone
  main();
