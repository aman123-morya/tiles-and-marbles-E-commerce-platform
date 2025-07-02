const products = [
  {
    name: "Wall Tile - Glossy Finish",
    price: "₹30/sq.ft",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUfXni5nQlSMEvojYpjHCbnroLDkAuk0UAhA&s"
  },
  {
    name: "Floor Tile - Anti-Slip",
    price: "₹38/sq.ft",
    image: "https://5.imimg.com/data5/JO/YR/LI/SELLER-88561390/ceramic-anti-skid-parking-floor-tiles.jpg"
  },
  {
    name: "Vitrified Tile - High Strength",
    price: "₹700/sq.ft",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN9QEU_PDgQss3EYjK2otxx23AR4c-_Ub3rQ&s"
  },
  {
    name: "Ceramic Tile - Rustic Look",
    price: "₹40/sq.ft",
    image: "https://suncoretiles.com/wp-content/uploads/2024/01/MATRIX-ARMY-GREEN-min.jpg"
  },
  {
    name: "Double Charge Tile",
    price: "₹40/sq.ft",
    image: "https://5.imimg.com/data5/SELLER/Default/2020/10/FJ/RP/LX/7713730/double-charged-vitrified-tiles-500x500.jpg"
  },
  {
    name: "GVT Tile - Marble Look",
    price: "₹900/sq.ft",
    image: "https://images.orientbell.com/media/catalog/product/p/g/pgvt_statuario_marble_living_room_60x120_cm_2_.jpg"
  }
];

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

window.onload = () => {
  // Render product cards
  const container = document.getElementById("productContainer");
  if (container) {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;
      container.appendChild(card);
    });
  }

  // Attach order form submit handler
  const orderForm = document.getElementById("orderForm");
  const ordersList = document.getElementById("ordersList");

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const product = document.getElementById("product").value;
      const quantity = document.getElementById("quantity").value;
      const address = document.getElementById("address").value.trim();

      if (!name || !phone || !email || !product || !quantity || !address) {
        alert("Please fill out all fields.");
        return;
      }

      const orderData = { name, phone, email, product, quantity, address };

      // POST to backend server
      fetch("http://localhost:3000/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
        .then(res => res.json())
        .then(response => {
          if (response.success) {
            document.getElementById("orderConfirmation").style.display = "block";
            orderForm.reset();
          } else {
            alert("Failed to send order email.");
          }
        })
        .catch(err => {
          console.error("Fetch error:", err);
          alert("Server error, please try again.");
        });

      // Also show on seller dashboard (frontend simulation)
      const orderItem = document.createElement("li");
      orderItem.innerHTML = `
        <strong>Customer:</strong> ${orderData.name} <br>
        <strong>Phone:</strong> ${orderData.phone} | <strong>Email:</strong> ${orderData.email} <br>
        <strong>Product:</strong> ${orderData.product} | <strong>Quantity:</strong> ${orderData.quantity} Sq Ft <br>
        <strong>Address:</strong> ${orderData.address}
      `;
      ordersList.appendChild(orderItem);
    });
  }
};
