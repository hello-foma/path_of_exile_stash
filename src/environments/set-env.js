const fs = require('fs');

const defaultApiUrl = "http://localhost:" + (process.env['PORT'] || 3000) + "/public-stash-tabs";
const environmentFile = `// THIS FILE WILL BE REPLACED ON EVERY BUILD
// see ./set-env.js
export const environment = {
  apiUrl: '${process.env.API_URL || defaultApiUrl}',
  production: ${process.env.PRODUCTION || 'false'}
};
`;

// Generate environment.ts file
fs.writeFile('./src/environments/environment.ts', environmentFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated`);
  }
});
