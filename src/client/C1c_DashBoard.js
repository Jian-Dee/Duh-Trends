document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.getElementById("dropdownMenu");

    try {
        const response = await fetch("http://localhost:3001/api/rent/all"); // Adjust the API path if needed
        const data = await response.json();

        if (response.ok && data.data && Array.isArray(data.data[0])) {
            const renters = new Set(data.data[0].map(record => record.renter_id)); // Extract unique renter_ids from the first array

            dropdownMenu.innerHTML = ""; // Clear previous options
            renters.forEach(renterId => {
                const li = document.createElement("li");
                li.textContent = `Renter ID: ${renterId}`;
                li.classList.add("dropdown-item");
                li.onclick = function () {
                    document.querySelector(".dropdown-btn").textContent = `Renter ID: ${renterId} ▼`;
                    toggleDropdown(); // Close dropdown after selection
                    
                    // Store selected renterId in sessionStorage
                    sessionStorage.setItem("renterId", renterId);

                    // Optionally, refresh the data after selection
                    fetchData(renterId);
                };
                dropdownMenu.appendChild(li);
            });
        } else {
            console.error("Failed to fetch renter IDs:", data.error || "No data received");
        }
    } catch (error) {
        console.error("Error fetching renter records:", error);
    }

    // Retrieve userId from sessionStorage
    const userId = sessionStorage.getItem("userId");
    console.log(`Successfully retrieved User ID: ${userId}`);

    if (!userId) {
        alert("User ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    // Retrieve renterId from sessionStorage if available
    const renterId = sessionStorage.getItem("renterId");
    if (renterId) {
        fetchData(renterId);
    } else {
        console.log("No renterId selected yet.");
    }

    async function fetchData(renterId) {
        try {
            // Fetching stock data
            const responseStock = await fetch(`http://localhost:3001/api/item/return-stock/${renterId}`);
            if (!responseStock.ok) {
                throw new Error(`HTTP error! Status: ${responseStock.status}`);
            }
            const stockData = await responseStock.json();

            if (!Array.isArray(stockData.stock) || !Array.isArray(stockData.stock[0])) {
                throw new Error("Invalid API response format");
            }

            const tableBody = document.querySelector("#itemStockTable tbody");
            tableBody.innerHTML = "";

            stockData.stock[0].forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.Item_ID}</td>
                    <td>${item.item_description || "No description"}</td>
                    <td>₱${item.item_price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                `;
                tableBody.appendChild(row);
            });

            // Fetching total sales data
            const responseSales = await fetch(`http://localhost:3001/api/sale/total-sales/${renterId}`);
            if (!responseSales.ok) {
                throw new Error(`HTTP error! Status: ${responseSales.status}`);
            }
            const salesData = await responseSales.json();

            // Displaying total sales in the dashboard
            document.querySelector("#totalSales").textContent = `₱${parseFloat(salesData.total_sales).toFixed(2)}`;

            // Fetching total items in stock
            const responseTotalStock = await fetch(`http://localhost:3001/api/item/total-stock/${renterId}`);
            if (!responseTotalStock.ok) {
                throw new Error(`HTTP error! Status: ${responseTotalStock.status}`);
            }
            const totalStockData = await responseTotalStock.json();

            // Displaying total items in stock in the dashboard
            document.querySelector("#totalItems").textContent = `${totalStockData.total_items} Items`;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
});

// Toggle dropdown visibility
function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
