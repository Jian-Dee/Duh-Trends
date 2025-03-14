document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

    loadSalesHistory(renterId);
});

async function loadSalesHistory(renterId) {
    try {
        const response = await fetch(`http://localhost:3001/api/sale/sales-history/${renterId}`);
        const data = await response.json();

        if (data && data.data && Array.isArray(data.data[0])) {
            populateTable(data.data[0]);
        } else {
            alert("No sales history found.");
        }
    } catch (error) {
        console.error("Error fetching sales history:", error);
        alert("Failed to load sales history.");
    }
}

function populateTable(salesData) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    salesData.forEach(sale => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${new Date(sale.sale_date).toLocaleString()}</td>
            <td>${sale.sales_history_id}</td>
            <td>${sale.item_id}</td>
            <td>${sale.item_price}</td>
            <td>${sale.quantity}</td>
            <td>${sale.subtotal}</td>
        `;

        tableBody.appendChild(row);
    });
}
