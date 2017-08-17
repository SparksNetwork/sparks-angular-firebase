// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  /*   firebase: {
      apiKey: 'AIzaSyAd6U9h9zzhm8RO17-O05IQeeMmZbcJ7oc',
      authDomain: 'sparks-development-sd.firebaseapp.com',
      databaseURL: 'https://sparks-development-sd.firebaseio.com',
      storageBucket: 'gs://sparks-development-sd.appspot.com',
      // messagingSenderId: '277847429817',
    }, */
  // firebase: {
  //   apiKey: "AIzaSyCQXrtWwVgGjZ0dOo5W92HnFvkWl9kgns4",
  //   authDomain: "sparksnetwork-6de8b.firebaseapp.com",
  //   databaseURL: "https://sparksnetwork-6de8b.firebaseio.com",
  //   projectId: "sparksnetwork-6de8b",
  //   storageBucket: "sparksnetwork-6de8b.appspot.com",
  //   messagingSenderId: "683448204097"
  // },


  // firebase: {
  //   apiKey: "AIzaSyBlSVwhkyWAJG2HAJb1cucEQzSiYH1t-gE",
  //   authDomain: "sparksnetworktest.firebaseapp.com",
  //   databaseURL: "https://sparksnetworktest.firebaseio.com",
  //   projectId: "sparksnetworktest",
  //   storageBucket: "sparksnetworktest.appspot.com",
  //   messagingSenderId: "529336251324"
  // }
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