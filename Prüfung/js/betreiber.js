"use strict";
var Abgabe;
(function (Abgabe) {
    let delButton = document.getElementById("removeButton");
    delButton.addEventListener("click", deleteButtonHandler);
    let getButton = document.getElementById("request");
    getButton.addEventListener("click", requestButtonHandler);
    let shipOneButton = document.getElementById("shipone");
    shipOneButton.addEventListener("click", shipOneButtonHandler);
    let shipButton = document.getElementById("ship");
    shipButton.addEventListener("click", shipButtonHandler);
    async function deleteButtonHandler() {
        let url = "https://timgissose2020.herokuapp.com";
        url += "/deleteAll";
        await fetch(url);
        location.reload();
    }
    async function requestButtonHandler() {
        let url = "https://timgissose2020.herokuapp.com";
        url += "/request";
        let response = await (fetch(url));
        let responseText = await response.text();
        document.getElementById("output").innerHTML = responseText;
    }
    async function shipOneButtonHandler() {
        let url = "https://timgissose2020.herokuapp.com";
        url += "/updateone";
        await fetch(url);
        location.reload();
    }
    async function shipButtonHandler() {
        let url = "https://timgissose2020.herokuapp.com";
        url += "/update";
        await fetch(url);
        location.reload();
    }
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=betreiber.js.map