chrome.contextMenus.create({
  title: "Send to Telegram",
  documentUrlPatterns: ["<all_urls>"],
  contexts: ["link"],
  onclick: function (link) {
    chrome.storage.sync.get(["telemark_code"], function (result) {
      if (result.telemark_code) {
        var text;
        if (typeof link.linkText !== "undefined") text = link.linkText;
        else if (typeof link.selectionText !== "undefined")
          text = link.selectionText;
        else text = link.linkUrl;
        sendToTelegram(link.linkUrl, text, result.telemark_code);
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
