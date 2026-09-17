'use strict';
const Database = require('better-sqlite3');
const db = new Database('.tmp/data.db', { readonly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('tables:', tables.map(t=>t.name));
// print join tables related to home
const rows = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%home%'").all();
console.log('home-related tables:', rows.map(r=>r.name));
const comp = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%features%'").all();
console.log('features-related tables:', comp.map(c=>c.name));
db.close();
