$(document).ready(function () {
    // Get references to HTML elements
    const $searchInput = $("#search-input");
    const $searchResults = $("#search-results");
    const $itemInfo = $("#item-info");

    // Function to update search results
    function updateResults(query, itemsData) {
        $searchResults.empty();

        // Iterate through the itemsData and search for matches
        for (const item in itemsData) {
            if (item.toLowerCase().includes(query.toLowerCase())) {
                const tags = itemsData[item][0].tags.join(", ");
                const listItem = `<li data-item="${item}">${item}</li>`;
                $searchResults.append(listItem);
            }
        }
    }

    // Function to display item information
    function displayItemInfo(itemName, itemsData) {
        const itemData = itemsData[itemName];
        if (itemData) {
            // Construct the item information HTML
            const infoHTML = `
                <h2>${itemName}</h2>
                <p>Tags: ${itemData[0].tags.join(", ")}</p>
            `;
            $itemInfo.html(infoHTML);
        }
    }

    // Load the JSON data from an external file using AJAX
    $.getJSON("data.json", function (itemsData) {
        // Event listener for input changes
        $searchInput.on("input", function () {
            const query = $searchInput.val();
            updateResults(query, itemsData);
        });

        // Event listener for item clicks
        $searchResults.on("click", "li", function () {
            const itemName = $(this).data("item");
            displayItemInfo(itemName, itemsData);
        });
    });
});
