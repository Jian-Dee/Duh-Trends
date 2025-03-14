document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

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

    // Search Functionality
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("input", function () {
        const searchValue = searchBar.value.trim();
        filterTable(searchValue);
    });
});

// Function to populate the table
function populateTable(stockData) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    stockData[0].forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-item-id", item.Item_ID); // Store Item_ID for search filtering

        const stockStatus = item.quantity === 0 ? "Out of Stock" : item.quantity <= 5 ? "Low on Stock" : "In Stock";

        row.innerHTML = `
            <td>${item.stock_id}</td>
            <td>${item.item_type_id}</td>
            <td>${item.Item_ID}</td>
            <td>${item.item_description}</td>
            <td>${item.item_price}</td>
            <td>${item.quantity} (${stockStatus})</td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to filter the table
function filterTable(searchValue) {
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        const itemId = row.getAttribute("data-item-id");
        if (!searchValue || itemId.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
