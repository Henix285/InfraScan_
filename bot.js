if (window.botInjected) {
  console.log("Bot already running");
} else {
  window.botInjected = true;

  // UI OVERLAY
  const overlay = document.createElement("div");
  overlay.id = "bot-overlay";

  overlay.style = `
    position:fixed;
    bottom:10px;
    right:10px;
    width:260px;
    background:#0d1117;
    color:#00E5A8;
    padding:12px;
    font-family:monospace;
    z-index:999999;
    border:2px solid #00E5A8;
    border-radius:8px;
  `;

  overlay.innerHTML = `
    <b>🤖 BOT Monitor</b><br><br>
    Clicks: <span id="bc">0</span><br>
    Bursts: <span id="bb">0</span><br>
    Status: <span id="status">SAFE</span>
  `;

  document.body.appendChild(overlay);

  let clicks = 0;
  let bursts = 0;
  let lastClick = 0;

  function playBeep() {
  const audio = new Audio(chrome.runtime.getURL("alert.mp3"));
  audio.volume = 1.0;

  audio.play().catch(() => {
    // fallback beep (always works)
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.frequency.value = 800;
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), 200);
  });
}
  document.addEventListener("click", (e) => {
    clicks++;

    const now = Date.now();

    if (now - lastClick < 150) {
      bursts++;
    }

    lastClick = now;

    document.getElementById("bc").textContent = clicks;
    document.getElementById("bb").textContent = bursts;

    // BOT DETECTION
    if (bursts >= 3) {
      document.getElementById("status").textContent = "🚨 BOT";
      overlay.style.borderColor = "red";

      playBeep();

      console.log("BOT DETECTED");
    }
  });
}