import React, { useEffect } from "react";

const TalkWithUs = () => {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67bad14b899774190ded0296/1ikos34es";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function () {
          window.Tawk_API.hide();
        };
      }
    };
  }, []);

  // WhatsApp button handler
  const handleWhatsAppChat = () => {
    const phoneNumber = "9578904139";
    const message = "Hello, I need assistance.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Tawk.to button handler
  const handleTawkChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.show === "function") {
      window.Tawk_API.show();
      window.Tawk_API.maximize();
    } else {
      alert("Live chat is loading. Please try again shortly.");
    }
  };

  return (
    <>
      {/* WhatsApp Button - Left */}
      <button
        onClick={handleWhatsAppChat}
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          zIndex: "1000",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          border: "none",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "35px", height: "35px" }}
        />
      </button>

   
    </>
  );
};

export default TalkWithUs;
