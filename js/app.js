const form = document.getElementById("addOrder");
const ordersContainer = document.getElementById("ordersContainer");
const clearBtn = document.getElementById("clearOrders");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

renderOrders();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.mealName.value.trim();
  const price = form.mealPrice.value.trim();
  const imageUrl = form.mealImageURL.value.trim();

  if (!name || !price || !imageUrl) return;

  const order = {
    mealName: name,
    mealPrice: price,
    mealImage: imageUrl,
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
  form.reset();
});

function renderOrders() {
  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersContainer.innerHTML = `<tr><td colspan="4">No orders yet.</td></tr>`;
    return;
  }

  orders.forEach((order, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${order.mealName}</td>
    <td>${parseFloat(order.mealPrice).toFixed(2)} JD</td>
    <td><img src="${order.mealImage}" alt="${
      order.mealName
    }" width="60" height="60"/></td>
    <td><button class="deleteBtn" data-index="${index}"> Delete</button></td>
  `;

    ordersContainer.appendChild(row);
  });

  attachDeleteEvents();
}

function attachDeleteEvents() {
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      orders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(orders));
      renderOrders();
    });
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all orders?")) {
    orders = [];
    localStorage.removeItem("orders");
    renderOrders();
  }
});
