//exam array mgmt. NOTICE THE EXPORT: to import in different file

//the arrays are in countryLists.js
//this one is a new array for the exam type of game
var examCountriesArray = new Array();

function manageCountriesArray(){

  //grab choice of continent
  var choiceContinent = localStorage.getItem("continentChoice");

  //if the list is empty, then we fill it depending on the choice of the continent
  if(examCountriesArray.length == 0){
    if(choiceContinent==0 || choiceContinent==undefined){

      for(var i=0;i<countries.length;i++){
        examCountriesArray[i]=countries[i];
      }

    }
    else if(choiceContinent==1){

      for(var i=0;i<countriesAfrica.length;i++){
        examCountriesArray[i]=countriesAfrica[i];
      }

    }
    else if(choiceContinent==2){

      for(var i=0;i<countriesAsia.length;i++){
        examCountriesArray[i]=countriesAsia[i];
      }

    }
    else if(choiceContinent==3){

      for(var i=0;i<countriesEurope.length;i++){
        examCountriesArray[i]=countriesEurope[i];
      }

    }
    else if(choiceContinent==4){

      for(var i=0;i<countriesNorthAmerica.length;i++){
        examCountriesArray[i]=countriesNorthAmerica[i];
      }

    }
    else if(choiceContinent==5){

      for(var i=0;i<countriesOceania.length;i++){
        examCountriesArray[i]=countriesOceania[i];
      }

    }
    else if(choiceContinent==6){

      for(var i=0;i<countriesSouthAmerica.length;i++){
        examCountriesArray[i]=countriesSouthAmerica[i];
      }

    }
  }

  //select the index
  var value = Math.round(Math.random()*(examCountriesArray.length-1));

  localStorage.setItem("indexAppearingCountry",value);
  //bool to know if exam array was previously initialized
  localStorage.setItem("examArrayInit", 1);

  console.log("img/countries/"+examCountriesArray[value]+".jpg"+counterRightAnswers+" "+value);
  return "img/countries/"+examCountriesArray[value]+".jpg";
}

//remove the index once it has been used
function removeSelectedCountry(index){
  examCountriesArray.splice(index, 1);
  console.log(examCountriesArray.length+" length of array exam");

  var examArrayInit = localStorage.getItem("examArrayInit");

  if(localStorage.getItem("examArrayInit") == 1 && examCountriesArray.length == 0){

    //to jump to page that will send the score, then to winning page
    window.location.href = "sendScore.html";
  }
}
