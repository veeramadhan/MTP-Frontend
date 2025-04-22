import React, { useEffect } from "react";

const TalkWithUs = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67bad14b899774190ded0296/1ikos34es";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    // Wait for Tawk to load, then hide the widget
    script.onload = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = function () {
        window.Tawk_API.hide(); // Hides the widget on load
      };
    };
  }, []);

  // Function to show & open the chat on button click
  const handleChatOpen = () => {
    if (window.Tawk_API) {
      window.Tawk_API.show();
      window.Tawk_API.maximize(); // opens the chat window
    }
  };

  return (
    <>
      <a
        onClick={handleChatOpen}
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
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Chat"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    </>
  );
};

export default TalkWithUs;
