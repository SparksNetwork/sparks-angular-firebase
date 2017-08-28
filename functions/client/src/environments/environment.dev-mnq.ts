// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseAdminCredentialFilename: 'sparksnetwork-mnq-firebase-adminsdk.json',
  firebase: {
     apiKey: "AIzaSyA-gp2IAzcwK3snCFlspI7dB_HIKQmH3g0",
    authDomain: "sparksnetwork-mnq.firebaseapp.com",
    databaseURL: "https://sparksnetwork-mnq.firebaseio.com",
    projectId: "sparksnetwork-mnq",
    storageBucket: "sparksnetwork-mnq.appspot.com",
    messagingSenderId: "136883864358"
  },
  apiRoot: 'http://localhost:5002/sparksnetwork-mnq/us-central1/api',
};