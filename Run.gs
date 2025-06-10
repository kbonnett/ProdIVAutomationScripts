function run() {
  let sheet = "";
  let tabName = "JiraRawData";

  createNewTab(tabName);
  sheet = ss.getSheetByName(tabName);
  getJiraEpics(jiraBaseUrl, queryparam, userProperties.getProperty('QUERY'), epics);
  writeHeaders(sheet);
  writeRows(sheet);

  Logger.log("Complete");
}