document.addEventListener("DOMContentLoaded", function() {
    let currentVisibleLeftItem = null; // Keep track of the currently visible wine-list-item-left

    // Helper function to determine if an element is in the viewport
    function isInViewport(element, offset = 0) {
        const bounding = element.getBoundingClientRect();
        return (bounding.top + offset) >= 0 && (bounding.bottom - offset) <= (window.innerHeight || document.documentElement.clientHeight);
    }

    function fadeIn(element) {
        element.style.opacity = '1';
    }

    function fadeOut(element) {
        element.style.opacity = '0';
    }

    function handleScroll() {
        let wineItems = document.querySelectorAll('.winebythebottle-item');
        
        wineItems.forEach((item) => {
            const wineLeftItem = item.querySelector('.wine-list-item-left');
            const imageElement = wineLeftItem.querySelector('img');
            const currentImgSrc = imageElement ? imageElement.src : null;

            // If the current wine item is in the middle of the viewport
            if (isInViewport(item, window.innerHeight / 2)) {
                // If there's no currently visible wine-list-item-left or its image is different from the current one
                if (!currentVisibleLeftItem || (currentVisibleLeftItem.querySelector('img').src !== currentImgSrc)) {
                    // Fade out the previous one
                    if (currentVisibleLeftItem) {
                        fadeOut(currentVisibleLeftItem);
                    }

                    // Update the currently visible wine-list-item-left
                    currentVisibleLeftItem = wineLeftItem;
                    fadeIn(currentVisibleLeftItem);
                }
            }
        });
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
});
