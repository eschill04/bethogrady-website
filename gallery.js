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
