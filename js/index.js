  function setActive(index) {
    // Get all navigation items
    var navItems = document.querySelectorAll('nav a');

    // Remove the 'active' class from all items
    navItems.forEach(function(item) {
      item.classList.remove('active');
    });

    // Add the 'active' class to the selected item
    navItems[index].classList.add('active');
  }

  
// live date update
// JavaScript to update the date in real-time
function updateLiveDate() {
  var now = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  var formattedDate = now.toLocaleDateString('en-US', options);
  document.getElementById('liveDate').textContent = formattedDate;
}
// Update the date immediately and then every second
updateLiveDate();
setInterval(updateLiveDate, 1000);



// slide images for banner
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}
 // Automatically change slides every 1500 milliseconds (1.5 seconds)
 setInterval(function () {
    plusSlides(1);
  }, 3000);
  //about
  function showAbout(){
    window.location.href='./about.html';
  }

  
  // services
  function showService(){
    window.location.href='./service.html';
  }

 // Features
 function showFeatures(){
  window.location.href='./features.html';
}
 /////////////////////////////////////////////region////////////////////////////////////////////////////


 function displayImageAndHighlight(imageUrl, area) {
  displayImage(imageUrl);
  highlightArea(area);
}

function displayImage(imageUrl) {
  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageUrl;
  displayedImage.style.display = "block";
}

function highlightArea(area) {
  var displayedImage = document.getElementById("displayedImage");
  var imageWidth = displayedImage.width;
  var imageHeight = displayedImage.height;

  var canvas = document.createElement("canvas");
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  var ctx = canvas.getContext("2d");

  displayedImage.onload = function() {
      ctx.drawImage(displayedImage, 0, 0, imageWidth, imageHeight);
      if (area === 'district1') {
          // Define coordinates for district 1 boundary
          // Example coordinates: x1, y1, x2, y2, ...
          var coords = [100, 100, 200, 200, 300, 150]; // Update with actual coordinates
          drawPolygon(ctx, coords);
      } else if (area === 'district2') {
          // Define coordinates for district 2 boundary
          var coords = [150, 250, 250, 350, 200, 400]; // Update with actual coordinates
          drawPolygon(ctx, coords);
      }
      // Add more conditions for other districts if needed
      displayedImage.src = canvas.toDataURL();
  };
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("regionButton").addEventListener("click", function() {
      displayRegions();
  });
});



function displayImage(imageUrl) {
  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageUrl;
}

function displayImage(event, imageUrl) {
  event.preventDefault(); // Prevent the default action of anchor tag (page refresh)

  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageUrl;
}
/////////////////////////////////////////////////REgino end//////////////////////////////
///////////////////////////news/////////////////////////

 // Example news data (you can fetch this dynamically using APIs or a backend)
 const newsData = [
  { title: "Coastal Water Quality Buoy Data Network", date: "21/11/2022 - 3:30pm", link: "https://www.nccr.gov.in/nccrtems2/home.aspx" },
  { title: "India Mangrove Conclave (IMC) 2024", date: "30/10/2024 - 10:15am", link: "https://www.cifor-icraf.org/event/mangrove-ecosystems-of-india-science-policy-and-practice-for-sustainable-management/" },
  { title: "Digital Elevation Model Data Released", date: "2024-11-20", link: "#" },
  { title: "Upcoming Coastal Management Workshop", date: "2024-12-15", link: "#" }
];

// Dynamically populate news section
const newsList = document.getElementById("news-list");
newsData.forEach(news => {
  const newsItem = `
      <li>
          <div class="news-title">
              <a href="${news.link}" target="_blank">${news.title}</a>
          </div>
          <div class="news-date">${news.date}</div>
      </li>
  `;
  newsList.innerHTML += newsItem;
});

////////////////////////////News end/////////////////////////////////////////////////

// govt logo link/////////////////////////////////////////////////////////////

// Function to handle navigation
function navigateTo(url) {
  window.location.href = url;
}

// Mapping IDs to URLs
const links = {
  digitalIndia: "https://csc.gov.in/digitalIndia",
  Mudra: "https://www.mudra.org.in/",
  swatchBharat: "https://swachhbharatmission.gov.in/sbmcms/index.htm",
  skillIndia: "https://www.skillindiadigital.gov.in/home",
  g2O: "https://g20.mygov.in/",
  myGov: "https://g20.mygov.in/",
  aadhar: "https://uidai.gov.in/en/",
  govtOfIndia: "https://www.india.gov.in/",
  lokpal: "https://www.lokpal.gov.in/#:~:text=Acting%20Chairperson%2C%20Lokpal&text=The%20Act%20came%20into%20force,from%2028th%20May%2C2022.",
  worldFoodIndia: "https://worldfoodindia.gov.in/",
  IndianPost: "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
};

// Attach event listeners to each image
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(links).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
          element.addEventListener("click", () => navigateTo(links[id]));  // Mouse click
          element.addEventListener("keydown", (event) => {  // Keyboard support
              if (event.key === "Enter") {
                  navigateTo(links[id]);
              }
          });
          element.addEventListener("touchstart", () => navigateTo(links[id])); // Touch support
      }
  });
});

///////////////////////////////////////Img end/////////////////////////////////

// JavaScript for Hamburger Menu
document.getElementById("hamburger-btn").addEventListener("click", function() {
  const navLinks = document.getElementById("navbar-links");
  navLinks.classList.toggle("show");
});

   