const materials = [{
        id: 1,
        name: "Premium Cement",
        category: "Cement",
        price: 380,
        unit: "50 kg bag",
        emoji: "🏗️",
        description: "High-quality cement for construction."
    },
    {
        id: 2,
        name: "TMT Steel Rods",
        category: "Steel",
        price: 650,
        unit: "rod",
        emoji: "🔩",
        description: "Strong steel rods for building structures."
    },
    {
        id: 3,
        name: "Red Clay Bricks",
        category: "Bricks",
        price: 10,
        unit: "brick",
        emoji: "🧱",
        description: "Durable bricks for walls and buildings."
    },
    {
        id: 4,
        name: "River Sand",
        category: "Sand",
        price: 1800,
        unit: "ton",
        emoji: "⛰️",
        description: "Quality sand for construction work."
    },
    {
        id: 5,
        name: "Construction Gravel",
        category: "Gravel",
        price: 1200,
        unit: "ton",
        emoji: "🪨",
        description: "Gravel suitable for concrete mixtures."
    },
    {
        id: 6,
        name: "Steel Cement Bundle",
        category: "Cement",
        price: 420,
        unit: "50 kg bag",
        emoji: "🏭",
        description: "Construction cement for general projects."
    }
];

let cart = [];

function displayMaterials() {
    const searchText =
        document.getElementById("search").value.toLowerCase();

    const selectedCategory =
        document.getElementById("category").value;

    const filtered = materials.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const container = document.getElementById("material-list");

    if (filtered.length === 0) {
        container.innerHTML = "<p>No materials found.</p>";
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="product-card">
            <div class="product-image">${item.emoji}</div>

            <div class="product-info">
                <span class="category-label">${item.category}</span>
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>

                <p class="price">
                    ₹${item.price.toLocaleString("en-IN")}
                    <small>/ ${item.unit}</small>
                </p>

                <button class="add-btn" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

function addToCart(id) {
    const item = materials.find(material => material.id === id);
    const existing = cart.find(product => product.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...item, quantity: 1 });
    }

    updateCartCount();
    alert(item.name + " added to cart!");
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "YOUR SHOPPING CART\n\n";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += `${item.name}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `Subtotal: ₹${subtotal.toLocaleString("en-IN")}\n\n`;
    });

    message += `Total Amount: ₹${total.toLocaleString("en-IN")}`;

    const placeOrder = confirm(
        message + "\n\nClick OK to place your demo order."
    );

    if (placeOrder) {
        placeOrderDemo();
    }
}

function placeOrderDemo() {
    if (cart.length === 0) return;

    const orderId = "BM" + Date.now().toString().slice(-6);

    alert(
        "Demo order placed successfully!\n" +
        "Order ID: " + orderId +
        "\nTotal: ₹" +
        cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0
        ).toLocaleString("en-IN") +
        "\n\nNote: This order is not saved to a server."
    );

    cart = [];
    updateCartCount();
}

displayMaterials();