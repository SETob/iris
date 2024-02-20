async function displayWines(config) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(config.url);
            const wines = await response.json();

            wines.forEach(wine => {
                const wineTemplate = document.querySelector(config.templateSelector).cloneNode(true);

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

                document.querySelector(config.wrapperSelector).appendChild(wineTemplate);
            });

            cloneCountryValues(config);
            structureHeaders(config);
            removeDoubleName(config);
            resolve();
        } catch (error) {
            reject(error);
        }

    });

}

function cloneCountryValues(config) {
    const wineItems = document.querySelectorAll(config.itemSelector);

    wineItems.forEach((item) => {
        const sourceElement = item.querySelector('[winelist-data="stringCountry"]');
        const targetElement = item.querySelector('[winelist-data="stringCountryClone"]');

        if (sourceElement && targetElement) {
            targetElement.textContent = sourceElement.textContent;
        }
    });
}


function removeDoubleName(config) {
    let wineItems = document.querySelectorAll(config.itemSelector);

    wineItems.forEach((item) => {
        let nameElement = item.querySelector('.name');
        let producerElement = item.querySelector('.producer');

        // Check if both elements exist
        if (nameElement && producerElement) {
            // Compare their text content
            let nameText = nameElement.textContent.trim();
            let producerText = producerElement.textContent.trim();

            // Define "similar" - for now, we use exact equality
            if (nameText === producerText) {
                nameElement.style.display = 'none';
            }
        }
    });
}

function structureHeaders(config) {
    let wineItems = document.querySelectorAll(config.itemSelector);
    let lastRegion = "", lastSubRegion = "", lastCountry = "", lastArea = "", lastWineType = "", lastAvecType = "", lastBeerType ="";

    // Get all wine items, even those that are not currently displayed

    // Loop through each wine item
    wineItems.forEach((item, index) => {
        let region = item.querySelector('.district');
        let subRegion = item.querySelector('.sub-district');
        let country = item.querySelector('.country');
        let area = item.querySelector('.area');
        let wineType = item.querySelector('.wine-type-text');
        let avecType = item.querySelector('.avec-type');
        let beerType = item.querySelector('.avec-type');
        

        // Reset the display style for all headers
        if (region) region.style.display = "";
        if (subRegion) subRegion.style.display = "";
        if (country) country.style.display = "";
        if (area) area.style.display = "";
        if (wineType) wineType.style.display = "";
        if (avecType) avecType.style.display = "";
        if (beerType) beerType.style.display = "";

        if (index === 0) {
            lastRegion = ""; lastSubRegion = ""; lastCountry = ""; lastArea = ""; lastWineType = ""; lastAvecType = "";
        }

        // Handling Country
        if (country && country.textContent === lastCountry) {
            country.style.display = 'none';
        } else if (country) {
            lastCountry = country.textContent;
        }

        // Handling wine type
        if (wineType && wineType.textContent === lastWineType) {
            wineType.style.display = 'none';
        } else if (wineType) {
            lastWineType = wineType.textContent;
        }

        // Handling Region
        if (region && region.textContent === lastRegion) {
            region.style.display = 'none';
        } else if (region) {
            lastRegion = region.textContent;
        }

        // Handling Area
        if (area && area.textContent === lastArea) {
            area.style.display = 'none';
        } else if (area && area.textContent === "Area") {
            area.style.display = 'none';
        }
         else if (area) {
            lastArea = area.textContent;
        }

        // Handling avec type
        if (avecType && avecType.textContent === lastAvecType) {
            avecType.style.display = 'none';
        } else if (avecType) {
            lastAvecType = avecType.textContent;
        }
        // Handling avec type
        if (beerType && beerType.textContent === lastBeerType) {
            beerType.style.display = 'none';
        } else if (beerType) {
            lastBeerType = beerType.textContent;
        }

        // Handling Sub-Region
        if (subRegion && subRegion.textContent === lastSubRegion) {
            subRegion.style.display = 'none';
        } else if (subRegion) {
            lastSubRegion = subRegion.textContent;
        }
    });
}
const bottleConfig = {
    url: 'https://raw.githubusercontent.com/SETob/iris/main/winelist.json',
    templateSelector: '.winebythebottle-item',
    wrapperSelector: '.winebythebottle-wrapper',
    itemSelector: '.winebythebottle-item'
};

// Configuration for "Wine by the glass"
const glassConfig = {
    url: 'https://raw.githubusercontent.com/SETob/iris/main/winelist-bytheglass.json',
    templateSelector: '.winebytheglass-item',
    wrapperSelector: '.winebytheglass-wrapper',
    itemSelector: '.winebytheglass-item'
};

// Configuration for "Wine by the glass"
const avecConfig = {
    url: 'https://raw.githubusercontent.com/SETob/iris/main/aveclist.json',
    templateSelector: '.avec-item',
    wrapperSelector: '.avec-wrapper',
    itemSelector: '.avec-item'
};

const cocktailConfig = {
    url: 'https://raw.githubusercontent.com/SETob/iris/main/cocktaillist.json',
    templateSelector: '.cocktail-item',
    wrapperSelector: '.cocktail-wrapper',
    itemSelector: '.cocktail-item'
};

const beerConfig = {
    url: 'https://raw.githubusercontent.com/SETob/iris/main/beerlist.json',
    templateSelector: '.beer-item',
    wrapperSelector: '.beer-wrapper',
    itemSelector: '.beer-item'
};
// Fetch and display the wines
displayWines(avecConfig);
displayWines(cocktailConfig);
displayWines(beerConfig);