## Simple React CRUD app.

### Start

Please execute next steps:

```
yarn install
```
or
```
npm install
```

Then execute:

```
npm run build
```

This will create the `dist/` directory with the bundled js file and will watch for any changes in the project.

Then open `index.html` in your favorite browser.

### Permissions

There are 4 permissions that could be granted to the user:

* create
* read
* update
* delete

To change user's permissions, start `npm run build` so the watcher for changed files work, amend the list in `src/data/permissions.json` and save it. Then refresh the browser.

### Simulating low internet connection

If you want the app to look like it loads data from a web server API, open `src/js/PermissionsApi.js` and set `const SIMULATE_LOW_CONNECTION` to `true`. Save and reload.