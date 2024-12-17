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
