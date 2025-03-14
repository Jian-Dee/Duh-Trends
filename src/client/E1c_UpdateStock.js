document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

    loadStockData(renterId);
});

async function loadStockData(renterId) {
    try {
        const response = await fetch(`http://localhost:3001/api/item/return-stock/${renterId}`);
        const data = await response.json();
        if (data && data.stock) {
            populateTable(data.stock);
        } else {
            alert("No stock data found.");
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to load stock data.");
    }
}

function populateTable(stockData) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    stockData[0].forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-item-id", item.Item_ID);

        const stockStatus = item.quantity === 0 ? "Out of Stock" : item.quantity <= 5 ? "Low on Stock" : "In Stock";

        row.innerHTML = `
            <td>${item.stock_id}</td>
            <td>${item.item_type_id}</td>
            <td>${item.Item_ID}</td>
            <td>${item.item_description}</td>
            <td>${item.item_price}</td>
            <td>${item.quantity} (${stockStatus})</td>
            <td>

                <button onclick="deleteStock('${item.Item_ID}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to add stock
async function addStock() {
    const itemId = document.getElementById("itemId").value.trim();
    const newQuantity = document.getElementById("newQuantity").value.trim();

    if (!itemId || !newQuantity) {
        alert("Please enter both Item ID and New Quantity.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/api/item/add-to-stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId, newQuantity }),
        });

        const data = await response.json();

        if (response.ok) {
            location.reload(); // Refresh the page to update stock display
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Request failed. Please try again.");
    }
}


// Function to edit stock
async function editStock() { 
    const itemId = document.getElementById("itemId1").value.trim();
    const newQuantity = document.getElementById("newQuantity1").value.trim();
    const newPrice = document.getElementById("itemPrice").value.trim();
    const newDescription = document.getElementById("itemDesc").value.trim();
    const renterId = sessionStorage.getItem("renterId");

    console.log({ itemId, newQuantity, newPrice, newDescription, renterId });


    if (!renterId || !itemId || !newQuantity || !newPrice || !newDescription) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/api/item/edit-quantity", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ renterId, itemId, newQuantity, newPrice, newDescription }),
        });

        const result = await response.json();
        alert(result.message);
        loadStockData(renterId);
    } catch (error) {
        console.error("Error editing stock:", error);
    }
}



// Function to delete stock
async function deleteStock(itemId) {

    try {
        const renterId = sessionStorage.getItem("renterId");
        const response = await fetch("http://localhost:3001/api/item/delete-from-stock", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ renterId, itemId }),
        });

        const result = await response.json();
        alert(result.message);
        loadStockData(renterId);
    } catch (error) {
        console.error("Error deleting stock:", error);
    }
}
