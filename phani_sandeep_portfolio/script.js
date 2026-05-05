const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".side-nav a");
const sections = document.querySelectorAll("section[id]");
const revealSelectors = [
  ".section-title",
  ".hero-left",
  ".hero-right",
  ".two-column > *",
  ".education-list > *",
  ".timeline-card",
  ".stats > *",
  ".skill",
  ".service-card",
  ".portfolio-item",
  ".post-card",
  ".contact-info",
  ".contact-form"
];
const revealItems = document.querySelectorAll(revealSelectors.join(","));
let lastScrollY = window.scrollY;

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
});

revealItems.forEach(item => {
  item.classList.add("reveal");

  if (item.classList.contains("hero-left") || item.classList.contains("contact-info")) {
    item.classList.add("from-left");
  }

  if (item.classList.contains("hero-right") || item.classList.contains("contact-form")) {
    item.classList.add("from-right");
  }

  if (item.classList.contains("portfolio-item") || item.classList.contains("post-card") || item.classList.contains("skill")) {
    item.classList.add("zoom-in");
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else if (entry.boundingClientRect.top > window.innerHeight) {
      entry.target.classList.remove("is-visible");
    }
  });
}, {
  root: null,
  threshold: 0.16,
  rootMargin: "0px 0px -70px 0px"
});

revealItems.forEach(item => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  let current = "";
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    document.body.classList.add("is-scrolling-down");
    document.body.classList.remove("is-scrolling-up");
  } else {
    document.body.classList.add("is-scrolling-up");
    document.body.classList.remove("is-scrolling-down");
  }

  lastScrollY = Math.max(currentScrollY, 0);

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
