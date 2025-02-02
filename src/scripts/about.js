import { API_KEY } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
const sheetId = "1qJEYeTKL9V77fSJADUo6wTUvkOBpn_jZ5cTT7Iax46c";  
    
    async function fetchInformation() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/information!A:B?key=${API_KEY}`;
    
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
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${type}!A:B?key=${API_KEY}`;

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

    // async function fetchPageImages() {
    //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/images!A:D?key=${apiKey}`;
    
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();
    
    //         if (!data.values) {
    //             console.error("No image data found.");
    //             return;
    //         }
    
    //         data.values.forEach((row, index) => {
    //             if (index === 0) return; // Skip header row
    //             let sectionId = row[0];  // The ID of the image in HTML
    //             let fileId = row[3];   // The new file ID
    //             let altText = row[2] || "Artwork"; // Alt text (fallback if empty)

    //             console.log(fileId);
    
    //             let imgElement = document.getElementById(sectionId);
    //             if (imgElement) {
    //                 imgElement.src = `${scriptUrl}?id=${fileId}`;
    //                 imgElement.alt = altText;
    //             } else {
    //                 console.warn(`No image found in HTML with ID: ${sectionId}`);
    //             }
    //         });
    
    //     } catch (error) {
    //         console.error("Error fetching page images:", error);
    //     }
    // }

    fetchInformation();
    fetchList("exhibition");
    fetchList("publication");
    // fetchPageImages();
});
