// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseAdminCredentialFilename: 'firebaseAdminCredentials.dev-cp.json',
  firebase: {
    apiKey: "AIzaSyCcUFP8fLHycrnbWl0edVRPUN2lhF-_-mA",
    authDomain: "sparksnetworkcp.firebaseapp.com",
    databaseURL: "https://sparksnetworkcp.firebaseio.com",
    projectId: "sparksnetworkcp",
    storageBucket: "sparksnetworkcp.appspot.com",
    messagingSenderId: "137007279310"
  },
   apiRoot: 'http://localhost:5002/sparksnetworkcp/us-central1/api',

};