/**
 * Navetto: where drive.navetto.ca's sign-up form lands. Each sign-up becomes a row in the "Site" tab of the driver
 * sign-ups Sheet (the one the Google Form fills), and an email to bonjour@navetto.ca.
 *
 * Set up once, at script.google.com:
 *   1. New project, paste this file, save.
 *   2. Deploy > New deployment > type "Web app": Execute as "Me", Who has access "Anyone". Deploy, allow access.
 *   3. Copy the web app URL (ends in /exec): it is the page's SIGNUP_URL.
 * After changing this file: Deploy > Manage deployments > edit > Version "New version", so the URL stays the same.
 */
const NOTIFY = 'bonjour@navetto.ca';
const SHEET_NAME = 'Navetto — Chauffeurs inscrits / Driver sign-ups';
const TAB = 'Site';
const COLUMNS = ['Received', 'First name', 'Last name', 'Phone', 'Email', 'City', 'Car', 'Size', 'Licence 12 months', 'Language'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  // The page's hidden "website" field: people never fill it, bots do.
  if (p.website) return ContentService.createTextOutput('ok');
  const clean = (v) => String(v || '').trim().slice(0, 200);
  const row = [new Date(), clean(p.firstName), clean(p.lastName), clean(p.phone), clean(p.email), clean(p.city),
    clean(p.car), clean(p.size), p.licence12 === 'yes' ? 'yes' : 'no', clean(p.lang)];
  if (!row[1] || !row[3]) return ContentService.createTextOutput('missing');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    tab().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  const name = row[1] + ' ' + row[2];
  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: row[4] || NOTIFY,
    subject: 'Nouveau chauffeur : ' + name + ' (' + row[5] + ')',
    body: COLUMNS.slice(1).map((c, i) => c + ': ' + row[i + 1]).join('\n'),
  });
  return ContentService.createTextOutput('ok');
}

/** The "Site" tab, with its header row, in the sign-ups Sheet (made if it doesn't exist yet). */
function tab() {
  const files = DriveApp.getFilesByName(SHEET_NAME);
  let book = null;
  while (files.hasNext()) {
    const f = files.next();
    if (!f.isTrashed()) { book = SpreadsheetApp.open(f); break; }
  }
  if (!book) book = SpreadsheetApp.create(SHEET_NAME);
  let sheet = book.getSheetByName(TAB);
  if (!sheet) {
    sheet = book.insertSheet(TAB);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run once from the editor to check: it adds a test row and sends a test email. */
function testSignup() {
  doPost({ parameter: { firstName: 'Test', lastName: 'Navetto', phone: '514 555-0123', email: NOTIFY, city: 'Montréal',
    car: 'Toyota RAV4 2021', size: 'SUV', licence12: 'yes', lang: 'fr' } });
}
