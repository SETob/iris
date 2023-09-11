document.addEventListener('DOMContentLoaded', (event) => {
    let lastRegion = "", lastSubRegion = "", lastCountry = "";
    
    // Get all wine items
    let wineItems = document.querySelectorAll('.wine-list-item-v2');
    
    // Loop through each wine item
    wineItems.forEach((item) => {
      let region = item.querySelector('.district');
      let subRegion = item.querySelector('.sub-district');
      let country = item.querySelector('.country');
      
      if (country && country.textContent === lastCountry) {
      	country.remove();
        } else if (country) {
        lastCountry = country.textContent;
        }
      
      // If this region matches the last one, remove it
      if (region && region.textContent === lastRegion) {
        region.remove();
      } else if (region) {
        lastRegion = region.textContent;
      }
      
      // Do the same for sub-regions
      if (subRegion && subRegion.textContent === lastSubRegion) {
        subRegion.remove();
      } else if (subRegion) {
        lastSubRegion = subRegion.textContent;
      }
    });
  });