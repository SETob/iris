document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('wineSearch');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const wineItems = document.querySelectorAll('.winebythebottle-item');
        
        let encounteredDistricts = {};

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

                const district = wineDistrict;
                if (!encounteredDistricts[district]) {
                    encounteredDistricts[district] = true;
                    item.setAttribute('data-show-header', 'true');
                } else {
                    item.setAttribute('data-show-header', 'false');
                }

            } else {
                item.style.display = "none";  // hide the wine item
                item.setAttribute('data-show-header', 'false');
            }
        });
        
        structureHeaders();  // Re-run to restructure headers based on the search
    });
});
