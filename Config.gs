//Credentials
const userProperties = PropertiesService.getScriptProperties();
const username = userProperties.getProperty('USER'); // Jira API email set in Properties
const apiToken = userProperties.getProperty('API_KEY'); // Jira API key set in Properties

function processJiraQuery(jqlQuery) {
  userProperties.setProperty('QUERY', jqlQuery);
}

//Default Query
// project = LOTR AND issuetype = Epic AND statusCategory = Done AND "Start Date[Date]" != EMPTY and "End Date[Date]" != EMPTY ORDER BY "End Date[Date]" ASC

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}