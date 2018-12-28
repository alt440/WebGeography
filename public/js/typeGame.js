//starts jQuery code
$(document).ready(function(){

  $('#flag').click(function(){
    localStorage.setItem("typeGame", 0);
    window.location.href = "typeQuestion.html";
  });

  $('#country').click(function(){
    localStorage.setItem("typeGame", 1);
    window.location.href = "typeQuestion.html";
  });

});
