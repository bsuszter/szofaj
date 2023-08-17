mondatok = [
    ["Rajzolnak ezek a fiúk holnap", "."],
    ["Süt három pék", "?"],
    ["Köröznek piros autók", "."]
]

megoldások = [
    ["névmás", "névelő", "főnév", "határozószó", "ige"],
    ["számnév", "főnév"],
    ["melléknév", "főnév", "ige"],

]

document.getElementById("ellenőrzés").style.display = "none";
document.getElementById("ujGomb").style.display = "none";
document.getElementById("ujra").style.display = "none";


//a keverés a random.js-ben történik, onnan kapunk egy kevert tömböt 
//melyik mondat legyen a feladvány
var sorszam = 0;
var mondatsorszam = kever(mondatok);
var feladatokszama = mondatok.length;
console.log("kever: " + mondatsorszam);

// a tömb egy sorában lévő elemek száma (egytől kezdünk)
let szavak_szama = mondatok[mondatsorszam[sorszam]].length - 1;

function indit() {
    document.getElementById("ujGomb").style.display = "block";
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
    let képző_lenyomás = false;
    let jel_lenyomás = false;
    let rag_lenyomás = false;

    //szóelemek divjének lekérése id alapján
    let $ige_div = $('#ige');
    let $képző_div = $('#képző');
    let $jel_div = $('#jel');
    let $rag_div = $('#rag');

    //választható szóelemek kezdetben elrejtve
    $ige_div.hide();
    $képző_div.hide();
    $jel_div.hide();
    $rag_div.hide();

    //gombok lekérdezése id alapján
    let $button_ige = $('#ige_btn');
    let $button_képző = $('#képző_btn');
    let $button_jel = $('#jel_btn');
    let $button_rag = $('#rag_btn');

    $("#slider_ige").click(function () {
        var checkbox = document.getElementById("chk_ige");

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                // minden panelt bezár kivéve az aktuálisat
                $ige_div.show();
                $képző_div.hide();
                $jel_div.hide();
                $rag_div.hide();
                // minden kapcsolót kikapcsol, kivéve az aktuálisat
                document.getElementById("chk_képző").checked = false;
                document.getElementById("chk_jel").checked = false;
                document.getElementById("chk_rag").checked = false;
            } else {
                // do that
                $ige_div.hide();
            }
        });
    });


    //  szóelem osztályok lekérdezése
    let $ige_class = $('.ige');
    let $képző_class = $('.képző');
    let $jel_class = $('.jel');
    let $rag_class = $('.rag');



    //osztály alapján azonosított szóelemek tartalmának lekérése gombnyomásra
    //IGE
    $ige_class.click(function (event) {
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
