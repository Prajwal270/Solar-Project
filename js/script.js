function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
}

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
  const column = gallery.querySelector(".gallery-column");

  if (!column) return;

  const columnWidth = column.offsetWidth + 24;

  gallery.scrollBy({
    left: direction * columnWidth,
    behavior: "smooth"
  });
}

/* ---------- LIGHTBOX ---------- */
const lightbox = document.getElementById("imageLightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-column img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }
});
