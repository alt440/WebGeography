  var counterRightAnswers = 0;

  //this stores the index being selected as appearing country
  var indexAppearingCountry = -1;
  localStorage.setItem("indexAppearingCountry", indexAppearingCountry);

  //local storage to maintain consistency between scripts. counts the number of right answers
  localStorage.setItem("counterRightAnswers", counterRightAnswers);

  //chooses the source of the next image. This generates a new image
  function chooseSource(){

    //from typeQuestion.js
    var choiceTypeGame = localStorage.getItem("typeQuestion");
    //from selectContinentForPlay.js
    //localStorage stores information from different files
    var choiceContinent = localStorage.getItem("continentChoice");
    console.log(localStorage.getItem("continentChoice"));
    var value;

    //below is a set of if conditions to choose the right countries depending on the choice the user made
    if(choiceContinent == undefined || choiceContinent == 0){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countries.length-1));
        console.log("img/countries/"+countries[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countries[value]+".jpg";
      }

    }
    //Africa
    else if(choiceContinent == 1){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesAfrica.length-1));
        console.log("img/countries/"+countriesAfrica[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesAfrica[value]+".jpg";
      }
    }
    //Asia
    else if(choiceContinent == 2){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesAsia.length-1));
        console.log("img/countries/"+countriesAsia[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesAsia[value]+".jpg";
      }
    }
    //Europe
    else if(choiceContinent == 3){
      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesEurope.length-1));
        console.log("img/countries/"+countriesEurope[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesEurope[value]+".jpg";
      }
    }
    //North America
    else if(choiceContinent == 4){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesNorthAmerica.length-1));
        console.log("img/countries/"+countriesNorthAmerica[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesNorthAmerica[value]+".jpg";
      }
    }
    //Oceania
    else if(choiceContinent == 5){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesOceania.length-1));
        console.log("img/countries/"+countriesOceania[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesOceania[value]+".jpg";
      }
    }
    //South America
    else if(choiceContinent == 6){

      //condition to know if it is an exam
      if(choiceTypeGame==1){
        return manageCountriesArray();
      }
      else{
        value = Math.round(Math.random()*(countriesSouthAmerica.length-1));
        console.log("img/countries/"+countriesSouthAmerica[value]+".jpg"+counterRightAnswers+" "+value);
        return "img/countries/"+countriesSouthAmerica[value]+".jpg";
      }
    }

  }

  //checks if the right answer was inputted.
  function isRightAnswer(imageSource){
    var nameImage = imageSource.split("/");
    var onlyName = nameImage[2];
    onlyName = onlyName.split(".")[0];
    onlyName = onlyName.split("-").join(" ");
    onlyName = onlyName.replace("_","'");

    var inputFieldUntouched = document.getElementById('user_answer').value;
    var inputField = inputFieldUntouched.toLowerCase();
    console.log(onlyName);
    if(inputField.localeCompare(onlyName) == 0){
      return true;
    }
    else{
      return false;
    }
  }


  //starts jQuery code
  $(document).ready(function(){

    //sets a different source for the image at the moment the page is ready
    $('#picture').attr("src", chooseSource());

    $('#submit').click(function(){

      //answer given from the answer button in practice mode
      $('#answerText').hide();
      //to determine if the exam array was previously init in same game.
      //To know if exam is completed
      localStorage.setItem("examArrayInit", 0);

        //compare answers/ see if user submitted right answer
        if(isRightAnswer($('#picture').attr("src"))){
          counterRightAnswers+=1;
          localStorage.setItem("counterRightAnswers", counterRightAnswers);

          localStorage.setItem("examArrayInit", 1);

          if(localStorage.getItem("typeQuestion") == 1){
            removeSelectedCountry(localStorage.getItem("indexAppearingCountry"));
          }

          //loads a new picture
          $('#picture').attr("src", chooseSource());
          $('#user_answer').val("");

          //adds a good job! field to confirm to the user he has entered the right input
          $('#goodJob').text("Good Job!");
          $('#goodJob').show();
          //fades out after 2 seconds
          $('#goodJob').fadeOut(2000);
        }
        //if he did not, send user to game over page
        else{
          //reference the mistaken country in the game over file
          localStorage.setItem("lastCountry", $('#picture').attr("src"));

          //depending on whether we are in exam or practice, different destinations
          //if we are in exam mode:
          if(localStorage.getItem("typeQuestion") == 1){
            //send score before getting to gameOver
            window.location.href = "statsB4ScoreSend.html";
          }
          //if in practice mode:
          else{
            window.location.href = "statsB4ScoreSend.html";
          }

        }
        //if he did, reload a different picture and add 1 to counter

    });
  });
