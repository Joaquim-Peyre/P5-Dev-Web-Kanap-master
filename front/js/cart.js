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

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.classList.add('add-button');

        // Add a click event listener to the "Add" button
        addButton.addEventListener('click', () => {
            // Add the product back to the cart and re-render the display
            const newProduct = { ...product }; // Create a copy of the product
            completedCart.push(newProduct);
            
        });


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
        productContainer.appendChild(addButton); // Add the "Add" button
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

//Instauration formulaire avec regex
function setupFormValidation() {
    // Création des expressions régulières
    
    // Regular expressions
    const charRegExp = /^[a-zA-Z ,.'-]+$/;
    const addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$/;
    const emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;


    
    const form = document.querySelector(".cart__order__form");

    

    // Ecoute des modifications des champs du formulaire
    form.firstName.addEventListener('change', function() {
        validateInput(this, charRegExp);
    });

    form.lastName.addEventListener('change', function() {
        validateInput(this, charRegExp);
    });

    form.address.addEventListener('change', function() {
        validateInput(this, addressRegExp);
    });

    form.city.addEventListener('change', function() {
        validateInput(this, charRegExp);
    });

    form.email.addEventListener('change', function() {
        validateInput(this, emailRegExp);
    });

    // Validation d'un champ avec l'expression régulière donnée
    const validateInput = function(inputElement, regex) {
        const errorMsgElement = inputElement.nextElementSibling;

        if (regex.test(inputElement.value)) {
            errorMsgElement.innerHTML = '';
        } else {
            errorMsgElement.innerHTML = 'Veuillez renseigner ce champ correctement.';
        }
    };
}

// Appel de la fonction pour la configuration de la validation du formulaire
setupFormValidation();

main()

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}
//  accepted characters by RegEx

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

// first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

// city
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }


  // adress
const adressErrorMsg = document.getElementById("adressErrorMsg");
function validateAdress(adresse) {
  if (regexName.test(adresse) == false) {
    return false;
  } else {
    adressErrorMsg.innerHTML = null;
    return true;
  }
}
// Génère un numéro aléatoire à 8 chiffres
function generateRandomNumber() {
  return Math.floor(Math.random() * 100000000);
}

// Récupère les informations du panier depuis le stockage local
function getCartItems() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  return panier;
}

// Calcule le prix total du panier
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (const item of cartItems) {
      totalPrice += item.individualAmount;
  }
  return totalPrice;
}



async function main() {
  const allKanap = await getKanapList();
  const completedCart = completeCart(allKanap);

  // Stockez le panier dans le stockage local
  localStorage.setItem('completedCart', JSON.stringify(completedCart));

  // Redirigez l'utilisateur vers la page de confirmation
  window.location.href = 'confirmation.html';
}


}


