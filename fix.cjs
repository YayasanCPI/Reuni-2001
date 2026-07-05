const fs = require('fs');
const content = fs.readFileSync('Admin.tsx', 'utf-8');
const lines = content.split('\n');
for (let i = 430; i < 445; i++) {
  if (lines[i] !== undefined) console.log(i + 1, lines[i]);
}
