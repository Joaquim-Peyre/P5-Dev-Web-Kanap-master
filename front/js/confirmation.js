// Récupérer les éléments du local storage
var storageItems = localStorage.getItem("panier"); // Remplacez "nom_de_votre_cle" par la clé que vous avez utilisée pour stocker vos éléments

// Vérifier si des éléments ont été trouvés dans le local storage
if (storageItems !== null) {
    // Convertir les données JSON en un objet JavaScript
    var parsedItems = JSON.parse(storageItems);

    // Afficher les éléments dans la console
    console.log(parsedItems);
} else {
    console.log("Aucun élément trouvé dans le local storage.");
}


// Récupérer les éléments du local storage
var storageItems = localStorage.getItem("panier"); // Remplacez "nom_de_votre_cle" par la clé que vous avez utilisée pour stocker vos éléments

// Sélectionner un élément de la page où vous souhaitez afficher les données
var elementSurLaPage = document.getElementsByClassName("confirmation"); // Remplacez "id_de_votre_element" par l'ID de l'élément HTML où vous souhaitez afficher les données

// Vérifier si des éléments ont été trouvés dans le local storage
if (storageItems !== null) {
    // Convertir les données JSON en un objet JavaScript
    var parsedItems = JSON.parse(storageItems);

    // Créer un élément HTML pour afficher les données
    var ul = document.createElement("ul");

    // Parcourir les éléments du local storage et les ajouter à la liste
    for (var i = 0; i < parsedItems.length; i++) {
        var li = document.createElement("li");
        li.textContent = parsedItems[i];
        ul.appendChild(li);
    
}
// ... (rest of your code)

function displayCart(completedCart) {
    const cartContainer = document.getElementById('cd');

   

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
   
}
   
    
