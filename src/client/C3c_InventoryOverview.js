document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const tableBody = document.querySelector(".table tbody"); // Get the tbody element of the table

    try {
        const response = await fetch("http://localhost:3001/api/rent/all"); // Fetch renter list
        const data = await response.json();

        if (response.ok && data.data && Array.isArray(data.data[0])) {
            const renters = new Set(data.data[0].map(record => record.renter_id)); // Extract unique renter_ids

            dropdownMenu.innerHTML = ""; // Clear previous options
            renters.forEach(renterId => {
                const li = document.createElement("li");
                li.textContent = `Renter ID: ${renterId}`;
                li.classList.add("dropdown-item");
                li.onclick = function () {
                    document.querySelector(".dropdown-btn").textContent = `Renter ID: ${renterId} ▼`;
                    toggleDropdown(); // Close dropdown after selection
                    fetchReturnStockData(renterId); // Fetch return stock data for selected renter
                };
                dropdownMenu.appendChild(li);
            });
        } else {
            console.error("Failed to fetch renter IDs:", data.error || "No data received");
        }
    } catch (error) {
        console.error("Error fetching renter records:", error);
    }

    // Fetch and populate table with return stock data based on renterId
    async function fetchReturnStockData(renterId) {
        try {
            const response = await fetch(`http://localhost:3001/api/item/return-stock/${renterId}`);
            const data = await response.json();
            
            console.log("API Response:", data); // Log to inspect the response

            if (response.ok && data.stock && Array.isArray(data.stock) && data.stock[0].length > 0) {
                const soldItems = data.stock[0]; // Get the list of sold items from the first array

                // Clear previous table rows
                tableBody.innerHTML = "";

                // Populate the table with new data
                soldItems.forEach(item => {
                    console.log("Item:", item); // Log each item for debugging

                    const row = document.createElement("tr");
                    row.innerHTML = `
        
                        <td>${item.stock_id || "N/A"}</td> <!-- Use "N/A" if undefined -->
                        <td>${item.Item_ID || "N/A"}</td> <!-- Use "N/A" if undefined -->
                        <td>${item.item_type_id || "N/A"}</td> <!-- Use "N/A" if undefined -->
                        <td>${item.item_description || "N/A"}</td> <!-- Use "N/A" if undefined -->
                        <td>${item.item_price || "N/A"}</td> <!-- Use "N/A" if undefined -->
                        <td>${item.quantity || "N/A"}</td> <!-- Use "N/A" if undefined -->
                    `;
                    tableBody.appendChild(row); // Add row to table body
                });
            } else {
                console.log("No return stock data received.");
                tableBody.innerHTML = "<tr><td colspan='6'>No data available for the selected renter.</td></tr>";
            }
        } catch (error) {
            console.error("Error fetching return stock data:", error);
            tableBody.innerHTML = "<tr><td colspan='6'>Error fetching data. Please try again later.</td></tr>";
        }
    }

    // Retrieve userId from sessionStorage
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        alert("User ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }
});

// Toggle dropdown visibility
function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
