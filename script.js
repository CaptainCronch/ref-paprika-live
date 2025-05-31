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
    "ref-image",
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

fetch("/images.json")
.then(res => res.json())
.then(data => {
    // do epic shit
    // let template = document.getElementById("ref-template");
    let ref = document.createElement("ref-image")
    let slot = document.createElement("span")
    slot.setAttribute("slot", "title")
    slot.appendChild(document.createTextNode("now this is a slotted text"))
    ref.appendChild(slot)
    document.getElementById("ref-list").appendChild(ref)
})
