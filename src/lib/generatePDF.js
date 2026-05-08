import { jsPDF } from "jspdf";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
};

export function generateTripPDF(data, categoryLabels, activityLabels) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // ==================== COLORS ====================
  const green = [22, 163, 74];       // #16a34a
  const darkGreen = [21, 128, 61];   // #15803d
  const darkGray = [31, 41, 55];     // #1f2937
  const medGray = [107, 114, 128];   // #6b7280
  const lightGray = [243, 244, 246]; // #f3f4f6
  const white = [255, 255, 255];
  const gold = [234, 179, 8];        // #eab308

  // ==================== HELPER FUNCTIONS ====================
  const drawLine = (yPos, color = lightGray) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  const checkPageBreak = (needed) => {
    if (y + needed > pageHeight - 30) {
      doc.addPage();
      y = 25;
      // Subtle header on new pages
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      doc.text("Madurai Tour Planner", margin, 15);
      doc.text("Trip Itinerary", pageWidth - margin, 15, { align: "right" });
      drawLine(18);
      y = 25;
    }
  };

  // ==================== PAGE 1: COVER ====================
  // Green header band
  doc.setFillColor(...green);
  doc.rect(0, 0, pageWidth, 60, "F");

  // Gold accent line
  doc.setFillColor(...gold);
  doc.rect(0, 60, pageWidth, 2, "F");

  // Company name
  doc.setTextColor(...white);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("MADURAI TOUR PLANNER", pageWidth / 2, 30, { align: "center" });

  // Tagline
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Your Trusted Travel Partner Since 2019", pageWidth / 2, 42, { align: "center" });

  // Contact info in header
  doc.setFontSize(8);
  doc.text("📞 6380007962 | 9578904139 | 📧 maduraitourplanner@gmail.com", pageWidth / 2, 52, { align: "center" });

  // Trip title section
  y = 80;
  doc.setTextColor(...darkGray);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Trip Itinerary", pageWidth / 2, y, { align: "center" });

  y += 12;
  doc.setFontSize(14);
  doc.setTextColor(...green);
  doc.text(categoryLabels[data.category] || data.category, pageWidth / 2, y, { align: "center" });

  // ==================== TRIP INFO BOXES ====================
  y += 20;

  // Box styling helper
  const drawInfoBox = (x, width, title, value, subValue) => {
    doc.setFillColor(...lightGray);
    doc.roundedRect(x, y, width, 35, 3, 3, "F");
    doc.setFontSize(9);
    doc.setTextColor(...medGray);
    doc.setFont("helvetica", "normal");
    doc.text(title, x + width / 2, y + 10, { align: "center" });
    doc.setFontSize(14);
    doc.setTextColor(...darkGray);
    doc.setFont("helvetica", "bold");
    doc.text(value, x + width / 2, y + 22, { align: "center" });
    if (subValue) {
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      doc.setFont("helvetica", "normal");
      doc.text(subValue, x + width / 2, y + 30, { align: "center" });
    }
  };

  const boxWidth = (contentWidth - 10) / 3;
  drawInfoBox(margin, boxWidth, "DURATION", `${data.days} ${data.days === 1 ? "Day" : "Days"}`, "");
  drawInfoBox(margin + boxWidth + 5, boxWidth, "GROUP SIZE", `${data.adults + data.children} Members`, `${data.adults} Adults, ${data.children} Children`);
  drawInfoBox(margin + (boxWidth + 5) * 2, boxWidth, "DATES", formatDate(data.dates[0] || new Date().toISOString()), data.dates.length > 1 ? `to ${formatDate(data.dates[data.dates.length - 1])}` : "");

  y += 45;
  drawLine(y);

  // ==================== ITINERARY SECTION ====================
  y += 12;
  doc.setFontSize(16);
  doc.setTextColor(...darkGreen);
  doc.setFont("helvetica", "bold");
  doc.text("📍 Day-wise Itinerary", margin, y);
  y += 10;

  Object.entries(data.dailyPlaces).forEach(([dayKey, places]) => {
    checkPageBreak(30);

    const dayNum = dayKey.replace("day", "");
    const dateForDay = data.dates[parseInt(dayNum) - 1];

    // Day header
    doc.setFillColor(...green);
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.setFont("helvetica", "bold");
    doc.text(`Day ${dayNum}`, margin + 5, y + 7);
    if (dateForDay) {
      doc.setFont("helvetica", "normal");
      doc.text(formatDate(dateForDay), pageWidth - margin - 5, y + 7, { align: "right" });
    }
    y += 14;

    if (places.length > 0) {
      places.forEach((place) => {
        checkPageBreak(10);
        doc.setFontSize(10);
        doc.setTextColor(...darkGray);
        doc.setFont("helvetica", "normal");
        doc.text(`• ${place}`, margin + 8, y);
        y += 7;
      });
    } else {
      doc.setFontSize(9);
      doc.setTextColor(...medGray);
      doc.text("  No specific places selected", margin + 8, y);
      y += 7;
    }
    y += 5;
  });

  // ==================== ACTIVITIES SECTION ====================
  if (data.activities.length > 0) {
    checkPageBreak(40);
    y += 5;
    drawLine(y);
    y += 10;

    doc.setFontSize(16);
    doc.setTextColor(...darkGreen);
    doc.setFont("helvetica", "bold");
    doc.text("🎯 Activities Included", margin, y);
    y += 10;

    const actPerRow = 2;
    const actWidth = (contentWidth - 5) / actPerRow;

    data.activities.forEach((act, i) => {
      if (i % actPerRow === 0 && i > 0) y += 10;
      checkPageBreak(12);

      const col = i % actPerRow;
      const x = margin + col * (actWidth + 5);

      doc.setFillColor(254, 249, 195); // yellow-50
      doc.roundedRect(x, y - 4, actWidth, 9, 2, 2, "F");
      doc.setFontSize(9);
      doc.setTextColor(...darkGray);
      doc.setFont("helvetica", "normal");
      doc.text(activityLabels[act] || act, x + 4, y + 2);
    });

    y += 15;
  }

  // ==================== FOOTER ====================
  checkPageBreak(50);
  y += 10;
  drawLine(y);
  y += 15;

  // Terms & conditions box
  doc.setFillColor(...lightGray);
  doc.roundedRect(margin, y, contentWidth, 40, 3, 3, "F");
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(...darkGreen);
  doc.setFont("helvetica", "bold");
  doc.text("Important Notes:", margin + 5, y);
  y += 7;
  doc.setFontSize(8);
  doc.setTextColor(...medGray);
  doc.setFont("helvetica", "normal");
  const notes = [
    "• This is a preliminary itinerary. Final confirmation subject to availability.",
    "• Prices may vary based on season, group size, and specific requirements.",
    "• Contact us for customization, hotel bookings, and transport arrangements.",
    "• Cancellation policy applies as per our terms and conditions.",
  ];
  notes.forEach((note) => {
    doc.text(note, margin + 5, y);
    y += 5;
  });

  // Final footer
  y += 15;
  checkPageBreak(20);
  doc.setFillColor(...green);
  doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Madurai Tour Planner | Trichy | Madurai | Chennai", pageWidth / 2, pageHeight - 12, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("www.maduraitourplanner.com | WhatsApp: +91 9578904139", pageWidth / 2, pageHeight - 6, { align: "center" });

  // ==================== SAVE ====================
  const fileName = `MTP_Trip_${categoryLabels[data.category] || "Plan"}_${formatDate(data.dates[0] || new Date().toISOString()).replace(/ /g, "_")}.pdf`;
  doc.save(fileName);
}
