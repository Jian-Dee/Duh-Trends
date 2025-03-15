document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.getElementById("dropdownMenu");

    try {
        const response = await fetch("http://localhost:3001/api/rent/all");
        const data = await response.json();

        if (response.ok && data.data && Array.isArray(data.data[0])) {
            // Filter out null renter_ids
            const renters = new Set(data.data[0].map(record => record.renter_id).filter(renterId => renterId !== null));

            dropdownMenu.innerHTML = ""; // Clear previous options
            renters.forEach(renterId => {
                const li = document.createElement("li");
                li.textContent = `Renter ID: ${renterId}`;
                li.classList.add("dropdown-item");
                li.onclick = function () {
                    const dropdownBtn = document.querySelector(".dropdown-btn");

                    // Ensure the button exists before setting textContent
                    if (dropdownBtn) {
                        dropdownBtn.textContent = `Renter ID: ${renterId} ▼`;
                    }

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
});

function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

async function fetchData(renterId) {
    try {
        // Fetching sales data
        const responseSales = await fetch(`http://localhost:3001/api/sale/return-items/${renterId}`);
        if (!responseSales.ok) {
            throw new Error(`HTTP error! Status: ${responseSales.status}`);
        }
        const salesData = await responseSales.json();
    
        if (!Array.isArray(salesData.data)) {
            throw new Error("Invalid API response format");
        }
    
        // Ensure the table body exists using the correct class for the table
        const tableBody = document.querySelector(".table tbody");
        if (!tableBody) {
            console.error("Table body not found");
            return; // Exit early if table body doesn't exist
        }
    
        tableBody.innerHTML = ""; // Clear any previous content
    
        // Loop through the data and create rows dynamically
        salesData.data[0].forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(item.Date).toLocaleString()}</td>
                <td>${item.Sales_ID}</td>
                <td>${item.item_name}</td>
                <td>₱${item.item_price.toFixed(2)}</td>
                <td>${item.Quantity}</td>
                <td>₱${item.SubTotal.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    
        // Fetching total sales data
        const responseTotalSales = await fetch(`http://localhost:3001/api/sale/total-sales/${renterId}`);
        if (!responseTotalSales.ok) {
            throw new Error(`HTTP error! Status: ${responseTotalSales.status}`);
        }
        const totalSalesData = await responseTotalSales.json();
    
        // Displaying total sales in the dashboard
        document.querySelector("#totalSales").textContent = `₱${parseFloat(totalSalesData.total_sales).toFixed(2)}`;
    
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

document.querySelector('.submit-button').addEventListener('click', async () => {
    const itemId = document.querySelector('.item-id-text').value;
    const quantity = document.querySelector('.quantity-sold-text').value;
    const staffId = sessionStorage.getItem("userId"); // Assuming staffId is stored in sessionStorage
  
    if (itemId && quantity) {
      const saleData = { staffId, itemId, quantity };
  
      try {
        const response = await fetch('http://localhost:3001/api/sale/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(saleData),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert('Error: ' + data.error);
        }
      } catch (error) {
        console.error('Error adding sale:', error);
        alert('An error occurred while adding the sale.');
      }
    } else {
      alert('Please enter both Item ID and Quantity.');
    }
  });
  