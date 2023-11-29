chrome.runtime.onMessage.addListener((message) => {
  const axeResults = message.axeResults;
  const timestamp = Date.parse(axeResults.timestamp);
  const jsonBlob = new Blob([JSON.stringify(axeResults)], {type: "data:application/json;charset=utf-8"});

  chrome.downloads.download({
    'url': URL.createObjectURL(jsonBlob),
    'filename': `accessibility-assessment/${timestamp}/axeResults.json`,
  });
});
