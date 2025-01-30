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
window.onscroll = () => {
  toggleTopButton();
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTopButton() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById('back-to-up').style.display = 'inline-block';
  } else {
    document.getElementById('back-to-up').style.display = 'none';
  }
}


// Form Data
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  let formData = new FormData(this);

  fetch("action_page.php", {
      method: "POST",
      body: formData,
  })
  .then(response => response.text())
  .then(data => {
      let responseMessage = document.getElementById("responseMessage");

      if (data.trim() === "success") {
          responseMessage.style.color = "green";
          responseMessage.textContent = "Thank you! Your message has been sent successfully.";
          document.getElementById("contactForm").reset(); // Clear form
      } else {
          responseMessage.style.color = "red";
          responseMessage.textContent = "Oops! Something went wrong. Please try again.";
      }

      responseMessage.style.display = "block";
  })
  .catch(error => console.error("Error:", error));
});



// Footer
document.getElementById("year").innerHTML = new Date().getFullYear();
