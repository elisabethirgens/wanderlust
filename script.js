const resourcePath = "test-data.json";
const awesomeList = document.querySelector("#awesome-list-of-places");

function cleanUpData(rawData) {
  // The raw data contains check-ins that are not of interest
  // and are not pushed to the new list of relevant items
  const newList = [];

  rawData.forEach(function (item) {
    if (item.venue_name !== null) {
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
        <span>${spot.venue_name}<span> /
        <span>${spot.venue_city}<span> /
        <span>${spot.venue_country}<span>
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
