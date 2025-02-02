fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
        
        // Now that the header is loaded, initialize the dropdown functionality
        initializeDropdowns();
    });

function initializeDropdowns() {
    console.log("Dropdown script running after header load!");

    document.querySelectorAll(".dropdown-toggle").forEach(button => {
        console.log("Found dropdown button:", button.innerText);

        button.addEventListener("click", function (event) {
            console.log("Button clicked:", this.innerText);

            const dropdownContent = this.nextElementSibling;
            if (!dropdownContent) {
                console.error("Dropdown content not found!");
                return;
            }

            dropdownContent.classList.toggle("show");
            console.log("Toggled show class");

            event.stopPropagation(); // Prevents closing when clicking the button
        });
    });

    document.addEventListener("click", function (event) {
        console.log("Clicked outside");

        document.querySelectorAll(".dropdown-content").forEach(dropdown => {
            if (!dropdown.previousElementSibling.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove("show");
                console.log("Dropdown closed");
            }
        });
    });
}
