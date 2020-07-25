"use strict";
var Abgabe;
(function (Abgabe) {
    loadArtikel("data.json");
    async function loadArtikel(_url) {
        let response = await fetch(_url);
        let jsonArray = await response.json();
        Abgabe.artikel = await JSON.parse(JSON.stringify(jsonArray));
        Abgabe.createArtikel();
    }
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=scriptdata.js.map