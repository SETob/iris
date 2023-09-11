document.addEventListener("DOMContentLoaded", function() {
    async function displayWines(url) {
        const response = await fetch(url);
        const wines = await response.json();
        const wineContainer = document.querySelector('.winebythebottle-wrapper');
        const wineTemplateOriginal = document.querySelector('.winebythebottle-item');

        wines.forEach(wine => {
            const wineTemplate = wineTemplateOriginal.cloneNode(true);

            wineTemplate.querySelectorAll('[winelist-data]').forEach(element => {
                const attributeValue = element.getAttribute('winelist-data');
                if (wine[attributeValue]) {
                    element.textContent = wine[attributeValue];
                }
            });

            wineContainer.appendChild(wineTemplate);
        });
    }

    displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json');
});
