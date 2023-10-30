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
                        element.setAttribute('src', wine[attributeValue]);
                    } else {
                        element.textContent = wine[attributeValue];
                    }
                }
            }
        });

        document.querySelector('.winebythebottle-wrapper').appendChild(wineTemplate);
    });

    // Once you've appended all wine items, execute the clone and structure functions
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
    
    // Get all visible wine items
    let wineItems = document.querySelectorAll('.winebythebottle-item:not([style*="display: none"])');
    
    // Loop through each wine item
    wineItems.forEach((item, index) => {
        let region = item.querySelector('.district');
        let subRegion = item.querySelector('.sub-district');
        let country = item.querySelector('.country');
        let area = item.querySelector('.area');

        if(index === 0) {
            lastRegion = ""; lastSubRegion = ""; lastCountry = ""; lastArea = "";
        }

        // Handling Country
        if (country && country.textContent === lastCountry) {
            country.remove();
        } else if (country) {
            lastCountry = country.textContent;
        }

        // Handling Region
        if (region && region.textContent === lastRegion) {
            region.remove();
        } else if (region) {
            lastRegion = region.textContent;
        }

        // Handling Area
        if (area && area.textContent === lastArea) {
            area.remove();
        } else if (area) {
            lastArea = area.textContent;
        }

        // Handling Sub-Region
        if (subRegion && subRegion.textContent === lastSubRegion) {
            subRegion.remove();
        } else if (subRegion) {
            lastSubRegion = subRegion.textContent;
        }
    });
}

// Don't forget to call the displayWines function with your JSON URL
displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist.json');
