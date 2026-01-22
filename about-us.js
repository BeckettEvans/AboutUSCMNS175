document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const animateOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".fade-in-up");
  animatedElements.forEach((el) => animateOnScroll.observe(el));

  // Number Counters Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const animateCounters = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText
              .replace(/,/g, "")
              .replace(/\+/g, "");

            // Lower increment to reach target slower
            const inc = target / speed;

            if (count < target) {
              // Add + sign if strictly required, for now just numbers
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 20); // ms
            } else {
              // Formatting
              if (target > 1000) {
                counter.innerText = target.toLocaleString() + "+";
              } else {
                counter.innerText = target;
              }
            }
          };
          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => animateCounters.observe(counter));

  // Parallax Effect for Hero
  const heroBg = document.querySelector(".video-bg"); // Changed from .hero-bg-img to .video-bg
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        heroBg.style.transform = `translate(-50%, -50%) scale(1.1) translateY(${scrollPosition * 0.4}px)`;
      }
    });
  }

  // Mobile Menu Toggle (Simple)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      // In a real app, toggle a class to show/hide menu
      // For now, let's just log or alert to show intent
      // toggle class 'nav-active' in CSS would handle this
      const isActive = navLinks.style.display === "flex";
      navLinks.style.display = isActive ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "rgba(0,0,0,0.9)";
      navLinks.style.padding = "20px";
    });
  }
});
