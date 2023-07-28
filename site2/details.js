const urlParams = new URLSearchParams(window.location.search);
const person = urlParams.get('person');

if (person) {
  $.getJSON('data.json', function(jsonData) {
    const contactDetails = jsonData[person];
    if (contactDetails) {
      const detailsContainer = $('#contact-details');
      const list = $('<ul></ul>');
      contactDetails.forEach(item => {
        const key = Object.keys(item)[0];
        const value = item[key];
        const listItem = $('<li></li>').text(`${key}: ${value}`);
        list.append(listItem);
      });
      detailsContainer.append(list);
    } else {
      $('#contact-details').text('Contact details not found.');
    }
  });
} else {
  $('#contact-details').text('Invalid request.');
}
