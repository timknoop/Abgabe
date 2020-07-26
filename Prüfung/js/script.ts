namespace Abgabe {


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
                newDiv.id = "anidiv" + index;

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
