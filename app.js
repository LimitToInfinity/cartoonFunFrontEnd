let form = document.querySelector("#cartoonForm")
let editForm = document.querySelector("#editForm")

editForm.addEventListener("submit", function() {
    event.preventDefault()

    let name = document.querySelector("#edit-name")
    let image = document.querySelector("#edit-image")
    let rating = document.querySelector("#edit-rating")
    let id = document.querySelector("#edit-id")

    let formData = {name: name.value,
                image: image.value,
                rating: rating.value
                }

    fetch(`http://localhost:3000/cartoons/${id.value}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
})

form.addEventListener("submit", function() {
    event.preventDefault()

    let name = document.querySelector("#name")
    let image = document.querySelector("#image")
    let rating = document.querySelector("#rating")

    let formData = {name: name.value,
                image: image.value,
                rating: rating.value
                }

    fetch("http://localhost:3000/cartoons", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
})

getData()

function getData(){
    fetch("http://localhost:3000/cartoons")
    .then(res => res.json())
    .then(res => createCard(res))
}

function createCard(cartoons){
    let cardContainer = document.querySelector(".row")

    cartoons.forEach(element => {
        let div = document.createElement("div")
        let h5 = document.createElement("h5")
        let img = document.createElement("img")
        let p = document.createElement("p")
        let deleteButton = document.createElement("button")
        let editButton = document.createElement("button")

        h5.innerText = element.name
        img.src = element.image
        p.innerText = element.rating
        deleteButton.innerText = "Delete"
        editButton.innerText = "Edit"

        div.append(h5,img,p, editButton, deleteButton)
        cardContainer.append(div)

        editButton.addEventListener("click", function() {
            editForm.style = "display: block"
            
            let name = document.querySelector("#edit-name")
            let image = document.querySelector("#edit-image")
            let rating = document.querySelector("#edit-rating")
            let id = document.querySelector("#edit-id")
            
            name.value = element.name
            image.value = element.image
            rating.value = element.rating
            id.value = element.id
        })

        deleteButton.addEventListener("click", function() {
            fetch(`http://localhost:3000/cartoons/${element.id}`, {
                method: "DELETE"
            }).then(res => event.target.parentNode.remove())
        })
    })
}