function letterVal(letter) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const position = alphabet.indexOf(letter.toLowerCase()) + 1;
  return position;
}

function createNewTab(name = endDate) {
  var sheets = ss.getSheets();

  var sheetExists = false;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() === name) {
      sheetExists = true;
      break;
    }
  }
  if (!sheetExists) {
    ss.insertSheet(name);
    Logger.log('New tab "' + name + '" created.');
  } else {
    Logger.log('Tab "' + name + '" already exists.');
  }
}

// Function to set link values in cell
function setRichTextValue(sheet, column, key) {
  var builder = SpreadsheetApp.newRichTextValue();
  builder.setText(key)
         .setLinkUrl(`https://wexinc.atlassian.net/browse/${key}`);

  var richText = builder.build();
  var lastRow = sheet.getLastRow()
  var cell = sheet.getRange(lastRow, column);
  cell.setRichTextValue(richText);
}

function setDropdown(sheet) {
  Logger.log("Setting Dropdown Values")

  var range = sheet.getRange("A2:A");
  var options = ["Yes", "No"]; 
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true,)
    .build();

  range.setDataValidation(rule);
}

function getEndDate(jiraActualEndDate, googleConnectorDoneDate, jiraEndDate) {
  endDate = "";
  
  if (jiraActualEndDate) {
    endDate = jiraActualEndDate;
  } else if (googleConnectorDoneDate) {
    endDate = googleConnectorDoneDate;
  } else {
    endDate = jiraEndDate;
  }
  return endDate;
}

function getStartDate(jiraActualStartDate, jiraStartDate) {
  startDate = "";
  if (jiraActualStartDate) {
    startDate = jiraActualStartDate; 
  } else {
    startDate = jiraStartDate;
  }
  return startDate;
}

function isDateLaterThan(dateString, comparisonDateString = '01-01-2025') {
  if (dateString != null) {
    function parseDMY(dateStr) {
        const [month, day, year] = dateStr.split('-').map(Number);
        // Month in JavaScript Date object is 0-indexed (0 for January, 11 for December)
        return new Date(year, month - 1, day);
    }

    const givenDate = parseDMY(dateString);
    const comparisonDate = parseDMY(comparisonDateString);

    if (isNaN(givenDate.getTime())) {
      console.error("Invalid date string provided:", dateString);
      return false; // Or throw an error
    }

    if (isNaN(comparisonDate.getTime())) {
      console.error("Invalid comparison date string:", comparisonDateString);
      return false; // Or throw an error
    }

    return givenDate > comparisonDate;
  }
}

// Calculate Time To Market using Start date and Resolution date
function calculateTTM(sheet, column) {
  var startDate = 'D';
  var endDate = 'E'
  var lastRow = sheet.getLastRow();
  var cell = sheet.getRange(lastRow, column);
  if (!sheet.getRange(lastRow, column).isBlank()) {
    cell.setFormula(`=IF(OR(ISBLANK(${endDate}${lastRow}),ISBLANK(${startDate}${lastRow})),"", ${endDate}${lastRow}-${startDate}${lastRow})`)
  } else {
    cell.setValue("")
  }
}

function deleteEmptyRows(sheet) {
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Iterate backwards because deleting rows shifts the indices
  for (var i = lastRow; i >= 1; i--) {
    var rowIsEmpty = true;
    for (var j = 1; j <= lastColumn; j++) {
      var cellValue = sheet.getRange(i, j).getValue();
      if (cellValue !== "" && cellValue !== null) { // Check for empty or null values
        rowIsEmpty = false;
        break; // No need to check further in this row
      }
    }
    if (rowIsEmpty) {
      sheet.deleteRow(i);
    }
  }
}

function removeDuplicatesAndEmptyRows(sheet) {
  Logger.log("Removing Duplicates and Empty Rows")

  var range = sheet.getDataRange(); 

  // Remove duplicates
  range.removeDuplicates();
  deleteEmptyRows(sheet);
}
