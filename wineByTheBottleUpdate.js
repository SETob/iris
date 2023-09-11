fetch('https://raw.githubusercontent.com/SETob/iris/main/winelist110923-0923.json')
    .then(response => response.json())
    .then(wines => {
        // Create a fragment to temporarily hold our new items, for performance reasons
        let fragment = document.createDocumentFragment();

        wines.forEach(wine => {
            // Create a clone of the template element
            let item = document.querySelector('.winebythebottle-item').cloneNode(true);

            // Populate the attributes based on winelist-data
            for (let key in wine) {
                let element = item.querySelector(`[winelist-data="${key}"]`);

                // If there's an element matching the data key and it's an image element, set the source
                if (element && element.tagName === "IMG") {
                    element.src = wine[key];
                } 
                // Otherwise, set the text content
                else if (element) {
                    element.textContent = wine[key];
                }
            }

            // Append the populated item to the fragment
            fragment.appendChild(item);
        });

        // Append the fragment to the wine wrapper
        document.querySelector('.winebythebottle-wrapper').appendChild(fragment);

        // Remove the original template (or you can hide it with CSS/display: none to begin with)
        document.querySelector('.winebythebottle-item').remove();
    })
    .catch(error => {
        console.error('There was an error fetching or processing the JSON:', error);
    });
