
//starts jQuery code
$(document).ready(function(){

  //on click methods for each button to know what they do
  $('#africa').click(function(){
    localStorage.setItem("continentChoice", 1);
  });

  $('#asia').click(function(){
    localStorage.setItem("continentChoice", 2);
  });

  $('#europe').click(function(){
    localStorage.setItem("continentChoice", 3);
  });

  $('#north-america').click(function(){
    localStorage.setItem("continentChoice", 4);
  });

  $('#oceania').click(function(){
    localStorage.setItem("continentChoice", 5);
  });

  $('#south-america').click(function(){
    localStorage.setItem("continentChoice", 6);
  });

  //sets it to 0. If the continent choice was not set, this is also, by default, what the program will choose
  $('#all').click(function(){
    localStorage.setItem("continentChoice", 0);
  });

  $('button').click(function(){
    var typeGame = localStorage.getItem("typeGame");
    if(typeGame==1){
      window.location.href = "questions.html";
    }
    else{
      window.location.href = "flagQuestions.html";
    }

  });

});
