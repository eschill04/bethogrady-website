document.addEventListener("DOMContentLoaded", async () => {
    const page = document.body.dataset.gallery; // Get gallery type from HTML
    const galleryContainer = document.getElementById("gallery");
    const tsvPath = "gallery/gallery_info.tsv"; // Path to the CSV file

    if (!page) {
        console.error("No gallery type specified.");
        return;
    }

    async function loadGallery() {
        try {
            const response = await fetch(tsvPath);
            if (!response.ok) throw new Error("Failed to load gallery TSV");
    
            const text = await response.text();
            const rows = text.split("\n").map(row => row.split("\t")); // Split TSV into rows and columns
    
            const headers = rows[0]; // Extract column headers
            const categoryIndex = headers.length - 2; // Second-to-last column
            const folderIndex = headers.length - 3; // Third-to-last column
    
            for (const row of rows.slice(1)) { // Use for...of loop to ensure order
                if (row.length < headers.length) continue; // Skip invalid rows
                const category = row[categoryIndex].trim();
                const folderName = row[folderIndex].trim();
    
                if (category !== page) continue; // Only include images for the correct page
    
                const titleImage = `gallery/${category}/${folderName}/title_${folderName}.jpg`;
                const metadataPath = `gallery/${category}/${folderName}/Metadata.json`;
                console.log("Fetching metadata:", metadataPath); // Debugging
    
                const metadataResponse = await fetch(metadataPath);
                if (!metadataResponse.ok) {
                    console.error(`Error loading metadata: ${metadataPath} returned ${metadataResponse.status}`);
                    continue;
                }
    
                const metadata = await metadataResponse.json();
    
                const imgElement = document.createElement("img");
                imgElement.src = titleImage;
                imgElement.alt = metadata.imageTitle || "Artwork";
                imgElement.classList.add("gallery-image");
    
                imgElement.addEventListener("click", () => openPopup(folderName, category, metadata));
    
                galleryContainer.appendChild(imgElement);
            }
    
        } catch (error) {
            console.error("Error loading gallery:", error);
        }
    }
    

    function openPopup(folderName, category, metadata) {
        const fullImageSrc = `gallery/${category}/${folderName}/1_${folderName}.jpg`;
        const popupVideoIcon = document.getElementById("popup-video-icon");

        document.getElementById("popup-image").src = fullImageSrc;
        document.getElementById("popup-title").innerText = metadata.imageTitle || "Untitled";
        document.getElementById("popup-description").innerText = metadata.imageDescription || "No description available.";
        document.getElementById("popup-date").innerText = metadata.imageDate || "Unknown date";

        if (metadata.video && metadata.video.includes("youtube.com")) {
            popupVideoIcon.style.display = "block"; // Show video icon
            popupVideoIcon.href = metadata.video; // Make image clickable
        } else {
            popupVideoIcon.style.display = "none"; // Hide video icon if no video
            popupVideoIcon.removeAttribute("href"); // Remove link if no video
        }

        document.getElementById("popup").classList.add("show");
        
    }

    document.getElementById("popup-close").addEventListener("click", () => {
        document.getElementById("popup").classList.remove("show");
    });

    loadGallery();
});
