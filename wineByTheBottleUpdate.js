fetch('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json')
    .then(response => response.json())
    .then(data => {
        const wineItemTemplate = document.querySelector('.winebythebottle-item');
        const wrapper = document.querySelector('.winebythebottle-wrapper');
        wrapper.innerHTML = ''; // clear the initial item if necessary

        data.forEach(wine => {
            const clonedItem = wineItemTemplate.cloneNode(true);

            for (let key in wine) {
                const dataElements = clonedItem.querySelectorAll(`[winelist-data="${key}"]`);
                dataElements.forEach(element => {
                    if (element.tagName.toLowerCase() === 'img') {
                        element.src = wine[key];
                    } else {
                        element.textContent = wine[key];
                    }
                });
            }

            wrapper.appendChild(clonedItem);
        });
    })
    .catch(error => {
        console.error('There was an error fetching or processing the JSON:', error);
    });
