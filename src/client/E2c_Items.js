document.addEventListener("DOMContentLoaded", async function () { 
    const renterId = sessionStorage.getItem("renterId");

    if (!renterId) {
        alert("Renter ID not found. Please log in again.");
        window.location.href = "A2b_Sign-in_page.html";
        return;
    }

    console.log(`Retrieved Renter ID: ${renterId}`);

    try {
        const response = await fetch(`http://localhost:3001/api/item/all-items/${renterId}`);
        const data = await response.json();

        console.log("Items Data Retrieved:", data);

        if (data && data.items) {
            populateTable(data.items);
        } else {
            alert("No item data found.");
        }
    } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data.");
    }
});

function populateTable(items) {
    const tableBody = document.querySelector(".table-1 tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    items.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.Item_ID}</td>
            <td>${item.item_name}</td>
            <td>${item.item_type_id}</td>
        `;

        tableBody.appendChild(row);
    });


}

// Function to add an item
async function addItem() {
    const renterId = sessionStorage.getItem("renterId");
    const itemId = document.getElementById("itemId").value;
    const itemName = document.getElementById("itemName").value;
    const itemType = document.getElementById("itemType").value;

    if (!itemId || !itemName || !itemType) {
        alert("Please fill in all fields.");
        return;
    }

    const response = await fetch("http://localhost:3001/api/item/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ renterId, itemId, itemName, itemType }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        location.reload();
    } else {
        alert("Error: " + data.error);
    }
}

// Function to edit an item
async function editItem() {
    const renterId = sessionStorage.getItem("renterId");
    const itemId = document.getElementById("editItemId")?.value.trim();
    const newItemId = document.getElementById("newItemId")?.value.trim();
    const newItemName = document.getElementById("newItemName")?.value.trim();

    if (!itemId || !newItemId || !newItemName) {
        alert("Please fill in all fields.");
        return;
    }

    const requestBody = {
        renterId: renterId ?? null,
        itemId: itemId ?? null,
        newItemId: newItemId ?? null,
        newItemName: newItemName ?? null
    };

    console.log("Request Body:", requestBody); // Debugging

    try {
        const response = await fetch("http://localhost:3001/api/item/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok) {
            alert(data.message);
            location.reload();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred while editing the item.");
    }
}




// Function to delete an item
async function deleteItem() {
    const renterId = sessionStorage.getItem("renterId");
    const itemId = document.getElementById("deleteItemId").value;

    if (!itemId) {
        alert("Please enter the Item ID.");
        return;
    }

    const response = await fetch("http://localhost:3001/api/item/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ renterId, itemId }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        location.reload();
    } else {
        alert("Error: " + data.error);
    }
}

