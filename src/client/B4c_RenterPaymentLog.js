document.addEventListener("DOMContentLoaded", async function () {
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Successfully retrieved Renter ID: ${renterId}`);

    try {
        const response = await fetch(`http://localhost:3001/api/payment/history/${renterId}`);
        const data = await response.json();

        if (data && Array.isArray(data.data) && data.data.length > 0) {
            populateTable(data.data[0]); // Extract the first array containing payment history
        } else {
            alert("No payment history found.");
        }
    } catch (error) {
        console.error("Error fetching payment history:", error);
        alert("Failed to load payment history.");
    }
});

// Function to populate the table
function populateTable(paymentData) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    paymentData.forEach(payment => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${payment.Payment_History_ID}</td>
            <td>${payment.Payment_ID}</td>
            <td>${new Date(payment.Payment_Date).toLocaleDateString()}</td>
            <td>${payment.Amount}</td>
            <td>${payment.Remarks}</td>
        `;

        tableBody.appendChild(row);
    });
}
