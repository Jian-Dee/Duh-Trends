document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const tableBody = document.querySelector(".table tbody");  // Select the table body for inserting rows

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
                    fetchPaymentHistory(renterId); // Fetch and display payment history for selected renter
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

    // Fetch payment history for a renter
    async function fetchPaymentHistory(renterId) {
        try {
            const response = await fetch(`http://localhost:3001/api/payment/history/${renterId}`);
            const data = await response.json();

            if (response.ok && data.data && Array.isArray(data.data[0])) {
                const paymentHistory = data.data[0]; // The payment history is in the first array of the response
                tableBody.innerHTML = ""; // Clear the table body before inserting new rows

                paymentHistory.forEach(payment => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${payment.Payment_Date}</td>
                        <td>${payment.Payment_ID}</td>
                        <td>${payment.Payment_History_ID}</td>
                        <td>${payment.Payment_ID}</td>
                        <td>${new Date(payment.Payment_Date).toLocaleString()}</td>
                        <td>${payment.Amount}</td>
                        <td>${payment.Remarks}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                console.error("Failed to fetch payment history:", data.error || "No data received");
            }
        } catch (error) {
            console.error("Error fetching payment history:", error);
        }
    }
});

// Toggle dropdown visibility
function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
