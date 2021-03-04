$(document).ready(function () {
  chrome.storage.sync.get(["telemark_code"], function (result) {
    if (result.telemark_code) {
      $(".input-userid").val(result.telemark_code);
      $("#button-reset").show();
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        let title = tabs[0].title;
        let favicon = tabs[0].favIconUrl
          ? tabs[0].favIconUrl
          : "../images/default_favicon.png";
        let parser = document.createElement("a");
        parser.href = url;
        parser.hostname = parser.hostname.replace("www.", "");

        $("#telemark-favicon").attr("src", favicon);
        $("#telemark-title").text(
          parser.hostname.charAt(0).toUpperCase() + parser.hostname.slice(1)
        );
        $("#telemark-url").val(url);

        $("#button-send").click(function () {
          $("#button-send span").hide();
          $("#loading").show();
          sendToTelegram(encodeURIComponent(url), title, result.telemark_code);
        });
      });
    } else {
      $(".signup").show();
      $(".telemark").hide();
    }
  });
});
$("#button-save").click(function () {
  let value = $(".input-userid").val();
  let isValid = validateUserId(value);
  if (isValid) {
    chrome.storage.sync.set({ telemark_code: value }, function () {
      sendMessage("Telemark code is saved.", "01b2a0");
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
});

$("#button-reset").click(function () {
  reset();
});
$(".input-userid").focus(function () {
  hideError();
});
