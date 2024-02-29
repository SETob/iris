document.addEventListener("DOMContentLoaded", async function() {
    try{
        await Promise.all([
            displayWines(bottleConfig),
            displayWines(glassConfig)
        ]);
        setupScrolling();
    } catch (error) {
        console.error("There was an error loading the wines", error);
    }
    });
    
    function setupScrolling() {
        let currentVisibleLeftItem = null;
        let currentVisibleImageSrc = null;  // Keep track of the current visible image's source
    
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
            let wineItems = Array.from(document.querySelectorAll('.winebythebottle-item'));
            
            // Find the item closest to the middle of the viewport
            const centeredItem = wineItems.reduce((closest, currentItem) => {
                const bounding = currentItem.getBoundingClientRect();
                const centerOfCurrentItem = bounding.top +bounding.height / 2;
                const offsetDifference = Math.abs(window.innerHeight / 2 - centerOfCurrentItem);
                
                if (offsetDifference < closest.offset) {
                    return { element: currentItem, offset: offsetDifference };
                } else {
                    return closest;
                }
            }, { element: null, offset: Number.POSITIVE_INFINITY }).element;
    
            const wineLeftItem = centeredItem.querySelector('.wine-list-item-left');
            const imageElement = wineLeftItem.querySelector('img');
            const targetImageSrc = imageElement ? imageElement.src : null;
    
            if (currentVisibleImageSrc !== targetImageSrc) {
                if (currentVisibleLeftItem) {
                    fadeOut(currentVisibleLeftItem);
                }
                fadeIn(wineLeftItem);
                currentVisibleLeftItem = wineLeftItem;
                currentVisibleImageSrc = targetImageSrc;
            }
        }

        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => (inThrottle = false), limit);
                }
            };
        }
        
    
        window.addEventListener('scroll', throttle(handleScroll, 1000));

        window.addEventListener('scroll', () => {
            // Determine the user's current scroll position
            const scrollPosition = window.scrollY;
        
            // Find elements near the viewport
            document.querySelectorAll('.winebythebottle-item').forEach(item => {
                const itemPosition = item.offsetTop; // Get the distance from the top
        
                if (itemPosition < scrollPosition + window.innerHeight && itemPosition > scrollPosition - window.innerHeight) {
                    // If the item is near the viewport, make it sticky
                    item.querySelector('.sticky-left-div').style.position = 'sticky';
                } else {
                    // Otherwise, remove sticky positioning
                    item.querySelector('.sticky-left-div').style.position = 'static';
                }
            });
        });
    }
    

