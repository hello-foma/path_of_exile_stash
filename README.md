# Path of Exile: Stash Application

I have made this application as part of the interview process.

You can deploy it's locally by cloning and run `npm run start` or `npm run serve-build`.

Package ready to be deployed by Heroku platform. [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Functionality:
1. View a stash for player
2. Filter the stash by a textstring
3. Filter the stash by a "Legion"

# Dev mode
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

The application will automatically reload if you change any of the source files.

# Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

Build will be is production mode. You can specify correct api url by `API_URL` environment variables.

# Serve build
Run `npm run serve-build` for serving production build with json-database

# Environment variables
`API_URL` - url of API server, default is `http://localhost:3000/public-stash-tabs`

`PRODUCTION` - is build mode, default is `false`

`PORT` - port for http server to listen (if running json-database locally), default is empty

# Database
Project works with local json-database. In dev mode, database server starts automatically.

## Reference data
An interface draft https://www.figma.com/file/EiO9Bkay0VUMSUwkkuoSLK/Path-to-Exile%3A-Stash?node-id=2587%3A5982

You can find local database dump in `db.json`

## My work log:
1. Get an assignment, read the description
2. Launch db-server and research data structure
3. Make an interface draft at the Figma
4. Create a new Angular project
5. Create a repository for a new project
6. Implement base functionality, that required by description
7. Add some design
8. Make first release
9. Deploy on Heroku
