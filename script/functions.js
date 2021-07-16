function sendMessage(message, color = "dd185e") {
  $(".input-message")
    .text(message)
    .css("color", "#" + color)
    .css("visibility", "visible");
  $(".input-userid").css("border", "2px solid #" + color);
}
function hideMessage() {
  $(".input-message").css("visibility", "hidden");
  $(".input-userid").css("border", "2px solid #e6e6e7");
}
function validateUserId(value) {
  if (value) {
    if (isNaN(value)) {
      if (value.charAt(0) == "@") {
        if (
          !/^(?=.{5,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/.test(
            value.substring(1)
          )
        ) {
          sendMessage("Invalid username.");
          return false;
        }
      } else {
        sendMessage("Username must begin with an at sign (@).");
        return false;
      }
    } else {
      if (value.length < 5) {
        sendMessage("Minimum length of a userid is 5.");
        return false;
      } else if (value.length > 11) {
        sendMessage("Maximum length of a userid is 11.");
        return false;
      }
    }
  } else {
    sendMessage("This input is required.");
    return false;
  }
  return true;
}
function reset() {
  chrome.storage.sync.set({ telemark_code: "" }, function () {
    location.reload();
  });
}
function sendToTelegram(url, title, telemark_code) {
  $.ajax({
    url: "https://api.tgmark.ir/",
    method: "POST",
    data: JSON.stringify({
      url: url,
      title: title,
      telemark_code: telemark_code,
    }),
    success: function (data, textStatus, request) {
      $("#loading").hide();
      $("#check").fadeIn();
    },
    error: function (request, status, error) {
      alert("Something went wrong!");
    },
  });
}
function getBrowser() {
  if (typeof chrome !== "undefined") {
    if (typeof browser !== "undefined") {
      return "Firefox";
    } else {
      return "Chrome";
    }
  } else {
    return "Edge";
  }
}
