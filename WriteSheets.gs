var ss = SpreadsheetApp.getActiveSpreadsheet();

function writeHeaders(sheet) {
  Logger.log('Writing headers');
  var headers = [
    "PIValue",
    "Task key",	
    "Task name",
    "Calculated Start Date",
    "Calculated End Date",
    "TTM (Time to Market)",	
    "Agile Team",	
    "Lead Team",
    "Project Code",	
    "Start date",
    "End date",
    "Resolution date",
    "Actual Start Date",
    "Actual End Date",
    "GoogleConnector Start Date",
    "GoogleConnector Merge Date",
    "GoogleConnector Done Date",
  ];

  // Write the headers to the first row of the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
}

function writeRows(sheet) {
  Logger.log('Writing Row')
  
  sheet.clearConditionalFormatRules(); 

  // Append issue data to the sheet
  for (const key in epics) {
    let jiraProdIV = epics[key].fields.customfield_12849 ? epics[key].fields.customfield_12849.value : " ";

    let jiraSummary = epics[key].fields.summary;
    let jiraStartDate = epics[key].fields.customfield_10015 ? convertDateTime(epics[key].fields.customfield_10015) : null;
    let jiraEndDate = epics[key].fields.customfield_10229 ? convertDateTime(epics[key].fields.customfield_10229) : null;
    let jiraResolutionDate = epics[key].fields.resolutiondate ? convertDateTime(epics[key].fields.resolutiondate) : null;

    let jiraActualStartDate = epics[key].fields.customfield_10511 ? convertDateTime(epics[key].fields.customfield_10511) : null;
    let jiraActualEndDate = epics[key].fields.customfield_10512 ? convertDateTime(epics[key].fields.customfield_10512) : null;
    
    let googleConnectorStartDate = epics[key].fields.customfield_12950 ? convertDateTime(epics[key].fields.customfield_12950) : null;
    let googleConnectorMergeDate = epics[key].fields.customfield_12913 ? convertDateTime(epics[key].fields.customfield_12913) : null;
    let googleConnectorDoneDate = epics[key].fields.customfield_12912 ? convertDateTime(epics[key].fields.customfield_12912) : null;

    let jiraAgileTeam = epics[key].fields.customfield_10128 ? epics[key].fields.customfield_10128.value : null;
    let jiraLeadTeam = epics[key].fields.customfield_10220 ? epics[key].fields.customfield_10220.value : null;
    let jiraAhaProjectCode = epics[key].fields.customfield_10359;

    let calculatedStartDate = getStartDate(jiraActualStartDate, jiraStartDate);
    let calculatedEndDate = getEndDate(jiraActualEndDate, googleConnectorDoneDate, jiraEndDate);

    if (calculatedStartDate != null){
      var row = [
        jiraProdIV,
        " ", //Key
        jiraSummary,
        calculatedStartDate,
        calculatedEndDate,
        " ", //TTM
        jiraAgileTeam,
        jiraLeadTeam,
        jiraAhaProjectCode,
        jiraStartDate,
        jiraEndDate,
        jiraResolutionDate,
        jiraActualStartDate,
        jiraActualEndDate,
        googleConnectorStartDate,
        googleConnectorMergeDate,
        googleConnectorDoneDate,
      ];
      sheet.appendRow(row);
    
      setRichTextValue(sheet, letterVal("B"), epics[key].key) // Set link to Issue
      calculateTTM(sheet, letterVal("F"))
    }
  }
  removeDuplicatesAndEmptyRows(sheet);
  setDropdown(sheet);
  highlightPotentialDataErrors(sheet)
  highlightQuarter(sheet);

  // Clear the epics object
  epics = {};
}
