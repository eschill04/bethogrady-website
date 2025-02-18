document.addEventListener('DOMContentLoaded', () => {
    
    async function fetchInformation() {
        const filePath = "about/information.tsv";

        try {
            const response = await fetch(filePath);
            const text = await response.text();

            let content = {};
            const rows = text.split("\n").map(row => row.split("\t"));

            rows.forEach(row => {
                if (row.length >= 2) {
                    content[row[0].trim()] = row[1].trim();
                }
            });

            document.getElementById("about-text").innerText = content["About"] || "No content found.";
            document.getElementById("studio-text").innerText = content["Studio"] || "No content found.";
            document.getElementById("bio-text").innerText = content["Bio"] || "No content found.";

        } catch (error) {
            console.error("Error fetching local TSV file:", error);
        }
    }

    async function fetchList(type) {
        const filePath = `about/${type}.tsv`;

        try {
            const response = await fetch(filePath);
            const text = await response.text();
            let exhibitions = "";

            const rows = text.split("\n").map(row => row.split("\t"));

            rows.forEach((row, index) => {
                if (index === 0 || row.length < 2) return; // Skip header or incomplete rows
                exhibitions += `<li>${row[0].trim()} (${row[1].trim()})</li>`;
            });

            document.getElementById(`${type}-list`).innerHTML = exhibitions;

        } catch (error) {
            console.error(`Error fetching ${type} TSV file:`, error);
        }
    }

    fetchInformation();
    fetchList("exhibition");
    fetchList("publication");
});
