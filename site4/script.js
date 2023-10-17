$(document).ready(function () {
    // Get references to HTML elements
    const $searchInput = $("#search-input");
    const $searchResults = $("#search-results");
    const $itemInfo = $("#item-info");

    // Function to update search results
    function updateResults(query, itemsData) {
        $searchResults.empty();

        // Iterate through the itemsData and search for matches
        for (const itemName in itemsData) {
            const item = itemsData[itemName][0];
            console.log(item);
            const itemTags = item.tags.join(", ");
            if (itemName.toLowerCase().includes(query.toLowerCase()) || itemTags.toLowerCase().includes(query.toLowerCase())) {
                const listItem = `<li data-item="${itemName}">${itemName}</li>`;
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
                <p>Tags: ${itemData[0].tags.join(", ").replace(/\b\w/g , function(m){ return m.toUpperCase(); } )}</p>
                <p>Location: ${itemData[0].location}</p>

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

let showing = false;
function new_item()
{
    const new_item_popup = `
    <div id="new-item-popup">
        <h2>Create New Item</h2>
        <form autocomplete="off">
            Name:<br>
            <input type="text" name="item-name" placeholder="Spoon"><br>
            Tags:<br>
            <input type="text" name="item-tags" placeholder="utensils,kitchen"><br>
            Location:<br>
            <input type="text" name="item-location" placeholder="kitchen"><br>
            Image:<br>
            <input type="file" accept="image/*" name="item-image-location" id="selectedFile" style="display: none;">
            <input type="button" value="Browse..." id="fake-button" onclick="document.getElementById('selectedFile').click();" /><br>
            <button type="submit" id="submit-new-item">Done</button>
        </form>
    </div>
    `;
    if (!showing) {
        $("body").append(new_item_popup);
    } else {
        $("#new-item-popup").remove();
    }
    showing = !showing;
}


