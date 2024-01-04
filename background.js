chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed and running.');
});

// 監聽來自popup.js的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImages") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      function: findImages
    }, (results) => {
      // results[0].result 是所有圖片的URL數據
      for (const url of results[0].result) {
        chrome.downloads.download({ url: url });
      }
    });
  }
});

// 在頁面上執行以找到所有的圖片
function findImages(minWidth) {
  const images = document.querySelectorAll('img');
  return Array.from(images)
    .filter(img => img.naturalWidth >= minWidth)
    .map(img => img.src);
}

// 監聽來自popup.js的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImages") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      func: findImages,
      args: [parseInt(request.minWidth)]
    }, (results) => {
      if (results && results[0] && results[0].result) {
        for (const url of results[0].result) {
          chrome.downloads.download({
            url: url,
            filename: request.folderName ? `${request.folderName}/${url.split('/').pop()}` : url.split('/').pop()
          });
        }
      }
    });
  }
});