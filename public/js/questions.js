  counterRightAnswers = 0;

  //local storage to maintain consistency between scripts. counts the number of right answers
  localStorage.setItem("counterRightAnswers", counterRightAnswers);

  //list of all the countries, which are the names of the images for reference
  countries = ['algeria','angola','benin','botswana','burkina-faso','burundi',
                'cameroon','central-african-republic','chad','cote-d_ivory',
                'democratic-republic-of-congo','djibouti','egypt','equatorial-guinea',
                'eritrea','ethiopia','gabon','ghana','guinea','guinea-bissau',
                'kenya','lesotho','liberia','libya','madagascar','malawi',
                'mali','mauritania','morocco','mozambique','namibia','niger',
                'nigeria','republic-of-congo','rwanda','senegal','sierra-leone',
                'somalia','south-africa','south-sudan','sudan','swaziland',
                'tanzania','the-gambia','togo','tunisia','uganda','western-sahara',
                'zambia','zimbabwe','afghanistan','armenia','azerbaijan','bangladesh',
                'bhutan','brunei','buhrain','cambodia','china','east-timor','georgia',
                'india','indonesia','iran','iraq','israel','japan','jordan',
                'kazhakstan','kuwait','kyrgyzstan','laos','lebanon','malaysia',
                'mongolia','myanmar','nepal','north-korea','oman','pakistan',
                'philippines','qatar','russia','saudi-arabia','singapore','south-korea',
                'syria','taiwan','tajikistan','thailand','turkmenistan',
                'united-arab-emirates','uzbekistan','vietnam','yemen','albania',
                'austria','belarus','belgium','bosnia','bulgaria','croatia',
                'czech-republic','denmark','estonia','finland','france','germany',
                'greece','hungary','iceland','ireland','italy','kosovo','latvia',
                'lithuania','macedonia','moldovia','montenegro','netherlands',
                'norway','poland','portugal','romania','serbia','slovakia','slovenia',
                'spain','sweden','switzerland','turkey','ukraine','united-kingdom',
                'bahamas','belize','canada','costa-rica','cuba','dominican-republic',
                'el-salvador','greenland','guatemala','haiti','honduras','jamaica',
                'mexico','nicaragua','panama','puerto-rico','united-states',
                'argentina','bolivia','brazil','chile','columbia','ecuador',
                'falkland-islands','french-guiana','guyana','paraguay','peru',
                'suriname','uruguay','venezuela','american-samoa','australia',
                'cook-islands','coral-sea-islands','federated-states-of-micronesia',
                'fiji','french-polynesia','guam','kiribati','marshall-islands',
                'nauru','new-caledonia','new-zealand','niue','northern-mariana-islands',
                'palau','papua-new-guinea','pitcaim-islands','solomon-islands',
                'tokelau','tonga','tuvalu','vanuatu','wallis-and-futuna-islands',
                'western-samoa'];

  //these arrays below are specifically for versions of the game based on a single continent
  //countries only from africa
  countriesAfrica = ['algeria','angola','benin','botswana','burkina-faso','burundi',
                'cameroon','central-african-republic','chad','cote-d_ivory',
                'democratic-republic-of-congo','djibouti','egypt','equatorial-guinea',
                'eritrea','ethiopia','gabon','ghana','guinea','guinea-bissau',
                'kenya','lesotho','liberia','libya','madagascar','malawi',
                'mali','mauritania','morocco','mozambique','namibia','niger',
                'nigeria','republic-of-congo','rwanda','senegal','sierra-leone',
                'somalia','south-africa','south-sudan','sudan','swaziland',
                'tanzania','the-gambia','togo','tunisia','uganda','western-sahara',
                'zambia','zimbabwe'];

  //countries only from asia
  countriesAsia = ['afghanistan','armenia','azerbaijan','bangladesh',
  'bhutan','brunei','buhrain','cambodia','china','east-timor','georgia',
  'india','indonesia','iran','iraq','israel','japan','jordan',
  'kazhakstan','kuwait','kyrgyzstan','laos','lebanon','malaysia',
  'mongolia','myanmar','nepal','north-korea','oman','pakistan',
  'philippines','qatar','russia','saudi-arabia','singapore','south-korea',
  'syria','taiwan','tajikistan','thailand','turkmenistan',
  'united-arab-emirates','uzbekistan','vietnam','yemen'];

  //countries only from europe
  countriesEurope = ['albania',
  'austria','belarus','belgium','bosnia','bulgaria','croatia',
  'czech-republic','denmark','estonia','finland','france','germany',
  'greece','hungary','iceland','ireland','italy','kosovo','latvia',
  'lithuania','macedonia','moldovia','montenegro','netherlands',
  'norway','poland','portugal','romania','serbia','slovakia','slovenia',
  'spain','sweden','switzerland','turkey','ukraine','united-kingdom'];

  //countries only from north america
  countriesNorthAmerica = ['bahamas','belize','canada','costa-rica','cuba','dominican-republic',
  'el-salvador','greenland','guatemala','haiti','honduras','jamaica',
  'mexico','nicaragua','panama','puerto-rico','united-states'];

  //countries only from south america
  countriesSouthAmerica = ['argentina','bolivia','brazil','chile','columbia','ecuador',
  'falkland-islands','french-guiana','guyana','paraguay','peru',
  'suriname','uruguay','venezuela'];

  //countries only from oceania
  countriesOceania = ['american-samoa','australia',
  'cook-islands','coral-sea-islands','federated-states-of-micronesia',
  'fiji','french-polynesia','guam','kiribati','marshall-islands',
  'nauru','new-caledonia','new-zealand','niue','northern-mariana-islands',
  'palau','papua-new-guinea','pitcaim-islands','solomon-islands',
  'tokelau','tonga','tuvalu','vanuatu','wallis-and-futuna-islands',
  'western-samoa'];

  //chooses the source of the next image. This generates a new image
  function chooseSource(){
    //from selectContinentForPlay.js
    //localStorage stores information from different files
    var choiceContinent = localStorage.getItem("continentChoice");
    console.log(localStorage.getItem("continentChoice"));
    var value;

    //below is a set of if conditions to choose the right countries depending on the choice the user made
    if(choiceContinent == undefined || choiceContinent == 0){
      value = Math.round(Math.random()*(countries.length-1));
      console.log("img/countries/"+countries[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countries[value]+".jpg";
    }

    else if(choiceContinent == 1){
      value = Math.round(Math.random()*(countriesAfrica.length-1));
      console.log("img/countries/"+countriesAfrica[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesAfrica[value]+".jpg";
    }

    else if(choiceContinent == 2){
      value = Math.round(Math.random()*(countriesAsia.length-1));
      console.log("img/countries/"+countriesAsia[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesAsia[value]+".jpg";
    }

    else if(choiceContinent == 3){
      value = Math.round(Math.random()*(countriesEurope.length-1));
      console.log("img/countries/"+countriesEurope[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesEurope[value]+".jpg";
    }

    else if(choiceContinent == 4){
      value = Math.round(Math.random()*(countriesNorthAmerica.length-1));
      console.log("img/countries/"+countriesNorthAmerica[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesNorthAmerica[value]+".jpg";
    }

    else if(choiceContinent == 5){
      value = Math.round(Math.random()*(countriesOceania.length-1));
      console.log("img/countries/"+countriesOceania[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesOceania[value]+".jpg";
    }

    else if(choiceContinent == 6){
      value = Math.round(Math.random()*(countriesSouthAmerica.length-1));
      console.log("img/countries/"+countriesSouthAmerica[value]+".jpg"+counterRightAnswers+" "+value);
      return "img/countries/"+countriesSouthAmerica[value]+".jpg";
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
        //compare answers/ see if user submitted right answer
        if(isRightAnswer($('#picture').attr("src"))){
          counterRightAnswers+=1;
          localStorage.setItem("counterRightAnswers", counterRightAnswers);

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
          window.location.href = "gameOver.html";
        }
        //if he did, reload a different picture and add 1 to counter

    })
  });
