document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar .content-section");
  const sections = document.querySelectorAll("main section"); // More reliable than .body-section
  const glow = document.getElementById("cursor-glow");

  // -------- DATA --------
  const projects = [
    {
      title: "Piano Ragtime Generator",
      description: "A GPT-2 Transformer-based model that generates ragtime melodies.",
      link: "https://garveyjli.github.io/ragtime-generator/",
      tools: ["Python", "miditok", "transformer", "PyTorch"]
    },
    {
      title: "Dino-Nuggetology",
      description: "Created an anomaly detection model to classify malformed chicken nuggets using convolutional autoencoders.",
      thumbnail: "assets/dino_nugget_thumbnail.png",
      link: "https://devpost.com/software/dino-nuggetology",
      tools: ["Python", "OpenCV", "Scikit-Image", "Autoencoder"]
    },
    {
      title: "Portfolio Website",
      description: "Responsive personal website using HTML/CSS/JS and GitHub Pages.",
      link: "#",
      tools: ["HTML", "CSS", "JavaScript"]
    }
  ];

  const experiences = [
    {
      role: "Bioinfomatics Research Assistant",
      company: "USCD Health: Glass Lab",
      date: "March 2024–Present",
      link: "http://glasslab.ucsd.edu/",
      description: "Explored new methods for representing complex sequence data to improve the performance of machine learning models, and used transformer-based models to detect patterns and investigated how their internal mechanisms (attention layers) capture relationships within the data.."
    },
    {
      role: "Investment Management Data Science Intern",
      company: "Franklin Templeton",
      date: "June-August 2024",
      link: "https://www.franklintempleton.com/",
      description: "Conducted research on financial data to analyze changes in security performance indicators caused by major economic events such as the 2008 recession and the COVID-19 pandemic."
    },
  ];

  // -------- RENDER FUNCTIONS --------
  function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    projects.forEach(p => {
      const el = document.createElement("div");
      el.className = "project-card";
      el.innerHTML = `
      <a href="${p.link}" target="_blank" class="project-link-wrapper">
        <div class="project-inner">
          ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.title} thumbnail" class="project-thumbnail">` : ''}
          <div class="project-content">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="tool-bubbles">
              ${p.tools.map(tool => `<span class="tool-bubble">${tool}</span>`).join('')}
            </div>
          </div>
        </div>
      </a>
    `;
      container.appendChild(el);
    });
  }

  function renderExperiences() {
    const container = document.getElementById("experience-container");
    if (!container) return;
  
    experiences.forEach(e => {
      const el = document.createElement("div");
      el.className = "experience-card";
      el.innerHTML = `
      <a href="${e.link}" target="_blank" class="project-link-wrapper">


          <h3>${e.role} @ ${e.company}</h3>
          <small>${e.date}</small>
          <p>${e.description}</p>
          ${
            Array.isArray(e.tools) && e.tools.length > 0
              ? `<div class="tool-bubbles">
                  ${e.tools.map(tool => `<span class="tool-bubble">${tool}</span>`).join('')}
                </div>`
              : ''
          }
        </a>
      `;
      container.appendChild(el);
    });
  }
  

  renderProjects();
  renderExperiences();

  // -------- SCROLL NAVIGATION --------
  navLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  // -------- SECTION HIGHLIGHTING --------
  function highlightCurrentSection() {
    let maxVisibleHeight = 0;
    let currentSection = "";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        currentSection = section.getAttribute("id");
      }
    });

    // Highlight active nav link
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });

    // Optional: update right sidebar (disabled by default)
    // if (sidebarMessages[currentSection]) {
    //   updateSidebarContent(sidebarMessages[currentSection]);
    // }
  }

  window.addEventListener("scroll", highlightCurrentSection);

  // -------- DROPDOWN TOGGLE --------
  window.toggleDropdown = function(dropdownId, button) {
    const dropdown = document.getElementById(dropdownId);

    if (!dropdown || !button) return;

    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      button.textContent = "Click for more info";
    } else {
      dropdown.style.display = "block";
      button.textContent = "Click to hide";
    }
  };

  // -------- MOUSE GLOW EFFECT --------
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    if (glow) {
      glow.style.top = `${mouseY}px`;
      glow.style.left = `${mouseX}px`;
    }
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
});
