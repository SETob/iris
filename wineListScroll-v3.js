document.addEventListener("DOMContentLoaded", function() {
    const stickyElementImage = document.querySelector('#stickyElement img'); // Assuming your sticky element has an img inside it
    const stickyType = document.querySelector('#stickyType'); // Text field 1
    const stickyCountry = document.querySelector('#stickyCountry'); // Text field 2

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
    });
});
