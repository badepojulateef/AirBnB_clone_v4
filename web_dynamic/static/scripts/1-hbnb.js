$(document).ready(init);

function init () {
  const amenities = {};
  $("li input[type=checkbox]").change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    const names_of_amenities = Object.keys(names_of_amenities);
    $(".amenities h4").text(names_of_amenities.sort().join(", "));
  });
}
