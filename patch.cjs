const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');
const lines = content.split('\n');

for(let i=435; i<=478; i++) {
  if (lines[i] !== undefined) console.log(i+1, lines[i]);
}
