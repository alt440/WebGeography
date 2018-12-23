  localStorage.setItem("login", undefined);

  //to shrink and grow the tabs in the nav bar
  var grow = {fontSize: '60px'};
  var smaller = {fontSize: '20px'};
  var reset = {fontSize: '40px'};
  var timeTaken = 150;
  $(document).ready(function(){

    $('#home').mouseenter(function(){
      //stops the animation to answer immediate request
      $('#home').stop();
      $('#play').stop();
      $('#about_us').stop();
      //animates the operation of changing font size by gradually increasing/
      //decreasing the font size
      $('#home').animate(grow, timeTaken);
      $('#play').animate(smaller, timeTaken);
      $('#about_us').animate(smaller, timeTaken);
    });
    $('#play').mouseenter(function(){
      $('#home').stop();
      $('#play').stop();
      $('#about_us').stop();
      $('#play').animate(grow, timeTaken);
      $('#home').animate(smaller, timeTaken);
      $('#about_us').animate(smaller, timeTaken);
    });
    $('#about_us').mouseenter(function(){
      $('#home').stop();
      $('#play').stop();
      $('#about_us').stop();
      $('#about_us').animate(grow, timeTaken);
      $('#play').animate(smaller, timeTaken);
      $('#home').animate(smaller, timeTaken);
    });

    $('.nav-bar-row').mouseleave(function(){
      $('#home').stop();
      $('#play').stop();
      $('#about_us').stop();
      $('#about_us').animate(reset, timeTaken);
      $('#play').animate(reset, timeTaken);
      $('#home').animate(reset, timeTaken);
    })

    //click events to load a new page
    $('#play').click(function(){
      window.location.href = "play.html";
    });

    $('#home').click(function(){
      window.location.href = "homePage.html";
    });

    $('#about_us').click(function(){
      window.location.href = "about_us.html";
    })
  });
//</script>
