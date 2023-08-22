function getKanapList() {

    fetch('http://localhost:3000/api/products')
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(kanapList => {
            displayKanapList(kanapList)
            // return kanapList
        })
}


function displayKanapList(kanapList) {
    let template = ''
    const itemsContainer = document.getElementById('items')

    for(let i = 0; i < kanapList.length; i++) {
       template = template + buildSingleKanapHTML(kanapList[i])
    }

    itemsContainer.innerHTML = template
}

function buildSingleKanapHTML(kanap) {
   return `<a href="./product.html?id=${kanap._id}">
            <article>
            <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
            <h3 class="productName">${kanap.name}</h3>
            <p class="productDescription">${kanap.description}</p>
            </article>
        </a>`
}

getKanapList() 