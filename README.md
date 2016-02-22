# Video page project

This is a frame for video page project.

To start development, you have to have node 4+.
Clone repository, cd there and execute next commands:

```javascript
npm install
npm start
```

It will spin server at localhost:3001 with autoreaload.

To build production version, use:

```javascript
npm install
npm run build
```

The result code will be in *build/public* folder. You can run
```bash
node build/server.js
```
it will run express server on 3000 port serving this folder statically; or you can serve this folder with any server of your preference.

To run tests, use two commands:
```bash
npm test
npm run tdd
```

New tests should have *-test.js* ending; they will be run automatically.
