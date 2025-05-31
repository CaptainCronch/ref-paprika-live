class RefImage {
    constructor(filename, title, description, date, artistName, artistProfile, altText, spoilerReason) {
        this.filename = filename
        this.title = title
        this.description = description
        this.date = date
        this.artistName = artistName
        this.artistProfile = artistProfile
        this.altText = altText
        this.spoilerReason = spoilerReason
    }
}

CustomElementRegistry.define("ref", RefImage, HTMLElement)

await fetch("./images.json")
.then(res => res.json())
.then(data => {
    // do epic shit
})
