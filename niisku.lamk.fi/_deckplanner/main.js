$(document).ready(function() {
    Main();
});

lautaLeveys = 0.120;
rako = 0.003;
var laudanpituus = 4.5;
var brown = "brown";
var green = "green";
var per1 = "maa";
var per2 = "perustus";
var paper;
var nLeveys;
var nKorkeus;

var leveys;
var korkeus;

var skaalaus;

var tLeveysKorkeus = 10;
var leveysKorkeus = 100 * 10;

var ofsTop;
var ofsLeft;

var rako = 0.003;
var lankku = 0.120;
var koolaus_vali = 100;
var koolaus_puut;

var koolaus_metrit_tulos;

var koolaus_metrit = 0;
var uusi_koolaus_metrit = 0;

var pinta_ala;
var runkokpl;
var kiinnikkeet;
var palkkikengat;
var lautahinta;
var runkohinta;
var palkkikenkahinta;
var plkiinnikehinta = 0;
var pkkiinnikehinta = 0;
var ukkiinnikehinta = 0;

var leveys;
var pituus;

var aktiivinen;

var suunta = 'pysty';

var ylim_koolaus = 4.5;
var lisa_koolaus = 0;

var koolaus_aktiivinen = false;

var runkoratkaisu = 'maa'; // voidaan tarkistaa runkoratkaisu missÃ¤ funktiossa tahansa
var tolpat_lkm = 0; // kertoo tolppien lukumÃ¤Ã¤rÃ¤n kaikissa bokseissa yhteensÃ¤

var pintalaudat_kaytetyt_metrit = 0; // tÃ¤mÃ¤ sisÃ¤ltÃ¤Ã¤ metri mÃ¤Ã¤rÃ¤n kuinka paljon puuta kÃ¤ytetÃ¤Ã¤n ostetusta mÃ¤Ã¤rÃ¤stÃ¤

var pintalaudat_1_lkm = 0; // nÃ¤illÃ¤ neljÃ¤llÃ¤ muuttujalla saadaan laskettua meneekÃ¶ valittu lankun pituus yli vai jÃ¤Ã¤kÃ¶ vajaaksi
var pintalaudat_1_pituus = 0; // eli voidaan kÃ¤yttÃ¤Ã¤ todellisen lankkumÃ¤Ã¤rÃ¤n laskemiseen
var pintalaudat_2_lkm = 0;
var pintalaudat_2_pituus = 0;

var koolauspuun_leveys = 0.123; // leikitÃ¤Ã¤n ettÃ¤ koolauspuu on 95mm leveÃ¤ (jos sen leveydellÃ¤ on jokin merkitys). Jos ei merkitystÃ¤ laitetaan nollaksi -> ei vaikutusta laskuihin
// outo nimi koska koolaus_vali muuttuja on jo, enkÃ¤ halua sotkea ennen kuin uusi versio varmasti toimii
var koolaus_vali_kkk = 0.500; // alustetaan puoleksi metriksi -> vaihtuu aina kun laudan leveys vaihtuu
var koolaus_vali_yht = 0; // eli koolausvÃ¤li ja koolauspuun leveys yhteensÃ¤ -> TÃƒâ€žTÃƒâ€ž KÃƒâ€žYTETÃƒâ€žÃƒâ€žN LASKEMISEEN

var koolaus_1_pysty_lkm = 0; // kuinka monta pystykoolaus puuta on ensimmÃ¤isessÃ¤ boksissa
var koolaus_2_pysty_lkm = 0; // kuinka monta pystykoolaus puuta on toisessa boksissa

var koolaus_1_vaaka_lkm = 0; // kuinka monta vaakakoolaus puuta on ensimmÃ¤isessÃ¤ boksissa
var koolaus_2_vaaka_lkm = 0; // kuinka monta vaakakoolaus puuta on toisessa boksissa

var koolaus_1_pysty_pituus = 0; // jotta voidaan laskea terassin reunan yli menevÃ¤ osuus (tai sitten vajaus)
var koolaus_2_pysty_pituus = 0; // eli jos valittu lankku on 4m ja lankku (eli tÃ¤mÃ¤ muuttuja) on 4.5m niin

var koolaus_1_vaaka_pituus = 0; // tarvitaan vielÃ¤ 0.5 yms...
var koolaus_2_vaaka_pituus = 0;

var koolaukset = [koolaus_vali_kkk]; // sisÃ¤ltÃ¤Ã¤ koolausvÃ¤lit taulussa

var raaka_runko_maara = 0; // ei ota huomioon liian lyhyitÃ¤/pitkiÃ¤ puita -> eli metrimÃ¤Ã¤rÃ¤ sen mukaan jos kaikki puut olisivat prikulleen oikean pituisia

var pintalaudan_rako = 0.003; // nÃ¤mÃ¤ muuttuvat kun kÃ¤yttÃ¤jÃ¤ vaihtaa rako/leveyttÃ¤ selectissÃ¤
var pintalaudan_leveys = 0.120;

var koolaus_puut_vaaka = 2;
var koolaus_puut_pysty = 9;
var lisapuut_vaaka = 0;
var lisapuut_pysty = 0;

var lankun_vari = '#a1754a';

var palkkikengat_1_kerroin = 1;
var palkkikengat_2_kerroin = 1;

var inputDesimaalit = 1;

function Main() {

    paper = $('.piirtoAlusta');
    nLeveys = 768;
    nKorkeus = 1366;

    ofsTop = $(paper).offset().top;
    ofsLeft = $(paper).offset().left;

    if (nLeveys > nKorkeus) { // Korkeuden mukaan
        skaalaus = nKorkeus * 0.8 / leveysKorkeus;
    } else { // Leveyden mukaan
        skaalaus = nLeveys * 0.95 / leveysKorkeus;
    }

    leveys = $(paper)[0].getBoundingClientRect().width * skaalaus;
    korkeus = $(paper)[0].getBoundingClientRect().height * skaalaus;

    tod_rako = rako * 100 * skaalaus;
    tod_lankku = lankku * 100 * skaalaus;
    var wW = 768;
    var wH = 1366;
    var elemWidth = wH * 0.6 + wH * 0.2; // Eli elementtien leveys on 80% + 25% nÃ¤ytÃ¶n KORKEUDESTA

    $(paper).css({
        'width': leveysKorkeus * skaalaus,
        'height': leveysKorkeus * skaalaus,
    });

    if (document.cookie !== 0) {
        if (getCookie("runkoratkaisu") !== "") {
            runkoratkaisu = getCookie("runkoratkaisu");
        }
        if (getCookie("color") === "green") {
            lankun_vari = '#8da05e';
        }
        else {
            lankun_vari = '#a1754a';
        }
        if (getCookie("deck") !== "") {
            if (getCookie("deck") === "squareDeck") {
                squareDeck();
            }
            if (getCookie("deck") === "lDeck") {
                lDeck();
            }
            if (getCookie("deck") === "tDeck") {
                tDeck();
            }
        } else {
            squareDeck();
        }
    } else {
        squareDeck();
    }

    $(document).keyup(function(e) {

        if (e.which == 13)
            ieInputHandler(document.activeElement);

    });

    laskePintaLaudat();
    laskeKoolaus();
    laskeTarvikkeet();
    piirraLankut();
}
//--- NELIO TERASSI
function squareDeck() {

    aktiivinen = 's';
    $(paper).empty();
    $(paper).append('<div class="squareDeck deck"><div class="box1 box"><input id="left" onchange="inputHeight(this)"></input><input id="top" onchange="inputWidth(this)"></input><input id="right" onchange="inputHeight(this)"></input><input id="bottom" onchange="inputWidth(this)"></input><div class="suunta_nappi"><div class="suunta_info">Pintalaudoituksen suunta</div></div><div class="koolaus_nappi"><div class="koolaus_info">Näytä runkorakenne/pintalaudoitus</div></div></div></div>');

    $(paper).find('.box').each(function() {
        $(this).addClass('lankkuVaaka');
    });

    var sDeck = $('.squareDeck');
    var b1 = $('.box1');

    $(b1).resizable({
        "containment": $(paper),
        grid: skaalaus * 10
    }).on('resize drag', function() {
        update();
    });

    $(b1).on('drag', function() {
        update();
    });

    update();

    function update() {
        $(paper).find('.border-mask').remove();
        koolaus_metrit = 0;
        $(sDeck).find('.koolaus').remove();
        $(sDeck).find('.liikapituus').remove();
        $(sDeck).find('.box').css({
            'border': ''
        });
        var aw = $(sDeck)[0].getBoundingClientRect().width;
        var ah = $(sDeck)[0].getBoundingClientRect().height;

        var b1w = $(b1)[0].getBoundingClientRect().width;
        var b1h = $(b1)[0].getBoundingClientRect().height;

        $(sDeck).css({
            'height': $(b1).height(),
            'width': $(b1).width()
        });

        //cookies
        document.cookie = "deck=squareDeck";

        /* LANKKUJEN HAVANNOILLISTAMINEN */
        var taustan_koko = tod_lankku + tod_rako;

        /* MITAT */
        var left = $('#left');
        var top = $('#top');
        var right = $('#right');
        var bottom = $('#bottom');

        var ww = $(left).width() / 2;
        var hh = $(left).height() / 2;

        $(left).attr('placeholder', ((b1h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(top).attr('placeholder', ((b1w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(right).attr('placeholder', ((b1h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bottom).attr('placeholder', ((b1w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));

        createCookie();

        // ONCHANGE
        var b1ol = $(b1).offset().left - $(paper).offset().left;
        var b1ot = $(b1).offset().top - $(paper).offset().top;

        if (koolaus_aktiivinen == true)
            piirraKoolaus($(paper).find('.box'));

        laskePintaLaudat();
        laskeKoolaus();
        laskeTarvikkeet();
    }
}

//--- L-MUOTOINEN TERASSI
function lDeck() {

    aktiivinen = 'l';
    $(paper).empty();
    $(paper).append('<div class="lDeck deck"><div class="box1 box"><input id="left" readonly style="pointer-events:none;"></input><input id="top" onchange="inputWidth(this)"></input><input id="right" onchange="inputHeight(this)"></input><input id="middlebottom" readonly style="pointer-events:none;"><div class="suunta_nappi"><div class="suunta_info">Pintalaudoituksen suunta</div></div><div class="koolaus_nappi"><div class="koolaus_info">Näytä runkorakenne/pintalaudoitus</div></div></div><div class="box2 box"><input id="bottomright" onchange="inputHeight(this)"></input><input id="bottom" onchange="inputWidth(this)"></input></input></div></div>');

    $(paper).find('.box').each(function() {
        $(this).addClass('lankkuVaaka');
    });

    var lDeck = $('.lDeck');
    var b1 = $('.box1');
    var b2 = $('.box2');

    $(b1).resizable({
        "containment": $(paper),
        grid: skaalaus * 10
    }).on('resize', function() {
        update('b1');
    });

    $(b2).resizable({
        "containment": $(paper),
        grid: skaalaus * 10
    }).on('resize', function() {
        update('b2');
    });

    update('none');

    function update(piece) {
        $(paper).find('.border-mask').remove();
        koolaus_metrit = 0;
        $(lDeck).find('.koolaus').remove();
        $(lDeck).find('.liikapituus').remove();
        $(lDeck).find('.box').css({
            'border': ''
        });

        var aw = $(lDeck)[0].getBoundingClientRect().width;
        var ah = $(lDeck)[0].getBoundingClientRect().height;

        var b1w = $(b1)[0].getBoundingClientRect().width;
        var b1h = $(b1)[0].getBoundingClientRect().height;

        var b2w = $(b2)[0].getBoundingClientRect().width;
        var b2h = $(b2)[0].getBoundingClientRect().height;

        var ofsTopThis = $(lDeck).offset().top;
        var ofsLeftThis = $(lDeck).offset().top;

        //cookies
        document.cookie = "deck=lDeck";

        /* LANKKUJEN HAVANNOILLISTAMINEN */
        var taustan_koko = tod_lankku + tod_rako;

        if (b1w - b2w <= 0) {
            $(b1).css({
                'width': b2w
            });
        }

        /* tarkista etta toinen osa ei mene yli */
        if (ofsTopThis + b1h + b2h > $(paper).offset().top + $(paper).height() && piece == 'b1') {
            $(b1).css({
                'height': $(paper).height() - $(b2).height() - ($(b1).offset().top - $(paper).offset().top)
            });
        }

        $(lDeck).css({
            'height': b1h + b2h,
            'width': b1w
        });
        if ($(lDeck).offset().top + b1h + b2h > $(paper).offset().top + $(paper).height())
            $(lDeck).css({'height': b1h + b2h});

        /* MITAT */
        var left = $('#left');
        var top = $('#top');
        var right = $('#right');
        var middlebottom = $('#middlebottom');
        var bottomright = $('#bottomright');
        var bottom = $('#bottom');

        var ww = $(left).width() / 2;
        var hh = $(left).height() / 2;

        $(left).css({
            'left': -80,
            'top': (b1h + b2h) / 2 - hh
        }).attr('placeholder', ((ah / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(top).attr('placeholder', ((b1w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(right).attr('placeholder', ((b1h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(middlebottom).css({
            'left': b1w - ((b1w - b2w) / 2) - ww,
            'top': b1h + 10
        }).attr('placeholder', Math.abs((((b1w - b2w) / skaalaus / 100))).toFixed(inputDesimaalit) + ' m');
        $(bottomright).attr('placeholder', ((b2h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bottom).attr('placeholder', ((b2w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));

        if(b1h+b2h >= $(paper).height()){
            $(left).css({
                'top': $(paper).height() / 2 - 10
            }).attr('placeholder', '10.0 m');
            $(right).attr('placeholder', realSize( $(paper).height() - b2h ).toFixed(inputDesimaalit) + ' m' );
            $(middlebottom).css({
                'top': $(paper).height() - b2h + 10
            });
        }

        if (ofsTopThis + b1h + b2h > $(paper).offset().top + $(paper).height() && piece == 'b1') {
            $(b1).css({
                'height': $(paper).height() - $(b2).height() - ($(b1).offset().top - $(paper).offset().top)
            });
        }

        createCookie();

        if (koolaus_aktiivinen == true)
            piirraKoolaus($(paper).find('.box'));

        laskePintaLaudat();
        laskeKoolaus();
        laskeTarvikkeet();
    }
}

//--- T-MUOTOINEN TERASSI
function tDeck() {

    aktiivinen = 't';
    $(paper).empty();
    $(paper).append('<div class="tDeck deck"><div class="box1 box"><input id="left" onchange="inputHeight(this)"></input><input id="top" onchange="inputWidth(this)"></input><input id="right" onchange="inputHeight(this)"></input><input id="bright" readonly style="pointer-events:none;"></input></input><input id="bleft" readonly style="pointer-events:none;"></input><div class="suunta_nappi"><div class="suunta_info">Pintalaudoituksen suunta</div></div><div class="koolaus_nappi"><div class="koolaus_info">Näytä runkorakenne/pintalaudoitus</div></div></div><div class="box2 box"><input id="bottomright" onchange="inputHeight(this)"></input><input id="bottom" onchange="inputWidth(this)"></input><input id="bottomleft" onchange="inputHeight(this)"></div></div>');

    $(paper).find('.box').each(function() {
        $(this).addClass('lankkuVaaka');
    });

    var tDeck = $('.tDeck');
    var b1 = $('.box1');
    var b2 = $('.box2');
    var lollo = true;

    $(b1).resizable({
        "containment": $(paper),
        grid: skaalaus * 10
    }).on('resize', function() {
        update('b1');
    });

    $(b2).resizable({
        "containment": $(paper),
        grid: skaalaus * 10
    }).on('resize', function() {
        update('b2');
    });


    update('none');

    function update(piece) {
        $(paper).find('.border-mask').remove();
        koolaus_metrit = 0;
        $(tDeck).find('.koolaus').remove();
        $(tDeck).find('.liikapituus').remove();
        $(tDeck).find('.box').css({
            'border': ''
        });

        var aw = $(tDeck)[0].getBoundingClientRect().width;
        var ah = $(tDeck)[0].getBoundingClientRect().height;

        var b1w = $(b1)[0].getBoundingClientRect().width;
        var b1h = $(b1)[0].getBoundingClientRect().height;

        var b2w = $(b2)[0].getBoundingClientRect().width;
        var b2h = $(b2)[0].getBoundingClientRect().height;

        var ofsTopThis = $(tDeck).offset().top;
        var ofsLeftThis = $(tDeck).offset().top;

        $(tDeck).css({
            'width': b1w,
            'height': b1h + b2h
        });

        $(b2).css({
            'margin-left': b1w / 2 - (b2w / 2),
            'max-width': b1w
        });

        $(b1).add(b2).css({
            'min-width': '50px'
        });

        if (ofsTopThis + b1h + b2h > $(paper).offset().top + $(paper).height() && piece == 'b1') {
            $(b1).css({
                'height': $(paper).height() - $(b2).height() - ($(b1).offset().top - $(paper).offset().top)
            });
        }
        if (b2w >= b1w) {
            $(b2).css({
                'width': b1w
            });
        }

        //cookies
        document.cookie = "deck=tDeck";

        /* LANKKUJEN HAVANNOILLISTAMINEN */
        var taustan_koko = tod_lankku + tod_rako;

        /* MITAT */
        var left = $('#left');
        var top = $('#top');
        var right = $('#right');
        var bright = $('#bright');
        var bottomright = $('#bottomright');
        var bottomleft = $('#bottomleft');
        var bleft = $('#bleft');
        var bottom = $('#bottom');

        var ww = $(left).width() / 2;
        var hh = $(left).height() / 2;

        $(left).attr('placeholder', ((b1h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(top).attr('placeholder', ((b1w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(right).attr('placeholder', ((b1h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bottomright).attr('placeholder', ((b2h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bottom).attr('placeholder', ((b2w / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bottomleft).attr('placeholder', ((b2h / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bright).attr('placeholder', ((((aw - b2w) / 2) / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));
        $(bleft).attr('placeholder', ((((aw - b2w) / 2) / skaalaus / 100).toFixed(inputDesimaalit) + ' m'));


        if(b1h+b2h >= $(paper).height()){
            $(left).add(right).attr('placeholder', realSize( $(paper).height() - b2h ).toFixed(inputDesimaalit) + ' m' );
        }

        createCookie();

        if (koolaus_aktiivinen == true)
            piirraKoolaus($(paper).find('.box'));

        laskePintaLaudat();
        laskeKoolaus();
        laskeTarvikkeet();
    }

}

function laskePintaLaudatRaaka() { // palauttaa metrimÃ¤Ã¤rÃ¤n terassin pinta-alan perusteella + 12% hukan

    // pitÃ¤Ã¤ palauttaa metrimÃ¤Ã¤rÃ¤
    //console.log(pintalaudat_1_lkm, pintalaudat_1_pituus);
    var metrit = pintalaudat_1_lkm * pintalaudat_1_pituus + pintalaudat_2_lkm * pintalaudat_2_pituus;
    metrit = (metrit * 1.12).toFixed(1);

    return [pintalaudat_1_lkm + pintalaudat_2_lkm, metrit];
}
;

// jos alle 5.1 metrin terassi
// laskee kansilaudat koolausvÃ¤lit huomioon ottaen
function laskePintaLaudat() {

    // aloitetaan laskeminen alusta - ei lisÃ¤tÃ¤ vanhaan
    pintalaudat_1_lkm = 0;
    pintalaudat_1_pituus = 0;
    pintalaudat_2_lkm = 0;
    pintalaudat_2_pituus = 0;

    $(paper).find('.box').each(function(index) {

        // VAAKA LAUDOITUS
        if ($(paper).find('.lankkuVaaka').length >= 1) {

            // jos kyseessÃ¤ ylempi boxi
            if (index == 0) {
                pintalaudat_1_pituus = realSize($(this).width()); // ensimmÃ¤isen boxin laudan pituus
                pintalaudat_1_lkm = realSize($(this).height()); // otetaan boxin korkeus talteen
                // jaetaan korkeus lankun leveydellÃ¤ + raolla
                pintalaudat_1_lkm /= pintalaudan_leveys + pintalaudan_rako; // tÃ¤ssÃ¤ muuttujassa on nyt ylemmÃ¤n laatikon pintalautojen lkm
            }
            // jos kyseessÃ¤ alempi boxi
            if (index == 1) {
                pintalaudat_2_pituus = realSize($(this).width()); // toisen boksin laudan pituus
                pintalaudat_2_lkm = realSize($(this).height()); // otetaan boksin korkeus talteen
                // jaetaan korkeus lankun leveydellÃ¤ + raolla
                pintalaudat_2_lkm /= pintalaudan_leveys + pintalaudan_rako; // tÃ¤ssÃ¤ muuttujassa on nyt alemman laatikon pintalautojen lkm jos sellainen on olemassa
            }
        }
        // PYSTY LAUDOITUS
        if ($(paper).find('.lankkuPysty').length >= 1) {
            // jos kyseessÃ¤ ylempi boxi
            if (index == 0) {
                pintalaudat_1_pituus = realSize($(this).height()); // ensimmÃ¤isen boxin laudan pituus
                pintalaudat_1_lkm = realSize($(this).width()); // otetaan boxin leveys talteen
                // jaetaan leveys lankun leveydellÃ¤ + raolla
                pintalaudat_1_lkm /= pintalaudan_leveys + pintalaudan_rako; // tÃ¤ssÃ¤ muuttujassa on nyt ylemmÃ¤n laatikon pintalautojen lkm
            }
            // jos kyseessÃ¤ alempi boxi
            if (index == 1) {
                pintalaudat_2_pituus = realSize($(this).width()); // toisen boxin laudan pituus
                pintalaudat_2_lkm = realSize($(this).height()); // otetaan boxin korkeus talteen
                // jaetaan korkeus lankun leveydellÃ¤ + raolla
                pintalaudat_2_lkm /= pintalaudan_leveys + pintalaudan_rako; // tÃ¤ssÃ¤ muuttujassa on nyt alemman laatikon pintalautojen lkm jos sellainen on olemassa
            }
        }

    });

    // pyÃ¶rÃ¤ytetÃ¤Ã¤n ylÃ¶spÃ¤in
    pintalaudat_1_lkm = Math.ceil(pintalaudat_1_lkm);
    pintalaudat_2_lkm = Math.ceil(pintalaudat_2_lkm);


    // jos terassi yli 5.1 laudan suuntaan ohjataan raaka laskuriin
    if ($(paper).find('.lankkuVaaka').length >= 1 && realSize($(paper).find('.box1').width()) > 5.1)
        return laskePintaLaudatRaaka();
    else if ($(paper).find('.lankkuPysty').length >= 1 && realSize($(paper).find('.box1').height()) > 5.1)
        return laskePintaLaudatRaaka();

    // TÃƒâ€žMÃƒâ€ž EI VARMAANKAAN OLE SE MITÃƒâ€ž HALUTAAN PALAUTTAA KOSKA TÃƒâ€žMÃƒâ€ž ON LASKETTU SEN MUKAAN
    // ETTÃƒâ€ž KAIKKI PINTALAUDAT OLISIVAT TÃƒâ€žYSIN OIKEAN MITTAISIA

    var lauta_lkm = 0;
    var lauta_metrit = 0;

    $(paper).find('.box').each(function(index) {

        // laudan pituus on alustettu 3.6 metriseksi

        // ylempi boksi
        if (index == 0) {
            // etsitÃ¤Ã¤n lÃ¤hin koolauspuu
            var todellinen_pituus = 0; // eli aluksi laudanpituus = 3.6m ja koolausvali = 0.5m -> 4.0m liian pitkÃ¤ 3.5m on sopiva

            for (var i = 0; i < koolaukset.length - 1; i++) {
                if (laudanpituus < koolaukset[i]) {
                    todellinen_pituus = koolaukset[i - 1];
                    i = koolaukset.length;
                }
            }

            // lasketaan kuinka monta tÃ¤yttÃ¤ lankkua menee (eli jos todellinen_lankku on 3.5m ja terassin leveys 7.4m -> menee 2 tÃ¤yttÃ¤)
            var taysia_lautoja_lkm = Math.floor(pintalaudat_1_pituus / todellinen_pituus); // esim 2
            lauta_lkm += pintalaudat_1_lkm * taysia_lautoja_lkm;

            var taysia_lautoja_metrit = taysia_lautoja_lkm * todellinen_pituus; // tÃ¤ssÃ¤ tapauksessa 7.0m
            pintalaudat_kaytetyt_metrit += pintalaudat_1_lkm * taysia_lautoja_metrit;

            var taydennys_pituus = parseFloat((pintalaudat_1_pituus - (todellinen_pituus * taysia_lautoja_lkm)).toFixed(2)); // mitÃ¤ jÃ¤Ã¤ eli jos terassi 7.4m tÃ¤ydet laudat tÃ¤yttÃ¤Ã¤ siitÃ¤ 7.0m tarvitaan 0.4 metriÃ¤ lisÃ¤Ã¤ jostakin
            pintalaudat_kaytetyt_metrit += pintalaudat_1_lkm * taydennys_pituus;

            // tÃ¤ydennyspalojahan tarvitaan aina pintalaudat_x_lkm verran

            // lasketaan kuinka monta tÃ¤ydennyspalaa saadaan yhdestÃ¤ laudasta
            var taydennyksia_per_lauta = Math.floor(laudanpituus / taydennys_pituus);

            // elikkÃ¤ tiedetÃ¤Ã¤n monta tÃ¤ydennyspalaa tarvitaan (pintalaudat_1_lkm) ja monta saadaan yhdestÃ¤ laudasta ->
            var lautoja_taydennykseen = Math.ceil(pintalaudat_1_lkm / taydennyksia_per_lauta);

            // lauta_lkm sisÃ¤ltÃ¤Ã¤ lautojen mÃ¤Ã¤rÃ¤n ja lautoja_taydennykseen sisaltaa kuinka monta lautaa tarvitaan lisÃ¤Ã¤, jotta niistÃ¤ voidaan pÃ¤tkiÃ¤ sopivat lisÃ¤palat. Voidaan nyt siis laskea kuinka monta lautaa tÃ¤ytyy yhteensÃ¤ ostaa ->
            lauta_lkm += lautoja_taydennykseen; // kuinka monta valitun pituista lautaa pitÃ¤Ã¤ ostaa, jotta saadaan rakennettua haluttu terassi
        }
        // alempi boksi
        else if (index == 1) {
            // etsitÃ¤Ã¤n lÃ¤hin koolauspuu
            var todellinen_pituus = 0; // eli aluksi laudanpituus = 3.6m ja koolausvali = 0.5m -> 4.0m liian pitkÃ¤ 3.5m on sopiva

            for (var i = 0; i < koolaukset.length - 1; i++) {
                if (laudanpituus < koolaukset[i]) {
                    todellinen_pituus = koolaukset[i - 1];
                    i = koolaukset.length;
                }
            }

            // lasketaan kuinka monta tÃ¤yttÃ¤ lankkua menee (eli jos todellinen_lankku on 3.5m ja terassin leveys 7.4m -> menee 2 tÃ¤yttÃ¤)
            var taysia_lautoja_lkm = Math.floor(pintalaudat_2_pituus / todellinen_pituus); // esim 2
            lauta_lkm += pintalaudat_2_lkm * taysia_lautoja_lkm;

            var taysia_lautoja_metrit = taysia_lautoja_lkm * todellinen_pituus; // tÃ¤ssÃ¤ tapauksessa 7.0m
            pintalaudat_kaytetyt_metrit += pintalaudat_2_lkm * taysia_lautoja_metrit;

            var taydennys_pituus = parseFloat((pintalaudat_2_pituus - todellinen_pituus * taysia_lautoja_lkm).toFixed(2)); // mitÃ¤ jÃ¤Ã¤ eli jos terassi 7.4m tÃ¤ydet laudat tÃ¤yttÃ¤Ã¤ siitÃ¤ 7.0m tarvitaan 0.4 metriÃ¤ lisÃ¤Ã¤ jostakin
            pintalaudat_kaytetyt_metrit += pintalaudat_2_lkm * taydennys_pituus;

            // tÃ¤ydennyspalojahan tarvitaan aina pintalaudat_x_lkm verran

            // lasketaan kuinka monta tÃ¤ydennyspalaa saadaan yhdestÃ¤ laudasta
            var taydennyksia_per_lauta = Math.floor(laudanpituus / taydennys_pituus);

            // elikkÃ¤ tiedetÃ¤Ã¤n monta tÃ¤ydennyspalaa tarvitaan (pintalaudat_1_lkm) ja monta saadaan yhdestÃ¤ laudasta ->
            var lautoja_taydennykseen = Math.ceil(pintalaudat_2_lkm / taydennyksia_per_lauta);

            // lauta_lkm sisÃ¤ltÃ¤Ã¤ lautojen mÃ¤Ã¤rÃ¤n ja lautoja_taydennykseen sisaltaa kuinka monta lautaa tarvitaan lisÃ¤Ã¤, jotta niistÃ¤ voidaan pÃ¤tkiÃ¤ sopivat lisÃ¤palat. Voidaan nyt siis laskea kuinka monta lautaa tÃ¤ytyy yhteensÃ¤ ostaa ->
            lauta_lkm += lautoja_taydennykseen; // kuinka monta valitun pituista lautaa pitÃ¤Ã¤ ostaa, jotta saadaan rakennettua haluttu terassi
        }
    });

    // palautetaan taulu [1]=lkm; [2]=metrit;
    return [lauta_lkm, (lauta_lkm * laudanpituus).toFixed(1)];
}

// ottaa parametrina arvon (jnkin leveys/korkeus) ja muuttaa sen todelliseen kokoon
// tÃ¤mÃ¤ siksi ettÃ¤ koko piirtoalueen koko muuttuu eri nÃ¤ytÃ¶nkoiden mukaan
function realSize(that) {
    return that / skaalaus / 100;
}

function laskeKoolaus() {

    // 31.03.16
    // tarkistetaan kummatkin osat (boksi 1 & 2) -> jos yli 4.5metriÃ¤ tai 9.0metriÃ¤ lisÃ¤tÃ¤Ã¤n palkkikenkien kertoimia
    // 04.04.16 -> palkkikengÃ¤t tosiaan kerrottiin kahdella turhaan, koska sivulle tultaessa terassin leveys on 5.5 metriÃ¤ jolloin => 4.5 metriÃ¤ toteutui
    // ei ollut ehtolausetta alle 4.5 metrin terassille joten kerroin ei koskaan muutu pienemmÃ¤ksi kuin 2
    // ratkaisu: lisÃ¤Ã¤ ehtolause alle 4.5 metrin terassille

    if (runkoratkaisu == 'perustus') {
        if (realSize($(paper).find('.box1').height()) < 4.5 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_1_kerroin = 1;
        if (realSize($(paper).find('.box1').height()) >= 4.5 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_1_kerroin = 2;
        if (realSize($(paper).find('.box1').height()) >= 9.0 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_1_kerroin = 3;
        if (realSize($(paper).find('.box2').height()) < 4.5 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_2_kerroin = 1;
        if (realSize($(paper).find('.box2').height()) >= 4.5 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_2_kerroin = 2;
        if (realSize($(paper).find('.box2').height()) >= 9.0 && $(paper).find('.lankkuVaaka').length >= 1)
            palkkikengat_2_kerroin = 3;

        if (realSize($(paper).find('.box1').width()) < 4.5 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_1_kerroin = 1;
        if (realSize($(paper).find('.box1').width()) >= 4.5 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_1_kerroin = 2;
        if (realSize($(paper).find('.box1').width()) >= 9.0 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_1_kerroin = 3;
        if (realSize($(paper).find('.box2').width()) < 4.5 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_2_kerroin = 1;
        if (realSize($(paper).find('.box2').width()) >= 4.5 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_2_kerroin = 2;
        if (realSize($(paper).find('.box2').width()) >= 9.0 && $(paper).find('.lankkuPysty').length >= 1)
            palkkikengat_2_kerroin = 3;
    } else {
        palkkikengat_1_kerroin = 1;
        palkkikengat_2_kerroin = 1;
    }

    // ei lisÃ¤tÃ¤ vanhan pÃ¤Ã¤lle (muuten esim L-muodosta neliÃ¶Ã¶n vaihtaessa vanha koolaus_2_pysty_lkm jÃ¤Ã¤ voimaan)
    koolaus_1_pysty_lkm = 0;
    koolaus_1_vaaka_lkm = 0;
    koolaus_2_pysty_lkm = 0;
    koolaus_2_vaaka_lkm = 0;
    koolaus_1_pysty_pituus = 0;
    koolaus_1_vaaka_pituus = 0;
    koolaus_2_pysty_pituus = 0;
    koolaus_2_vaaka_pituus = 0;
    raaka_runko_maara = 0;

    // vaihdetaan koolaus vÃ¤liÃ¤ pintalaudan leveyden mukaan
    if (pintalaudan_leveys == 0.095)
        koolaus_vali_kkk = 0.400;
    if (pintalaudan_leveys == 0.120)
        koolaus_vali_kkk = 0.500;
    if (pintalaudan_leveys == 0.145)
        koolaus_vali_kkk = 0.600;
    if (pintalaudan_leveys == 0.220)
        koolaus_vali_kkk = 0.700;

    koolaukset = [koolaus_vali_kkk];

    while (koolaukset[koolaukset.length - 1] <= 10) {
        var tmp = koolaukset[koolaukset.length - 1] + koolaus_vali_kkk;
        tmp = tmp.toFixed(1); // muuttaa ilmeisesti string-muotoon (?)
        tmp = parseFloat(tmp); // joten pitÃ¤Ã¤ muuttaa takaisin numeraaliseen muotoon, jotta toimii
        koolaukset.push(tmp);
    }

    koolaus_vali_yht = koolaus_vali_kkk /*+ koolauspuun_leveys*/;

    $(paper).find('.box').each(function(index) {
        var width = realSize($(this).width()); // kyseisen boksin (ylÃ¤ tai ala) leveys
        var height = realSize($(this).height()); // kyseisen boksin (ylÃ¤ tai ala) korkeus

        // PYSTY KOOLAUS
        if ($(paper).find('.lankkuVaaka').length >= 1) {

            if (index == 0) {
                koolaus_1_pysty_lkm = Math.ceil(width / koolaus_vali_yht) + 1; // otetaan ylÃ¶s kuinka monta pystykoolauspuuta boksissa 1 on
                koolaus_1_pysty_pituus = height; // yksittÃ¤isen pystykoolauspuun pituus

                // koska koolaus on pystyyn 1. boksissa on kaksi vaakakoolauspuuta (ylÃ¤ ja alareuna)
                koolaus_1_vaaka_lkm = 2;
                koolaus_1_vaaka_pituus = width; // yksittÃ¤isen pystykoolauspuun pituus
            }
            if (index == 1) {
                koolaus_2_pysty_lkm = Math.ceil(width / koolaus_vali_yht) + 1; // otetaan ylÃ¶s kuinka monta pystykoolauspuuta boksissa 2 on
                koolaus_2_pysty_pituus = height; // yksittÃ¤isen pystykoolauspuun pituus

                // koska koolaus on pystyyn 2. boksissa on vain yksi vaakakoolauspuu (alareuna)
                koolaus_2_vaaka_lkm = 1;
                koolaus_2_vaaka_pituus = width; // yksittÃ¤isen pystykoolauspuun pituus
            }
            // nyt on laskettu pystykoolauspuut ja "reunakoolaukset" -> tarvitaan vielÃ¤ mahdolliset ylimÃ¤Ã¤rÃ¤iset tukipuut
            // joita on jos korkeus ylittÃ¤Ã¤ 4.5m (1 kpl) tai jos korkeus ylittÃ¤Ã¤ 9.0m (2 kpl)
            // koska pystykoolauksessa bokseissa on jo "reunapuut" on myÃ¶s lisÃ¤tukipuu kÃ¤ytÃ¤nnÃ¶ssÃ¤ "reunapuu"
            // jolloin voidaan lisÃ¤tÃ¤ se koolaus_2_vaaka_lkm muuttujaan
            if (height >= 4.5)
                koolaus_1_vaaka_lkm += 1; // eli lisÃ¤tÃ¤Ã¤ "reunapuu" vaikka se nyt keskellÃ¤ onkin
            if (height >= 9.0)
                koolaus_2_vaaka_lkm += 1; // mutta eihÃ¤n se matikkaan vaikuta (samaa puutaha se kait on?)

        }

        // VAAKA KOOLAUS
        if ($(paper).find('.lankkuPysty').length >= 1) {

            if (index == 0) {
                koolaus_1_vaaka_lkm = Math.ceil(height / koolaus_vali_yht) + 1; // otetaan ylÃ¶s kuinka monta pystykoolauspuuta boksissa 1 on
                koolaus_1_vaaka_pituus = width; // yksittÃ¤isen pystykoolauspuun pituus

                // koska koolaus on pystyyn 1. boksissa on kaksi vaakakoolauspuuta (ylÃ¤ ja alareuna)
                koolaus_1_pysty_lkm = 2;
                koolaus_1_pysty_pituus = height; // yksittÃ¤isen pystykoolauspuun pituus
            }
            if (index == 1) {
                koolaus_2_vaaka_lkm = Math.ceil(height / koolaus_vali_yht) + 1; // otetaan ylÃ¶s kuinka monta pystykoolauspuuta boksissa 2 on
                koolaus_2_vaaka_pituus = width; // yksittÃ¤isen pystykoolauspuun pituus

                // koska koolaus on pystyyn 2. boksissa on vain yksi vaakakoolauspuu (alareuna)
                koolaus_2_pysty_lkm = 1;
                koolaus_2_pysty_pituus = height; // yksittÃ¤isen pystykoolauspuun pituus
            }
            // nyt on laskettu pystykoolauspuut ja "reunakoolaukset" -> tarvitaan vielÃ¤ mahdolliset ylimÃ¤Ã¤rÃ¤iset tukipuut
            // joita on jos korkeus ylittÃ¤Ã¤ 4.5m (1 kpl) tai jos korkeus ylittÃ¤Ã¤ 9.0m (2 kpl)
            // koska pystykoolauksessa bokseissa on jo "reunapuut" on myÃ¶s lisÃ¤tukipuu kÃ¤ytÃ¤nnÃ¶ssÃ¤ "reunapuu"
            // jolloin voidaan lisÃ¤tÃ¤ se koolaus_2_vaaka_lkm muuttujaan
            if (width >= 4.5)
                koolaus_1_pysty_lkm += 1; // eli lisÃ¤tÃ¤Ã¤ "reunapuu" vaikka se nyt keskellÃ¤ onkin
            if (width >= 9.0)
                koolaus_2_pysty_lkm += 1; // mutta eihÃ¤n se matikkaan vaikuta (samaa puutaha se kait on?)

        }
    });

    raaka_runko_maara = koolaus_1_pysty_lkm * koolaus_1_pysty_pituus +
            koolaus_1_vaaka_lkm * koolaus_1_vaaka_pituus +
            koolaus_2_pysty_lkm * koolaus_2_pysty_pituus +
            koolaus_2_vaaka_lkm * koolaus_2_vaaka_pituus;

    raaka_runko_maara *= 1.12; // hukka

    raaka_runko_maara = (raaka_runko_maara).toFixed(1);

    return raaka_runko_maara;
}

function piirraKoolaus(t) {

    $(paper).find('.koolaus_nappi').css({
        'background-image': 'url(kuvat/aktivoi_laudoitus.svg)',
        'border': '2px solid black'
    });

    if ($(t).hasClass('lankkuVaaka')) { // ELI KOOLAUS PYSTYYN
        // Poistetaan background-image
        $(t).parent().find('.box').css({
            'background-color': '#fbfae8'
        });

        $(t).parent().find('.box').each(function(index) {
            var width = realSize($(this).width());
            var height = realSize($(this).height());

            //var koolaus_maara = Math.ceil(width / koolaus_vali);

            // HUOMAA ETTÃƒâ€ž koolaus_x_xxxxx_lkm sisÃ¤ltÃ¤Ã¤ myÃ¶s koolaus puun leveyden (95mm)
            if (index == 0)
                koolaus_maara = koolaus_1_pysty_lkm;
            if (index == 1)
                koolaus_maara = koolaus_2_pysty_lkm;


            $(this).find('.koolausPuu').remove(); // Poistetaan vanhat koolaukset
            for (var i = 0; i < koolaus_maara; i++) {
                $(this).append('<div class="koolausPuuPysty koolausPuu"></div>');
            }

            $(this).find('.koolausPuuPysty').each(function(index) {
                $(this).css({
                    'left': koolaus_vali_kkk * skaalaus * 100 * index - 5
                });
            });

            $(this).find('.koolausPuuPysty').last().css({
                'left': 'calc(100% - 5px)'
            });

            for (var i = 0; i < 2; i++) {
                $(this).append('<div class="koolausPuuVaaka koolausPuu"></div>');
            }

            if (index == 0) {
                $(this).find('.koolausPuuVaaka').eq(0).css({
                    'top': '0px',
                    'left': '0px'
                });
                $(this).find('.koolausPuuVaaka').eq(1).css({
                    'top': 'calc(100% - 5px)',
                    'left': '0px'
                });
            }
            if (index == 1) {
                $(this).find('.koolausPuuVaaka').eq(0).css({
                    'top': '0px',
                    'left': '0px'
                });
                $(this).find('.koolausPuuVaaka').eq(1).css({
                    'top': 'calc(100% - 5px)',
                    'left': '0px'
                });
            }

            //if( $(this).index() > 0)
            //$(this).find('.koolausPuuVaaka').eq(0).remove();

            // Jos menee yli 4.5 metriÃ¤ korkeudessa lisÃ¤tÃ¤Ã¤n tukipuu
            if ($(this)[0].getBoundingClientRect().height / skaalaus / 100 > 4.5) {
                $(this).append('<div class="liikapituus koolausPuu"></div>');
                $(this).find('.liikapituus').css({
                    'position': 'absolute',
                    'width': $(this).width() - 2,
                    'height': 5,
                    'left': 0,
                    'top': $(this).height() / 2 - 2.5,
                    'background': 'black',
                    'z-index': '1111111'
                });
                lisa_koolaus = 1;
            }
            if ($(this)[0].getBoundingClientRect().height / skaalaus / 100 > 9.0) {
                $(this).find('.liikapituus').remove();

                var pos = 0.33;
                for (var i = 0; i < 2; i++) {
                    $(this).append('<div class="liikapituus koolausPuu"></div>');
                    $(this).find('.liikapituus').eq(i).css({
                        'position': 'absolute',
                        'width': $(this).width() - 2,
                        'height': 5,
                        'left': 0,
                        'top': $(this).height() * pos - 2.5,
                        'background': 'black'
                    });
                    pos += pos;
                    lisa_koolaus = (i + 1);
                }
            }

        });
    }
    else if ($(t).hasClass('lankkuPysty')) { // ELI KOOLAUS VAAKAAN
        // Poistetaan background-image
        $(t).parent().find('.box').css({
            'background-color': '#fbfae8'
        });

        $(t).parent().find('.box').each(function(index) {
            var boxIndex = index;
            var width = realSize($(this).width());
            var height = realSize($(this).height());

            var koolaus_maara = Math.ceil(height / koolaus_vali);

            // HUOMAA ETTÃƒâ€ž koolaus_x_xxxxx_lkm sisÃ¤ltÃ¤Ã¤ myÃ¶s koolaus puun leveyden (95mm)
            if (index == 0)
                koolaus_maara = koolaus_1_vaaka_lkm;
            if (index == 1)
                koolaus_maara = koolaus_2_vaaka_lkm;

            $(this).find('.koolausPuu').remove(); // Poistetaan vanhat koolaukset
            for (var i = 0; i < koolaus_maara; i++) {
                $(this).append('<div class="koolausPuuVaaka koolausPuu"></div>');
            }

            $(this).find('.koolausPuuVaaka').each(function(index) {
                //if (boxIndex == 1)
                //index = index + 1;

                $(this).css({'top': koolaus_vali_kkk * skaalaus * 100 * index - 5});
            });

            $(this).find('.koolausPuuVaaka').last().css({
                'top': 'calc(100% - 5px)'
            });

            for (var i = 0; i < 2; i++) {
                $(this).append('<div class="koolausPuuPysty koolausPuu"></div>');
            }
            $(this).find('.koolausPuuPysty').eq(0).css({
                'top': '0px',
                'left': '0px'
            });
            $(this).find('.koolausPuuPysty').eq(1).css({
                'top': '0px',
                'left': 'calc(100% - 5px)'
            });

            // Jos menee yli 4.5 metriÃ¤ korkeudessa lisÃ¤tÃ¤Ã¤n tukipuu
            if ($(this)[0].getBoundingClientRect().width / skaalaus / 100 > 4.5) {
                $(this).append('<div class="liikapituus koolausPuu"></div>');
                $(this).find('.liikapituus').css({
                    'position': 'absolute',
                    'width': 5,
                    'height': $(this).height() - 2,
                    'left': $(this).width() / 2 - 2.5,
                    'top': 0,
                    'background': 'black',
                    'z-index': '1111111'
                });
                lisa_koolaus = 1;
                lisapuut_pysty = 1;
                lisapuut_vaaka = 0;
            }
            if ($(this)[0].getBoundingClientRect().width / skaalaus / 100 > 9.0) {
                $(this).find('.liikapituus').remove();

                var pos = 0.33;
                for (var i = 0; i < 2; i++) {
                    $(this).append('<div class="liikapituus koolausPuu"></div>');
                    $(this).find('.liikapituus').eq(i).css({
                        'position': 'absolute',
                        'width': 5,
                        'height': $(this).height() - 2,
                        'left': $(this).width() * pos - 2.5,
                        'top': 0,
                        'background': 'black'
                    });
                    pos += pos;
                    lisa_koolaus = (i + 1);
                    lisapuut_pysty = (i + 1);
                    lisapuut_vaaka = 0;
                }
            }
        });
    }
    if (runkoratkaisu == 'perustus') {
        $(paper).find('.tolppa').remove();

        $(paper).find('.box').each(function(index) {
            var x = $(this).position().left;
            var y = $(this).position().top;
            var xx = x + $(this).width();
            var yy = y + $(this).height();

            for (var i = 0; i < 4; i++)
                $(this).append('<div class="tolppa tolppa_' + (i + 1) + '"></div>');

            if (index == 0 && aktiivinen == 'l') {
                $(this).find('.tolppa').eq(2).addClass('keskita_tolppa');
            }
            if (index == 1 && aktiivinen == 'l') {
                $(this).find('.tolppa').eq(0).remove();
                $(this).find('.tolppa').eq(0).addClass('keskita_tolppa');
            }
            if (index == 1 && aktiivinen == 't') {
                $(this).find('.tolppa').eq(0).addClass('keskita_tolppa');
                $(this).find('.tolppa').eq(1).addClass('keskita_tolppa');
            }
        });

        $(paper).find('.box').each(function() {

            if (realSize($(this).height()) >= 4.5) {
                $(this).find('.koolausPuuPysty').first().append('<div class="tolppa"></div>');
                $(this).find('.koolausPuuPysty').first().find('.tolppa').first().css({'left': '-6px', 'top': 'calc(50% - 8px)'});

                $(this).find('.koolausPuuPysty').last().append('<div class="tolppa"></div>');
                $(this).find('.koolausPuuPysty').last().find('.tolppa').last().css({'left': '-6px', 'top': 'calc(50% - 8px)'});

                if ($(this).hasClass('lankkuVaaka')) {
                    $(this).find('.liikaPituus').each(function() {
                        $(this).append('<div class="tolppa"></div>');
                        $(this).find('.tolppa').css({'left': 'calc(50% - 8px)', 'top': '-6px'});
                    });
                }
            }
            if (realSize($(this).width()) >= 4.5) {
                $(this).find('.koolausPuuVaaka').first().append('<div class="tolppa"></div>');
                $(this).find('.koolausPuuVaaka').first().find('.tolppa').first().css({'left': 'calc(50% - 8px)', 'top': '-6px'});

                $(this).find('.koolausPuuVaaka').last().append('<div class="tolppa"></div>');
                $(this).find('.koolausPuuVaaka').last().find('.tolppa').last().css({'left': 'calc(50% - 8px)', 'top': '-6px'});

                if ($(this).hasClass('lankkuPysty')) {
                    $(this).find('.liikaPituus').each(function() {
                        $(this).append('<div class="tolppa"></div>');
                        $(this).find('.tolppa').css({'left': '-6px', 'top': 'calc(50% - 8px)'});
                    });
                }
            }

        });

        tolpat_lkm = $(paper).find('.tolppa').length;
    }
    else if (runkoratkaisu == 'maa') {
        $(paper).find('.tolppa').remove();
    }
}

function laskeTarvikkeet() {

    var b1w = $(paper).find('.box1').width();
    var b1h = $(paper).find('.box1').height();
    var b2w = $(paper).find('.box2').width();
    var b2h = $(paper).find('.box2').height();

    /* 28042018 MW apumuuttuja lauden leveyteen */
    var xyz;

    /* TARVIKKEET */
    pinta_ala = realSize(b1w) * realSize(b1h) + realSize(b2w) * realSize(b2h);

    var arr = laskePintaLaudat();
    kplmaara = arr[0]; //(((pinta_ala / lautaLeveys + rako) * 1.1555) / laudanpituus).toFixed(0);
    pintalaudat_kaytetyt_metrit = arr[1]; // sisÃ¤ltÃ¤Ã¤ mÃ¤Ã¤rÃ¤n kuinka paljon ostetusta puusta oikeasti kÃ¤ytetÃ¤Ã¤n

    koolaus_metrit_tulos = laskeKoolaus();//(koolaus_1_vaaka_lkm * b1w / skaalaus / 100 + koolaus_2_vaaka_lkm * b2w / skaalaus / 100 + koolaus_1_pysty_lkm * b1h / skaalaus / 100 + koolaus_2_pysty_lkm * b2h / skaalaus / 100).toFixed(1);
    runkokpl = koolaus_1_pysty_lkm + koolaus_1_pysty_lkm + koolaus_2_pysty_lkm + koolaus_2_vaaka_lkm; //(koolaus_puut_vaaka + lisapuut_vaaka + koolaus_puut_pysty + lisapuut_pysty).toFixed(0);
    kiinnikkeet = (kplmaara * 2 * runkokpl).toFixed(0);

    // jos koolaukset pystyyn -> palkkikengat on (koolaus_x_pysty_lkm - 2) * (lisapuut+1)

    var palkkikengat_1;
    var palkkikengat_2;

    if ($(paper).find('.lankkuVaaka').length >= 1) { // pystykoolaus
        palkkikengat_1 = (koolaus_1_pysty_lkm - 2) * 2 * palkkikengat_1_kerroin;
        palkkikengat_2 = (koolaus_2_pysty_lkm - 2) * 2 * palkkikengat_2_kerroin;
    } else if ($(paper).find('.lankkuPysty').length >= 1) { // vaakakoolaus
        palkkikengat_1 = (koolaus_1_vaaka_lkm - 2) * 2 * palkkikengat_1_kerroin;
        palkkikengat_2 = (koolaus_2_vaaka_lkm - 2) * 2 * palkkikengat_2_kerroin;
    }

    // jos alempaa boksia ei ole (neliÃ¶ muoto) niin palkkikengat_2 menee miinus kahdeksaksi -> tarkistetaan ettÃ¤ vÃ¤hintÃ¤Ã¤n nolla
    if (palkkikengat_1 < 0)
        palkkikengat_1 = 0;
    if (palkkikengat_2 < 0)
        palkkikengat_2 = 0;

    palkkikengat = palkkikengat_1 + palkkikengat_2;

    // lisÃ¤tÃ¤Ã¤n palkkikenkiin vielÃ¤ lisÃ¤tukipuut
    // eli palkkikengat_x_kerroin-1 kertoo monta tukipuuta on
    // kerrotaan se kahdella ja lisÃ¤tÃ¤Ã¤n mÃ¤Ã¤rÃ¤Ã¤n
    var tukipuut_1_palkkikengat = (palkkikengat_1_kerroin - 1) * 2;
    var tukipuut_2_palkkikengat = (palkkikengat_2_kerroin - 1) * 2;

    palkkikengat += tukipuut_1_palkkikengat + tukipuut_2_palkkikengat;
    palkkikenkakiinnikkeet = palkkikengat * 8;

    var kiinnityskohdat_1 = 0;
    var kiinnityskohdat_2 = 0;

    if ($(paper).find('.lankkuVaaka').length >= 1) {
        kiinnityskohdat_1 = koolaus_1_pysty_lkm;
        kiinnityskohdat_2 = koolaus_2_pysty_lkm;
    }
    else if ($(paper).find('.lankkuPysty').length >= 1) {
        kiinnityskohdat_1 = koolaus_1_vaaka_lkm;
        kiinnityskohdat_2 = koolaus_2_vaaka_lkm;
    }

    pintalautakiinnikkeet_1 = kiinnityskohdat_1 * pintalaudat_1_lkm;
    pintalautakiinnikkeet_2 = kiinnityskohdat_2 * pintalaudat_2_lkm;
    pintalautakiinnikkeet = (pintalautakiinnikkeet_1 + pintalautakiinnikkeet_2) * 2;

    var boksit = $(paper).find('.box').length;

    ulkokehakiinnikkeet = 12 * boksit; // aluksi jokaisessa boksissa on 12 ruuvia

    if ($(paper).find('.lankkuVaaka').length >= 1) {

        $('.box').each(function(){
            if( realSize($(this).height()) >= 4.5 ) ulkokehakiinnikkeet += 3;
            if( realSize($(this).height()) >= 9.0 ) ulkokehakiinnikkeet += 3;
        });

    }else if ($(paper).find('.lankkuPysty').length >= 1) {

        $('.box').each(function(){
            if( realSize($(this).width()) >= 4.5 ) ulkokehakiinnikkeet += 3;
            if( realSize($(this).width()) >= 9.0 ) ulkokehakiinnikkeet += 3;
        });

    }

    // jos perustusvarainen -> tuplataan ruuvit
    if(runkoratkaisu == 'perustus') ulkokehakiinnikkeet *= 2;

    // lasketaan tolpat
    // eli normaalisti tolppia on 4 per terassin osa, mutta jos sen leveys / korkeus ylittää 4.5 metriä
    // tulee 2 lisä tolppaa
    var tolpat = 0;

    if(runkoratkaisu == 'perustus'){
        if ($(paper).find('.lankkuVaaka').length >= 1) {

            $(paper).find('.box').each(function(){
                tolpat += 4;

                if( realSize($(this).width()) > 4.5 ) // jos leveys yli 4.5 metriä tulee reunoille 2 lisätolppaa
                    tolpat += 2;
                if( realSize($(this).height()) > 4.5 ) // jos korkeus yli 4.5 metriä tulee lisätukipuu -> 3 tolppaa lisää
                    tolpat += 3;
                if( realSize($(this).height()) > 9.0 ) // jos korkeus yli 4.5 metriä tulee lisätukipuu -> 3 tolppaa lisää
                    tolpat += 1;
            });

        }else if ($(paper).find('.lankkuPysty').length >= 1) {

            $(paper).find('.box').each(function(){
                tolpat += 4;
                if( realSize($(this).height()) > 4.5 ) // jos leveys yli 4.5 metriä tulee reunoille 2 lisätolppaa
                    tolpat += 2;
                if( realSize($(this).width()) > 4.5 ) // jos korkeus yli 4.5 metriä tulee lisätukipuu -> 3 tolppaa lisää
                    tolpat += 3;
                if( realSize($(this).width()) > 9.0 ) // jos korkeus yli 4.5 metriä tulee lisätukipuu -> 3 tolppaa lisää
                    tolpat += 1;
            });

        }
    }


    $('.runko').find('h2').eq(1).html(koolaus_metrit_tulos + ' m');
    $('.pintaala').find('h2').eq(1).html((pinta_ala).toFixed(1) + ' m<sup>2</sup>');
    $('.metrimaara').find('h2').eq(1).html(pintalaudat_kaytetyt_metrit + ' m');
    $('.kplmaara').find('h2').eq(1).html(kplmaara);
    $('#pituusehdotus').html(ehdotaLaudanPituutta() + ' m');
    $('#runkokiinnikkeet').html(palkkikenkakiinnikkeet + ulkokehakiinnikkeet);
    $('#pintalautakiinnikkeet').html(pintalautakiinnikkeet);
    $('#palkkikengat').html(palkkikengat);
    $('#tolpat').html(tolpat);
    $('#valittupituus').html(laudanpituus);
    var kikka = 1;
    /* HINNAT */
    kiinnikehinta = kiinnikkeet * $('#kiinnikehinta').val();
    lautahinta = pintalaudat_kaytetyt_metrit * $('#lautahinta').val();
    palkkikenkahinta = (palkkikengat * $('#palkkikenkahinta').val());
    runkohinta = koolaus_metrit_tulos * $('#runkohinta').val();
    runkokiinnikehinta = kikka * $('#pkkiinnikehinta').val();
    plkiinnikehinta = kikka * $('#plkiinnikehinta').val();
    yhteishinta = (lautahinta + runkohinta + runkokiinnikehinta + plkiinnikehinta + palkkikenkahinta).toFixed(1);

    $('#runkohintatulos').html(runkohinta.toFixed(1) + " &euro;");
    $('#kiinnikehintatulos').html((kiinnikehinta).toFixed(1) + " &euro;");
    $('#lautahintatulos').html(lautahinta.toFixed(1) + " &euro;");
    $('#palkkikenkahintatulos').html(palkkikenkahinta.toFixed(1) + " &euro;");
    $('#pkkiinnikehintatulos').html(runkokiinnikehinta.toFixed(1) + " &euro;");
    $('#plkiinnikehintatulos').html(plkiinnikehinta.toFixed(1) + " &euro;");
    $('#yhteishinta').html(yhteishinta + " &euro;");


    /* PDF */
    /* 28042018 MW lautaleveys arvo korvaraan UI:sta saatavalla pintalaudan_leveys arvolla thetkeksi */
    xyz = lautaLeveys;
    lautaLeveys = pintalaudan_leveys;
    $('#pintaalaPdf').html((pinta_ala).toFixed(1) + ' m<sup>2</sup>');
    $('#metrimaaraPdf').html((pinta_ala / (lautaLeveys + rako) * 1.12).toFixed(1) + ' m');
    $('#kplPdf').html((((pinta_ala / lautaLeveys + rako) * 1.12) / laudanpituus).toFixed(0) + " kpl / " + laudanpituus + " m");
    $('#palkkikengatPdf').html(palkkikengat);
    $('#leveysPdf').html(lautaLeveys * 1000 + ' mm');
    lautaLeveys = xyz;

    $('#kiinnikkeetPdf').html(kiinnikkeet + " kpl");
    $('#runkoPdf').html(koolaus_metrit_tulos + ' m');
    $("#plkiinnikehintaPdf").html(pintalautakiinnikkeet);
    $("#pkkiinnikehintaPdf").html(palkkikenkakiinnikkeet + ulkokehakiinnikkeet);
}

/**
 *
 * IE ei pÃ¤ivitÃ¤ inputtia entteristÃ¤
 * joten pitÃ¤Ã¤ tehdÃ¤ toiminnolle oma funktio
 *
 **/
function ieInputHandler(that) {

    var side = that.id;

    if (side == 'top' || side == 'bottom') {
        inputWidth(that);
    }
    if (side == 'left' || side == 'right' || side == 'bottomright' || side == 'bottomleft') {
        inputHeight(that);
    }

}

function inputHeight(that) {

    if ($(that).val() == '' || $(that).val() == 0)
        return; // estetÃ¤Ã¤n tyhjÃ¤ input -> muuten pituus on 0 -> sÃ¤Ã¤dettÃ¤vÃ¤ boksi katoaa

    var size = $(that).val().replace(',', '.').replace('m', '');
    var newSize = size * 100 * skaalaus; // otetaan syÃ¶tetty arvo talteen
    var thatName = $(that).attr('id');

    $(that).val('').focus().blur();

    that = $(that).parent(); // muutetaan selector parenttiin (sitÃ¤hÃ¤n muokataan)

    $(that).css({
        'height': newSize
    });

    var aB = $(paper).position().top + $(paper).height(); // alustan alareuna
    var bB = 0;

    $(paper).find('.box').each(function(index) {
        bB = $(this).offset().top + $(this).height();
    });

    if (thatName == 'left' && bB > aB ||
            thatName == 'right' && bB > aB ||
            thatName == 'bottomright' && bB > aB ||
            thatName == 'bottomleft' && bB > aB
            ) { // jos muokataan ylemmÃ¤n laatikon vasenta tai oikeaa reunaa ja menee yli
        var overlap = bB - aB;

        alert('Annettu arvo ylitti piirtoalueen rajan, palautetaan...');

        size = '10'; // palautetaan tuo inputtikin

        $(that).css({
            'height': $(that).height() - overlap
        });
        $(that).attr('value', $(that).val());

    }


    laskeKoolaus();
    laskePintaLaudat();
    laskeTarvikkeet();

    if (koolaus_aktiivinen == true)
        piirraKoolaus($(paper).find('.box'));
    else
        piirraLankut();

    paivitaInput(thatName, size);
}
function inputWidth(that) {

    if ($(that).val() == '' || $(that).val() == 0)
        return; // estetÃ¤Ã¤n tyhjÃ¤ input -> muuten pituus on 0 -> sÃ¤Ã¤dettÃ¤vÃ¤ boksi katoaa

    var size = $(that).val().replace(',', '.').replace('m', '');
    var newSize = size * 100 * skaalaus; // otetaan syÃ¶tetty arvo talteen
    var thatName = $(that).attr('id');

    $(that).val('').focus().blur();

    that = $(that).parent(); // muutetaan selector parenttiin (sitÃ¤hÃ¤n muokataan)

    $(that).css({
        'width': newSize
    });

    var aR = $(paper).position().left + $(paper).width(); // alustan alareuna
    var bR = 0;

    $(paper).find('.box').each(function(index) {
        if ($(this).offset().left + $(this).width() > bR)
            bR = $(this).offset().left + $(this).width();
    });

    // pitÃ¤Ã¤ tarkistaa ettÃ¤ L- eikÃ¤ T-muodoissa alempi boksi ole isompi kuin ylempi
    if ($(paper).find('.box2').width() > $(paper).find('.box1').width()) {
        alert('Alemman osuuden tulee olla pienempi kuin ylemmÃ¤n, palautetaan...');
        $(paper).find('.box2').css({
            'width': $(paper).find('.box1').width()
        });
    }

    if (thatName == 'top' && bR > aR || thatName == 'bottom' && bR > aR) { // jos muokataan ylemmÃ¤n laatikon vasenta tai oikeaa reunaa ja menee yli
        var overlap = bR - aR;

        alert('Annettu arvo ylitti piirtoalueen rajan, palautetaan...');

        size = '10'; // palautetaan tuo inputtikin

        $(that).css({
            'width': $(that).width() - overlap
        });
        $(that).attr('value', $(that).val());
    }

    // jos t-deck keskitetÃ¤Ã¤n inputit
    if (aktiivinen == 'l') {
        var ww = $('#left').width() / 2;
        var hh = $('#left').height() / 2;

        var b1w = $('.box1')[0].getBoundingClientRect().width;
        var b1h = $('.box1')[0].getBoundingClientRect().height;
        var b2w = $('.box2')[0].getBoundingClientRect().width;

        $('#middlebottom').css({
            'left': b1w - ((b1w - b2w) / 2) - ww,
            'top': b1h - hh
        });
    }
    // jos t-deck palautetaan alempi palikka keskelle ja keskitetÃ¤Ã¤n inputit
    if (aktiivinen == 't') {
        var b1w = $('.box1')[0].getBoundingClientRect().width;
        var b2w = $('.box2')[0].getBoundingClientRect().width;

        if (b2w > b1w)
            b2w = b1w;

        $('.box2').css({
            'margin-left': b1w / 2 - (b2w / 2),
            'max-width': b1w
        });
    }

    laskeKoolaus();
    laskePintaLaudat();
    laskeTarvikkeet();

    if (koolaus_aktiivinen == true)
        piirraKoolaus($(paper).find('.box'));
    else
        piirraLankut();

    paivitaInput(thatName, size);
}

// tÃ¤mÃ¤ funktio pÃ¤ivittÃ¤Ã¤ input fieldeissÃ¤ olevat arvot
// kun kokoa on muutettu niiden avulla
function paivitaInput(side, size) {

    // tarkistetaan oliko annettu arvo esim 7 vai 7.0
    // jos oli 7 -> lisÃ¤tÃ¤Ã¤n .0 perÃ¤Ã¤n
    // varmaan pelkkÃ¤ "oliko pilkku / oliko piste" tarkistus menettelee
    if (size.indexOf('.') === -1 && size.indexOf(',')) // -> ei ollut pilkkua eikÃ¤ pistettÃ¤
        size = size + '.0';

    size = (parseFloat(size)).toFixed(inputDesimaalit);
    // jos siinÃ¤ olikin pilkku tai piste eli oli vaikka (7.0) niin yllÃ¤ oleva ei toteutunut
    // elikkÃ¤ siinÃ¤ ei ole m-merkkiÃ¤ (se poistetaan inputWidth/inputHeight funktiossa)
    size += ' m'; // voidaan hyvinmielen ihan vaan pistÃ¤Ã¤ se m-merkki perÃ¤Ã¤n

    // tuo size parametri on nyt se mikÃ¤ halutaan syÃ¶ttÃ¤Ã¤ takaisin placeholderiin

    // parasta varmaan tehdÃ¤ jokaiselle muodolle omat pÃ¤ivitykset, koska esim
    // T-muodossa #top-pÃ¤ivitys ei saa vaikuttaa #bottomiin
    // toisin kuin square muodossa (ehkÃ¤ vÃ¤hÃ¤n pidempi tapa, mutta eipÃ¤hÃ¤n pitÃ¤isi tulla bugeja)

    if (aktiivinen == 's') {
        if (side == 'left' || side == 'right') {
            $(document).find('#left').attr('placeholder', size).val("").focus().blur();
            $(document).find('#right').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'top' || side == 'bottom') {
            $(document).find('#top').attr('placeholder', size).val("").focus().blur();
            $(document).find('#bottom').attr('placeholder', size).val("").focus().blur();
        }
    }
    if (aktiivinen == 'l') {
        if (side == 'top') {
            $(document).find('#top').attr('placeholder', size).val("").focus().blur();
            //pitÃ¤Ã¤ pÃ¤ivittÃ¤Ã¤ myÃ¶s middlebottom
        }
        if (side == 'right') {
            $(document).find('#right').attr('placeholder', size).val("").focus().blur();
            // halutaan myÃ¶s pÃ¤ivittÃ¤Ã¤ vasen rauna eli koko korkeus
            $(document).find('#left').attr('placeholder', (realSize($(paper).find('.box1').height()) + realSize($(paper).find('.box2').height())).toFixed(1) + ' m');
        }
        if (side == 'bottomright') {
            $(document).find('#bottomright').attr('placeholder', size).val("").focus().blur();
            // halutaan myÃ¶s pÃ¤ivittÃ¤Ã¤ vasen rauna eli koko korkeus
            $(document).find('#left').attr('placeholder', (realSize($(paper).find('.box1').height()) + realSize($(paper).find('.box2').height())).toFixed(1) + ' m');
        }
        if (side == 'bottom') {
            $(document).find('#bottom').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'top' || side == 'bottom') {
            $(document).find('#middlebottom').attr('placeholder', (realSize($(paper).find('.box1').width()) - realSize($(paper).find('.box2').width())).toFixed(1) + ' m');
        }
        // tyhmÃ¤sti suunniteltu -> pitÃ¤Ã¤ L-muodon middlebottom-inputin paikka laskea uudelleen -.-
        // tÃ¤tÃ¤ tuskin tarvitsee myÃ¶hemmin muokata -> jatketaan samaan malliin ja kirjoitetaan epÃ¤selvÃ¤Ã¤ koodia
        $(paper).find('#left').css({
            'top': ($(paper).find('.box1').height() + $(paper).find('.box2').height()) / 2 - $(paper).find('#left').height() / 2
        });
        $(paper).find('#middlebottom').css({
            'left': $(paper).find('.box2').width() + ($(paper).find('.box1').width() - $(paper).find('.box2').width()) / 2 - $(paper).find('#left').width() / 2,
            'top': $(paper).find('.box1').height() + 10
        });
    }
    if (aktiivinen == 't') {
        if (side == 'top') {
            $(document).find('#top').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'left' || side == 'right') {
            $(document).find('#left').attr('placeholder', size).val("").focus().blur();
            $(document).find('#right').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'bottomleft' || side == 'bottomright') {
            $(document).find('#bottomleft').attr('placeholder', size).val("").focus().blur();
            $(document).find('#bottomright').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'bottom') {
            $(document).find('#bottom').attr('placeholder', size).val("").focus().blur();
        }
        if (side == 'top' || side == 'bottom') {
            // pitÃ¤Ã¤ laskea ylemmÃ¤n ja alemman boksin vÃ¤linen jutska
            $(document).find('#bleft').attr('placeholder', ((realSize($(paper).find('.box1').width()) - realSize($(paper).find('.box2').width())) / 2).toFixed(1) + ' m');
            $(document).find('#bright').attr('placeholder', ((realSize($(paper).find('.box1').width()) - realSize($(paper).find('.box2').width())) / 2).toFixed(1) + ' m');
        }
    }
}

function piirraLankut() {

    koolaus_aktiivinen = false;

    $(paper).find('.box').each(function() {
        $(this).css({'background-color': lankun_vari});

        if (pintalaudan_leveys == 0.095) {
            $(this).css({
                'background-size': '9px 9px',
                'background-image': '-webkit-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                'background-image': '-moz-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':  '-ms-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':   '-o-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':      'linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)'
            });
        }
        if (pintalaudan_leveys == 0.120) {
            $(this).css({
                'background-size': '12px 12px',
                'background-image': '-webkit-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                'background-image': '-moz-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':  '-ms-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':   '-o-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':      'linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)'
            });
        }
        if (pintalaudan_leveys == 0.145) {
            $(this).css({
                'background-size': '14px 14px',
                'background-image': '-webkit-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                'background-image': '-moz-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':  '-ms-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':   '-o-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':      'linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)'
            });
        }
        if (pintalaudan_leveys == 0.220) {
            $(this).css({
                'background-size': '18px 18px',
                'background-image': '-webkit-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                'background-image': '-moz-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':  '-ms-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':   '-o-linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)',
                        'background-image':      'linear-gradient(left, transparent 94%, rgba(255, 255, 255, .75) 50%)'
            });
        }
    });

    $(paper).find('.box').each(function() {
        $(this).find('.koolausPuu').remove();
        $(this).find('.tolppa').remove();
    });


    $(paper).find('.koolaus_nappi').css({
        'background-image': 'url(kuvat/aktivoi_koolaus.svg)',
        'border': 'none'
    });
}

var ehdotaLaudanPituutta = function() {

    var pituus = 0;
    var ehdotus = undefined; // sisÃ¤ltÃ¤Ã¤ ehdotetun laudan pituuden

    // Vain neliÃ¶n-muotoiselle terassille
    //if(aktiivinen == 's'){

    // STEP 1: otetaan ylÃ¶s laudan pituus (huomioidaan onko leveys vai korkeus suunnassa vain tÃ¤ssÃ¤)
    if ($(paper).find('.lankkuVaaka').length >= 1)
        pituus = $(paper).find('.box').width();
    else if ($(paper).find('.lankkuPysty').length >= 1)
        pituus = $(paper).find('.box').height();

    // muutetaan pituus metreiksi
    pituus = realSize(pituus);

    if (pituus < 3.6)
        ehdotus = 3.6;
    if (pituus > 3.6 && pituus <= 3.9)
        ehdotus = 3.9;
    if (pituus > 3.9 && pituus <= 4.2)
        ehdotus = 4.2;
    if (pituus > 4.2 && pituus <= 4.5)
        ehdotus = 4.5;
    if (pituus > 4.5 && pituus <= 4.8)
        ehdotus = 4.8;
    if (pituus > 4.8)
        ehdotus = 5.1;

    if (pituus !== undefined)
        return ehdotus;

    //}

}

$(document).unbind().on('click', '.suunta_nappi', function() {

    if ($(paper).find('.lankkuVaaka').length >= 1) {
        $(paper).find('.lankkuVaaka').each(function() {
            $(this).addClass('lankkuPysty').removeClass('lankkuVaaka');
        });
    }
    else if ($(paper).find('.lankkuPysty').length >= 1) {
        $(paper).find('.lankkuPysty').each(function() {
            $(this).addClass('lankkuVaaka').removeClass('lankkuPysty');
        });
    }

    laskePintaLaudat();
    laskeKoolaus();
    laskeTarvikkeet();

    if (koolaus_aktiivinen == true)
        piirraKoolaus($(paper).find('.box'));
    else
        piirraLankut();

});

$(document).on('click', '.koolaus_nappi', function() {

    if (koolaus_aktiivinen == true) {
        koolaus_aktiivinen = false;
        piirraLankut();
    } else {
        koolaus_aktiivinen = true;
        piirraKoolaus($(paper).find('.box'));
    }

});

function createCookie() {

    Cookies.remove("name");

    var thisHtml = $('body').html();
    thisHtml = '"' + thisHtml + '"';

    Cookies.set('name', thisHtml, {path: "/", expires: 30});

}

function Tyhjenna() {
    $('.piirtoAlusta').html('');
}

/* PIILOTETTAVAT VALINTA-IKKUNAT */
function ValintaIkkunaNakyma(valinta) {

    var wW = window.innerWidth;
    var wH = window.innerHeight;
    if (document.documentElement.clientWidth < 1180) {
    $(".tarviketiedot").css({"display": "none"});
}
    /* Omat hinnat-valinta
     * Kun omat hinnat- nappia painetaan, avautuu valintaikkuna
     * */
    if (valinta == 'hinta') {

        $('.valintaIkkuna').show();
       console.log("test");


        // Haetaan tiedot cookieista, jos niitä on
        if (document.cookie !== 0) {

            $("#lautahinta").val(getCookie("lautahinta"));
            $("#runkohinta").val(getCookie("runkohinta"));
            $("#kiinnikehinta").val(getCookie("kiinnikehinta"));
            $("#palkkikenkahinta").val(getCookie("palkkikenkahinta"));
            $("#plkiinnikehinta").val(getCookie("plkiinnikehinta"));
            $("#pkkiinnikehinta").val(getCookie("pkkiinnikehinta"));
        }
        laskeTarvikkeet();
// onchange-kuuntelijat, eli aina kun inputien arvoa muutetaan, lasketaan uudestaan hinnat
        $('#lautahinta').on('change', function() {
            laskeTarvikkeet();
            cook($("#lautahinta").val());
        });

        $('#runkohinta').on('change', function() {
            laskeTarvikkeet();
        });

        $('#plkiinnikehinta').on('change', function() {
            laskeTarvikkeet();
        });

        $('#pkkiinnikehinta').on('change', function() {
            laskeTarvikkeet();
        });

        $('#palkkikenkahinta').on('change', function() {
            laskeTarvikkeet();
        });

        // Piilotettavat infotekstit
        $('#info_kuva5').hover(function() {
            $('#info_teksti5').toggle();
        });

        $('#info_kuva7').hover(function() {
            $('#info_teksti7').toggle();
        });

        //Sulje-nappi
        $('.sulje').on('click', function() {
            $('.valintaIkkuna').hide();
        });
    }   /* Ohje-valinta */
    else if (valinta == 'ohje') {
        $('.valintaIkkuna').show();
        // HTML-osuus
        $('.valintaIkkuna').html('<div class="sulje"><img src="kuvat/logo_exit.svg" height="99%" alt="sulje" /></div>\n\
        <div class="kayttoohje"><h2 style="margin: 20px 0 -20% 30px">K&auml;ytt&ouml;ohje</h2><div class="ohjeteksti">\n\
        <p>Voit muuttaa terassin kokoa vet&auml;m&auml;ll&auml; terassia reunoista tai sy&ouml;tt&auml;m&auml;ll&auml; leveyden ja pituuden sy&ouml;tt&ouml;laatikoihin.\n\
         Valitse lauta ja runko-valikosta voit valita laudan v&auml;rin ja leveyden, lautojen v&auml;liin j&auml;&auml;v&auml;n raon, laudan pituuden sek&auml; runkoratkaisun.\n\
         Perustusvaraiseen runkoon tulee pystytolpat, maavaraiseen ei.\n\
         Valitse terassin muoto Valitse muoto-valikosta. Tarjolla on kolme eri muotoa.\n\
        Sy&ouml;t&auml; hinnat-valikosta voit laskea, kuinka paljon terassin hinnaksi tulee.</p></div></div>');

        // Sulje-nappi
        $('.sulje').on('click', function() {
            $('.valintaIkkuna').hide();
        });

    }
    /* Muoto-valinta */
    else if (valinta == 'muoto') {
        $('.valintaIkkuna').show();
        // HTML-osuus, muotojen kuvat
        $('.valintaIkkuna').html('<div class="sulje"><img src="kuvat/logo_exit.svg" height="99%" alt="sulje" /></div>\n\
        <div class="terassinMuotoValinta"><h2 style="margin: 20px 0 -20% 30px">Valitse muoto</h2><div class="SquareDeckC"><img src="kuvat/muoto_nelio.svg" /></div>\n\
        <div class="lDeckC"><img src="kuvat/muoto_l.svg" /></div>\n\
        <div class="tDeckC"><img src="kuvat/muoto_t.svg" /></div></div>');
        $('.terassinMuotoValinta').children().css({'height': wH * 0.7 * 0.24});
        $('.angleDeckCImage1').css({'width': Math.ceil(wH * 0.7 * 0.6 * 0.24 * 0.5)});
        $('.angleDeckCImage2').css({'border-width': Math.ceil(wH * 0.7 * 0.6 * 0.24 * 0.5) + ' 0 ' + ' 0 ' + Math.ceil(wH * 0.7 * 0.6 * 0.24 * 0.5)});
        $('.angleDeckCImage3').css({'width': Math.ceil(wH * 0.7 * 0.6 * 0.24)});
        $('.angleDeckCImageContainer').css({'width': $('.angleDeckCImage3').width()});

        // Kun neliönmuotoinen terassi valitaan...
        $('.SquareDeckC').on('click', function() {
            $('.valintaIkkuna').hide();
            squareDeck();
            // poistetaan koolaus_aktiivinen, jotta aloitetaan laudoitus nÃ¤kymÃ¤stÃ¤ (luultavasti haluttava kÃ¤yttÃ¤ytyminen)
            koolaus_aktiivinen = false;
            // tÃ¤ytyypi pÃ¤ivittÃ¤Ã¤ myÃ¶s laskut, eli
            laskeKoolaus();
            laskePintaLaudat();
            laskeTarvikkeet();
            piirraLankut();
        });

        // Kun L:n muotoinen terassi valitaan...
        $('.lDeckC').on('click', function() {
            $('.valintaIkkuna').hide();
            lDeck();

            koolaus_aktiivinen = false;

            laskeKoolaus();
            laskePintaLaudat();
            laskeTarvikkeet();
            piirraLankut();
        });

        // Kun T:n muotoinen terassi valitaan...
        $('.tDeckC').on('click', function() {
            $('.valintaIkkuna').hide();
            tDeck();

            koolaus_aktiivinen = false;

            laskeKoolaus();
            laskePintaLaudat();
            laskeTarvikkeet();
            piirraLankut();
        });

        // Sulje-nappi
        $('.sulje').on('click', function() {
            $('.valintaIkkuna').hide();
        });


        /* Laudan valinta */
    } else if (valinta == 'lauta') {
        $('.valintaIkkuna').show();

        // jotta ei chekata maavaraista ratkaisua aina kun avataan valintaikkuna
        var onkoMaaChecked = '';
        var onkoRunkoChecked = '';

        if (runkoratkaisu == 'maa')
            onkoMaaChecked = 'checked';
        if (runkoratkaisu == 'perustus')
            onkoRunkoChecked = 'checked';

            // Lauta-valinnan HTML-osuus
        $('.valintaIkkuna').html('<div id="lautaModal" style=" z-index: 11111111111;" class="modal fade" role="dialog">\n\
        <div class="modal-dialog" style="width:70%;background: white; ">\n\
              <div class="modal-content"><div class="modal-header"><a class="sulje" data-dismiss="modal"><img src="kuvat/logo_exit.svg" alt="sulje" /></a></div>\n\
<div class="modal-body"><div class="lautaValinta"><h2 style="margin: 20px 0 -100px 30px">Lauta ja runko</h2><div class="vari"><strong>V&auml;ri</strong></div><div class="brown" onclick="cook(' + brown + ')" value="brown"><img src="kuvat/lauta_r.svg" /></div>\n\
<div class="green" onclick="cook(' + green + ')"><img src="kuvat/lauta_v.svg" /></div></div>\n\
<div class="laudanLeveys"><span class="valintaOtsikko laudanLeveysValinta">Laudan leveys</span><div id="info_kuva3"><img src="kuvat/info.gif" alt="info" /></div>\n\
<select onchange="cook(this)" id="leveys" name="mitta"><option value="0.095">95 mm</option><option value="0.120">120 mm</option><option value="0.145">145 mm</option><option value="0.220">220 mm</option></select>\n\
<div id="info_teksti3" class="info">220 mm lauta on Kuohu-lautaa. Laudan leveys vaikuttaa laudan metrim&auml;&auml;r&auml;&auml;n.</div></div>\n\
<div class="rako"><span class="valintaOtsikko rakoValinta">Rako</span><div id="info_kuva4"><img src="kuvat/info.gif" alt="info" /></div>\n\
<select onchange="cook(this)" id="rako" name="rako"><option value="0.001">1 mm</option><option selected value="0.003">3 mm</option><option value="0.005">5 mm</option></select>\n\
<div id="info_teksti4" class="info">Lautojen v&auml;liin tuleva rako. Huomioi laudan kutistuminen!</div></div>\n\
<div class="laudanpituus"><span class="valintaOtsikko laudanPituusValinta">Laudan pituus</span>\n\
<select onchange="cook(this)" id="pituus"><option value="3.9">3,9 m</option><option value="4.2">4,2 m</option><option value="4.5">4,5 m</option><option value="4.8">4,8 m</option><option value="5.1">5,1 m</option></select>\n\
<div id="info_kuva2"><img src="kuvat/info.gif" alt="info" /></div><div id="info_teksti2" class="info">Laudan pituus m&auml;&auml;r&auml;&auml; lautojen kappalem&auml;&auml;r&auml;n</div></div>\n\
<div class="runkoratkaisu"><h2><strong>Runkoratkaisu</strong></h2><input onclick="cook( per1 )" type="radio" ' + onkoMaaChecked + ' name="runkoratkaisu" value="maa" /> Maavarainen  <br />\n\
<input onclick="cook(per2)" type="radio" ' + onkoRunkoChecked + ' name="runkoratkaisu" value="perustus" /> Perustusvarainen </div></div></div></div>');

        // Katsotaan, onko cookieita jo olemassa ja asetetaan arvot inputteihin
        if (getCookie("leveys") !== "") {
            $("#leveys").val(getCookie("leveys"));
        }
        else {
            $("#leveys").val("0.120");
        }
        if (getCookie("rako") !== "") {
            $("#rako").val(getCookie("rako"));
        }
        if (getCookie("pituus") !== "") {
            $("#pituus").val(getCookie("pituus"));
        }
        else {
            $("#pituus").val("4.5");
        }

        $('.lautaValinta').children().css({'height': 750 * 0.7 * 0.24});

        // Väri-valinnan klikkaus
        // Ruskea
        $('.brown').on('click', function() {
            lankun_vari = '#a1754a';
            $('.color').find('.triangle1').css('border-color', 'white white transparent #916F3F');
            $('.piirtoAlusta').find('.colorbox').css('background', '#916F3F');
            $('.brown img').css('border', '#8da05e solid thick');
            $('.green img').css('border', 'none');
            piirraLankut();
        });
        // Vihreä
        $('.green').on('click', function() {
            lankun_vari = '#8da05e';
            $('.color').find('.triangle1').css('border-color', 'white white transparent #E0D0A8');
            $('.piirtoAlusta').find('.colorbox').css('background', '#E0D0A8');
            $('.brown img').css('border', 'none');
            $('.green img').css('border', '#916F3F solid thick');
            piirraLankut();
        });

        // Kun leveys-valintaa painaa...
        $('#leveys').change(function() {
            // otetaan ylÃ¶s uusi leveys ja kÃ¤ydÃ¤Ã¤n laskemalla uudet kansilaudat
            pintalaudan_leveys = parseFloat($(this).val()); // arvo ylÃ¶s
            laskePintaLaudat(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet pintalauda
            laskeKoolaus(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet koolauspuut
            laskeTarvikkeet();
            //lautamaara();
            if (koolaus_aktiivinen == true)
                piirraKoolaus($(paper).find('.box'));
            else
                piirraLankut();
        });

        // Kun rako-valintaa painaa...
        $('#rako').change(function() {
            // otetaan ylÃ¶s uusi leveys ja kÃ¤ydÃ¤Ã¤n laskemalla uudet kansilaudat
            pintalaudan_rako = parseFloat($(this).val()); // arvo ylÃ¶s
            laskePintaLaudat(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet arvot
            laskeTarvikkeet();
        });

        // Kun pituus-valintaa painaa...
        $('#pituus').change(function() {
            // otetaan ylÃ¶s uusi leveys ja kÃ¤ydÃ¤Ã¤n laskemalla uudet kansilaudat
            laudanpituus = parseFloat($(this).val()); // arvo ylÃ¶s
            laskePintaLaudat(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet pintalauda
            laskeKoolaus(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet koolauspuut
            laskeTarvikkeet();
            if (koolaus_aktiivinen == true)
                piirraKoolaus($(paper).find('.box'));
        });

        // Kun vaihdetaan runkoratkaisua
        $('input[type=radio][name=runkoratkaisu]').change(function() {
            runkoratkaisu = this.value; // piirraKoolaus() funktio piirtaa/ei piirra tolppia riippuen onko perustus vai maavarainen
            laskeKoolaus(); // kÃ¤vÃ¤stÃ¤Ã¤n funktiossa laskemassa uudet koolauspuut
            laskeTarvikkeet();
            if (koolaus_aktiivinen == true)
                piirraKoolaus($(paper).find('.box'));
        });

        // Sulje-nappi
        $('.sulje').on('click', function() {
            $('.valintaIkkuna').hide();
        });

        // Info-boksit
        $('#info_kuva2').hover(function() {
            $('#info_teksti2').toggle();
        });
        $('#info_kuva3').hover(function() {
            $('#info_teksti3').toggle();
        });
        $('#info_kuva4').hover(function() {
            $('#info_teksti4').toggle();
        });
    }

}

/* CLICK LISTENERS */

$(function() {

    $('.tyhjenna').on('click', function() {
        Tyhjenna();
    });
    $('.muoto').on('click', function() {
        ValintaIkkunaNakyma('muoto');
    });
    $('.ohje').on('click', function() {
        ValintaIkkunaNakyma('ohje');
    });
    $('.lauta').on('click', function() {
        ValintaIkkunaNakyma('lauta');
    });
    $('.hinnat').on('click', function() {
        ValintaIkkunaNakyma('hinta');
    });
    $('.englanti').on('click', function() {
        inEnglish();
    });
    $('.suomi').on('click', function() {
        inFinnish();
    });

    $(".tarvikkeet").click(function () {
        if (document.documentElement.clientWidth < 1180) {
            $('.valintaIkkuna').hide();
            $(".tarviketiedot").css({"display": "block", "padding": "20px", "position": "absolute", "margin-left": "20%", "margin-top": "90px",
                "z-index": "1111111111111", "background": "#fbfae8", "-webkit-box-shadow": "0px 0px 30px 0px rgba(51,51,51,1)",
"-moz-box-shadow": "0px 0px 30px 0px rgba(51,51,51,1)",
"box-shadow": "0px 0px 30px 0px rgba(51,51,51,1)"});
        }
        });

    // Infoboksit
    $('#info_kuva').hover(function() {
        $('#info_teksti').toggle();
    });
    $('#info_kuva6').hover(function() {
        $('#info_teksti6').toggle();
    });

    $('.close').click(function() {
        $('.footer').hide();
    });


    $('.suunta_nappi').on('mouseover', function() {
        $('.suunta_info').css('display','block');
    }).on('mouseleave', function() {
        $('.suunta_info').css('display','none');
    });
    $('.koolaus_nappi').on('mouseover', function() {
        $('.koolaus_info').css('display','block');
    }).on('mouseleave', function() {
        $('.koolaus_info').css('display','none');
    });

$('.mobile').on('click', function() {
        $('.tarviketiedot').hide();
    });
});
