//starts jQuery code
$(document).ready(function(){

  $('#practice').click(function(){
    localStorage.setItem("typeQuestion", 0);
    window.location.href = "selectContinentForPlay.html";
  });

  $('#exam').click(function(){
    localStorage.setItem("typeQuestion", 1);
    window.location.href = "selectContinentForPlay.html";
  });

});
