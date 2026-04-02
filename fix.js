const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'frontend', 'src'));
let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\${/g, '${');
  // Specifically fix regex syntax issue in MyRegistrations
  content = content.replace(/\/\\\\s\+\/g/g, '/\\s+/g');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
    changedCount++;
  }
});
console.log('Fixed files:', changedCount);
