$(document).ready(function(){

  $('#returnHomePage').click(function(){
    window.location.href = "homePage.html";
  });

  if(localStorage.getItem("login") == 1){
    $('#message').text("Login unsuccessful");
  }
});

//intercepting the form transmit
function processForm(e) {

    localStorage.setItem("login", 1);
    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('my-form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
