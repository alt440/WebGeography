//in milliseconds, time before elements appear
var timeDelay = 1000;
//time given for animation
var timeAnimation = 800;
$(document).ready(function(){

  //hides the text and buttons before displaying them
  $('#firstText').hide();
  $('#secondText').hide();
  $('#buttons').hide();

  //put it at faster time delay, because we dont want user to wait that long
  setTimeout(function(){
    $('#firstText').fadeIn(timeAnimation);
  },timeDelay)

  //put *2 for timeDelay because this element needs to appear after the first text
  setTimeout(function(){
    $('#secondText').fadeIn(timeAnimation);
  }, timeDelay*2)

  //put *3 for timeDelay because this element needs to appear after the second text
  setTimeout(function(){
    $('#buttons').fadeIn(timeAnimation);
  }, timeDelay*2 +500)


  //put functions for buttons
  $('#no').click(function(){
    window.location.href = "homePage.html";
  })

  $('#yes').click(function(){
    window.location.href = "typeGame.html";
  })

  $('#leaderboard').click(function(){
    window.location.href = "leaderboard.html";
  })
});
