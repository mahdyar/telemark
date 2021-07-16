chrome.contextMenus.create({
  title: "Send to Telegram",
  documentUrlPatterns: ["<all_urls>"],
  contexts: ["link"],
  onclick: function (link) {
    chrome.storage.sync.get(["telemark_code"], function (result) {
      if (result.telemark_code) {
        sendToTelegram(link.linkUrl, getBrowser() == "Chrome" ? link.selectionText : link.linkText, result.telemark_code);
      } else {
        alert("First enter your telemark code.");
      }
    });
  },
});
chrome.commands.onCommand.addListener(function (command) {
  if (command == "send-to-telegram") {
    chrome.storage.sync.get(["telemark_code"], function (result) {
      if (result.telemark_code) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          let url = tabs[0].url;
          let title = tabs[0].title;
          sendToTelegram(url, title, result.telemark_code);
          alert("Sent!");
        });
      } else {
        alert("First enter your telemark code.");
      }
    });
  }
});
