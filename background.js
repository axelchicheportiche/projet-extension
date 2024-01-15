chrome.runtime.onInstalled.addListener(function() {
    // Init liste par défaut
    chrome.storage.local.set({ websiteList: ["https://www.instagram.com","https://www.facebook.com"] });
  });
