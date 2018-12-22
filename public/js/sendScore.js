
//this sends the required information to the backend through a post form

var score = localStorage.getItem("counterRightAnswers");
document.getElementById("scoreText").value = score;
var continentChoiceSelection = localStorage.getItem("continentChoice");
document.getElementById("continentChoiceText").value = continentChoiceSelection;
document.getElementById("submit").click();
