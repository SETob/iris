document.addEventListener('DOMContentLoaded', (event) => {
    const lastValues = {
        '.country': "",
        '.district': "",
        '.sub-district': ""
    };
    
    // Get all wine items
    const wineItems = document.querySelectorAll('.winebythebottle-item');
    
    // Loop through each wine item
    wineItems.forEach((item) => {
        for (let selector in lastValues) {
            const element = item.querySelector(selector);
            if (element && element.textContent === lastValues[selector]) {
                element.remove();
            } else if (element) {
                lastValues[selector] = element.textContent;
            }
        }
    });
});
