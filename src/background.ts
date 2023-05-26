chrome.runtime.onMessage.addListener((message) => {
  const axeResults = message.axeResults;
  const encodedData = btoa(JSON.stringify(axeResults));
  const url = `data:application/json;base64,${encodedData}`;
  const timestamp = Date.parse(axeResults.timestamp);

  chrome.downloads.setShelfEnabled(false);

  chrome.downloads.download({
    url,
    filename: `accessibility-assessment/${timestamp}/axeResults.json`,
  });
});
