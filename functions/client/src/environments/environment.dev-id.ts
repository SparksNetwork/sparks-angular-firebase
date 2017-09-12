// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseAdminCredentialFilename: 'firebaseAdminCredentials.dev-id.json',
  apiRoot: 'http://localhost:5000/sparksnetworkildi/us-central1/api',
  firebase: {
    apiKey: 'AIzaSyDzZA0hgq1ch38x2QsdpzyeUpOMFkHdg_0',
    authDomain: 'sparksnetworkildi.firebaseapp.com',
    databaseURL: 'https://sparksnetworkildi.firebaseio.com',
    projectId: 'sparksnetworkildi',
    storageBucket: '',
    messagingSenderId: '897039920285'
  }
}
