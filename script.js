// class RefImage {
//     constructor(filename, title, description, date, artistName, artistProfile, altText, spoilerReason) {
//         this.filename = filename
//         this.title = title
//         this.description = description
//         this.date = date
//         this.artistName = artistName
//         this.artistProfile = artistProfile
//         this.altText = altText
//         this.spoilerReason = spoilerReason
//     }
// }

// CustomElementRegistry.define("ref", RefImage, HTMLElement)

customElements.define(
    "ref-card",
    class extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("ref-template");
            let templateContent = template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    },
);

const HOST = "https?:\/\/127\.0\.0\.1:5500\/" // https?:\/\/ref\.paprika\.live\/

let url = window.location.href
let regex = new RegExp("(?:"+ HOST + ")(.*)")
let page = url.match(regex)[1] // 0th index should be entire url match, 1st index should be only the part after the host (eg: "paprika/main.html")

fetch("/images.json")
.then(res => res.json())
.then(data => {
    // do epic shit
    // let template = document.getElementById("ref-template");
    // let ref = document.createElement("ref-card")
    // let slot = document.createElement("span")
    // slot.setAttribute("slot", "title")
    // slot.appendChild(document.createTextNode("now this is a slotted text"))
    // ref.appendChild(slot)
    // document.getElementById("ref-list").appendChild(ref)

    let imageArray
    let folderPath
    switch (page) {
        case "paprika/main.html":
            imageArray = data.paprika.main
            folderPath = "/images/paprika/main/"
            break;
        case "paprika/alternative.html":
            imageArray = data.paprika.alternative
            folderPath = "/images/paprika/alternative/"
            break;
        case "paprika/other.html":
            imageArray = data.paprika.other
            folderPath = "/images/paprika/other/"
            break;
        case "capri.html":
            imageArray = data.capri
            folderPath = "/images/capri/"
            break;
        case "other.html":
            imageArray = data.other
            folderPath = "/images/other/"
    }

    for (let index = 0; index < imageArray.length; index++) {
        const element = imageArray[index];
        const refContainer = document.getElementById("ref-template").content.firstElementChild.cloneNode(true)

        let image = refContainer.getElementsByClassName("ref-image")[0]
        image.setAttribute("src", folderPath + element.filename)
        image.setAttribute("alt", element.altText)

        let date = refContainer.getElementsByClassName("ref-date")[0]
        date.textContent = element.date

        let filename = refContainer.getElementsByClassName("ref-filename")[0]
        filename.textContent = element.filename

        let description = refContainer.getElementsByClassName("ref-description")[0]
        description.textContent = element.description

        let artistName = refContainer.getElementsByClassName("ref-artist-name")[0]
        artistName.textContent = element.artistName

        let artistProfile = refContainer.getElementsByClassName("ref-artist-profile")[0]
        artistProfile.textContent = element.artistProfile
        artistProfile.setAttribute("href", element.artistProfile)

        document.getElementById("ref-list").appendChild(refContainer)

        // let refCard = document.createElement("ref-card")
        // console.log(refCard.content)
        // let filename = document.createElement("span")
        // let filenameText = document.createTextNode(element.filename)
        // filename.setAttribute("slot", "filename")
        // filename.appendChild(filenameText)
        // let refContainer = refCard.getElementsByClassName("ref-container")[0]
        // refContainer.getElementsByClassName("filename")[0].appendChild(filename)
        // document.getElementById("ref-list").appendChild(refCard)
    }
})