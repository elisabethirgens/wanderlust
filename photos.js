const resourcePath = "test-data.json";
//  const resourcePath = "raw-data-export.json";
const theGallery = document.querySelector("#all-the-photos");
const awesomeList = document.querySelector("#awesome-list-of-places");

function cleanUpData(rawData) {
  // The raw data contains check-ins without photos that are not of interest
  const newList = [];
  rawData.forEach(function (item, index, array) {
    if (item.photo_url) {
      newList.push(item);
    }
  });
  // Pass new cleaned up list into function to create markup for gallery
  createGallery(newList);
}

function createGallery(everything) {
  let galleryMarkup = "";
  let copyToReverse = Array.from(everything);
  for (let item of copyToReverse.reverse()) {
    if (item.photo_url) {
      galleryMarkup += `
        <img 
          src="${item.photo_url}" class="photo"
          alt="${item.venue_name}" />
      `;
    }
  }
  theGallery.innerHTML = galleryMarkup;
}

function goFetchSomeData() {
  fetch(resourcePath)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw response.status;
    })
    .then(function (data) {
      // Pass raw data into function to clean up data
      cleanUpData(data);
    })
    .catch(function (error) {
      console.warn(error);
    });
}

goFetchSomeData();
