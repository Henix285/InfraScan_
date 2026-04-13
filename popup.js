// START BUTTON → inject bot into website
document.getElementById("start").onclick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["bot.js"]
  });
};

// STOP BUTTON → remove overlay
document.getElementById("stop").onclick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.getElementById("bot-overlay")?.remove();
      window.botInjected = false;
    }
  });
};