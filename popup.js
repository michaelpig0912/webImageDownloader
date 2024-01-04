document.getElementById('download').addEventListener('click', () => {
  const folderName = document.getElementById('folderName').value;
  const minWidth = document.getElementById('minWidth').value;
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({
      action: "downloadImages",
      tabId: activeTab.id,
      folderName: folderName,
      minWidth: minWidth
    });
  });
});
