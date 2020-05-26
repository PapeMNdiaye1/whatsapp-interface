const theForm = document.querySelectorAll(".the_form");
const submitBtn = document.querySelectorAll(".submit_btn");
const messageContainer = document.querySelectorAll(".message_container");
const optionHeader = document.querySelectorAll(".option_header");
const selectedMessagesNumber = document.querySelectorAll(".number");
const resendCotainer = document.querySelectorAll(".resend_cotainer p");
const innerFormHidden = document.querySelectorAll(".innerForm_hidden");
const close = document.querySelectorAll(".close");
const optionResend = document.querySelectorAll(".option_resend");
const optionDelete = document.querySelectorAll(".option_delete");
// ##############################
var messageSend;
var classContainer;
var resend;
var messageResend;
// ############################################################
// ############################################################
// ############################################################
// ############################################################
creatReceivMessage = (TheForm, TheMessageContainer) => {
  let time = Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
  var message = TheForm;
  var messageText = document.createTextNode(message);
  var divContainer = document.createElement("div");
  divContainer.classList.add(classContainer);
  var divmessage = document.createElement("div");
  divmessage.classList.add(classMessage);
  var divTime = document.createElement("div");
  divTime.classList.add("time");
  divTime.innerText = time;
  if (resend === 1) {
    var divResend = document.createElement("div");
    divResend.classList.add("resend");
    var divResendPara = document.createElement("p");
    divResendPara.innerText = messageResend;
    divResend.appendChild(divResendPara);
    divmessage.appendChild(divResend);
  }
  divmessage.appendChild(messageText);
  divmessage.appendChild(divTime);
  divContainer.appendChild(divmessage);
  TheMessageContainer.appendChild(divContainer);
  scrollH = TheMessageContainer.scrollHeight;
  TheMessageContainer.scrollTop = scrollH;
  var allChilds = TheMessageContainer.children;
  var lastChid = allChilds[allChilds.length - 1].children;
  var beforLastChid = allChilds[allChilds.length - 2].children;
  if (lastChid[0].className === beforLastChid[0].classList[0]) {
    lastChid[0].classList.add("simple_message");
    lastChid[0].parentNode.classList.add("closer_message");
  }
  if (lastChid[0].getBoundingClientRect().height <= 27) {
    lastChid[0].classList.add("simple_message2");
    lastChid[0].children[0].classList.add("simple_time");
  }
};
// #######################################################################
selectMessage = (container, index) => {
  if (container.length === 1) {
    optionResend[index].classList.add("option_resend_visible");
  } else {
    optionResend[index].classList.remove("option_resend_visible");
  }
};
// #####################################################################
deletMessage = (index) => {
  var selecteds = [];
  for (let i = 0; i < messageContainer[index].children.length; i++) {
    if (
      messageContainer[index].children[i].classList.contains("message_selected")
    ) {
      selecteds.push(messageContainer[index].children[i]);
    }
  }
  selecteds.forEach((child) => {
    messageContainer[index].removeChild(child);
  });
  resend = 0;
};
// #####################################################################
coloseOptionsHeader = (index) => {
  optionHeader[index].classList.remove("option_header_visible");
  for (let x = 0; x < messageContainer[index].children.length; x++) {
    if (
      messageContainer[index].children[x].classList.contains("message_selected")
    ) {
      messageContainer[index].children[x].classList.remove("message_selected");
    }
  }
};
// ######################################################################################
// ######################################################################################
// ######################################################################################
// ######################################################################################

for (let i = 0; i < submitBtn.length; i++) {
  submitBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    classContainer = "message_send";
    classMessage = "send";
    creatReceivMessage(theForm[i].value, messageContainer[i]);
    setTimeout(function () {
      if (i === 0) {
        classContainer = "message_receiv";
        classMessage = "receiv";
        creatReceivMessage(theForm[i].value, messageContainer[i + 1]);
        theForm[i].value = "";
      } else {
        classContainer = "message_receiv";
        classMessage = "receiv";
        creatReceivMessage(theForm[i].value, messageContainer[i - 1]);
        theForm[i].value = "";
      }
      resend = 0;
    }, 1000);
    innerFormHidden[i].style.height = "";
    messageContainer[i].style.top = "";
    resendCotainer[i].innerText = "";
  });
}
//#########################################################################################
for (let i = 0; i < messageContainer.length; i++) {
  messageContainer[i].addEventListener("click", (e) => {
    var item = e.target;
    if (
      item.classList[0] === "message_send" ||
      item.classList[0] === "message_receiv"
    ) {
      item.classList.toggle("message_selected");
    }
    if (i === 0) {
      var selectedMessages = document.querySelectorAll(
        "#interface1 .message_selected"
      );
      selectedMessagesNumber[i].innerText = selectedMessages.length;
      selectMessage(selectedMessages, 0);
    } else {
      var selectedMessages = document.querySelectorAll(
        "#interface2 .message_selected"
      );
      selectedMessagesNumber[i].innerText = selectedMessages.length;
      selectMessage(selectedMessages, 1);
    }
    if (selectedMessagesNumber[i].innerHTML >= 1) {
      optionHeader[i].classList.add("option_header_visible");
    } else {
      optionHeader[i].classList.remove("option_header_visible");
    }
  });
}
// #####################################################################################
for (let i = 0; i < optionResend.length; i++) {
  optionResend[i].addEventListener("click", () => {
    innerFormHidden[i].style.height = "15%";
    messageContainer[i].style.top = "-6%";

    var text;
    if (i === 0) {
      var typeOfMes = document.querySelector("#interface1 .message_selected")
        .children[0].childNodes.length;
      if (typeOfMes === 2) {
        text = document.querySelector("#interface1 .message_selected")
          .children[0].childNodes[0].nodeValue;
      } else {
        text = document.querySelector("#interface1 .message_selected")
          .children[0].childNodes[1].nodeValue;
      }
    } else {
      var typeOfMes = document.querySelector("#interface2 .message_selected")
        .children[0].childNodes.length;
      if (typeOfMes === 2) {
        text = document.querySelector("#interface2 .message_selected")
          .children[0].childNodes[0].nodeValue;
      } else {
        text = document.querySelector("#interface2 .message_selected")
          .children[0].childNodes[1].nodeValue;
      }
    }
    var newtext = document.createTextNode(text);
    resendCotainer[i].appendChild(newtext);
    resend = 1;
    messageResend = resendCotainer[i].innerHTML;
  });
}
//######################################################################################
for (let i = 0; i < optionDelete.length; i++) {
  optionDelete[i].addEventListener("click", () => {
    deletMessage(i);
    selectedMessagesNumber[i].innerText = "0";
  });
}

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", () => {
    coloseOptionsHeader(i);
  });
}
