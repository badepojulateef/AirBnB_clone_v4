$(document).ready(init);

const HOST = '0.0.0.0';
const PORT = '5001';
const VERSION = 'v1';

function init () {
  const amenities = {};
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    const names_of_amenities = Object.keys(names_of_amenities);
    $('.amenities h4').text(names_of_amenities.sort().join(', '));
  });

  apiStatus();
}

function apiStatus () {
  const apiUrl = `http://${HOST}:${PORT}/api/${VERSION}/status`;
  $getJSON(apiUrl, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  })
}
