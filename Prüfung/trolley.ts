namespace Abgabe {

    let length: number = parseInt(localStorage.getItem("anzahlArtikel")!);
    let preis: number = 0;
    let gesamtpreis: HTMLParagraphElement = document.createElement("p");

    for (let index: number = 0; index <= length - 1; index++) {

            //Div erstellen
            let newDiv: HTMLDivElement = document.createElement("div");
            (<HTMLElement>document.getElementById("flexWarenkorb")).appendChild(newDiv);
            newDiv.id = "div" + index;
            

            //IMG
            let imgElement: HTMLImageElement = document.createElement("img");
            imgElement.src = localStorage.getItem("artikel_bild" + index)!;
            newDiv.appendChild(imgElement);

            let rname: HTMLParagraphElement = document.createElement("p");
            rname.innerHTML = localStorage.getItem("artikel_name" + index)!;
            newDiv.appendChild(rname);

            //NAME
            let name: HTMLParagraphElement = document.createElement("p");
            name.innerHTML = localStorage.getItem("artikel_name" + index)!;
            newDiv.appendChild(name);
            (<HTMLElement>document.getElementById("givename")).appendChild(name);

            //PREIS
            let price: HTMLParagraphElement = document.createElement("p");
            price.innerHTML = localStorage.getItem("artikel_preis" + index) + "€"!;
            newDiv.setAttribute("preis", price.innerHTML);
            newDiv.appendChild(price);

            //Gesamtpreis berechnen
            preis = preis + parseFloat(price.innerHTML);
            gesamtpreis.innerHTML = "Gesamtpreis: " + preis.toFixed(0) + "€";
            document.getElementById("warenkorbWert")?.appendChild(gesamtpreis);
    }
    let delButton: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("deleteButton"));
    delButton.addEventListener("click", handleDeleteAll);

    function handleDeleteAll(_event: Event): void {
        for (let index: number = 0; index <= length; index++) {
            (<HTMLDivElement>document.getElementById("div" + index)).remove();
            gesamtpreis.innerHTML = "Gesamtpreis: " + 0 + "€";
            localStorage.clear();
        }
    }

    //FORM
    //Bestellung mitsenden
    // tslint:disable-next-line: typedef
    let element = document.getElementById("givename")!;
    // tslint:disable-next-line: typedef
    let html = element.innerText;
    // tslint:disable-next-line: typedef
    let json = JSON.stringify({ordered: html});
    console.log(json);

    let formData: FormData;
    let sendButton: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("input"));
    sendButton.addEventListener("click", inputButtonHandler);
    async function inputButtonHandler(): Promise<void> {
        formData = new FormData(document.forms[0]);
        formData.append("Bestellung", json);
        let url: string = "https://timgissose2020.herokuapp.com";
        url += "/input";
        
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "?" + query.toString();

        (<HTMLFormElement>document.getElementById("form"))?.reset();
        await fetch(url);
    }
}
