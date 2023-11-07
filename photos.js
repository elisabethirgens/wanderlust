const resourcePath = "test-data.json";
//  const resourcePath = "raw-data-export.json";
const theGallery = document.querySelector("#all-the-photos");
const newList = [];

function cleanUpData(rawData) {
  // The raw data contains check-ins without photos that are not of interest
  rawData.forEach(function (item, index, array) {
    if (item.photo_url) {
      newList.push(item);
    }
  });

  // Pass new cleaned up list into functions
  createGallery(newList);
  // downloadPhotos(newList); // uncomment to call 🤠
}

// Not sure I need to use this function again, it might have done its job
// https://elisabethirgens.github.io/notes/2023/11/free-my-photos/
function downloadPhotos() {
  newList.forEach(function (item, index) {
    fetchWithAnchorElement(item, index);

    async function fetchWithAnchorElement() {
      const img = await fetch(item.photo_url);
      console.log(item);
      const imgBlob = await img.blob();
      const imgUrl = URL.createObjectURL(imgBlob);

      const anchor = document.createElement("a");
      anchor.href = imgUrl;
      anchor.download = `beer${index}.jpg`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  });
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
