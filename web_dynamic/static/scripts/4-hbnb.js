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
  getFilteredPlaces();
}

function apiStatus () {
  const apiUrl = `http://${HOST}:${PORT}/api/${VERSION}/status`;
  $.get(apiUrl, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  })
}

function getFilteredPlaces () {
  const placesUrl = `http://${HOST}:${PORT}/api/${VERSION}/places_search/`;
  $.ajax({
    url: placesUrl,
    type: POST,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({amenities: Object.values(amenities)}),
    dataType: 'json',
    success: function (res) {
      res.forEach((place) => 
        $('section.places').append(
          `<article>
	    <div class='title_box'>
	      <h2>${place.name}</h2>
	      <div class='price_by_night'>$${place.price_by_night}</div>
	    </div>
	    <div class='information'>
	      <div class='max_guest'>
	        ${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}
	      </div>
	      <div class='number_rooms'>
	      	${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}
	      </div>
	      <div class='number_bathrooms'>
	        ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}
	      </div>
	    </div>
	      <div class='description'>
	        ${place.description}
	      </div>
	  </article>`
	)
      )
    },
    error: function (err) {
      console.error(err);
    }
  });
}
