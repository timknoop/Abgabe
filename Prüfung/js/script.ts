namespace Abgabe {

export function createArtikel(): void {
for (let i: number = 0; i < artikel.length; i++) {

    let newDiv: HTMLDivElement = document.createElement("div");
    newDiv.id = "div" + i;
    (<HTMLElement>document.getElementById("flex1")).appendChild(newDiv);
    newDiv.setAttribute("index", i.toString());

    //IMG
    let imgElement: HTMLImageElement = document.createElement("img");
    imgElement.src = artikel[i].img;
    newDiv.appendChild(imgElement);

    //NAME
    let name: HTMLParagraphElement = document.createElement("p");
    name.innerHTML = artikel[i].name;
    newDiv.appendChild(name);

    //PREIS
    let price: HTMLElement = document.createElement("p");
    price.innerHTML = artikel[i].preis + "€";
    newDiv.appendChild(price);

    //BUY
    let kaufen: HTMLButtonElement = document.createElement("button");
    kaufen.innerHTML = "Kaufen";
    kaufen.addEventListener("click", handleTrolley);
    newDiv.appendChild(kaufen);
}
}

//Einkaufswagen
let artikelCounter: number = 0;
let counterDiv: HTMLDivElement = document.createElement("div");

let cartArtikel: Artikel[] = [];

export function handleTrolley(_event: Event): void {
    
    if (artikelCounter >= 0) {
        document.getElementById("warencounter")?.appendChild(counterDiv);
    }

    artikelCounter++;
    counterDiv.innerHTML = artikelCounter + "";

    let indexButton: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("index")!;
    let indexNr: number = parseInt(indexButton);
    
    cartArtikel.push(artikel[indexNr]);
    localStorage.setItem("artikel_bild" + (cartArtikel.length - 1), artikel[indexNr].img);
    localStorage.setItem("artikel_name" + (cartArtikel.length - 1), artikel[indexNr].name);
    localStorage.setItem("artikel_preis" + (cartArtikel.length - 1), artikel[indexNr].preis.toString());
    localStorage.setItem("anzahlArtikel", cartArtikel.length.toString());
    (<HTMLElement>document.getElementById("flexCart")).innerHTML = "";
    createStore();
}

function createStore(): void {
    let length: number = parseInt(localStorage.getItem("anzahlArtikel")!);
    for (let index: number = 0; index <= length - 1; index++) {

                //Div erstellen
                let newDiv: HTMLDivElement = document.createElement("div");
                (<HTMLElement>document.getElementById("flexCart")).appendChild(newDiv);

                //IMG
                let imgElement: HTMLImageElement = document.createElement("img");
                imgElement.src = localStorage.getItem("artikel_bild" + index)!;
                newDiv.appendChild(imgElement);
        }
}
let delButton: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("delButton"));
delButton.addEventListener("click", handleReset);

function handleReset(_event: Event): void {
            localStorage.clear();
            location.reload();
    }

}
