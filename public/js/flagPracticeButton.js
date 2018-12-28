//this file is for the practice mode. It enables the person to see the answer

$('#answer').hide();
$('#answerText').hide();
//starts jQuery code
$(document).ready(function(){

  if(localStorage.getItem("typeQuestion") == 0
        || localStorage.getItem("typeQuestion") == undefined){
          $('#answer').show();
        $('#answer').click(function(){
          $('#answerText').show();

          var nameImage = $('#picture').attr("src").split("/");
          var onlyName = nameImage[2];
          onlyName = onlyName.split(".")[0];
          onlyName = onlyName.split("-").join(" ");
          onlyName = onlyName.replace("_","'");
          $('#answerText').text(onlyName);
          //console.log($('#picture').attr("src"));
        });
  }

});
