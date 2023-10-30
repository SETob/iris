async function displayWines(url) {
    const response = await fetch(url);
    const wines = await response.json();

    wines.forEach(wine => {
        const wineTemplate = document.querySelector('.winebythebottle-item').cloneNode(true);

        wineTemplate.querySelectorAll('[winelist-data]').forEach(element => {
            const attributeValue = element.getAttribute('winelist-data');
            if (wine[attributeValue] !== undefined) { // Check if attribute exists in JSON
                if (wine[attributeValue] === null) {
                    // If the value is null, hide the element
                    element.style.display = 'none';
                } else {
                    // Otherwise, set the element's content
                    element.textContent = wine[attributeValue];
                }
            }
        });

        document.querySelector('.winebythebottle-wrapper').appendChild(wineTemplate);
    });

    // Once you've appended all wine items, execute the clone and structure functions
    cloneCountryValues();
    structureHeaders();
}

function structureHeaders() {
    let lastRegion = "", lastSubRegion = "", lastCountry = "";
    
    // Get all wine items
    let wineItems = document.querySelectorAll('.winebythebottle-item');
    
    // Loop through each wine item
    wineItems.forEach((item) => {
      if (item.style.display !== 'none') { // Only operate on visible items
        let region = item.querySelector('.district');
        let subRegion = item.querySelector('.sub-district');
        let country = item.querySelector('.country');
        
        const shouldShowHeader = item.getAttribute('data-show-header') === 'true';
        
        if (country && country.textContent === lastCountry && !shouldShowHeader) {
          country.remove();
        } else if (country) {
          lastCountry = country.textContent;
        }

        if (region && region.textContent === lastRegion && !shouldShowHeader) {
          region.remove();
        } else if (region) {
          lastRegion = region.textContent;
        }

        if (subRegion && subRegion.textContent === lastSubRegion && !shouldShowHeader) {
          subRegion.remove();
        } else if (subRegion) {
          lastSubRegion = subRegion.textContent;
        }
      }
    });
}

// Don't forget to call the displayWines function with your JSON URL
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json');
