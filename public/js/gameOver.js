
  var counter = localStorage.getItem("counterRightAnswers");

  //the source of the image of the country that the user failed to input correctly
  var sourceLastImg = localStorage.getItem("lastCountry");
  //spliting it correctly to get only the name of the country
  console.log(sourceLastImg);
  var nameImage = sourceLastImg.split("/");
  var onlyName = nameImage[2];
  onlyName = onlyName.split(".")[0];
  onlyName = onlyName.split("-").join(" ");
  onlyName = onlyName.replace("_","'");

  $(document).ready(function(){
    if(counter!=undefined){
      $('#losing_message').text('You were able to visit '+
                        counter+' countries!');
      $('#country_last_asked').text('You failed when you were asked for the country '+onlyName+'.');
    }
    $('#yes').click(function(){
      var typeGame = localStorage.getItem("typeGame");
      if(typeGame == 1){
        window.location.href = "questions.html";
      }
      else{
        window.location.href = "flagQuestions.html";
      }
    });

    $('#no').click(function(){
      window.location.href = "homePage.html";
    });

    $('#leaderboard').click(function(){
      window.location.href = "leaderboard.html";
    })
  });
