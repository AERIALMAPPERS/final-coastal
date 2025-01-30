// read more lidar
function toggleReadMore() {
  var additionalContent = document.getElementById('additional-content');
  var readMoreButton = document.querySelector('button');

  if (additionalContent.style.display === 'none') {
      additionalContent.style.display = 'block';
      readMoreButton.textContent = 'Read Less';
  } else {
      additionalContent.style.display = 'none';
      readMoreButton.textContent = 'Read More';
  }
}

// read more bathematry
function toggleReadMore1() {
  var additionalContent = document.getElementById('additional-content1');
  var readMoreButton = document.querySelector('button');

  if (additionalContent.style.display === 'none') {
      additionalContent.style.display = 'block';
      readMoreButton.textContent = 'Read Less';
  } else {
      additionalContent.style.display = 'none';
      readMoreButton.textContent = 'Read More';
  }
}



// slide show
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Increment slideIndex and loop back if necessary
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display the current slide and activate corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Change slide every 3 seconds
    setTimeout(showSlides, 3000);
}

function currentSlide(index) {
    slideIndex = index - 1; // Adjust for zero-based index
    showSlides();
}


///////////////////

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

/////////////

function displayImage(imageUrl) {
  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageUrl;
}



function displayImage(event, imageUrl) {
  event.preventDefault(); // Prevent the default action of anchor tag (page refresh)

  var displayedImage = document.getElementById("displayedImage");
  displayedImage.src = imageUrl;
}







