"use strict";
var Abgabe;
(function (Abgabe) {
    function createArtikel() {
        for (let i = 0; i < Abgabe.artikel.length; i++) {
            if (Abgabe.artikel[i].category == 1) {
                let newDiv = document.createElement("div");
                newDiv.id = "div" + i;
                document.getElementById("flex1")?.appendChild(newDiv);
                newDiv.setAttribute("index", i.toString());
            }
            //IMG
            let imgElement = document.createElement("img");
            imgElement.src = Abgabe.artikel[i].img;
            document.getElementById("div" + i)?.appendChild(imgElement);
            //NAME
            let name = document.createElement("p");
            name.innerHTML = Abgabe.artikel[i].name;
            document.getElementById("div" + i)?.appendChild(name);
            //PREIS
            let price = document.createElement("p");
            price.innerHTML = Abgabe.artikel[i].preis + "€";
            document.getElementById("div" + i)?.appendChild(price);
            //BUY
            let kaufen = document.createElement("button");
            kaufen.innerHTML = "Kaufen";
            kaufen.addEventListener("click", handleTrolley);
            document.getElementById("div" + i)?.appendChild(kaufen);
            kaufen.setAttribute("preis", Abgabe.artikel[i].preis.toString());
        }
    }
    Abgabe.createArtikel = createArtikel;
    //Einkaufswagen
    let summe = 0;
    let count = 0;
    let artikelCounter = 0;
    let blasenDiv = document.createElement("div");
    let cartArtikel = [];
    function handleTrolley(_event) {
        if (artikelCounter >= 0) {
            document.getElementById("warencounter")?.appendChild(blasenDiv);
        }
        artikelCounter++;
        blasenDiv.innerHTML = artikelCounter + "";
        if (_event.currentTarget?.getAttribute("preis")) {
            summe = count + parseInt(_event.currentTarget?.getAttribute("preis"));
            count = summe;
        }
        console.log(summe.toFixed(0));
        let indexButton = _event.currentTarget.parentElement.getAttribute("index");
        let indexNr = parseInt(indexButton);
        cartArtikel.push(Abgabe.artikel[indexNr]);
        localStorage.setItem("artikel_bild" + (cartArtikel.length - 1), Abgabe.artikel[indexNr].img);
        localStorage.setItem("artikel_name" + (cartArtikel.length - 1), Abgabe.artikel[indexNr].name);
        localStorage.setItem("artikel_preis" + (cartArtikel.length - 1), Abgabe.artikel[indexNr].preis.toString());
        localStorage.setItem("anzahlArtikel", cartArtikel.length.toString());
        document.getElementById("flexCart").innerHTML = "";
        createStore();
    }
    Abgabe.handleTrolley = handleTrolley;
    function createStore() {
        let length = parseInt(localStorage.getItem("anzahlArtikel"));
        for (let index = 0; index <= length - 1; index++) {
            //Div erstellen
            let newDiv = document.createElement("div");
            document.getElementById("flexCart").appendChild(newDiv);
            newDiv.id = "anidiv" + index;
            //IMG
            let imgElement = document.createElement("img");
            imgElement.src = localStorage.getItem("artikel_bild" + index);
            newDiv.appendChild(imgElement);
            console.log(imgElement);
        }
    }
    let delButton = document.getElementById("delButton");
    delButton.addEventListener("click", handleReset);
    function handleReset(_event) {
        localStorage.clear();
        location.reload();
    }
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script.js.map