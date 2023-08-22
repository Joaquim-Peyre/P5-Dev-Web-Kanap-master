let kanapId = null

// ---------------------------------------------

function getKanapId() {
    const searchParams =  new URLSearchParams(location.search)
    return searchParams.get('id')
}

function getKanapInfo() {
    fetch('http://localhost:3000/api/products/' + kanapId)
        .then(response =>
        {
            if (response.ok) {
                return response.json()
            }
        })
        .then(data => {
            displayKanapInfo(data)
        })
}

function displayKanapInfo(kanap) {
    const productName = document.getElementById('title')
    const productPrice = document.getElementById('price')
    const productDescription = document.getElementById('description')
    const productColors = document.getElementById('colors')
    const productImageWrapper = document.querySelector('.item__img')

    productName.innerHTML = kanap.name
    productPrice.innerHTML = kanap.price
    productDescription.innerHTML = kanap.description
    productColors.innerHTML = productColors.innerHTML + buildColorsHTML(kanap.colors)
    productImageWrapper.innerHTML =`<img src ="${kanap.imageUrl}" alt ="${kanap.alt}" />`
}

function buildColorsHTML (colorlList) {
    let optionsHTML = ''

    for(let i = 0; i < colorlList.length; i++) {
        optionsHTML = optionsHTML + `<option value="${colorlList[i]}">${colorlList[i]}</option>`
    }

    return optionsHTML
}
 
function addToBasket ()
{
 const btnPanier = document.getElementById('addToCart')

 btnPanier.addEventListener('click', function() {
     choiceProductQuantity = document.getElementById("quantity").valueAsNumber
     choiceProductColor = document.getElementById("colors").value


    if (1<= choiceProductQuantity && choiceProductQuantity <=100 && choiceProductColor != '') {

        const newProduct = {
            id: kanapId,
            color: choiceProductColor,
            quantity: choiceProductQuantity
        }

        let panier = JSON.parse(localStorage.getItem('panier'))

        if(panier) {
            const sameArticle = panier.find(p => p.id == kanapId && p.color == choiceProductColor)
             
            if(sameArticle) {
                sameArticle.quantity = sameArticle.quantity + choiceProductQuantity
            } else {
                panier.push(newProduct)
            }
            alert('produit ajouté')
        } else {
            panier = []
            panier.push(newProduct)
           
        }
        
        localStorage.setItem('panier', JSON.stringify(panier));
    
    } else {
        alert('Veuillez choisir une quantité entre 1 et 100 et une couleur !')

    }  
    
 })
}


var cart = localStorage.getItem('panier')


// On appelle nos fonctions
 kanapId = getKanapId()

getKanapInfo()

addToBasket()

