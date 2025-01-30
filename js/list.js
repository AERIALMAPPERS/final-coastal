function myFunction() {
    var input, filter, allDistricts, district, ul, li, a, i, j, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    allDistricts = document.querySelectorAll('#districts .district');

    // Loop through each district
    allDistricts.forEach(district => {
        ul = district.getElementsByTagName("ul")[0]; // Get the <ul> for this district
        li = ul.getElementsByTagName("li");
        let hasVisibleItems = false; // Flag to check if any village matches

        // Check if the district name matches the search query
        const districtName = district.getElementsByTagName("h3")[0];
        if (districtName) {
            txtValue = districtName.textContent || districtName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                district.style.display = ""; // Show the district if the name matches
                hasVisibleItems = true;
            } else {
                district.style.display = "none"; // Hide district if no match
            }
        }

        // Loop through all list items in the district
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;

            // Check if village matches the search input
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = ""; // Show village if it matches
                hasVisibleItems = true; // Set the flag to true
            } else {
                li[i].style.display = "none"; // Hide village if it doesn't match
            }
        }

        // Show or hide the district based on whether any items are visible
        if (hasVisibleItems) {
            district.style.display = ""; // Show the district if any village matches
        } else {
            district.style.display = "none"; // Hide the district if no villages match
        }
    });
}

// Clear Button functionality
document.getElementById("clearBtn").addEventListener("click", function () {
    // Clear the search input
    document.getElementById("myInput").value = "";

    // Show all districts and their villages again
    let allDistricts = document.querySelectorAll('#districts .district');
    allDistricts.forEach(district => {
        district.style.display = ""; // Reset district visibility
        let li = district.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = ""; // Reset all village visibility
        }
    });
});