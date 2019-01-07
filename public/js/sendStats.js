//this sends the required information to the backend through a post form

var score = localStorage.getItem("counterRightAnswers");
document.getElementById("scoreText").value = parseInt(score);
var continentChoiceSelection = localStorage.getItem("continentChoice");
document.getElementById("continentChoiceText").value = continentChoiceSelection;

if(localStorage.getItem("typeQuestion") == 1){
  document.getElementById("typeQuestionText").value = 1;
}
else{
  document.getElementById("typeQuestionText").value = 0;
}

if(localStorage.getItem("typeGame") == 1){
  document.getElementById("gameChoiceText").value = 1;
}
else{
  document.getElementById("gameChoiceText").value = 0;
}

document.getElementById("submit").click();
