chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  title: "Send to Telegram",
  documentUrlPatterns: ["<all_urls>"],
  contexts:["link"],
  onclick: function (link) {
    console.log(link);
    chrome.storage.sync.get(["telemark_code"], function (result) {
      if (result.telemark_code) {
        sendToTelegram(link.linkUrl, link.selectionText, result.telemark_code);
      } else {
        alert("First enter your telemark code.");
      }
    });
  },
});
