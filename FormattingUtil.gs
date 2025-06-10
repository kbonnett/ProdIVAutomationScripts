const colors = {
  q1: "#fff2cc",
  q2: "#d9ead3",
  q3: "#c9daf8",
  q4: "#d9d2e9"
}

function setConditionalFormatting(sheet, range, formula, color){
  var range = sheet.getRange(range);

  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(formula)
    .setBackground(color)
    .setRanges([range])
    .build();
  
  const rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);
}

function highlightQuarter(sheet) {
  Logger.log("Highlighting Quarters")
  setConditionalFormatting(sheet, "A2:I", `=ISBETWEEN($E2, ${quarterDates.q1Start}, ${quarterDates.q1End})`, colors.q1);
  setConditionalFormatting(sheet, "A2:I", `=ISBETWEEN($E2, ${quarterDates.q2Start}, ${quarterDates.q2End})`, colors.q2);
  setConditionalFormatting(sheet, "A2:I", `=ISBETWEEN($E2, ${quarterDates.q3Start}, ${quarterDates.q3End})`, colors.q3);
  setConditionalFormatting(sheet, "A2:I", `=ISBETWEEN($E2, ${quarterDates.q4Start}, ${quarterDates.q4End})`, colors.q4);
}

function highlightPotentialDataErrors(sheet) {
  Logger.log("Highlighting Potential Errors")
  setConditionalFormatting(sheet, "G2:G", '=OR(ISERROR(G2),G2<0)', "#F4C7C3");
   setConditionalFormatting(sheet, "B2:B", "=COUNTIF(B:B, B2)>1", "#F4C7C3");
}