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
