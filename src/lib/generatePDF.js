import { jsPDF } from "jspdf";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.getDate() + " " + MONTH_NAMES[d.getMonth()] + " " + d.getFullYear();
};

// Load image as base64
const loadImg = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, 0, 0);
        resolve(c.toDataURL("image/jpeg", 0.85));
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });

// Build header as a high-res canvas image matching Canva template exactly
const buildHeader = async () => {
  const W = 2400, H = 680;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");

  // -------- BACKGROUND SECTIONS --------
  // Top cream section (0 to ~45%)
  const creamH = 310;
  ctx.fillStyle = "#f0e6d6";
  ctx.fillRect(0, 0, W, creamH);

  // Main blue-gray section
  ctx.fillStyle = "#5a7a9a";
  ctx.fillRect(0, creamH, W, 280);

  // Wave/cloud transition (irregular edge between cream and blue)
  ctx.fillStyle = "#c8dae8";
  ctx.beginPath();
  ctx.moveTo(0, creamH - 10);
  // Wavy cloud-like path
  ctx.quadraticCurveTo(80, creamH + 20, 200, creamH);
  ctx.quadraticCurveTo(350, creamH - 30, 500, creamH + 5);
  ctx.quadraticCurveTo(650, creamH + 40, 800, creamH - 5);
  ctx.quadraticCurveTo(1000, creamH - 35, 1200, creamH + 10);
  ctx.quadraticCurveTo(1400, creamH + 45, 1600, creamH);
  ctx.quadraticCurveTo(1800, creamH - 30, 2000, creamH + 15);
  ctx.quadraticCurveTo(2200, creamH + 40, W, creamH - 5);
  ctx.lineTo(W, creamH + 30);
  ctx.lineTo(0, creamH + 30);
  ctx.closePath();
  ctx.fill();

  // Light blue strip at very bottom
  ctx.fillStyle = "#b8cfe0";
  ctx.fillRect(0, creamH + 270, W, 100);

  // -------- "MADURAI" BRAND TEXT --------
  // Large red text
  ctx.fillStyle = "#c02020";
  ctx.font = "bold 130px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("MADUR", 40, 130);
  // "A" with tower: draw "I" after space for tower
  const madurW = ctx.measureText("MADUR").width;
  // Tower icon (gopuram shape)
  const towerX = 40 + madurW + 15;
  ctx.fillStyle = "#222";
  // Tower base
  ctx.fillRect(towerX, 30, 50, 100);
  // Tower top taper
  ctx.beginPath();
  ctx.moveTo(towerX - 8, 130);
  ctx.lineTo(towerX + 25, 10);
  ctx.lineTo(towerX + 58, 130);
  ctx.closePath();
  ctx.fill();
  // Tower stripes
  ctx.fillStyle = "#fff";
  ctx.fillRect(towerX - 3, 50, 56, 4);
  ctx.fillRect(towerX - 1, 75, 52, 4);
  ctx.fillRect(towerX + 2, 100, 46, 4);
  // Road lines at base
  ctx.fillStyle = "#fff";
  ctx.fillRect(towerX + 18, 105, 14, 22);
  // "I" after tower
  ctx.fillStyle = "#c02020";
  ctx.font = "bold 130px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("I", towerX + 62, 130);

  // "TOUR PLANNER" spaced text
  ctx.fillStyle = "#444";
  ctx.font = "normal 28px 'Segoe UI', Arial, sans-serif";
  ctx.letterSpacing = "12px";
  ctx.fillText("T O U R   P L A N N E R", 42, 170);

  // -------- CURSIVE TAGLINE --------
  ctx.fillStyle = "#3a5a7a";
  ctx.font = "italic 52px Georgia, 'Times New Roman', serif";
  ctx.fillText("Your safest", 50, 240);
  ctx.font = "italic 56px Georgia, 'Times New Roman', serif";
  ctx.fillText("Travel Partner", 180, 295);

  // -------- STAMP/SEAL --------
  const sealX = 120, sealY = 420;
  ctx.strokeStyle = "#8aaac8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 65, 0, Math.PI * 2);
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.arc(sealX, sealY, 50, 0, Math.PI * 2);
  ctx.stroke();
  // Heart
  ctx.fillStyle = "#8aaac8";
  ctx.font = "40px Arial";
  ctx.fillText("\u2665", sealX - 14, sealY + 14);
  // Text around seal
  ctx.font = "bold 12px Arial";
  ctx.fillText("MADE", sealX - 28, sealY - 30);
  ctx.font = "10px Arial";
  ctx.fillText("WITH LOVE", sealX - 32, sealY + 42);

  // -------- BOOK NOW BADGE --------
  ctx.fillStyle = "#333";
  ctx.beginPath();
  const bx = 560, by = 330;
  ctx.roundRect(bx, by, 160, 44, 6);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 22px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("BOOK NOW", bx + 20, by + 30);

  // -------- "Exclusive Offers" --------
  ctx.fillStyle = "#fff";
  ctx.font = "bold 52px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Exclusive Offers for", 40, 530);
  ctx.fillText("Your Next Journey!", 40, 590);

  // -------- CONTACT INFO (right side) --------
  ctx.fillStyle = "#fff";
  ctx.font = "normal 22px Arial, sans-serif";
  // Instagram icon area
  ctx.fillStyle = "#e8a040";
  ctx.beginPath();
  ctx.arc(W - 540, 560, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "normal 22px Arial";
  ctx.fillText("Madurai_tourplanner", W - 515, 568);
  // WhatsApp icon area
  ctx.fillStyle = "#25d366";
  ctx.beginPath();
  ctx.arc(W - 540, 600, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText("6380007962 ,8778070061", W - 515, 608);

  // -------- POLAROID PHOTOS --------
  const photos = [
    "/assets/gallery/boat.jpg",
    "/assets/gallery/goldentemple.jpg",
    "/assets/gallery/beach.jpg",
  ];
  const photoImgs = await Promise.all(
    photos.map(
      (url) => new Promise((res) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = url;
      })
    )
  );

  // Photo 1 (center-left, larger, tilted left)
  if (photoImgs[0]) {
    ctx.save();
    ctx.translate(1000, 20);
    ctx.rotate(-0.06);
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#fff";
    ctx.fillRect(-8, -8, 350, 300);
    ctx.shadowBlur = 0;
    ctx.drawImage(photoImgs[0], 0, 0, 334, 260);
    ctx.restore();
  }

  // Photo 2 (center-right, tilted right)
  if (photoImgs[1]) {
    ctx.save();
    ctx.translate(1380, 10);
    ctx.rotate(0.05);
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#fff";
    ctx.fillRect(-8, -8, 310, 270);
    ctx.shadowBlur = 0;
    ctx.drawImage(photoImgs[1], 0, 0, 294, 230);
    ctx.restore();
  }

  // Photo 3 (far right, smaller, tilted)
  if (photoImgs[2]) {
    ctx.save();
    ctx.translate(1750, 50);
    ctx.rotate(-0.04);
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#fff";
    ctx.fillRect(-8, -8, 280, 240);
    ctx.shadowBlur = 0;
    ctx.drawImage(photoImgs[2], 0, 0, 264, 200);
    ctx.restore();
  }

  // -------- AIRPLANE + DASHED PATH --------
  ctx.fillStyle = "#3a5a7a";
  ctx.font = "60px Arial";
  ctx.fillText("\u2708", W - 100, 70);

  ctx.setLineDash([10, 6]);
  ctx.strokeStyle = "#3a5a7a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1550, 20);
  ctx.quadraticCurveTo(1900, -20, W - 80, 40);
  ctx.stroke();
  ctx.setLineDash([]);

  return c.toDataURL("image/jpeg", 0.92);
};

// ==================== PRELOAD ====================
const preloadAll = async (data) => {
  const headerImg = await buildHeader();
  const logo = await loadImg("/assets/logo/mtp.png");
  const dayImgs = {};
  const entries = Object.entries(data.dailyPlaces);
  const results = await Promise.all(
    entries.map(([, d]) => d?.package?.image ? loadImg(d.package.image) : Promise.resolve(null))
  );
  entries.forEach(([k], i) => { if (results[i]) dayImgs[k] = results[i]; });
  return { headerImg, logo, dayImgs };
};

// ==================== MAIN ====================
export async function generateTripPDF(data, categoryLabels, activityLabels, mode = "download") {
  const imgs = await preloadAll(data);
  const doc = new jsPDF("p", "mm", "a4");
  const pw = 210, ph = 297, m = 15, cw = pw - m * 2;
  let y = 0;

  // Colors matching template
  const cream = [240, 236, 228];
  const navy = [30, 50, 75];
  const redText = [190, 40, 40];
  const gold = [185, 140, 60];
  const darkGold = [155, 110, 35];
  const darkText = [30, 30, 30];
  const grayText = [90, 90, 90];
  const blueBorder = [60, 80, 120];
  const white = [255, 255, 255];
  const wmColor = [210, 200, 195];

  // ========= HELPERS =========
  const headerH = pw * (680 / 2400); // maintain aspect ratio = ~59.5mm

  const fillBg = () => { doc.setFillColor(...cream); doc.rect(0, 0, pw, ph, "F"); };

  const placeHeader = () => {
    if (imgs.headerImg) {
      doc.addImage(imgs.headerImg, "JPEG", 0, 0, pw, headerH);
    }
  };

  const drawPlanBadge = () => {
    const nights = data.days > 1 ? data.days - 1 : 0;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text(data.days + "Days " + nights + "Nights Plan", pw - m, headerH + 8, { align: "right" });
    const st = getState();
    if (st) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bolditalic");
      doc.setTextColor(...redText);
      doc.text(st, pw - m, headerH + 18, { align: "right" });
    }
  };

  const drawWatermark = (yp) => {
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...wmColor);
    doc.text("MADURAI", pw / 2, yp, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("T O U R   P L A N N E R", pw / 2, yp + 9, { align: "center" });
  };

  const drawFooter = () => {
    if (imgs.logo) {
      doc.addImage(imgs.logo, "PNG", pw / 2 - 18, ph - 28, 36, 20);
    } else {
      drawWatermark(ph - 18);
    }
  };

  const startPage = () => { doc.addPage(); fillBg(); placeHeader(); drawPlanBadge(); };

  const getState = () => {
    for (const e of Object.values(data.dailyPlaces)) {
      if (e?.package?.state) return e.package.state;
    }
    return "";
  };

  // Gold ribbon with crosshatch
  const drawRibbon = (label, x, yp, w) => {
    const h = 12;
    doc.setFillColor(...gold);
    doc.rect(x, yp, w, h, "F");
    doc.setFillColor(...darkGold);
    for (let i = 0; i < w; i += 4) doc.rect(x + i, yp, 1.5, h, "F");
    doc.setFillColor(...gold);
    doc.triangle(x + w, yp, x + w + 6, yp + h / 2, x + w, yp + h, "F");
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(label, x + 5, yp + 8.5);
  };

  // Day ribbon
  const drawDayRibbon = (num, x, yp) => {
    const h = 12, w = 30;
    doc.setFillColor(...gold);
    doc.rect(x, yp, w, h, "F");
    doc.setFillColor(...darkGold);
    for (let i = 0; i < w; i += 4) doc.rect(x + i, yp, 1.5, h, "F");
    doc.setFillColor(...gold);
    doc.triangle(x + w, yp, x + w + 6, yp + h / 2, x + w, yp + h, "F");
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Day", x + 4, yp + 5.5);
    doc.setFontSize(13);
    doc.setTextColor(220, 50, 40);
    doc.text(String(num), x + 18, yp + 9.5);
  };

  // Square bullet helper
  const bulletSquare = (txt, x, yp, maxW) => {
    doc.setFillColor(...navy);
    doc.rect(x, yp - 2.5, 2.5, 2.5, "F");
    const lines = doc.splitTextToSize(txt, maxW);
    doc.text(lines, x + 7, yp);
    return lines.length * 4.2 + 5;
  };

  // ================================================================
  //  ITINERARY PAGES (2 days per page)
  // ================================================================
  fillBg();
  placeHeader();
  drawPlanBadge();

  y = headerH + 25;
  const dayEntries = Object.entries(data.dailyPlaces);
  let daysOnPage = 0;

  if (dayEntries.length === 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text("No itinerary selected.", pw / 2, y + 30, { align: "center" });
    drawFooter();
  }

  dayEntries.forEach(([dayKey, dayData]) => {
    const dayNum = parseInt(dayKey.replace("day", ""));
    const pkg = dayData?.package || {};
    const spots = dayData?.spots || [];
    const location = (pkg.title || "").replace(/^(Trip to |Tour of |Visit to )/i, "") || "Day " + dayNum;
    const spotsText = spots.length > 0 ? spots.join(" | ") : "Free day";
    const dayImg = imgs.dayImgs[dayKey];

    if (daysOnPage >= 2) { drawFooter(); startPage(); y = headerH + 25; daysOnPage = 0; }

    // Location name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bolditalic");
    doc.setTextColor(...navy);
    doc.text(location, dayImg ? pw - m - 50 : pw / 2, y, { align: dayImg ? "right" : "center" });

    // Day ribbon
    drawDayRibbon(dayNum, m, y + 10);

    // Content box
    const boxX = m + 5;
    const boxY = y + 24;
    const boxW = dayImg ? cw - 55 : cw - 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(spotsText, boxW - 14);
    const boxH = Math.max(lines.length * 6 + 16, 42);

    // Dashed border box (matching template)
    doc.setDrawColor(...blueBorder);
    doc.setLineWidth(0.5);
    doc.setLineDashPattern([2, 1.5], 0);
    doc.roundedRect(boxX, boxY, boxW, boxH, 5, 5, "S");
    doc.setLineDashPattern([], 0);

    // Text
    doc.setTextColor(...darkText);
    doc.text(lines, boxX + 7, boxY + 11);

    // Day image
    if (dayImg) {
      const ix = boxX + boxW + 6, iy = boxY, iw = 44, ih = Math.min(boxH, 42);
      doc.setFillColor(...white);
      doc.roundedRect(ix - 1, iy - 1, iw + 2, ih + 2, 3, 3, "F");
      doc.addImage(dayImg, "JPEG", ix, iy, iw, ih);
    }

    y = boxY + boxH + 18;
    daysOnPage++;
  });

  if (dayEntries.length > 0) drawFooter();

  // ================================================================
  //  COST INCLUDE + COST EXCLUDE (same page)
  // ================================================================
  startPage();
  y = headerH + 15;

  // Intro
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  const intro = "Experience the best with Madurai Tour Planner. This itinerary is tailored just for you, promising unforgettable moments and seamless travel. Let's make every step of your journey special.";
  const il = doc.splitTextToSize(intro, cw);
  doc.text(il, m, y);
  y += il.length * 5 + 14;

  // Cost Include
  drawRibbon("Cost Include", m, y, 48);
  y += 16;

  const ciItems = [
    "Transportation - " + (data.adults + data.children > 10 ? "14 Seater bus" : "Traveller"),
    "Accommodation - " + (data.days - 1) + " night room stay,",
    "jeep trekking - 2 day",
    "DJ campfire",
    "Toll Charges",
    "Parking Hills",
  ];

  const ciH = ciItems.length * 8 + 12;
  doc.setDrawColor(...blueBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(m + 5, y, cw - 10, ciH, 4, 4, "S");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  ciItems.forEach((item, i) => {
    doc.setFillColor(...darkText);
    doc.circle(m + 13, y + 10 + i * 8 - 1, 1, "F");
    doc.text(item, m + 18, y + 10 + i * 8);
  });
  y += ciH + 8;

  drawWatermark(y + 8);
  y += 22;

  // Cost Exclude
  drawRibbon("Cost Exclude", m, y, 48);
  y += 16;

  const ceItems = [
    "Personal Expenses, food",
    "Extra activites charges",
    "Beverages, Mineral Water Bottle, Laundry",
    "If any optional activities which requires payment",
  ];

  const ceH = ceItems.length * 8 + 12;
  doc.setDrawColor(...blueBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(m + 5, y, cw - 10, ceH, 4, 4, "S");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  ceItems.forEach((item, i) => {
    doc.setFillColor(...darkText);
    doc.circle(m + 13, y + 10 + i * 8 - 1, 1, "F");
    doc.text(item, m + 18, y + 10 + i * 8);
  });

  drawFooter();

  // ================================================================
  //  TERMS + BOOKING POLICY + ACCOUNT (mandatory, no changes)
  // ================================================================
  startPage();
  y = headerH + 10;

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Terms & Conditions", m, y);
  y += 14;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  [
    "No refund will be made for any unused accommodation, Missed meals, Transportation segments, Sightseeing tours or Any other service due to bad weather, Ill our control, Such unused items are neither refundable nor exchangeable",
    "Room allocation is done y the hotel depending upon availability at the time check-in. The category of room as specified on your confirmation voucher.",
    "No refund shall be claimed, If the services & amenities of hotel were not up to your expectations, It will be considered on case to case basis",
  ].forEach((t) => { y += bulletSquare(t, m + 8, y, cw - 22); });

  y += 18;
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Booking Policy", m, y);
  y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  [
    "30% Amount initial to book your package.",
    "50% Amount will be complete to before starting your tour, And hotel will be issue after completing your 50% amount.",
    "Rest payment should be complete on arrival and very first day",
  ].forEach((p) => { y += bulletSquare(p, m + 8, y, cw - 22); });

  y += 18;
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Account Details", m, y);
  y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  [
    ["Name", "Rohith"], ["Mobile no", "9791505359"], ["Acc no", "5233120000011"],
    ["Bank name", "Canara Bank"], ["Branch", "Bikshandar Kovil"],
    ["IFSC code", "CNRB0005233"], ["Gpay / PhonePe / Paytm No", "9791505359"],
  ].forEach(([l, v]) => { doc.text(l + " : " + v, m + 12, y); y += 6; });

  drawFooter();

  // ================================================================
  //  MORE INFO / CONTACT (mandatory, no changes)
  // ================================================================
  startPage();
  y = headerH + 10;

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("More Info", m, y);
  y += 16;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  doc.text("+919578904139", m + 12, y);
  doc.text("+916380007962", m + 68, y);
  y += 8;
  doc.text("+918668051108", m + 12, y);
  doc.text("+918778070061", m + 68, y);
  y += 28;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Follow us on", m + 10, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 50, 200);
  doc.textWithLink("Instagram", m + 62, y, { url: "https://www.instagram.com/madurai_tourplanner/" });
  doc.setDrawColor(0, 50, 200);
  doc.setLineWidth(0.3);
  doc.line(m + 62, y + 1, m + 62 + doc.getTextWidth("Instagram"), y + 1);
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...navy);
  doc.text("Mail", m + 10, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 50, 200);
  doc.textWithLink("maduraitourplanner@gmail.com", m + 62, y, { url: "mailto:maduraitourplanner@gmail.com" });
  doc.line(m + 62, y + 1, m + 62 + doc.getTextWidth("maduraitourplanner@gmail.com"), y + 1);

  drawWatermark(y + 40);
  drawFooter();

  // ==================== OUTPUT ====================
  const state = getState();
  const nights = data.days > 1 ? data.days - 1 : 0;
  const fn = "MTP_" + (state || "Trip") + "_" + data.days + "Days_" + nights + "Nights_Plan.pdf";

  if (mode === "preview") {
    return URL.createObjectURL(doc.output("blob"));
  }
  doc.save(fn);
}
