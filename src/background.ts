chrome.runtime.onMessage.addListener((message) => {
  const axeResults = message.axeResults;
  /*
    TODO: add a unit test
    When encoding a string with btoa (base64), characters outside the Latin1 range, such as äöüÄÖÜçéèñ,
    lead to an error stating: 'The string to be encoded contains characters outside of the Latin1 range.'
    To correctly encode UTF-8 strings in base64, it's necessary to first encode the string using encodeURIComponent to escape non-ASCII characters,
    and then convert the percent-encoded UTF-8 output to a format that btoa can handle
  */
  const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(axeResults))));
  const url = `data:application/json;base64,${encodedData}`;
  const timestamp = Date.parse(axeResults.timestamp);

  chrome.downloads.setShelfEnabled(false);

  chrome.downloads.download({
    url,
    filename: `accessibility-assessment/${timestamp}/axeResults.json`,
  });
});
