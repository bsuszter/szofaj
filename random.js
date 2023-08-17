function kever(tombnev) {
    //shuffles array of numbers 0 to 8
    var szavaklong = tombnev.length;

    //document.getElementById("felso").innerHTML =  szavaklong +" / " + kerdesszam;

    const element_array = [];
    for (i = 0; i < szavaklong; i++) {
        element_array.push(i);
    }

    //első indításkor kialakítja a feladványok sorrendjét
    var i = 0;
    var buffer = 0;
    // 100-szor keveri meg - két szám felcserélésével
    for (i = 0; i < 100; i++) {
        //generates two random numbers, saves them as integers
        var first_location = Math.floor(Math.random() * szavaklong);
        var second_location = Math.floor(Math.random() * szavaklong);
        //saves the value in the randomly selected first location as buffer
        var buffer = element_array[first_location];
        //changes first location's value to second location's value
        element_array[first_location] = element_array[second_location];
        //changes second location's value to buffer value (original first location)
        element_array[second_location] = buffer;
        //presto, we now have 2 swapped numbers
    }

    var sorszam = 0;
    //console.log(element_array);
    return element_array;
}

//a mondaton belüli szavak megkeverése
function keverSzavak(szoSorszam) {
    //a mondaton belüli szavak száma
    var szavaklong = szavak[szoSorszam].length - 1;

    //document.getElementById("felso").innerHTML =  szavaklong +" / " + kerdesszam;

    //a 0. elem kihagyva
    const element_array2 = [];

    for (i = 1; i < szavaklong + 1; i++) {   //az első üres elemet figyelmen kívül hagyja
        if (szavak[szoSorszam][i] != " ") {
            element_array2.push(i);
        }

    }

    //első indításkor kialakítja a feladványok sorrendjét
    var i = 0;
    var buffer = 0;
    // 100-szor keveri meg - két szám felcserélésével
    for (i = 0; i < 100; i++) {
        //generates two random numbers, saves them as integers
        var first_location = Math.floor(Math.random() * szavaklong);
        var second_location = Math.floor(Math.random() * szavaklong);
        //saves the value in the randomly selected first location as buffer
        var buffer = element_array2[first_location];
        //changes first location's value to second location's value
        element_array2[first_location] = element_array2[second_location];
        //changes second location's value to buffer value (original first location)
        element_array2[second_location] = buffer;
        //presto, we now have 2 swapped numbers
    }

    var sorszam = 0;
    //console.log(element_array);
    return element_array2;
}

