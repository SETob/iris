async function displayWines(url) {
    const response = await fetch(url);
    const wines = await response.json();

    wines.forEach(wine => {
        const wineTemplate = document.querySelector('.winebythebottle-item').cloneNode(true);

        wineTemplate.querySelectorAll('[winelist-data]').forEach(element => {
            const attributeValue = element.getAttribute('winelist-data');
            if (wine[attributeValue]) {
                // This will only update the elements inside the cloned wineTemplate
                element.textContent = wine[attributeValue];
            }
        });

        document.querySelector('.winebythebottle-wrapper').appendChild(wineTemplate);
    });
}

displayWines('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json');
