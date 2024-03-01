gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.winebythebottle-item').forEach(item => {
    ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
            if (self.isActive) {
                const src = item.getAttribute('data-image-src');
                const text1 = item.getAttribute('data-text-type');
                const text2 = item.getAttribute('data-text-country');

                // Assuming you have elements with these IDs in your sticky element
                document.querySelector('#stickyImage').src = src; // Update image src
                document.querySelector('#stickyType').textContent = text1; // Update text
                document.querySelector('#stickyCountry').textContent = text2; // Update text
            }
        },
        markers: true, // Enable markers for debugging
        toggleActions: "play none none none"
    });
});