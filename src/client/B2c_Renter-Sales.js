document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

    let soldItems = []; // Array to hold the sales data
    let filteredItems = []; // Array to hold the filtered items

    try {
        // Fetch sold items for the renter
        const response = await fetch(`http://localhost:3001/api/sale/return-items/${renterId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const salesData = await response.json();

        // Extract the actual data (first element in 'data' array)
        if (!Array.isArray(salesData.data) || !Array.isArray(salesData.data[0])) {
            throw new Error("Invalid API response format");
        }

        soldItems = salesData.data[0]; // Save all sold items
        filteredItems = soldItems; // Initially, all items are visible

        // Function to display items in the table and update total sales
        const displayItems = (items) => {
            const tableBody = document.querySelector(".table tbody");
            tableBody.innerHTML = ""; // Clear the table body

            let totalSales = 0; // Reset totalSales for the filtered items

            items.forEach(sale => {
                totalSales += sale.SubTotal || 0; // Add each item's subtotal to totalSales

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sale.Date ? new Date(sale.Date).toLocaleDateString() : "N/A"}</td>
                    <td>${sale.Sales_ID || "N/A"}</td>
                    <td>${sale.item_name || "N/A"}</td>
                    <td>₱${sale.item_price ? sale.item_price.toFixed(2) : "0.00"}</td>
                    <td>${sale.Quantity || 0}</td>
                    <td>₱${sale.SubTotal ? sale.SubTotal.toFixed(2) : "0.00"}</td>
                `;
                tableBody.appendChild(row);
            });

            // Update the Total Sales balance
            const totalSalesElement = document.querySelector(".total-sales");
            totalSalesElement.textContent = `₱${totalSales.toFixed(2)}`; // Display total sales
        };

        // Display all items initially
        displayItems(filteredItems);

        // Search functionality
        const searchInput = document.querySelector(".search-bar");
        searchInput.addEventListener("input", () => {
            const searchQuery = searchInput.value.toLowerCase(); // Convert input to lowercase
            filteredItems = soldItems.filter(item => {
                const itemId = item.Sales_ID.toString().toLowerCase(); // Ensure the item ID is a string
                const itemName = item.item_name.toLowerCase();

                // Check if the item ID or item name matches the search query
                return itemId.includes(searchQuery) || itemName.includes(searchQuery);
            });

            // Display the filtered items
            displayItems(filteredItems);
        });

         // Sorting functionality
         const headers = document.querySelectorAll(".sortable");
         headers.forEach(header => {
             header.addEventListener("click", () => {
                 const column = header.dataset.column; // Get the column name
                 const isDate = column === 'date';
                 const isSalesId = column === 'sales_id';
 
                 if (isDate) {
                     // Sort by date (ascending)
                     filteredItems.sort((a, b) => new Date(a.Date) - new Date(b.Date));
                 } else if (isSalesId) {
                     // Sort by Sales ID (ascending)
                     filteredItems.sort((a, b) => a.Sales_ID - b.Sales_ID);
                 }
 
                 // Display the sorted items
                 displayItems(filteredItems);
             });
         });

    } catch (error) {
        console.error("Error fetching sales data:", error);
    }
});
