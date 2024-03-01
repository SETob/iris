async function displayWines(config) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(config.url);
      const wines = await response.json();

      wines.forEach((wine) => {
        const wineTemplate = document
          .querySelector(config.templateSelector)
          .cloneNode(true);

        // Set data attributes for the wine template itself, assuming 'imageSrc', 'text1', and 'text2' are the keys in your JSON object
        // Adjust the keys according to your actual JSON structure
        if (wine.stringMap)
          wineTemplate.setAttribute("data-image-src", wine.stringMap); // Assuming 'imageSrc' is your image URL in the JSON
        if (wine.stringWineStyle)
          wineTemplate.setAttribute("data-text-type", wine.stringWineStyle); // Assuming 'text1' is a key in your JSON
        if (wine.stringCountry)
          wineTemplate.setAttribute("data-text-country", wine.stringCountry); // Assuming 'text2' is another key in your JSON

        wineTemplate.querySelectorAll("[winelist-data]").forEach((element) => {
          const attributeValue = element.getAttribute("winelist-data");
          if (wine[attributeValue] !== undefined) {
            if (wine[attributeValue] === null) {
              element.style.display = "none";
            } else {
              element.textContent = wine[attributeValue];
            }
          }
        });

        document
          .querySelector(config.wrapperSelector)
          .appendChild(wineTemplate);
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
    const targetElement = item.querySelector(
      '[winelist-data="stringCountryClone"]'
    );

    if (sourceElement && targetElement) {
      targetElement.textContent = sourceElement.textContent;
    }
  });
}

function removeDoubleName(config) {
  let wineItems = document.querySelectorAll(config.itemSelector);

  wineItems.forEach((item) => {
    let nameElement = item.querySelector(".name");
    let producerElement = item.querySelector(".producer");

    // Check if both elements exist
    if (nameElement && producerElement) {
      // Compare their text content
      let nameText = nameElement.textContent.trim();
      let producerText = producerElement.textContent.trim();

      // Define "similar" - for now, we use exact equality
      if (nameText === producerText) {
        nameElement.style.display = "none";
      }
    }
  });
}

function structureHeaders(config) {
  let wineItems = document.querySelectorAll(config.itemSelector);
  let lastRegion = "",
    lastSubRegion = "",
    lastCountry = "",
    lastArea = "",
    lastWineType = "",
    lastAvecType = "",
    lastBeerType = "",
    lastwineTypeMobile = "";

  // Get all wine items, even those that are not currently displayed

  // Loop through each wine item
  wineItems.forEach((item, index) => {
    let region = item.querySelector(".district");
    let subRegion = item.querySelector(".sub-district");
    let country = item.querySelector(".country");
    let area = item.querySelector(".area");
    let wineType = item.querySelector(".wine-type-text");
    let avecType = item.querySelector(".avec-type");
    let beerType = item.querySelector(".beer-type");
    let wineTypeMobile = item.querySelector(".wine-type-mobile");

    // Reset the display style for all headers
    if (region) region.style.display = "";
    if (subRegion) subRegion.style.display = "";
    if (country) country.style.display = "";
    if (area) area.style.display = "";
    if (wineType) wineType.style.display = "";
    if (avecType) avecType.style.display = "";
    if (beerType) beerType.style.display = "";
    if (wineTypeMobile) wineTypeMobile.style.display = "";

    if (index === 0) {
      lastRegion = "";
      lastSubRegion = "";
      lastCountry = "";
      lastArea = "";
      lastWineType = "";
      lastAvecType = "";
      lastBeerType = "";
      lastwineTypeMobile = "";
    }

    // Handling Country
    if (country && country.textContent === lastCountry) {
      country.style.display = "none";
    } else if (country) {
      lastCountry = country.textContent;
    }

    // Handling wine type
    if (wineType && wineType.textContent === lastWineType) {
      wineType.style.display = "none";
    } else if (wineType) {
      lastWineType = wineType.textContent;
    }
    // Handling wine type
    if (wineTypeMobile && wineTypeMobile.textContent === lastwineTypeMobile) {
      wineTypeMobile.style.display = "none";
    } else if (wineTypeMobile) {
      lastwineTypeMobile = wineTypeMobile.textContent;
    }

    // Handling Region
    if (region && region.textContent === lastRegion) {
      region.style.display = "none";
    } else if (region && region.textContent === "District") {
      region.style.display = "none";
    } else if (region) {
      lastRegion = region.textContent;
    }

    // Handling Area
    if (area && area.textContent === lastArea) {
      area.style.display = "none";
    } else if (area && area.textContent === "Area") {
      area.style.display = "none";
    } else if (area) {
      lastArea = area.textContent;
    }

    // Handling avec type
    if (avecType && avecType.textContent === lastAvecType) {
      avecType.style.display = "none";
    } else if (avecType) {
      lastAvecType = avecType.textContent;
    }
    // Handling avec type
    if (beerType && beerType.textContent === lastBeerType) {
      beerType.style.display = "none";
    } else if (beerType) {
      lastBeerType = beerType.textContent;
    }

    // Handling Sub-Region
    if (subRegion && subRegion.textContent === lastSubRegion) {
      subRegion.style.display = "none";
    } else if (subRegion) {
      lastSubRegion = subRegion.textContent;
    }
  });
}
const bottleConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/winelist.json",
  templateSelector: ".winebythebottle-item",
  wrapperSelector: ".winebythebottle-wrapper",
  itemSelector: ".winebythebottle-item",
};

// Configuration for "Wine by the glass"
const glassConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/winelist-bytheglass.json",
  templateSelector: ".winebytheglass-item",
  wrapperSelector: ".winebytheglass-wrapper",
  itemSelector: ".winebytheglass-item",
};

// Configuration for "Wine by the glass"
const avecConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/aveclist.json",
  templateSelector: ".avec-item",
  wrapperSelector: ".avec-wrapper",
  itemSelector: ".avec-item",
};

const cocktailConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/cocktaillist.json",
  templateSelector: ".cocktail-item",
  wrapperSelector: ".cocktail-wrapper",
  itemSelector: ".cocktail-item",
};

const beerConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/beerlist.json",
  templateSelector: ".beer-item",
  wrapperSelector: ".beer-wrapper",
  itemSelector: ".beer-item",
};

const coffeeConfig = {
  url: "https://raw.githubusercontent.com/SETob/iris/main/coffeetealist.json",
  templateSelector: ".coffee-item",
  wrapperSelector: ".coffee-wrapper",
  itemSelector: ".coffee-item",
};

async function loadAllConfigs() {
  try {
    await displayWines(bottleConfig);
    await displayWines(avecConfig);
    await displayWines(cocktailConfig);
    await displayWines(beerConfig);
    await displayWines(coffeeConfig);
    await displayWines(glassConfig);

    document.getElementById("pageLoader").style.display = "none";
    document.body.classList.remove("no-scroll");
    console.log("All configs loaded!");
    
    

    gsap.registerPlugin(ScrollTrigger);

    // Setup a single ScrollTrigger for the whole page
    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            // This function is called whenever the scroll position updates
            updateStickyContentBasedOnCurrentScrollPosition(self);
        },
        markers: true // For debugging purposes
    });
    
    function updateStickyContentBasedOnCurrentScrollPosition(scrollTrigger) {
        const viewportHeight = window.innerHeight;
        const centerViewport = viewportHeight / 2 + scrollTrigger.scroll();
    
        let closestItem = null;
        let closestDistance = Infinity;
    
        document.querySelectorAll('.winebythebottle-item').forEach(item => {
            const itemBounds = item.getBoundingClientRect();
            const itemCenter = itemBounds.top + scrollTrigger.scroll() + itemBounds.height / 2;
    
            const distance = Math.abs(itemCenter - centerViewport);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });
    
        if (closestItem) {
            const src = closestItem.getAttribute('data-image-src');
            const text1 = closestItem.getAttribute('data-text-type');
            const text2 = closestItem.getAttribute('data-text-country');
    
            // Assuming you have elements with these IDs in your sticky element
            const stickyImage = document.querySelector('#stickyImage');
            const stickyText1 = document.querySelector('#stickyType');
            const stickyText2 = document.querySelector('#stickyCountry');
    
            if (stickyImage) stickyImage.src = src;
            if (stickyText1) stickyText1.textContent = text1;
            if (stickyText2) stickyText2.textContent = text2;
        }
    }
    




    
  } catch (error) {
    console.error("Error loading configs:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAllConfigs);

function winelistScroll() {
    console.log("Some item observed");
    const stickyElementImage = document.querySelector('#stickyElement img'); // Assuming your sticky element has an img inside it
    const stickyType = document.querySelector('#stickyType'); // Text field 1
    const stickyCountry = document.querySelector('#stickyCountry'); // Text field 2

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            const targetCenterY = entry.boundingClientRect.top + (entry.boundingClientRect.height / 2);
            const viewportCenterY = entry.rootBounds.top + (entry.rootBounds.height / 2);
            
            // Determine how close to the center the item needs to be to trigger the change
            const proximityToCenter = Math.abs(targetCenterY - viewportCenterY); // Distance from center
            // Determine a threshold for how close to the center the item must be to trigger updates
            // This value might need tweaking based on your layout
            const activationDistance = 50; // pixels

            console.log(targetCenterY, viewportCenterY, activationDistance, proximityToCenter);

            if (entry.isIntersecting && proximityToCenter <= activationDistance) {
                // The center of the item is within 50 pixels of the viewport center
                console.log('An item is entering');
                // Get the data attributes of the intersecting item
                const src = entry.target.getAttribute('data-image-src');
                const text1 = entry.target.getAttribute('data-text-type');
                const text2 = entry.target.getAttribute('data-text-country');

                // Update the sticky element with these attributes
                stickyElementImage.src = src;
                stickyType.textContent = text1;
                stickyCountry.textContent = text2;
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.5 // Adjust as needed to determine when an item is considered "in view"
    });

    // Assuming each wine item has a class `wine-item`
    document.querySelectorAll('.winebythebottle-item').forEach(item => {
        observer.observe(item);
        console.log("observer running");
    });
};

