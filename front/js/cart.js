async function getKanapList() {

    return fetch('http://localhost:3000/api/products')
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(kanapList => {
            return kanapList
        })
}

function completeCart(allKanap){
    const panier = JSON.parse(localStorage.getItem('panier'))
    
    for(const product of panier) {
        const correspondingProduct = allKanap.find(k => k._id == product.id)
        product.name = correspondingProduct.name
        product.price = correspondingProduct.price
        product.imageUrl = correspondingProduct.imageUrl

        product.individualAmount = product.quantity * product.price;
    }

    
    return panier
}


    


async function main() {
    const allKanap = await getKanapList();
    const completedCart = completeCart(allKanap);
    displayCart(completedCart); // Call the displayCart function with the completedCart array
}

// ... (rest of your code)

function displayCart(completedCart) {
    const cartContainer = document.getElementById('cd');

    // Clear previous content in the cart container
    cartContainer.innerHTML = 'cart';

    // Iterate over each product in the completed cart
    for (let i = 0; i < completedCart.length; i++) {
        const product = completedCart[i];

        // Create a container for each product
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${product.price}`;

        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        productImage.alt = product.name;

        // Set custom image size (change these values as needed)
        productImage.style.width = '150px';
        productImage.style.height = '150px';

        // Create a delete button for the product
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        // Add a click event listener to the delete button
        deleteButton.addEventListener('click', () => {
            // Remove the product from the cart and re-render the display
            completedCart.splice(i, 1);
            displayCart(completedCart);
        });

        // Apply CSS styles
        productContainer.style.textAlign = 'center';
        productContainer.style.margin = '10px';

        // Append the product elements and delete button to the container
        productContainer.appendChild(productImage);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);
        productContainer.appendChild(deleteButton);
        cartContainer.appendChild(productContainer);
        

        // Calculer le prix total
     // Calculer le prix total
     let totalPrice = 0;
     for (const product of completedCart) {
         totalPrice += product.individualAmount;
         // ...
     }
 
     // Récupérer l'élément existant pour afficher le prix total
     const totalPriceSpan = document.getElementById('totalPrice');
 
     // Mettre à jour le contenu de l'élément avec le prix total
     totalPriceSpan.textContent = `${totalPrice}`;
}
   console.log(completedCart) 
}

main()

