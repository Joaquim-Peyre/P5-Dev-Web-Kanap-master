function getOrderIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('orderId');
  }
  // Call this function to get the orderId
  const orderId = getOrderIdFromURL();
  // Now, 'orderId' will contain the value retrieved from the URL parameter.
  
  const orderIdSpan = document.getElementById('orderId');
if (orderIdSpan) { // Vérifier si l'élément avec l'ID "orderId" existe
  orderIdSpan.innerHTML = orderId || 'N/D'; // Si orderId est null/undefined, afficher "N/D"
}
  
  console.log(orderId)