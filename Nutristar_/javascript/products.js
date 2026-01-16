// Globalni promenna pro uchovani polozek v kosiku
let cartItems = [];

// Odkazy na elementy košíku
const cartContent = document.getElementById('cart-content');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Přidání produktu do košíku
document.querySelectorAll('.btn.btn-warning').forEach(button => {
    button.addEventListener('click', function() {
        const cardBody = this.closest('.card-body');
        const productName = cardBody.querySelector('.card-title').innerText;
        const productPrice = parseInt(cardBody.querySelector('.card-text.price').innerText.replace(' Kč', ''));
        addToCart(productName, productPrice);
    });
});

// Přidání položky do košíku s názvem a cenou
function addToCart(name, price) { 
    const foundItem = cartItems.find(item => item.name === name);
    if (foundItem) {
        foundItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    updateCartUI();
}

// Aktualni stav košíku
function updateCartUI() { 
    if (cartItems.length === 0) {
        cartContent.innerHTML = 'Prazdný košík! Přidejte prosím své položky...';
        cartCount.textContent = '(0)';
        cartTotal.innerText = 'Celková částka: 0 Kč';
        return;
    }

    // Propise polozku do kosiku
    let totalCount = 0;
    let totalAmount = 0;
    let cartHTML = '';
    cartItems.forEach((item, index) => {
        totalCount += item.quantity;
        totalAmount += item.price * item.quantity;
        cartHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>${item.name}</strong>
                <img src="images/close-but.png" alt="Odstranit" width="16" style="cursor:pointer"
                    onclick="removeItem(${index})">
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.price} Kč</span>
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="mx-2">${item.quantity}x</span>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <hr/>
        `;
    });
    cartContent.innerHTML = cartHTML;
    cartCount.textContent = `(${totalCount})`;
    cartTotal.innerText = `Celková částka: ${totalAmount} Kč`;
}

// Změna množství položky v košíku
function changeQuantity(index, delta) { 
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }
    updateCartUI();
}

// Odstranění položky z košíku
function removeItem(index) { 
    cartItems.splice(index, 1);
    updateCartUI();
}

// Inicializace košíku
document.addEventListener("DOMContentLoaded", updateCartUI); 

// Dual Slider pro cenu  
const minPriceInput = document.getElementById('minPrice');  
const maxPriceInput = document.getElementById('maxPrice');  
const sliderRange = document.getElementById('sliderRange');  
const minPriceValue = document.getElementById('minPriceValue');  
const maxPriceValue = document.getElementById('maxPriceValue');  

const MIN = parseInt(minPriceInput.min);  
const MAX = parseInt(maxPriceInput.max);  

function setSliderRange() {  // Nastavení slideru 
    const minVal = parseInt(minPriceInput.value);  
    const maxVal = parseInt(maxPriceInput.value);  

    if (minVal > maxVal - 100) {  
        minPriceInput.value = maxVal - 100;  
    }  

    if (maxVal < minVal + 100) {  
        maxPriceInput.value = minVal + 100;  
    }  

    minPriceValue.textContent = `${minPriceInput.value} Kč`;  
    maxPriceValue.textContent = `${maxPriceInput.value} Kč`;  

    const percentageMin = ((minPriceInput.value - MIN) / (MAX - MIN)) * 100;  
    const percentageMax = ((maxPriceInput.value - MIN) / (MAX - MIN)) * 100;  

    sliderRange.style.left = `${percentageMin}%`;  
    sliderRange.style.width = `${percentageMax - percentageMin}%`;  
}  

minPriceInput.addEventListener('input', setSliderRange);  
maxPriceInput.addEventListener('input', setSliderRange);  

setSliderRange(); // Inicializace slideru  

function filterProducts() {  
    const minPrice = parseInt(minPriceInput.value);  
    const maxPrice = parseInt(maxPriceInput.value);  
    const query = document.getElementById('productSearch').value.toLowerCase().trim();  
    const products = document.querySelectorAll('.card');  
    const activeCategory = document.querySelector('#categoryFilter .list-group-item.active');  
    const selectedCategory = activeCategory ? activeCategory.dataset.category : '';  

    products.forEach(product => {  
        const priceText = product.querySelector('.card-text.price').innerText;  // cena produtku    
        const price = parseInt(priceText.replace(' Kč', ''));   
        const title = product.querySelector('.card-title').innerText.toLowerCase();  // nazev produktu
        const category = product.closest('.col-md-4').dataset.category;  

        if (  
            price >= minPrice &&  
            price <= maxPrice &&  
            title.includes(query) &&  
            (selectedCategory === '' || category === selectedCategory)  
        ) {  
            product.closest('.col-md-4').style.display = 'block';  
        } else {  
            product.closest('.col-md-4').style.display = 'none';  
        }  
    });  
}  
    // Filtr kategorií
document.getElementById('categoryFilter').addEventListener('click', function(e) {  
    if (e.target.classList.contains('list-group-item')) {  
        document.querySelectorAll('#categoryFilter .list-group-item').forEach(li => li.classList.remove('active'));  
        e.target.classList.add('active');  
    }  
});  

    // spuštění filtru
document.getElementById('filterButton').addEventListener('click', function() {  
    filterProducts();  
    document.getElementById('cancelFilterButton').style.display = 'block';  
});  

document.getElementById('cancelFilterButton').addEventListener('click', function() {  
    // Reset filtrů  
    minPriceInput.value = MIN;  
    maxPriceInput.value = MAX;  
    minPriceValue.textContent = `${MIN} Kč`;  
    maxPriceValue.textContent = `${MAX} Kč`;  
    document.getElementById('productSearch').value = '';  
    document.querySelectorAll('#categoryFilter .list-group-item').forEach(li => li.classList.remove('active'));  
    // Znova obnoví všechny produkty  
    document.querySelectorAll('.col-md-4').forEach(col => col.style.display = 'block');  
    // Schová tlačítko **Zrušit filtr**  
    this.style.display = 'none';  
    // Aktualizuje slider  
    setSliderRange();  
});