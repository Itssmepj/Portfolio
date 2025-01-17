// Edu/Exp Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // Toggle active class on header
    header.classList.toggle('active');

    // Toggle chevron icon
    const icon = header.querySelector('i');
    if (icon.classList.contains('fa-chevron-down')) {
      icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
      icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }

    // Show/hide the accordion content
    const content = header.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }

    // Optional: Close other accordions
    accordionHeaders.forEach(otherHeader => {
      if (otherHeader !== header) {
        otherHeader.classList.remove('active');
        otherHeader.nextElementSibling.style.display = 'none';
        const otherIcon = otherHeader.querySelector('i');
        otherIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      }
    });
  });
});
//End of Edu/Exp Accordion

// Progress Bar
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");

  progressBars.forEach((progress) => {
      const percentage = progress.getAttribute("data-percentage");
      const progressValue = progress.querySelector(".progress-value");
      
      // Set the width of the progress-value dynamically
      progressValue.style.width = percentage + "%";

      // Set the percentage text
      progressValue.textContent = percentage + "%";
  });
});
// End of Progress Bar


// Testimonial Section
const carouselInner = document.querySelector('.carousel-inner');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateCarousel() {
  const offset = currentIndex * -100;
  carouselInner.style.transform = `translateX(${offset}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateCarousel();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});
// End of Testimonial Section

// Scroll Button to Top
// Attach scroll event to the window
window.onscroll = () => {
  toggleTopButton(); // Call function to toggle button visibility
};

// Scroll to the top smoothly when the button is clicked
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle the visibility of the Scroll to Top button
function toggleTopButton() {
  // Check the vertical scroll position
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById('back-to-up').style.display = 'inline-block';
  } else {
    document.getElementById('back-to-up').style.display = 'none';
  }
}
