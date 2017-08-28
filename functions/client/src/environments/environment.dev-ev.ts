// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebaseAdminCredentialFilename: 'firebaseAdminCredentials.dev-ev.json',
    apiRoot: 'http://localhost:5000/sparks-network-emanuel/us-central1/api',
    firebase: {
        apiKey: "AIzaSyDIjh2LxvT87zW3KGAUOQq9NPEdk1Qb7xU",
        authDomain: "sparks-network-emanuel.firebaseapp.com",
        databaseURL: "https://sparks-network-emanuel.firebaseio.com",
        projectId: "sparks-network-emanuel",
        storageBucket: "sparks-network-emanuel.appspot.com",
        messagingSenderId: "165827874186"
    },
}
