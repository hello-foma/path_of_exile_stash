const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/path_of_exile_stash'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/path_of_exile_stash/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
