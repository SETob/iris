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
}

displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json');
