const HOST = "https?:\/\/127\.0\.0\.1:5500\/" // https?:\/\/ref\.paprika\.live\/

let url = window.location.href
let regex = new RegExp("(?:"+ HOST + ")(.*)")
let page = url.match(regex)[1] // 0th index should be entire url match, 1st index should be only the part after the host (eg: "paprika/main.html")

let masonry = () => {
    let grid = document.getElementById("ref-list")
    let columns
    let items = grid.getElementsByClassName("ref-container")
    let currentColumns = getComputedStyle(grid).gridTemplateColumns.split(' ').length
    
    if (currentColumns !== columns) {
        columns = currentColumns

        Array.from(items).forEach(item => {
            item.style.removeProperty("margin-top")
        });

        if (columns > 1) {
            Array.from(items).slice(columns).forEach((item, index) => {
                let bottomEdge = items.item(index).getBoundingClientRect().bottom
                let topEdge = item.getBoundingClientRect().top

                let gap = getComputedStyle(grid).rowGap
                item.style.marginTop = `${bottomEdge + parseFloat(gap.substring(0, gap.length - 2)) - topEdge}px`
            })
        }
    }
    console.log("masoned (sorry for recalculating the masonry layout every second this shit is annoying to work with)")
}

addEventListener("resize", masonry)
setInterval(masonry, 1000) // man

// addEventListener("load", () => {setTimeout(() => {console.log("loaded"); setTimeout(masonry, 0)}, 100)})

// const observer = new MutationObserver(() => {console.log("mutated"); setTimeout(masonry, 0)})
// observer.observe(document.getElementById("ref-list"), {childList: true, subtree: true, attributes: true})

fetch("/images.json")
.then(res => res.json())
.then(data => {
    let imageArray
    let folderPath
    switch (page) {
        case "paprika/main.html":
            imageArray = data.paprika.main
            folderPath = "/images/paprika/main/"
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

        let censorContainer = refContainer.getElementsByClassName("ref-censor-container")[0]
        censorContainer.addEventListener("click", () => {
            censorContainer.classList.add("ref-censor-container-clicked")
            refContainer.getElementsByClassName("ref-censor-panel")[0].classList.add("ref-censor-panel-clicked")
            refContainer.getElementsByClassName("ref-censor-text-container")[0].classList.add("ref-censor-text-container-clicked")
        })

        let censorReason = refContainer.getElementsByClassName("ref-censor-reason")[0]
        censorReason.textContent = element.spoilerReason
        if (element.spoilerReason == "") {
            refContainer.getElementsByClassName("ref-censor-container")[0].classList.add("ref-hidden")
        }

        let image = refContainer.getElementsByClassName("ref-image")[0]
        image.setAttribute("src", folderPath + element.filename)
        image.setAttribute("alt", element.altText)
        if (element.lowres) {image.classList.add("lowres")}

        let date = refContainer.getElementsByClassName("ref-date")[0]
        date.textContent = element.date

        let filename = refContainer.getElementsByClassName("ref-filename")[0]
        filename.textContent = element.filename

        let title = refContainer.getElementsByClassName("ref-title")[0]
        title.textContent = element.title

        let description = refContainer.getElementsByClassName("ref-description")[0]
        description.textContent = element.description

        let artistName = refContainer.getElementsByClassName("ref-artist-name")[0]
        artistName.textContent = element.artistName

        let artistProfile = refContainer.getElementsByClassName("ref-artist-profile")[0]
        artistProfile.textContent = element.artistProfile
        artistProfile.setAttribute("href", element.artistProfile)
        if (element.artistProfile == "") {artistProfile.classList.add("ref-hidden")}

        document.getElementById("ref-list").appendChild(refContainer)
    }
})
