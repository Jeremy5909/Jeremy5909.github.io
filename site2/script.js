const searchInput = $('#search-input');
const searchResults = $('#search-results');

searchInput.on('input', search);

function search() {
  const searchTerm = searchInput.val().toLowerCase();
  searchResults.html('');

  // Fetching JSON data from data.json file
  $.getJSON('data.json', function(jsonData) {
    const filteredData = Object.keys(jsonData).filter(person =>
      person.toLowerCase().includes(searchTerm)
    );

    if (filteredData.length === 0) {
      searchResults.html('<p>No results found</p>');
    } else {
      const sortedData = filteredData.sort();
      const resultList = $('<ul></ul>');
      sortedData.forEach(person => {
        const listItem = $('<li></li>').text(person);
        const detailsLink = $('<a></a>').attr('href', buildDetailsURL(person)).append(listItem);
        resultList.append(detailsLink);
      });
      searchResults.html(resultList);
    }
  });
}

function buildDetailsURL(person) {
  return `details.html?person=${encodeURIComponent(person)}`;
}

