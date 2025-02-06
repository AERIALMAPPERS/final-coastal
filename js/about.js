google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    const data = google.visualization.arrayToDataTable([
        ['DISTRICT', 'Mhl'],
        ['RATNAGIRI', 238],
        ['RAIGAD', 121],
        ['SINDHUDURG', 120],
        ['PALGHAR', 110.5],
        ['MUMBAI', 114],
        ['THANE', 16.5]
    ]);

    const windowWidth = window.innerWidth;

    let chartWidth = '100%';
    let chartHeight = 550;

    // Adjust size based on window width
    if (windowWidth <= 200) {
        chartWidth = windowWidth - 20; // Slight margin for padding
        chartHeight = 100; // Height for very small screens
    } else if (windowWidth <= 300) {
        chartWidth = 300;
        chartHeight = 200;
    } else if (windowWidth <= 480) {
        chartWidth = '100%';
        chartHeight = 250;
    } else if (windowWidth <= 767) {
        chartWidth = '100%'; s
        chartHeight = 300;
    }

    const options = {
        title: 'COASTALINE LENGTH IN 720(KM)',
        is3D: true,
        width: chartWidth,
        height: chartHeight
    };

    const chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

// Redraw chart on window resize
window.onresize = drawChart;

// Initial chart draw
google.charts.setOnLoadCallback(drawChart);
// After chart is drawn, remove or modify ARIA labels
const chartDiv = document.getElementById('myChart');
const ariaElements = chartDiv.querySelectorAll('[aria-hidden="true"]');

// Hide or modify ARIA labels
ariaElements.forEach(function(ariaElement) {
ariaElement.style.display = 'none'; // Hides the aria-hidden elements
});

///////////////////// slide show/////////////////////////////
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
///////////////////


//////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("span[aria-label]").forEach(el => el.remove());
});



