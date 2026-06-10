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





// Testimonial Section
(function () {
  const track = document.getElementById('testiTrack');
  const dots = document.querySelectorAll('.testi-dot');
  const cards = document.querySelectorAll('.testi-card');

  if (!track || !cards.length) return;

  const TOTAL = cards.length;
  const VISIBLE = 3;           // cards shown at once
  const MAX_INDEX = TOTAL - VISIBLE; // 0..2
  let current = 0;
  let autoTimer;

  function getCardWidth() {
    // card width + gap (28px defined in CSS)
    return cards[0].offsetWidth + 28;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, MAX_INDEX));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    // Highlight the center card of the visible window
    const centerIdx = current + 1;
    cards.forEach((c, i) => c.classList.toggle('active-card', i === centerIdx));
  }

  function next() { goTo(current < MAX_INDEX ? current + 1 : 0); }
  function prev() { goTo(current > 0 ? current - 1 : MAX_INDEX); }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i <= MAX_INDEX ? i : MAX_INDEX); resetTimer(); });
  });

  // Auto-play
  function startTimer() { autoTimer = setInterval(next, 4500); }
  function resetTimer() { clearInterval(autoTimer); startTimer(); }

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', startTimer);

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
  }, { passive: true });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current));

  // Init
  goTo(0);
  startTimer();
})();
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


// Footer
document.getElementById("year").innerHTML = new Date().getFullYear();

// Count-Up Animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.count-up');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Run only once
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

