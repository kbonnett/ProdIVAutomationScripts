//Date
const date = new Date();
const year = date.getFullYear();
const month = date.toLocaleDateString('en-US', {month:'short'});;
const todayMinusFourteen = setTodayMinusFourteen();
const monthStart = setMonthStart();
const monthEnd = setMonthEnd();
const today = setToday();

const quarterDates = {
  q1Start: `DATE(${year}, 1, 1)`,
  q1End: `DATE(${year}, 3, 31)`,
  q2Start: `DATE(${year}, 4, 1)`,
  q2End: `DATE(${year}, 6, 30)`,
  q3Start: `DATE(${year}, 7, 1)`,
  q3End: `DATE(${year}, 9, 30)`,
  q4Start: `DATE(${year}, 10, 1)`,
  q4End: `DATE(${year}, 12, 31)`,
}

let startDate = monthStart; 
let endDate = today;
 
function setTodayMinusFourteen() {
  const todayMinusFourteen = new Date();
  todayMinusFourteen.setDate(date.getDate() - 13);
  return todayMinusFourteen.toISOString().split('T')[0]
}

function setMonthStart() {
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return firstDay.toISOString().split('T')[0];
}

function setMonthEnd() {
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDay.toISOString().split('T')[0];
}

function setToday() {
  let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return today.toISOString().split('T')[0];
}

function convertDateTime(jiraDateTime) {
  var date = new Date(jiraDateTime);
  var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "MM-dd-yyyy");
  return formattedDate;
}