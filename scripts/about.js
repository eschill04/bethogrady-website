document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;

    function showSlides() {
        const slides = document.querySelectorAll('.slide');
        
        // Remove the "active" class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Increment slide index
        currentSlide++;

        // Reset to the first slide if at the end
        if (currentSlide > slides.length) {
            currentSlide = 1;
        }

        // Add the "active" class to the current slide
        slides[currentSlide - 1].classList.add('active');

        // Set the slideshow interval
        setTimeout(showSlides, 3000); // Change every 3 seconds
    }

    // Initialize slideshow
    showSlides();

    const sheetId = "1qJEYeTKL9V77fSJADUo6wTUvkOBpn_jZ5cTT7Iax46c";  
    const apiKey = "AIzaSyBAOs5p9WANUI48u1HeHxp3ztQZnbsdl4c";  // Public but restricted key :D 
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyACZ75mHIE36fblB0E_YlQ7j0Zk4aL5FbZbhL9C1f6d0uJrrYeMqGjL8IE_XakQm8JBw/exec";
    
    async function fetchInformation() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/information!A:B?key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            let content = {};
            data.values.forEach(row => {
                content[row[0]] = row[1];
            });
    
            document.getElementById("about-text").innerText = content["About"] || "No content found.";
            document.getElementById("studio-text").innerText = content["Studio"] || "No content found.";
            document.getElementById("bio-text").innerText = content["Bio"] || "No content found.";
    
        } catch (error) {
            console.error("Error fetching Google Sheet:", error);
        }
    }

    async function fetchList(type) {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${type}!A:B?key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            let exhibitions = "";

            data.values.forEach((row, index) => {
                if (index === 0) return; // Skip header
                exhibitions += `<li>${row[0]} (${row[1]})</li>`;
            });

            document.getElementById(`${type}-list`).innerHTML = exhibitions;
        } catch (error) {
            console.error("Error fetching exhibitions:", error);
        }
    }

    async function fetchPageImages() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/images!A:D?key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (!data.values) {
                console.error("No image data found.");
                return;
            }
    
            data.values.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                let sectionId = row[0];  // The ID of the image in HTML
                let fileId = row[3];   // The new file ID
                let altText = row[2] || "Artwork"; // Alt text (fallback if empty)

                console.log(fileId);
    
                let imgElement = document.getElementById(sectionId);
                if (imgElement) {
                    imgElement.src = `${scriptUrl}?id=${fileId}`;
                    imgElement.alt = altText;
                } else {
                    console.warn(`No image found in HTML with ID: ${sectionId}`);
                }
            });
    
        } catch (error) {
            console.error("Error fetching page images:", error);
        }
    }

    fetchInformation();
    fetchList("exhibition");
    fetchList("publication");
    fetchPageImages();
});
