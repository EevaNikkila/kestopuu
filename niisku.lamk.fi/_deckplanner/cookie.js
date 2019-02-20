//Ilmoittaa cookiesta
$( document ).ready(function() {
    if(getCookie("cookieInfo") !=="chekked"){
        $(".footer").slideDown(500);  
        $("#closeCookie").click(function(){
            $(".footer").slideUp(500);  
            document.cookie = "cookieInfo=chekked";
        });
    }
});

//tallentaa arvoja cookieihin
function cook(ele){
    //laudan väri
    if(ele === "brown" || ele === "green"){
        document.cookie="color="+  ele;
        
    }else{
        //runkoratkaisu
    if(ele === "maa" || ele === "perustus"){
        document.cookie="runkoratkaisu="+  ele;
        
    }else{
        // muut
        var name= ele.id;
        var hinta = $("#"+name+"").val();
        document.cookie=""+name+"="+hinta;
    }
    
} 
}

//hakee cookien nimellä
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

