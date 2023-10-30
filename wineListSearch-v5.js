document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('wineSearch');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();

        const wineItems = document.querySelectorAll('.winebythebottle-item');

        wineItems.forEach(item => {
            let wineName = item.querySelector('[winelist-data="stringName"]');
            let wineProducer = item.querySelector('[winelist-data="stringProducer"]');
            let wineVintage = item.querySelector('[winelist-data="stringVintage"]');
            let wineDistrict = item.querySelector('[winelist-data="stringDistrict"]');
            let wineSubDistrict = item.querySelector('[winelist-data="stringSubDistrict"]');
            let wineCountry = item.querySelector('[winelist-data="stringCountry"]');

            wineName = wineName ? wineName.textContent.toLowerCase() : "";
            wineProducer = wineProducer ? wineProducer.textContent.toLowerCase() : "";
            wineVintage = wineVintage ? wineVintage.textContent.toLowerCase() : "";
            wineDistrict = wineDistrict ? wineDistrict.textContent.toLowerCase() : "";
            wineSubDistrict = wineSubDistrict ? wineSubDistrict.textContent.toLowerCase() : "";
            wineCountry = wineCountry ? wineCountry.textContent.toLowerCase() : "";

            if (wineName.includes(query) || 
                wineProducer.includes(query) ||
                wineVintage.includes(query) ||
                wineDistrict.includes(query) ||
                wineSubDistrict.includes(query) ||
                wineCountry.includes(query)) {
                item.style.display = "";  // show the wine item
            } else {
                item.style.display = "none";  // hide the wine item
            }
        });

        // Re-structure the headers based on the current search result
        structureHeadersForSearch();
    });

});

function structureHeadersForSearch() {
  let lastRegion = "", lastSubRegion = "", lastCountry = "", lastArea = "";

  // Get all visible wine items
  let wineItems = document.querySelectorAll('.winebythebottle-item:not([style*="display: none"])');

  // Reset headers on all items
  wineItems.forEach((item) => {
    let region = item.querySelector('.district');
    let subRegion = item.querySelector('.sub-district');
    let country = item.querySelector('.country');
    let area = item.querySelector('.area');

    if (region) region.style.display = "";
    if (subRegion) subRegion.style.display = "";
    if (country) country.style.display = "";
    if (area) area.style.display = "";
  });

  // Loop through each visible wine item to structure headers
  wineItems.forEach((item, index) => {
    let region = item.querySelector('.district');
    let subRegion = item.querySelector('.sub-district');
    let country = item.querySelector('.country');
    let area = item.querySelector('.area');

    if (region && region.textContent === lastRegion) {
      region.style.display = "none";
    } else if (region) {
      lastRegion = region.textContent;
    }

    if (subRegion && subRegion.textContent === lastSubRegion) {
      subRegion.style.display = "none";
    } else if (subRegion) {
      lastSubRegion = subRegion.textContent;
    }

    if (country && country.textContent === lastCountry) {
      country.style.display = "none";
    } else if (country) {
      lastCountry = country.textContent;
    }

    if (area && area.textContent === lastArea) {
      area.style.display = "none";
    } else if (area && area.textContent.trim() === "Area") {
      area.style.display = "none";
    } else if (area) {
      lastArea = area.textContent;
    }
  });
}
