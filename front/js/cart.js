async function getKanapList() {
  return fetch('http://localhost:3000/api/products')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(kanapList => {
      return kanapList;
    });
}

function completeCart(allKanap) {
  const panier = JSON.parse(localStorage.getItem('panier'));

  for (const product of panier) {
    const correspondingProduct = allKanap.find(k => k._id == product.id);
    product.name = correspondingProduct.name;
    product.price = correspondingProduct.price;
    product.imageUrl = correspondingProduct.imageUrl;

    product.individualAmount = product.quantity * product.price;
  }

  return panier;
}

function displayCart(completedCart) {
  const cartContainer = document.getElementById('cd');
  cartContainer.innerHTML = ''; // Effacer le contenu précédent
  const cartTotalPrice = document.getElementById('totalPrice');
  const totalQuantitySpan = document.getElementById('totalQuantity');


  completedCart.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', product.id);
    article.setAttribute('data-color', product.color);

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('cart__item__img');
    const productImage = document.createElement('img');
    productImage.src = product.imageUrl;
    productImage.alt = "Photographie d'un canapé";
    imgDiv.appendChild(productImage);
    article.appendChild(imgDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('cart__item__content');

    const contentDescription = document.createElement('div');
    contentDescription.classList.add('cart__item__content__description');

    const productName = document.createElement('h2');
    productName.textContent = product.name;
    const productColor = document.createElement('p');
    productColor.textContent = product.color;
    const productPrice = document.createElement('p');
    productPrice.textContent = `${product.price} €`;

    contentDescription.appendChild(productName);
    contentDescription.appendChild(productColor);
    contentDescription.appendChild(productPrice);

    const contentSettings = document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('cart__item__content__settings__quantity');

    const quantityLabel = document.createElement('p');
    quantityLabel.textContent = 'Qté : ';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = product.quantity;

    quantityInput.addEventListener('input', (event) => {
      product.quantity = parseInt(event.target.value);
      product.individualAmount = product.quantity * product.price;
      displayCart(completedCart);
      localStorage.setItem('panier', JSON.stringify(completedCart));
    });
let totalPrice = 0;
  let totalQuantity = 0;
    

  for (const product of completedCart) {
    totalPrice += product.individualAmount;
    totalQuantity += product.quantity; // Ajoute la quantité de chaque produit
  }


  cartTotalPrice.textContent = `${totalPrice} €`;
  totalQuantitySpan.textContent = totalQuantity; 

  localStorage.setItem('panier', JSON.stringify(completedCart));
  
    quantityDiv.appendChild(quantityLabel);
    quantityDiv.appendChild(quantityInput);

    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('cart__item__content__settings__delete');

    const deleteText = document.createElement('p');
    deleteText.classList.add('deleteItem');
    deleteText.textContent = 'Supprimer';
    deleteText.style.cursor = 'pointer';

    deleteText.addEventListener('click', () => {
      const index = completedCart.indexOf(product);
      completedCart.splice(index, 1);
      displayCart(completedCart);
      localStorage.setItem('panier', JSON.stringify(completedCart));
    });

    deleteDiv.appendChild(deleteText);

    contentSettings.appendChild(quantityDiv);
    contentSettings.appendChild(deleteDiv);

    contentDiv.appendChild(contentDescription);
    contentDiv.appendChild(contentSettings);

    article.appendChild(contentDiv);

    cartContainer.appendChild(article);
  });

  let totalPrice = 0;
  for (const product of completedCart) {
    totalPrice += product.individualAmount;
  }

  cartTotalPrice.textContent = `${totalPrice} `;

  localStorage.setItem('panier', JSON.stringify(completedCart));
}

async function main() {
  let allKanap = await getKanapList();
  if (!allKanap) {
    allKanap = [];
  }

  let completedCart = completeCart(allKanap);
  if (!completedCart) {
    completedCart = [];
  }

  displayCart(completedCart);

  const quantityCounters = document.querySelectorAll('input[type="number"]');
  quantityCounters.forEach((counter, index) => {
    counter.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value);
      completedCart[index].quantity = newQuantity;
      completedCart[index].individualAmount = newQuantity * completedCart[index].price;
      displayCart(completedCart);
      localStorage.setItem('panier', JSON.stringify(completedCart));
    });
  });
console.log(completedCart);
}









//Instauration formulaire avec regex
function setupFormValidation() {
    // Création des expressions régulières
    
    
    const charRegExp = /^[a-zA-Z ,.'-]+$/;
    const addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$/;
    const emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;


    
    const form = document.querySelector(".cart__order__form");
    const orderForm = document.querySelector('.cart__order__form');

    orderForm.addEventListener('submit',async  function(event) {
      event.preventDefault();

      
      const object  = 
      { 
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        } 
      };
      console.log(object);

      const cart = JSON.parse(localStorage.getItem('panier'));
    const productIds = cart.map(product => product.id);
    console.log(productIds);
    object.products = productIds;


const response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const data = await response.json();
      const orderId = data.orderId;


      

      window.location.href = `confirmation.html?orderId=${orderId}`;
      
    }  
  
  )

}
    // Validation d'un champ avec l'expression régulière donnée
    const validateInput = function(inputElement, regex) {
        const errorMsgElement = inputElement.nextElementSibling;

        if (regex.test(inputElement.value)) {
            errorMsgElement.innerHTML = '';
        } else {
            errorMsgElement.innerHTML = 'Veuillez renseigner ce champ correctement.';
        }
    };

    
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


