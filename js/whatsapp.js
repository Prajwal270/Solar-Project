document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("whatsappForm");
  
    if (!form) {
      console.error("❌ whatsappForm not found");
      return;
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const email = document.getElementById("email").value.trim();
      const city = document.getElementById("city").value.trim();
      const message = document.getElementById("message").value.trim();
  
      const whatsappNumber = "919175845833";
  
      const text = encodeURIComponent(
        `*New Solar Consultation Request*\n\n` +
        `Name: ${name}\n` +
        `Mobile: ${mobile}\n` +
        `Email: ${email}\n` +
        `City: ${city}\n` +
        `Message:\n${message}`
      );
  
      const url = `https://wa.me/${whatsappNumber}?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
  