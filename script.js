const products = [
    { id: 1, name: "NIKE X NOCTA", price: 75.00, image: "images/03.jpg" },
    { id: 2, name: "MOVING GO.", price: 75.00, image: "images/06.jpg" },
    { id: 3, name: "SWOOSH BY NIKE", price: 75.00, image: "images/04.jpg" },
    { id: 4, name: "MOVING GO. ", price: 75.00, image: "images/05.jpg" },
    { id: 5, name: "SWOOSH BY NIKE", price: 75.00, image: "images/07.jpg" },
    { id: 6, name: "JORDAN JUMPMAN", price: 75.00, image: "images/10.jpg" },
    { id: 7, name: "SWOOSH BY NIKE", price: 75.00, image: "images/08.jpg" },
    { id: 8, name: "NIKE JUST DO IT FLOWRS", price: 75.00, image: "images/09.jpg" },
    { id: 9, name: "NIKE X NOCTA", price: 75.00, image: "images/11.jpg" },







    
];

let cart = [];
let currentSlide = 0;

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" id="product-img-${product.id}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <br>
            
            
        `;
        productList.appendChild(productItem);
    });
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
    cartCount.textContent = cart.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function removeFromCart(productId) {
    const cartIndex = cart.findIndex(item => item.id === productId);
    if (cartIndex > -1) {
        if (cart[cartIndex].quantity > 1) {
            cart[cartIndex].quantity -= 1;
        } else {
            cart.splice(cartIndex, 1);
        }
    }

    renderCart();
}

function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity, 10);
    }

    renderCart();
}

function updateProductImage(productId) {
    const newImageUrl = document.getElementById(`new-img-${productId}`).value;
    const product = products.find(p => p.id === productId);
    if (product && newImageUrl) {
        product.image = newImageUrl;
        document.getElementById(`product-img-${product.id}`).src = newImageUrl;
    }
}

function updateClock() {
    const clockElem = document.getElementById('clock');
    const now = new Date();
    clockElem.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

showSlide(currentSlide);

renderProducts();
renderCart();
