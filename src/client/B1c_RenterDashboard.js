document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

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
});
