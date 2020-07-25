"use strict";
var Abgabe;
(function (Abgabe) {
    let length = parseInt(localStorage.getItem("anzahlArtikel"));
    let preis = 0;
    let gesamtpreis = document.createElement("p");
    for (let index = 0; index <= length - 1; index++) {
        //Div erstellen
        let newDiv = document.createElement("div");
        document.getElementById("flexWarenkorb").appendChild(newDiv);
        newDiv.id = "div" + index;
        //IMG
        let imgElement = document.createElement("img");
        imgElement.src = localStorage.getItem("artikel_bild" + index);
        newDiv.appendChild(imgElement);
        let rname = document.createElement("p");
        rname.innerHTML = localStorage.getItem("artikel_name" + index);
        newDiv.appendChild(rname);
        //NAME
        let name = document.createElement("p");
        name.innerHTML = localStorage.getItem("artikel_name" + index);
        newDiv.appendChild(name);
        document.getElementById("givename").appendChild(name);
        //PREIS
        let price = document.createElement("p");
        price.innerHTML = localStorage.getItem("artikel_preis" + index) + "€";
        newDiv.setAttribute("preis", price.innerHTML);
        newDiv.appendChild(price);
        //Gesamtpreis berechnen
        preis = preis + parseFloat(price.innerHTML);
        gesamtpreis.innerHTML = "Gesamtpreis: " + preis.toFixed(0) + "€";
        document.getElementById("warenkorbWert")?.appendChild(gesamtpreis);
    }
    let delButton = document.getElementById("deleteButton");
    delButton.addEventListener("click", handleDeleteAll);
    function handleDeleteAll(_event) {
        for (let index = 0; index <= length; index++) {
            document.getElementById("div" + index).remove();
            gesamtpreis.innerHTML = "Gesamtpreis: " + 0 + "€";
            localStorage.clear();
        }
    }
    //FORM
    //Bestellung mitsenden
    // tslint:disable-next-line: typedef
    let element = document.getElementById("givename");
    // tslint:disable-next-line: typedef
    let html = element.innerText;
    // tslint:disable-next-line: typedef
    let json = JSON.stringify({ ordered: html });
    console.log(json);
    let formData;
    let sendButton = document.getElementById("input");
    sendButton.addEventListener("click", inputButtonHandler);
    async function inputButtonHandler() {
        formData = new FormData(document.forms[0]);
        formData.append("Bestellung", json);
        let url = "https://timgissose2020.herokuapp.com";
        url += "/input";
        let query = new URLSearchParams(formData);
        url += "?" + query.toString();
        document.getElementById("form")?.reset();
        await fetch(url);
    }
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=trolley.js.map