const fs = require('fs');

const defaultApiUrl = "http://localhost:" + (process.env['PORT'] || 3000) + "/public-stash-tabs";
const environmentFile = `% REPLACE ENV %
  apiUrl: '${process.env.API_URL || defaultApiUrl}',
  production: ${process.env.PRODUCTION || 'false'}
// %!! REPLACE ENV %`;

// Generate environment.ts file
const indexPath = process.env.PRODUCTION ? './dist/path_of_exile_stash/index.html' : './src/index.html';
fs.readFile(indexPath, 'utf-8', (err, content) => {
  if (err) {
    throw console.error(err);
  }

  const replaced = content.replace(/% REPLACE ENV %[\S\s]*%!! REPLACE ENV %/g, environmentFile);

  fs.writeFile(indexPath, replaced, 'utf-8', function (err) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated`);
    }
  });
});
