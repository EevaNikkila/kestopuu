/* KAANNOKSET */
function inEnglish() {
    $('.lautavalintaotsikko > h1').html('Choose board and body');
    $('.muotovalintaotsikko > h1').html('Choose template');
    $('.tarvikkeet > h1').html('Material amount');
    $('.hinnat > h1').html('Insert own prices');
    $('.pintaala').find('h2').eq(0).html('Area');
    $('.metrimaara').find('h2').eq(0).html('Amount of board');
    $('.kplmaara').find('h2').eq(0).html('Pieces of board');
    $('.lautahinta').find('h2').eq(0).html('Price of board');
    $('.runkohinta').find('h2').eq(0).html('Price of body');
    $('.ruuvihinta').find('h2').eq(0).html('Price of screw');
    $('.palkkikenkahinta').find('h2').eq(0).html('Price of ');
    $('.lautahintatotal').find('h2').eq(0).html('Board');
    $('.runkohintatotal').find('h2').eq(0).html('Body');
    $('.ruuvihintatotal').find('h2').eq(0).html('Screws');
    $('.palkkikenkahintatotal').find('h2').eq(0).html('Palkkikengat');
    $('.runko').find('h2').eq(0).html('Amount of body');
    $('.laudanLeveysValinta').html('Board width');
    $('.laudanPituusValinta').html('Board length');
    $('.rakoValinta').html('Gap');
    $('.ruuvit').find('h2').eq(0).html('Amount of screws');
    $('.palkkikengat').find('h2').eq(0).html('Amount of ');
    $('.hintaotsikko').html('Total prices');
    $('.hintatotal').find('h2').eq(0).html('Grand Total');
}
function inFinnish() {
    $('.lautavalintaotsikko > h1').html('Lauta ja runko');
    $('.muotovalintaotsikko > h1').html('Muoto');
    $('.tarvikkeet > h1').html('Tarvikkeiden määrät');
    $('.hinnat > h1').html('Omat hinnat');
    $('.pintaala').find('h2').eq(0).html('Pinta-ala');
    $('.metrimaara').find('h2').eq(0).html('Laudan metrimäärä');
    $('.kplmaara').find('h2').eq(0).html('Laudan kappalemäärä');
    $('.lautahinta').find('h2').eq(0).html('Laudan metrihinta');
    $('.runkohinta').find('h2').eq(0).html('Rungon metrihinta');
    $('.ruuvihinta').find('h2').eq(0).html('Ruuvien kappalehinta');
    $('.palkkikenkahinta').find('h2').eq(0).html('Palkkikengän hinta');
    $('.lautahintatotal').find('h2').eq(0).html('Laudat');
    $('.runkohintatotal').find('h2').eq(0).html('Runkolaudat');
    $('.ruuvihintatotal').find('h2').eq(0).html('Ruuvit');
    $('.palkkikenkahintatotal').find('h2').eq(0).html('Palkkikengät');
    $('.runko').find('h2').eq(0).html('Rungon metrimäärä');
    $('.laudanLeveysValinta').html('Laudan leveys');
    $('.laudanPituusValinta').html('Laudan pituus');
    $('.rakoValinta').html('Rako');
    $('.ruuvit').find('h2').eq(0).html('Ruuvien lukumäärä');
    $('.palkkikengat').find('h2').eq(0).html('Palkkikenkien lukumäärä');
    $('.hintaotsikko').html('Kokonaishinnat');
}