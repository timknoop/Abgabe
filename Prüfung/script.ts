namespace Abgabe {

export function createArtikel(): void {
for (let i: number = 0; i < artikel.length; i++) {

    if (artikel[i].category == 1) {
    let newDiv: HTMLDivElement = document.createElement("div");
    newDiv.id = "div" + i;
    document.getElementById("flex1")?.appendChild(newDiv); 
    newDiv.setAttribute("index", i.toString());
    }

    //IMG
    let imgElement: HTMLImageElement = document.createElement("img");
    imgElement.src = artikel[i].img;
    document.getElementById("div" + i)?.appendChild(imgElement);

    //NAME
    let name: HTMLParagraphElement = document.createElement("p");
    name.innerHTML = artikel[i].name;
    document.getElementById("div" + i)?.appendChild(name);

    //PREIS
    let price: HTMLElement = document.createElement("p");
    price.innerHTML = artikel[i].preis + "€";
    document.getElementById("div" + i)?.appendChild(price);

    //BUY
    let kaufen: HTMLButtonElement = document.createElement("button");
    kaufen.innerHTML = "Kaufen";
    kaufen.addEventListener("click", handleTrolley);
    document.getElementById("div" + i)?.appendChild(kaufen);
    kaufen.setAttribute("preis", artikel[i].preis.toString());
}
}

//Einkaufswagen
let summe: number = 0;
let count: number = 0;
let artikelCounter: number = 0;
let blasenDiv: HTMLDivElement = document.createElement("div");

let cartArtikel: Artikel[] = [];

export function handleTrolley(_event: Event): void {
    
    if (artikelCounter >= 0) {
        document.getElementById("warencounter")?.appendChild(blasenDiv);
    }

    artikelCounter++;
    blasenDiv.innerHTML = artikelCounter + "";
 
    if ( (<HTMLButtonElement>_event.currentTarget)?.getAttribute("preis")) {
            summe = count + parseInt((<HTMLButtonElement>_event.currentTarget)?.getAttribute("preis")!);
            count = summe;
        } 
    console.log(summe.toFixed(0));

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
                newDiv.id = "anidiv" + index;

                //IMG
                let imgElement: HTMLImageElement = document.createElement("img");
                imgElement.src = localStorage.getItem("artikel_bild" + index)!;
                newDiv.appendChild(imgElement);
                console.log(imgElement);
        }
}
let delButton: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("delButton"));
delButton.addEventListener("click", handleReset);

function handleReset(_event: Event): void {
            localStorage.clear();
            location.reload();
    }

}
