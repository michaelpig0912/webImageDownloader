// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractImages") {
    const minSize = request.minSize;
    const images = Array.from(document.querySelectorAll('img')).filter(img => {
      return img.naturalWidth >= minSize && img.naturalHeight >= minSize;
    }).map(img => img.src);
    chrome.runtime.sendMessage({action: "downloadImages", images: images});
  }
});
