let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const carousel = document.querySelector('.carousel');
let slideInterval;

// Function to show the current slide and hide others
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = 'none'; // Hide all slides
    if (i === index) {
      slide.style.display = 'block'; // Show the current slide
    }
  });
}





// Function to show the next slide
function showNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides; // Move to the next slide
  showSlide(currentSlide);
}

// Function to show the previous slide
function showPrevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Move to the previous slide
  showSlide(currentSlide);
}

// Auto slide function (moves every 5 seconds)
function startAutoSlide() {
  slideInterval = setInterval(showNextSlide, 5000); // 5000ms = 5 seconds
}

// Stop auto slide
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Event listeners for the next and previous buttons
document.querySelector('.next').addEventListener('click', function() {
  stopAutoSlide(); // Stop automatic sliding when user clicks "next"
  showNextSlide(); // Show the next slide
  setTimeout(startAutoSlide, 500); // Restart auto slide after a brief delay
});

document.querySelector('.prev').addEventListener('click', function() {
  stopAutoSlide(); // Stop automatic sliding when user clicks "prev"
  showPrevSlide(); // Show the previous slide
  setTimeout(startAutoSlide, 500); // Restart auto slide after a brief delay
});

// Initially display the first slide and start auto sliding
showSlide(currentSlide);
startAutoSlide();
