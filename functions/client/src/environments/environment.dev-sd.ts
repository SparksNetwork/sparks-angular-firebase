// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseAdminCredentialFilename: 'firebaseAdminCredentials.dev-sd.json',
  firebase: {
    apiKey: 'AIzaSyAd6U9h9zzhm8RO17-O05IQeeMmZbcJ7oc',
    authDomain: 'sparks-development-sd.firebaseapp.com',
    databaseURL: 'https://sparks-development-sd.firebaseio.com',
    storageBucket: 'gs://sparks-development-sd.appspot.com',
    messagingSenderId: '277847429817',
  },
};