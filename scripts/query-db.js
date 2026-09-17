'use strict';

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
console.log('DB path:', dbPath);
try {
  const db = new Database(dbPath, { readonly: true });
  const rows = db.prepare("SELECT rowid, * FROM components_shared_features LIMIT 50").all();
  console.log('components_shared_features rows:', JSON.stringify(rows, null, 2));
  const home = db.prepare("SELECT rowid, * FROM home LIMIT 10").all();
  console.log('home rows:', JSON.stringify(home, null, 2));
  db.close();
} catch (e) {
  console.error('Error reading DB:', e.message);
  process.exit(1);
}
