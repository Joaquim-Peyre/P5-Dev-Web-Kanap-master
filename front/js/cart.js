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




function displayCart(completedCart) {
  const cartContainer = document.getElementById('cd');
  const cartTotalPrice = document.getElementById('totalPrice');

  // Iterate over each product in the completed cart
  for (let i = 0; i < completedCart.length; i++) {
      const product = completedCart[i];

      // Create a container for each product
      const productContainer = document.createElement('div');
      productContainer.classList.add('cart__item');

      const productName = document.createElement('p');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = `Price: $${product.price}`;

      const productImage = document.createElement('img');
      productImage.src = product.imageUrl;
      productImage.alt = product.name;

      // Set custom image size (change these values as needed)
      productImage.style.width = '150px';
      productImage.style.height = '150px';

      // Create a quantity counter
      const quantityCounter = document.createElement('input');
      quantityCounter.type = 'number';
      quantityCounter.value = product.quantity;
      quantityCounter.min = 1;
      quantityCounter.addEventListener('input', (event) => {
          // Update the quantity when the user changes the input
          product.quantity = parseInt(event.target.value, 1000);
          
      });

      // Create a bold text element acting as a "Delete" button
      const deleteText = document.createElement('strong');
      deleteText.textContent = 'Delete';
      deleteText.style.cursor = 'pointer';
      deleteText.addEventListener('click', () => {
          // Remove the product from the cart and update the display
          completedCart.splice(i, 1);
          updateCartDisplay(completedCart);
      });

      // Append the product elements, quantity counter, and delete text to the container
      productContainer.appendChild(productImage);
      productContainer.appendChild(productName);
      productContainer.appendChild(productPrice);
      productContainer.appendChild(quantityCounter);
      productContainer.appendChild(deleteText);
      cartContainer.appendChild(productContainer);
  }

  // Calculer le prix total
  let totalPrice = 0;
  for (const product of completedCart) {
      totalPrice += product.individualAmount;
  }

  // Récupérer l'élément existant pour afficher le prix total
  cartTotalPrice.textContent = `${totalPrice}`;

  // Sauvegarder le panier dans le stockage local
  localStorage.setItem('panier', JSON.stringify(completedCart));
}

async function main() {
  let allKanap = await getKanapList();
  if (!allKanap) {
      // Handle the case where the API call fails
      allKanap = [];
  }

  let completedCart = completeCart(allKanap);
  if (!completedCart) {
      // Handle the case where the cart is not properly initialized
      completedCart = [];
  }

  displayCart(completedCart);

  const quantityCounters = document.querySelectorAll('input[type="number"]');

  quantityCounters.forEach((counter, index) => {
    counter.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value);
      completedCart[index].quantity = newQuantity;
      completedCart[index].individualAmount = newQuantity * completedCart[index].price;

      // Mise à jour de l'affichage
      displayCart(completedCart);

      // Mise à jour du localStorage
      localStorage.setItem('panier', JSON.stringify(completedCart));
    });
  });
console.log(completedCart) 


// Appeler main au chargement de la page
document.addEventListener('DOMContentLoaded', main);
}



//Instauration formulaire avec regex
function setupFormValidation() {
    // Création des expressions régulières
    
    
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


// Calcule le prix total du panier
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (const item of cartItems) {
      totalPrice += item.individualAmount;
  }
  return totalPrice;
}



}

//url.search params
