"use strict"

var form = document.getElementById('input-form');
var messagePara = document.getElementById('message-para');
var API_URL = 'http://35.203.155.52:8085/config';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 204) {
     messagePara.classList.remove('text-error');
     messagePara.classList.add('text-success');
     messagePara.innerHTML = "Successfully registered";
  } else if (this.readyState === 4 && this.status !== 204) {
    messagePara.classList.remove('text-success');
    messagePara.classList.add('text-error');
    messagePara.innerHTML = "Registration unsuccessful";
  }
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var formObj = e.target;
  var reqObj = {};
  reqObj[formObj[0].value] = formObj[1].value;
  console.log(reqObj);
  xhttp.open('PATCH', API_URL, true);
  xhttp.setRequestHeader('content-type', 'application/json');
  xhttp.send(JSON.stringify(reqObj));
});
