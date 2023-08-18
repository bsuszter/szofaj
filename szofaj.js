mondatok = [
    ["Rajzolnak ezek a fiúk holnap", "."],
    ["Süt három pék", "?"],
    ["Köröznek a piros autók", "."]
]

megoldások = [
    ["névmás", "névelő", "főnév", "határozószó", "ige"],
    ["számnév", "főnév"],
    ["melléknév", "főnév", "ige"],

]

document.getElementById("ellenőrzés").style.display = "none";
document.getElementById("ujGomb").style.display = "none";
document.getElementById("ujra").style.display = "none";
document.getElementById("szóelemgomb_ablak").style.display = "none";


//a keverés a random.js-ben történik, onnan kapunk egy kevert tömböt 
//melyik mondat legyen a feladvány
var sorszam = 0;
var mondatsorszam = kever(mondatok);
var feladatokszama = mondatok.length;
console.log("kever: " + mondatsorszam);

// a tömb egy sorában lévő elemek száma (egytől kezdünk)
let szavak_szama = mondatok[mondatsorszam[sorszam]].length - 1;

function indit() {
    document.getElementById("szóelemgomb_ablak").style.display = "block";
    document.getElementById("ujGomb").style.display = "block";
    document.getElementById("ellenőrzés").style.display = "block";
    document.getElementById("inditas").style.display = "none";
    /* A feladvány kiíratása mondatként 
    a "mondatsorszam" előállít egy véletlenszerű számsort amiben annyi szám szerepel, ahány mondat van
    a "sorszam" a mondatsorszam random lista elemeit veszi sorba egyesével
    a mondatok[mondatsorszam[sorszam]][0] kiveszi a mondatok tömbből azt a mondatot, ami a véletlen listából következik, és annak az első elemét vagyis a mondatvégi írásjel nélküli mondatot kiíírja.
    */
    feladvany_szo.innerText = mondatok[mondatsorszam[sorszam]][0] + mondatok[mondatsorszam[sorszam]][1];
    /* A kiválasztott mondatokat szavakra bontja */
    const sajatTomb = mondatok[mondatsorszam[sorszam]][0].split(" ");
    console.log(sajatTomb)
    const tombHossz = sajatTomb.length;
    let szavak_szama = mondatok[mondatsorszam[sorszam]].length - 1;
    console.log("Tömbhossz:" + tombHossz);
    console.log(mondatok[mondatsorszam[sorszam]][0]);

    /* Éppen annyi elemet vesz ki a tömbből, ahány szót tartalmaz a mondat */
    for (let index = 0; index < tombHossz; index++) {
        console.log("Szó" + sajatTomb[index])
        console.log("Mo: " + megoldások[mondatsorszam[sorszam]][index])

        var blokk_beszuras_alap;
        var blokk_beszuras_szo;
        var blokk_beszuras_valasz;

        // div elem beszúrása
        blokk_beszuras_alap = document.createElement('div');
        blokk_beszuras_szo = document.createElement('div');
        blokk_beszuras_valasz = document.createElement('div');

        // szó elhelyezése az elemben
        container_block = document.getElementById('feladvány');

        container_block_alap = document.getElementById('válasz_alap' + (index));
        container_block.appendChild(blokk_beszuras_alap);
        blokk_beszuras_alap.setAttribute('id', 'válasz_alap' + (index));

        document.getElementById('válasz_alap' + (index)).appendChild(blokk_beszuras_szo);
        document.getElementById('válasz_alap' + (index)).appendChild(blokk_beszuras_valasz);


        //egyedi azonosító (id) hozzáadása
        blokk_beszuras_szo.setAttribute('id', 'szó' + (index + 1));
        blokk_beszuras_valasz.setAttribute('id', 'válasz' + (index + 1));
        blokk_beszuras_alap.setAttribute('class', 'alap');

        //osztály hozzáadása minden elemhez
        blokk_beszuras_szo.setAttribute('class', 'szó');
        blokk_beszuras_valasz.setAttribute('class', 'válasz');

        blokk_beszuras_szo.innerText = sajatTomb[index];

        // visszadobja a szót a helyére (ha javítani akar a játékos)
        $(".válasz").click(function () {
            //végignézi, hogy a tömbben megvan-e a szó, amit vissza szeretnék dobni
            for (let index = 1; index < tombHossz + 1; index++) {
                if (this.innerHTML != '') {

                    let mo = document.getElementById("válasz" + index);
                    let mo_id = document.getElementById("válasz" + index).id;

                    let dobozsorrend = document.getElementById("válasz" + index).innerHTML;

                    /*                                 //amikor visszadobnak egy szót, sötétlilára vált
                                                    if (dobozsorrend == '') {
                                                        mo.style.backgroundColor = "#542582"
                                                    }  */

                    //ha a dobozban van valami, akkor azt visszaküldi és sötétlilára vált
                    if (dobozsorrend == this.innerHTML) {
                        document.getElementById(mo_id).style.visibility = "visible";
                        this.innerHTML = "";
                        this.style.backgroundColor = "#542582";
                    }

                }

            }

            //végig kell nézni az összes üres dobozt, és mindet sötétlilára kell váltani
            for (let j = 1; j < tombHossz + 1; j++) {
                if (document.getElementById("válasz" + j).innerHTML == '') {
                    document.getElementById("válasz" + j).style.backgroundColor = "#542582";
                }
            }

            //végig kell nézni az összes üres dobozt alulról, és az elsőt plumra váltani, majd kiugrani a ciklusból
            for (let j = 1; j < tombHossz + 1; j++) {
                //amikor visszadobnak egy szót, a
                console.log(tombHossz, "válasz" + j)
                if (document.getElementById("válasz" + j).innerHTML == '') {
                    document.getElementById("válasz" + j).style.backgroundColor = "plum";
                    break;
                }
            }

        });

    }
    document.getElementById("válasz1").style.backgroundColor = "plum"

}

$(function () {

    //gombok állapota kezdetben nincs lenyomva
    let ige_lenyomás = false;
    let névszó_lenyomás = false;
    let névmás_lenyomás = false;
    let igenév_lenyomás = false;

    //szóelemek divjének lekérése id alapján
    let $ige_div = $('#ige');
    let $névszó_div = $('#névszó');
    let $névmás_div = $('#névmás');
    let $igenév_div = $('#igenév');
    let $viszonyszó_div = $('#viszonyszó');

    //választható szóelemek kezdetben elrejtve
    $ige_div.hide();
    $névszó_div.hide();
    $névmás_div.hide();
    $igenév_div.hide();
    $viszonyszó_div.hide();

    //gombok lekérdezése id alapján
    let $button_ige = $('#ige_btn');
    let $button_névszó = $('#névszó_btn');
    let $button_névmás = $('#névmás_btn');
    let $button_igenév = $('#igenév_btn');

    $("#slider_ige").click(function () {
        var checkbox = document.getElementById("chk_ige");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.show();
                $névszó_div.hide();
                $névmás_div.hide();
                $igenév_div.hide();
                $viszonyszó_div.hide();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_névszó").checked = false;
                document.getElementById("chk_névmás").checked = false;
                document.getElementById("chk_igenév").checked = false;
                document.getElementById("chk_viszonyszó").checked = false;
            } else {
                // do that
                $ige_div.hide();
            }
        });
    });

    $("#slider_névszó").click(function () {
        var checkbox = document.getElementById("chk_névszó");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.hide();
                $névszó_div.show();
                $névmás_div.hide();
                $igenév_div.hide();
                $viszonyszó_div.hide();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_ige").checked = false;
                document.getElementById("chk_névmás").checked = false;
                document.getElementById("chk_igenév").checked = false;
                document.getElementById("chk_viszonyszó").checked = false;
            } else {
                // do that
                $névszó_div.hide();
            }
        });
    });

    $("#slider_névmás").click(function () {
        var checkbox = document.getElementById("chk_névmás");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.hide();
                $névszó_div.hide();
                $névmás_div.show();
                $igenév_div.hide();
                $viszonyszó_div.hide();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_ige").checked = false;
                document.getElementById("chk_névszó").checked = false;
                document.getElementById("chk_igenév").checked = false;
                document.getElementById("chk_viszonyszó").checked = false;
            } else {
                // do that
                $névmás_div.hide();
            }
        });
    });

    $("#slider_igenév").click(function () {
        var checkbox = document.getElementById("chk_igenév");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.hide();
                $névszó_div.hide();
                $névmás_div.hide();
                $viszonyszó_div.hide();
                $igenév_div.show();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_ige").checked = false;
                document.getElementById("chk_névszó").checked = false;
                document.getElementById("chk_névmás").checked = false;
                document.getElementById("chk_viszonyszó").checked = false;
            } else {
                // do that
                $igenév_div.hide();
            }
        });
    });

    $("#slider_viszonyszó").click(function () {
        var checkbox = document.getElementById("chk_viszonyszó");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.hide();
                $névszó_div.hide();
                $névmás_div.hide();
                $igenév_div.hide();
                $viszonyszó_div.show();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_ige").checked = false;
                document.getElementById("chk_névszó").checked = false;
                document.getElementById("chk_névmás").checked = false;
                document.getElementById("chk_igenév").checked = false;
            } else {
                // do that
                $viszonyszó_div.hide();
            }
        });
    });
    //  szóelem osztályok lekérdezése
    let $szófaj_class = $('.szófaj');
    let $főnév_class = $('.főnév');
    let $névmás_class = $('.névmás');
    let $igenév_class = $('.igenév');



    //osztály alapján azonosított szóelemek tartalmának lekérése gombnyomásra
    //SZÓFAJ DOBOZOK
    $szófaj_class.click(function (event) {
        event.preventDefault();
        // a tömb egy sorában lévő elemek száma (egytől kezdünk)
        const sajatTomb = mondatok[mondatsorszam[sorszam]][0].split(" ");
        const szavak_szama = sajatTomb.length;
        console.log("szín", this.className)


        //végignézi a válaszdobozokat, és az első üresbe helyezi
        for (let index = 1; index < szavak_szama + 1; index++) {

            let mo = document.getElementById("válasz" + index);
            let dobozsorrend = document.getElementById("válasz" + index).innerHTML;


            //ha nem üres, akkor nem tesz ide semmit
            if (dobozsorrend != '') {
                //ha üres, akkor beteszi azt, amelyikre kattintottak, amire kattintottak, azt elrejti

            } else {

                mo.innerHTML = this.innerHTML;

                console.log(index, szavak_szama)
                if (index < szavak_szama && mo.innerHTML == '') {
                    document.getElementById("válasz" + (index + 1)).style.backgroundColor = "plum";
                }

                //szó beillesztésekor is meg kell keresni az aktuális dobozt, ami plum színű lesz
                for (let j = 1; j < szavak_szama + 1; j++) {
                    //amikor visszadobnak egy szót, a
                    if (document.getElementById("válasz" + j).innerHTML == '') {
                        document.getElementById("válasz" + j).style.backgroundColor = "plum";
                        break;
                    }
                }

                //document.getElementById("válasz"+ index + 1).style.backgroundColor = "plum";
                //ha igére vonatkozik (includes: tartalmazza azt az osztálynevet) a választott szóelem, akkor piros és így tovább
                if (this.className.includes("ige")) {
                    mo.style.backgroundColor = "red";
                    mo.style.color = "white"

                }
                if (this.className.includes("főnév")) {
                    mo.style.backgroundColor = "blue";
                    mo.style.color = "white"
                }

                if (this.className.includes("melléknév")) {
                    mo.style.backgroundColor = "greenyellow";
                    mo.style.color = "black";
                }

                if (this.className.includes("számnév")) {
                    mo.style.backgroundColor = "yellow";
                    mo.style.color = "black";
                }

                if (this.className.includes("határozószó")) {
                    mo.style.backgroundColor = "salmon";
                    mo.style.color = "black";
                }

                if (this.className.includes("névmás")) {
                    mo.style.backgroundColor = "peachpuff";
                    mo.style.color = "black";
                }

                if (this.className.includes("igenév")) {
                    mo.style.backgroundColor = "Turquoise";
                    mo.style.color = "black";
                }

                if (this.className.includes("viszonyszó")) {
                    mo.style.backgroundColor = "chocolate";
                    mo.style.color = "black";
                }
                //this.style.visibility = "hidden";
                break;
            }

        }

    });
});







let $ujfeladat = $('#ujGomb');
$ujfeladat.click(function (event) {

    const boxes1 = document.querySelectorAll('.szó');
    const boxes2 = document.querySelectorAll('.válasz');


    boxes1.forEach(box => {
        box.remove();
    });

    boxes2.forEach(box => {
        box.remove();
    });

    console.log(sorszam + 1, feladatokszama)
    if (sorszam + 1 >= feladatokszama) {
        console.log("bent vagyok")
        document.getElementById("ujGomb").style.display = "none";
        document.getElementById("inditas").style.display = "none";
        document.getElementById("ujra").style.display = "block";
    } else {
        sorszam += 1;
        indit();
    }


});

let $ujra = $('#ujra');
$ujra.click(function (event) {
    document.location.reload();
});
