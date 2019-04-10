//Ilmoittaa cookiesta
$( document ).ready(function() {
    if(getCookie("cookieInfo") !=="chekked"){
        $(".footer").slideDown(500);
        $("#closeCookie").click(function(){
            $(".footer").slideUp(500);
            document.cookie = "cookieInfo=chekked";
        });
    } else {
      $(".footer").hide();
    }
});

//tallentaa arvoja cookieihin
function cook(ele){
    //laudan v�ri
  //  console.log(ele)
    switch (ele) {
      case "brown":
      case "green":
        document.cookie="color="+  ele;
        break;
      case "perustus":
      case "maa":
        document.cookie="runkoratkaisu="+  ele;
        break;
      default:
        var name = ele.id;
        if (ele.type == "number") {
          var hinta = $("#"+name+"").val();
          document.cookie=""+name+"="+hinta;
        } else {
          var value = ele.attributes.name;
        //  console.log(ele.dataset.value)
        //  console.log(ele.title)
          document.cookie=""+ele.title+"="+ele.dataset.value;
        }
        break;
    }
    /*if () {
        // muut
        var name= ele.id;
        console.log(name)
        console.log(ele)
        var hinta = $("#"+name+"").val();
        console.log(hinta)
        document.cookie=""+name+"="+hinta;
    }*/

}

//hakee cookien nimell�
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
