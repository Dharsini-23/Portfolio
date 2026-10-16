// ==========================================
// DHARSINI'S IMAGE LINKS — EDIT ONLY HERE
// ==========================================
const imageLinks = {
  profilePhoto: "Dharsini.png",
  projectImage1: "PASTE_B2A_IMAGE_LINK_HERE",
  projectImage2: "PASTE_SAFEOFFICE_IMAGE_LINK_HERE",
  projectImage3: "PASTE_PROJECT_3_IMAGE_LINK_HERE",
  certificateImage1: "PASTE_CERTIFICATE_1_LINK_HERE",
  certificateImage2: "PASTE_CERTIFICATE_2_LINK_HERE",
  certificateImage3: "PASTE_CERTIFICATE_3_LINK_HERE",
  certificateImage4: "PASTE_CERTIFICATE_4_LINK_HERE",
  ibmBadge1: "PASTE_IBM_BADGE_1_LINK_HERE",
  ibmBadge2: "PASTE_IBM_BADGE_2_LINK_HERE",
  ibmBadge3: "PASTE_IBM_BADGE_3_LINK_HERE",
  ibmBadge4: "PASTE_IBM_BADGE_4_LINK_HERE"
};
// ==========================================

(function () {
  "use strict";

  /* ---------- HELPERS ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const isPlaceholder = url => !url || url.startsWith("PASTE_");

  const toastEl = $("#toast");
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
  }

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- LOAD IMAGES ---------- */
  function loadImage(containerId, url, altText) {
    const container = $("#" + containerId);
    if (!container) return;
    if (isPlaceholder(url)) return; // keep placeholder
    const img = document.createElement("img");
    img.src = url;
    img.alt = altText || "";
    img.loading = "lazy";
    img.onerror = () => { img.remove(); }; // keep placeholder on error
    container.innerHTML = "";
    container.appendChild(img);
  }

  loadImage("profilePhoto",      imageLinks.profilePhoto,      "Dharsini A.");
  loadImage("projectImage1",     imageLinks.projectImage1,     "Bridge 2 Alumni screenshot");
  loadImage("projectImage2",     imageLinks.projectImage2,     "SafeOffice screenshot");
  loadImage("projectImage3",     imageLinks.projectImage3,     "Freelance project screenshot");
  loadImage("certificateImage1", imageLinks.certificateImage1, "UI/UX Design Certification");
  loadImage("certificateImage2", imageLinks.certificateImage2, "Certificate 2");
  loadImage("certificateImage3", imageLinks.certificateImage3, "Certificate 3");
  loadImage("certificateImage4", imageLinks.certificateImage4, "Certificate 4");
  loadImage("ibmBadge1",         imageLinks.ibmBadge1,         "IBM Badge 1");
  loadImage("ibmBadge2",         imageLinks.ibmBadge2,         "IBM Badge 2");
  loadImage("ibmBadge3",         imageLinks.ibmBadge3,         "IBM Badge 3");
  loadImage("ibmBadge4",         imageLinks.ibmBadge4,         "IBM Badge 4");

  /* ---------- NAVIGATION ---------- */
  const navbar    = $("#navbar");
  const navToggle = $("#navToggle");
  const navLinks  = $$(".nav__link");

  // Build section map from nav links
  const sections = navLinks
    .map(l => $(l.getAttribute("href")))
    .filter(Boolean);

  function setMenu(open) {
    navbar.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  navToggle.addEventListener("click", () => setMenu(!navbar.classList.contains("is-open")));

  // Close menu and scroll to section on nav link click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      setMenu(false);
      const target = $(link.getAttribute("href"));
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 10);
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navbar.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", e => {
    if (navbar.classList.contains("is-open") && !navbar.contains(e.target)) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120) setMenu(false);
  });

  /* ---------- ACTIVE LINK ---------- */
  function updateActiveLink() {
    const offset = window.scrollY + 120;
    let current = sections[0];
    sections.forEach(sec => { if (sec.offsetTop <= offset) current = sec; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(link => {
      const active = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", active);
      active ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current");
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  const progress = $("#scrollProgress");
  let ticking = false;

  function onScroll() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    navbar.classList.toggle("is-scrolled", scrollTop > 24);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollTop / max : 0})`;
    updateActiveLink();
    // Animate timeline dots when in view
    animateTimeline();
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- REVEAL ON SCROLL ---------- */
  $$("[data-stagger]").forEach(group => {
    $$(".reveal", group).forEach((item, i) => item.style.setProperty("--i", i % 6));
  });

  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach(item => revealObs.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  /* ---------- WORKFLOW DIAGRAM ANIMATION ---------- */

if ("IntersectionObserver" in window) {

  const diagrams = $$(".workflow");

  const diagObs = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("workflow--animate");
        diagObs.unobserve(entry.target);

      }

    });

  }, { threshold: 0.3 });

  diagrams.forEach(d => diagObs.observe(d));

}

  /* ---------- TIMELINE ANIMATION ---------- */
  function animateTimeline() {
    $$(".timeline__item").forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        item.classList.add("tl-visible");
      }
    });
  }
  animateTimeline();

  /* ---------- SKILLS TABS ---------- */
  const tabs     = $$(".skills__tab");
  const panels   = $$(".skills__panel");
  const countEl  = $("#skillCount");
  let currentTab = 0;

  function selectTab(index, moveFocus) {
    currentTab = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === currentTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });
    panels.forEach((panel, i) => {
      const active = i === currentTab;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    if (countEl) countEl.textContent = `${currentTab + 1} / ${tabs.length}`;
    if (moveFocus) tabs[currentTab].focus();
    tabs[currentTab].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(i));
    tab.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { e.preventDefault(); selectTab(currentTab + 1, true); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); selectTab(currentTab - 1, true); }
      if (e.key === "Home")       { e.preventDefault(); selectTab(0, true); }
      if (e.key === "End")        { e.preventDefault(); selectTab(tabs.length - 1, true); }
    });
  });

  const prevBtn = $("#skillPrev");
  const nextBtn = $("#skillNext");
  if (prevBtn) prevBtn.addEventListener("click", () => selectTab(currentTab - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => selectTab(currentTab + 1));

  /* ---------- CERTIFICATE MODAL ---------- */

const certModal = $("#certModal");
const certModalImage = $("#certModalImage");
const certModalTitle = $("#certModalTitle");
const certModalClose = $("#certClose");

let lastCertFocus = null;


/* ---------- OPEN CERTIFICATE ---------- */

function openCertificate(card){

  const imagePath = card.dataset.certImage;
  const titleElement = $("[data-cert-title]", card);

  if (!imagePath) return;

  lastCertFocus = document.activeElement;

  /* Clear previous image */
  certModalImage.innerHTML = "";

  /* Create image only after clicking */
  const image = document.createElement("img");

  image.src = imagePath;
  image.alt = titleElement
    ? titleElement.textContent.trim()
    : "Certificate";

  image.loading = "eager";

  certModalImage.appendChild(image);


  /* Set title */

  certModalTitle.textContent =
    titleElement
      ? titleElement.textContent.trim()
      : "Certificate";


  /* Open modal */

  certModal.classList.add("is-open");

  certModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

  certModalClose.focus();
}


/* ---------- CLOSE CERTIFICATE ---------- */

function closeCertificate(){

  certModal.classList.remove("is-open");

  certModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  /* Remove image after closing */
  certModalImage.innerHTML = "";

  if(
    lastCertFocus &&
    typeof lastCertFocus.focus === "function"
  ){
    lastCertFocus.focus();
  }
}


/* ---------- CARD CLICK ---------- */

$$("[data-cert]").forEach(card => {

  card.addEventListener("click", event => {

    /*
     * Prevent the button click from
     * triggering the card twice.
     */
    if(
      event.target.closest("[data-cert-button]")
    ){
      openCertificate(card);
      return;
    }

    openCertificate(card);

  });


  /* Keyboard accessibility */

  card.addEventListener("keydown", event => {

    if(
      event.key === "Enter" ||
      event.key === " "
    ){

      event.preventDefault();

      openCertificate(card);

    }

  });

});


/* ---------- CLOSE BUTTON / BACKDROP ---------- */

$$("[data-close]", certModal).forEach(element => {

  element.addEventListener(
    "click",
    closeCertificate
  );

});


/* ---------- ESCAPE KEY ---------- */

document.addEventListener("keydown", event => {

  if(
    !certModal.classList.contains("is-open")
  ){
    return;
  }

  if(event.key === "Escape"){

    closeCertificate();

  }

});

  /* ---------- CONTACT FORM ---------- */
  const contactForm = $("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      contactForm.setAttribute("aria-busy", "true");

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) {
          throw new Error(`Formspree submission failed with status ${response.status}.`);
        }

        contactForm.reset();
      } catch (error) {
        console.error("Unable to submit the contact form.", error);
        showToast("Unable to send your message. Please try again.");
      } finally {
        submitButton.disabled = false;
        contactForm.removeAttribute("aria-busy");
      }
    });
  }

  /* ---------- PLACEHOLDER LINKS ---------- */
  $$("a[data-placeholder]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showToast("This link is a placeholder. Add the real URL in index.html.");
    });
  });

})();
