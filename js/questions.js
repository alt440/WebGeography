  counterRightAnswers = 0;

  //local storage to maintain consistency between scripts
  localStorage.setItem("counterRightAnswers", counterRightAnswers);

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
                'suriname','uruguay','venezuela'];

  function chooseSource(){
    var value = Math.round(Math.random()*(countries.length-1));

    console.log("img/countries/"+countries[value]+".jpg"+counterRightAnswers+" "+value);
    return "img/countries/"+countries[value]+".jpg";
  }

  function isRightAnswer(imageSource){
    var nameImage = imageSource.split("/");
    var onlyName = nameImage[2];
    onlyName = onlyName.split(".")[0];
    onlyName = onlyName.replaceAll("-"," ");
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
          $('#picture').attr("src", chooseSource());
          $('#user_answer').val("");
        }
        //if he did not, send user to game over page
        else{
          window.location.href = "gameOver.html";
        }
        //if he did, reload a different picture and add 1 to counter

    })
  });


  //window.onpaint = chooseSource();
