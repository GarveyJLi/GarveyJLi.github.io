document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar .content-section");
  const sections = document.querySelectorAll("main section"); // More reliable than .body-section
  const glow = document.getElementById("cursor-glow");

  // -------- DATA --------
  const projects = [
    {
      title: "GPT-2 Transformer Based Music Generation",
      description: "Trained and fine-tuned a GPT-2 model to generate ragtime music using the REMI tokenizer. Scraped 425 MIDI files, conducted EDA, and encoded music as REMI token sequences.",
      thumbnail: "assets/joplin.jpg",
      link: "garveyjli.github.io/ragtime-generator/",
      tools: ["Python", "Transformers", "PyTorch"],
      date: "June 2025"
    },
    {
      title: "Genetic Risk Prediction using Polygenic Risk Scores",
      description: "Predicted relative genetic risk using PRS distributions and eQTL analysis. Built a pipeline for users to compute their own genetic risk scores.",
      thumbnail: "assets/genetic_risk_thumbnail.png",
      link: "https://y00628.github.io/equitable-prs-cardiovascular/",
      tools: ["Python", "Statsmodels", "Plink2", "Bash"],
      date: "September 2024 – March 2025"
    },
    {
      title: "Dino-Nuggetology - DS3 DataHacks 2024 (1st Place Overall)",
      description: "Created an anomaly detection model to classify malformed chicken nuggets using a convolutional autoencoder trained on Sobel-processed images.",
      thumbnail: "assets/dino_nugget_thumbnail.png",
      link: "https://devpost.com/software/dino-nuggetology",
      tools: ["Python", "PyTorch", "Scikit-Image", "OpenCV", "PIL"],
      date: "April 2024"
    },
    {
      title: "MIDI Genre Classification - Project Lead",
      description: "Led a 4-person team to predict song genres from MIDI files. Built and evaluated models like SVM and KNN on 40,000-song dataset matched with MusicBrainz genres.",
      thumbnail: "assets/midi_genre_thumbnail.png",
      tools: ["Python", "Scikit-Learn", "Plotly", "h5py", "REST API"],
      date: "October – December 2023"
    },
    {
      title: "Signal/Image Processing Methods",
      description: "Implemented Fourier transforms, filtering, edge detection, segmentation, optical flow, and epipolar rectification using NumPy and OpenCV.",
      thumbnail: "assets/image_processing_thumbnail.png",
      tools: ["Python", "Numpy", "OpenCV", "Plotly"],
      date: "September – December 2023"
    },
    {
      title: "Google Local Data Restaurant Rating Predictor - Coauthor",
      description: "Predicted user restaurant ratings using TF-IDF, SVD, and SGD classifiers on sparse Google Local dataset. Final F1 score: 0.630.",
      thumbnail: "assets/restaurant_rating_thumbnail.png",
      link: "http://bit.ly/rating-predictor",
      tools: ["Python", "Numpy", "Scikit-Learn", "Plotly", "TensorFlow"],
      date: "November – December 2023"
    },
    {
      title: "Breast Cancer Tumor Classification Model - Coauthor",
      description: "Built a logistic regression model with stratified k-fold CV to classify tumors as benign or malignant. Final F1 score: 0.976.",
      thumbnail: "assets/tumor_classification_thumbnail.png",
      link: "http://bit.ly/tumor-classifier",
      tools: ["Python", "Pandas", "Statsmodels", "Plotly Express"],
      date: "May – June 2023"
    },
    {
      title: "Power Outage EDA and Cause Predictor - Coauthor",
      description: "Performed EDA and built a decision tree model to classify power outage causes. Final F1 score after feature engineering: 0.637.",
      thumbnail: "assets/power_outage_thumbnail.png",
      link: "https://penelopeking.github.io/power-outage-model/",
      tools: ["Python", "Pandas", "Scikit-Learn", "Plotly"],
      date: "May – June 2023"
    }
  ];


  const experiences = [
    {
      role: "Bioinfomatics Research Assistant",
      company: "USCD Health: Glass Lab",
      date: "March 2024–Present",
      link: "http://glasslab.ucsd.edu/",
      description: "Explored new methods for representing complex sequence data to improve the performance of machine learning models, and used transformer-based models to detect patterns and investigated how their internal mechanisms (attention layers) capture relationships within the data."
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
          ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.title} thumbnail" class="project-thumbnail" align="middle">` : ''}
          <div class="project-content">
            <h3>${p.title}</h3>
            <small>${p.date}</small>
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
