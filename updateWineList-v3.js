async function displayWines(url) {

    const response = await fetch(url);
    const wines = await response.json();

    wines.forEach(wine => {
        const wineTemplate = document.querySelector('.winebythebottle-item').cloneNode(true);

        wineTemplate.querySelectorAll('[winelist-data]').forEach(element => {
            const attributeValue = element.getAttribute('winelist-data');
            if (wine[attributeValue] !== undefined) { 
                if (wine[attributeValue] === null) {
                    element.style.display = 'none';
                } else {
                    if (element.tagName === 'IMG' && attributeValue === 'stringMap') {
                        console.log("Setting image src for", attributeValue, "to", wine[attributeValue]);  // Log the image src being set
                        element.setAttribute('src', wine[attributeValue]);
                    } else {
                        element.textContent = wine[attributeValue];
                    }
                }
            }
        });




        document.querySelector('.winebythebottle-wrapper').appendChild(wineTemplate);
    });

    // Once you've appended all wine items, execute the clone functionality
    cloneCountryValues();
    structureHeaders();
}

function cloneCountryValues() {
    const wineItems = document.querySelectorAll('.winebythebottle-item');
    
    wineItems.forEach((item) => {
        const sourceElement = item.querySelector('[winelist-data="stringCountry"]');
        const targetElement = item.querySelector('[winelist-data="stringCountryClone"]');
        
        if (sourceElement && targetElement) {
            targetElement.textContent = sourceElement.textContent;
        }
    });
}

function structureHeaders() {
    let lastRegion = "", lastSubRegion = "", lastCountry = "", lastArea = "";
    
    // Get all wine items
    let wineItems = document.querySelectorAll('.winebythebottle-item');
    
    // Loop through each wine item
    wineItems.forEach((item) => {
      let region = item.querySelector('.district');
      let subRegion = item.querySelector('.sub-district');
      let country = item.querySelector('.country');
        let area = item.querySelector('.area');
      
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

        // If this area matches the last one, remove it
      if (area && area.textContent === lastArea) {
        area.remove();
      } else if (area) {
        lastArea = area.textContent;
      }
      
      // Do the same for sub-regions
      if (subRegion && subRegion.textContent === lastSubRegion) {
        subRegion.remove();
      } else if (subRegion) {
        lastSubRegion = subRegion.textContent;
      }
    });
  };
  
  
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist.json');
