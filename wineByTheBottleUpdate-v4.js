async function displayWines(url, itemSelector, wrapperSelector) {
    const response = await fetch(url);
    const wines = await response.json();

    wines.forEach(wine => {
        const wineTemplate = document.querySelector(itemSelector).cloneNode(true);

        wineTemplate.querySelectorAll('[winelist-data]').forEach(element => {
            const attributeValue = element.getAttribute('winelist-data');
            
            // If the JSON value for any field is null or undefined, hide the corresponding element
            if (wine[attributeValue] == null) {
                element.style.display = 'none';
            } else {
                element.textContent = wine[attributeValue];
                
                // If the attribute is an image URL, set it as the source for an img element
                if (attributeValue === "stringMap") {
                    element.src = wine[attributeValue];
                }
            }
        });

        document.querySelector(wrapperSelector).appendChild(wineTemplate);
    });
}

// Usage:
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist.json', '.winebythebottle-item', '.winebythebottle-wrapper');
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist.json', '.winebytheglass-item', '.winebytheglass-wrapper');


    // Once you've appended all wine items, execute the clone functionality
    cloneCountryValues();
    structureHeaders();

function cloneCountryValues() {
    const sourceElements = document.querySelectorAll('[winelist-data="stringCountry"]');
    const targetElements = document.querySelectorAll('[winelist-data="stringCountryClone"]');

    sourceElements.forEach((sourceElement, index) => {
        const valueToCopy = sourceElement.textContent;
        if(targetElements[index]) {
            targetElements[index].textContent = valueToCopy;
        }
    });
};

function structureHeaders() {
    let lastRegion = "", lastSubRegion = "", lastCountry = "";
    
    // Get all wine items
    let wineItems = document.querySelectorAll('.winebythebottle-item');
    
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
  };
  
  
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist.json');
