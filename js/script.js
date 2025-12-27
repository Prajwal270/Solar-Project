// ===================================
// MOBILE MENU TOGGLE
// ===================================

function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
}

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const arrow = header.querySelector(".arrow");

    // Toggle current accordion
    body.classList.toggle("open");
    arrow.style.transform = body.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";

    if (body.style.maxHeight) {
      body.style.maxHeight = null;
    } else {
      body.style.maxHeight = body.scrollHeight + "px";
    }

    // Close other accordions
    accordionHeaders.forEach(otherHeader => {
      if (otherHeader !== header) {
        const otherBody = otherHeader.nextElementSibling;
        const otherArrow = otherHeader.querySelector(".arrow");
        otherBody.classList.remove("open");
        otherBody.style.maxHeight = null;
        otherArrow.style.transform = "rotate(0deg)";
      }
    });
  });
});


function scrollGallery(direction) {
  const gallery = document.getElementById("galleryScroll");
  const scrollAmount = 380;
  gallery.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}


const lightbox = document.getElementById("imageLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox-close");

// Open image on image click
document.querySelectorAll(".gallery-scroll img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

// Close on click
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove("show");
  }
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }
});
