const resourcePath = "test-data.json";
const awesomeList = document.querySelector("#awesome-list-of-places");

function cleanUpData(rawData) {
  // The raw data contains check-ins that are not of interest
  // and are not pushed to the new list of relevant items
  const newList = [];

  rawData.forEach(function (item, index, array) {
    // Set up a flag to mark if item is of interest
    let interesting = true;
    // Check-ins without location? Not interesting
    if (item.venue_name == null) {
      interesting = false;
    }
    // Multiple beers at same venue same day? Flip flag!
    let previousItem = array[index - 1];
    if (index > 0) {
      if (item.venue_name == previousItem.venue_name) {
        interesting = false;
      }
    }
    // Make a new list of all interesting check-ins!
    if (interesting) {
      newList.push(item);
    }
  });

  // Pass this cleaned up list into createMarkup function
  createMarkup(newList);
}

function createMarkup(everywhere) {
  // Loop through the array, spot by spot and create markup
  // This is currently local json data in a tiny test file,
  // but should later on be sanitized for increased security
  let htmlString = "";
  for (let spot of everywhere) {
    htmlString += `
      <div class="place">
        <span class="location">${spot.venue_name}&ensp;</span>
        <span class="where">
          ${spot.venue_city ? spot.venue_city + "," : ""}
          ${spot.venue_country}</span>
      </div> 
    `;
  }
  awesomeList.innerHTML = htmlString;
}

function goAndFetchSomeData() {
  // Use the fetch() method to get data from the json file into this script,
  // returning a promise which is fulfilled when the response is available
  // and handle errors if something doesn't work
  fetch(resourcePath)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw response.status;
    })
    .then(function (data) {
      // Pass data into the cleanUpData function
      cleanUpData(data);
    })
    .catch(function (error) {
      console.warn(error);
    });
}

goAndFetchSomeData();
