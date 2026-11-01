
document.addEventListener("DOMContentLoaded", function () {

  // PRODUCTS

  const products = [

    {
      id: 1,
      name: "Velvet Matte Lipstick",
      category: "Makeup",
      price: 850,
      rating: "4.8",
      badge: "BEST SELLER",
      description: "Smooth matte lipstick for beautiful lips.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 2,
      name: "Glow Face Serum",
      category: "Skincare",
      price: 1450,
      rating: "4.9",
      badge: "POPULAR",
      description: "Lightweight serum for radiant-looking skin.",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 3,
      name: "Luxury Makeup Brush",
      category: "Tools",
      price: 1200,
      rating: "4.7",
      badge: "NEW",
      description: "Soft makeup brush for smooth application.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 4,
      name: "Hydrating Face Cream",
      category: "Skincare",
      price: 1800,
      rating: "4.8",
      badge: "TOP RATED",
      description: "Daily moisturizer for soft, hydrated skin.",
      image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 5,
      name: "Blush Beauty Palette",
      category: "Makeup",
      price: 1350,
      rating: "4.7",
      badge: "TRENDING",
      description: "Beautiful shades for a natural rosy glow.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 6,
      name: "Vitamin C Face Serum",
      category: "Skincare",
      price: 1650,
      rating: "4.9",
      badge: "GLOW",
      description: "A refreshing serum for your daily skincare routine.",
      image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85"
    },

    {
      id: 7,
      name: "Beauty Blender",
      category: "Tools",
      price: 650,
      rating: "4.6",
      badge: "POPULAR",
      description: "Soft blending sponge for an even makeup finish.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=85"
    },

   
{
  id: 8,
  name: "Classic Foundation",
  category: "Makeup",
  price: 1550,
  rating: "4.8",
  badge: "BEST SELLER",
  description: "Buildable foundation for a smooth makeup look.",
  image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=85"
}


  ];


  // ELEMENTS

  const productGrid = document.getElementById("productGrid");

  const cartButton = document.getElementById("cartButton");

  const cartOverlay = document.getElementById("cartOverlay");

  const closeCart = document.getElementById("closeCart");

  const cartItems = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const cartSubtotal = document.getElementById("cartSubtotal");

  const checkoutButton = document.getElementById("checkoutButton");

  const checkoutMessage = document.getElementById("checkoutMessage");

  const newsletterForm = document.getElementById("newsletterForm");

  const newsletterMessage = document.getElementById("newsletterMessage");


  // CART

  let cart = [];

  let activeFilter = "All";


  // FORMAT PRICE IN PAKISTANI RUPEES

  function formatPrice(price) {

    return "Rs. " + price.toLocaleString("en-PK");

  }


  // DISPLAY PRODUCTS

  function displayProducts(category = "All") {

    activeFilter = category;

    const filteredProducts = category === "All"
      ? products
      : products.filter(product => product.category === category);

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {

      productGrid.innerHTML = `
        <p class="no-products">
          No products found.
        </p>
      `;

      return;

    }


    filteredProducts.forEach(product => {

      const productCard = document.createElement("div");

      productCard.className = "product-card";

      productCard.innerHTML = `

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

          <span class="product-badge">
            ${product.badge}
          </span>

        </div>

        <div class="product-info">

          <p class="product-category">
            ${product.category}
          </p>

          <h3>
            ${product.name}
          </h3>

          <p class="product-description">
            ${product.description}
          </p>

          <div class="product-rating">
            ★★★★★ ${product.rating}
          </div>

          <div class="product-bottom">

            <span class="product-price">
              ${formatPrice(product.price)}
            </span>

            <button
              class="add-cart-btn"
              data-id="${product.id}"
            >
              Add to Bag +
            </button>

          </div>

        </div>

      `;

      productGrid.appendChild(productCard);

    });

  }


  // CATEGORY FILTERS

  const filterButtons = document.querySelectorAll(
    ".filters button"
  );

  filterButtons.forEach(button => {

    button.addEventListener("click", function () {

      const category = this.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      displayProducts(category);

    });

  });


  // ADD TO CART

  productGrid.addEventListener("click", function (event) {

    const button = event.target.closest(".add-cart-btn");

    if (!button) return;

    const productId = Number(button.dataset.id);

    const product = products.find(
      item => item.id === productId
    );

    if (!product) return;

    const existingItem = cart.find(
      item => item.id === productId
    );

    if (existingItem) {

      existingItem.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    updateCart();

    button.textContent = "Added ✓";

    setTimeout(() => {

      button.textContent = "Add to Bag +";

    }, 1000);

  });


  // UPDATE CART

  function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let totalQuantity = 0;


    if (cart.length === 0) {

      cartItems.innerHTML = `
        <p class="empty-cart">
          Your shopping bag is empty.
        </p>
      `;

    }


    cart.forEach(item => {

      const itemTotal = item.price * item.quantity;

      total += itemTotal;

      totalQuantity += item.quantity;


      const cartItem = document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${formatPrice(item.price)}
          </p>

          <div class="cart-quantity">

            <button
              data-action="decrease"
              data-id="${item.id}"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              data-action="increase"
              data-id="${item.id}"
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>

          <button
            class="remove-item"
            data-action="remove"
            data-id="${item.id}"
          >
            Remove
          </button>

        </div>

      `;

      cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalQuantity;

    cartSubtotal.textContent = formatPrice(total);

    checkoutMessage.textContent = "";

  }


  // CART QUANTITY AND REMOVE

  cartItems.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;

    const productId = Number(button.dataset.id);

    const item = cart.find(
      product => product.id === productId
    );

    if (!item) return;


    if (action === "increase") {

      item.quantity++;

    }


    if (action === "decrease") {

      item.quantity--;

      if (item.quantity <= 0) {

        cart = cart.filter(
          product => product.id !== productId
        );

      }

    }


    if (action === "remove") {

      cart = cart.filter(
        product => product.id !== productId
      );

    }


    updateCart();

  });


  // OPEN CART

  cartButton.addEventListener("click", function () {

    cartOverlay.classList.add("open");

    checkoutMessage.textContent = "";

  });


  // CLOSE CART

  closeCart.addEventListener("click", function () {

    cartOverlay.classList.remove("open");

  });


  // CLOSE CART WHEN CLICKING OUTSIDE

  cartOverlay.addEventListener("click", function (event) {

    if (event.target === cartOverlay) {

      cartOverlay.classList.remove("open");

    }

  });


  // CHECKOUT

  checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

      checkoutMessage.textContent =
        "Your shopping bag is empty.";

      return;

    }


    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );


    checkoutMessage.textContent =
      "Order total: " + formatPrice(total) +
      ". Please contact the store to complete your order.";

  });


  // NEWSLETTER

  newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailInput = newsletterForm.querySelector(
      'input[type="email"]'
    );

    const email = emailInput.value.trim();

    if (!email) return;


    newsletterMessage.textContent =
      "Thank you for subscribing to Glow & Grace!";

    newsletterForm.reset();

  });


  // INITIALIZE

  displayProducts("All");

  updateCart();

  filterButtons[0].classList.add("active");

});

