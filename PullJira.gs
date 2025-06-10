let epics = new Object();

//Jira
const jiraBaseUrl = 'https://wexinc.atlassian.net/rest/api/3';
const queryparam = '/search?jql=';
// const query = userProperties.getProperty('QUERY');

//Headers
const headers = {
  'Authorization': 'Basic ' + Utilities.base64Encode(`${username}:${apiToken}`),
  'Accept': 'application/json'
};

//Options
const options = {
  'method': 'get',
  'headers': headers
};

function getJiraEpics(jiraBaseURL, queryparam, jql, outputObject) {
  var startAt = 0;
  var maxResults = 100;
  var total = 100; 
  var allEpics = [];

  do {
    // Construct the URL with pagination parameters
    var url = `${jiraBaseURL}${queryparam}${encodeURIComponent(jql)}&maxResults=${maxResults}&startAt=${startAt}`;

    // Make the request to Jira API
    var response = UrlFetchApp.fetch(url, {
      'method': 'get',
      'headers': {
        'Authorization': 'Basic ' + Utilities.base64Encode(`${username}:${apiToken}`),
        'Accept': 'application/json'
      }
    });

    // Parse the response
     var data = JSON.parse(response.getContentText());
    Logger.log(`Pulling results ${startAt} through ${total}`)

    // Update total number of issues from the response
    total = data.total;
    console.log(`Total: ${total}`);

    allEpics.push(JSON.parse(response.getContentText()));

    // Update the starting index for the next page
    startAt += maxResults;

  } while (startAt < total); // Continue until all epics are retrieved

  allEpics.forEach(issues => {
      issues.issues.forEach(issue => {
        var key = issue.key;
        outputObject[key] = issue;
      })
  })
}
