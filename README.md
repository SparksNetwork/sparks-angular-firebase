Project Structure:

```
/
  /functions # see note
    /client
      /src # started with ng cli
        /app
          /features # modules that route components, maps to route structure, including:
            /appbar # encompasses all routes that use the appbar at the top of the page
            /auth # logging in and logging out

          /core # service modules that are imported at the app level and made available to rest of app
            /snauth # thin wrapper over angularfire, plus guards and resolver
            /sndomain # services that connect to backend
          /shared # component modules that are imported in multiple places 
            /snui # generic components reused by many 
      /dist
        /bundled # result of ng build:client, target path deployed by firebase hosting
        /ngfactory # result of ng build:ssr, referenced by server-side express server running in `/functions/server/src/client`
        /ssr # part of the above's build process, not actually sure if this is used or needed, i think if you dont set an outDir in the tsconfig.ssr.json then it writes to your src dir
    /e2e # e2e tests currently run against dev server using `ng e2e`
    /server
      /src # TS containing http, database functions
      /dist # path referenced by /functions/index.js functions bootstrapper
```
# Developing

## Setup

Check out the branch and `npm install` to get all the dependencies installed.

## Creating a development environment

You should create a separate environment for your development work so that you do not accidentally make changes to the data that breaks someone else's work in progress.  To do this you will create a new environment named after yourself.  E.g. for Steve DeBaun you would create `dev-sd`.

1. In `/functions/client/environments`, copy the existing `environment.ts` to `environment.dev-$YOUR_INITIALS.ts`.
2. In `/functions/.angular-cli.json`, update the `environments` setting to include your new file.
3. Create a new firebase project.
4. In the firebase console for that project, from the *Overview* page, select "Add Firebase to your web app", and copy the config properties you find there.
5. Update the new environment file that you just created with the config properties you copied.

See `/functions/client/environments/environment.dev-sd` for an example of stevo's environment.

You can now use this environment with `ng serve` and `ng build`, e.g.:

```
stevo:functions sdebaun$ ng serve --env=dev-sd
```

Note that this does *not* work with `ng e2e`, you have to do one additional step (see below).

### Client Only

If you run `npm run start:client`, you will get a JIT version of the client on your local machine.  This is just running `ng serve`.

I am *pretty sure* that this local development server will talk to the *deployed* version of the backend.

### Full Stack

Make changes.  Run: `npm run start:server`.

The latest `firebase-functions` will run locally and you can hit `http://localhost:5000` to get a live server.

I am *somewhat sure* that this local development server will talk to the *local* version of the backend.

## Branching

This project is using branch standards based on [this article](http://nvie.com/posts/a-successful-git-branching-model/).

### Core branches

* `master` - this will be deployed to production servers by CI
* `develop` - this branch collects all completed work, is deployed to a staging server (eventually by CI)

### Release branches

When we have our first release... create a new `release/0.1` branch from `develop`, make any changes needed for production, and then merge into `master`.

### Working Branches

Each of these branches is where developers actually make changes.  Three different types of working branches semantically identify the kind of changes.  $BRANCH_NAME should be a long and meaningful name.

* `feat/$BRANCH_NAME` - implement new user stories
* `refactor/$BRANCH_NAME` - refactoring of existing code
* `devops/$BRANCH_NAME` - changes to documentation, deployment, environment

### Feature Branches

Feature branches should have an identifier that corresponds to a ticket on the scrum board and describes what user-facing behavior is implemented by the branch.  E.g. `feat/guest-sees-projects-on-home`

## Code Standards

Use Angular-recommended best practices as [listed here](https://angular.io/guide/styleguide).

Additional standards include...

### Feature, Core, and Shared directories in Client

* Modules in `/features` are all routable.  Each one should have a `$FEATURE_NAME-routing.module.ts` file in the root directory of the module.
* All modules in `/core` should be imported at the `app-routing.module.ts` level and are made available to all other modules in the project.
* Everything in `/shared` is designed to be imported separately in different features as needed.

### Feature components

Within a single `feature` module, individual component names are prefixed with the type of component that they are.  E.g.:

* `page` prefix means that the component is a routing destination.  It may be a child route that is included in a `router-outlet`.
* `button`, `alert`, `form`, etc are all UI components.

# End-to-end testing

All end-to-end tests can be run with `ng e2e` or a custom npm script like `npm run e2e:dev-sd`.  These tests can be run against different environments:

* CI tests can run against a default `qa` environment with `ng e2e`
* developers can run e2e tests locally against their own environment by creating an `e2e:$$$` script and then running that.

The e2e tests use firebase-admin to reset test data in the environment's database.  This requires a credentials file from firebase console.  See `/functions/client/environments/environment.dev-sd.ts` for example.  To set this up:

### Update the environment file you wish to use for testing by adding a property like this:

For instance, if setting up a `dev-sd` environment, you would use something like this:

```
  firebaseAdminCredentialFilename: 'firebaseAdminCredentials.dev-sd.json',
```

The project's `.gitignore` includes `firebaseAdminCredentials.**.json` so that files named like this will not be accidentally committed to the repo.

### Get the credentials file for that database

- open Firebase console for the Sparks Network Test database
- go to settings 
- select the tab Service Accounts
- click the button: GENERATE NEW PRIVATE KEY
- download the file

### Add credentials file to project

Put the file you downloaded in the root of the project directory and name it whatever you named it in the corresponding environment file.

*This file contains secure credentials!  Make sure it is `gitignore`d!*

### Create a shortcut script to run it

`ng e2e` does not support an `--env` flag, although it uses the `--env` flag in the `ng serve` that you run.  In order for the e2e tests to set up test data in the database, you also have to specify a non-standard `environment.ts` with a command-line environment variable.

In the `package.json` scripts section, add a new script that specifies the environment you want to use.  Make sure you use `cross-env` in order to ensure compatibility between Windows and real operating systems. :)

```
    "e2e:dev-sd": "cross-env ANGULAR_ENV=dev-sd ng e2e --env=dev-sd"
```

Now you can run the e2e tests locally against your own database with 

# Deployment

You use the `firebase` command line tool in order to deploy the project to the firebase cloud.  There are a few things to coordinate.

## Switching Firebase Projects

`firebase use` will show you what projects are configured, and the aliases for those projects. We currently have:

* `qa` is intended for use with automated testing during CI.
* `staging` is used for pre-release deployment to a final "sanity check" server
* `prod` is the live production environment
* `dev-$$` environments exist for each individual developer

When you're working locally, you should `firebase use` your personal development environment.  You can switch to `staging` or `prod` when you are ready to deploy to either of those environments.

## First time project setup

You will need to do a couple of things to a firebase project the first time you use it, or subsequent times if the test data changes.

* In the firebase console -> Authentication -> Sign-In Method, make sure you enable at least Email/Password and Google.  Enabling Facebook requires you to have an actual Facebook app so it's OK to skip it.

* In the firebase console -> Database -> ... -> Import JSON to import the latest `test-data.json` from the repo so that the database is loaded with valid data.

## Building client

There are `npm` scripts that automate this for you, see: `npm run build:client:prod`, `npm run build:client:staging`, etc.  Under the covers, these scripts do two things:

* Set the target to `production` so that `ngc` compiles with AOT options for a faster client experience.
* Selects the specific `environment` so that the correct settings are compiled into the dist.

# Building server

For now, as there is no difference in server environments, just use `npm run build:server` to compile everything from `/functions/server/src` to `/functions/server/dist`.

# Deploying to firebase

*MAKE SURE THAT YOU ARE `use`ING THE CORRECT PROJECT BEFORE YOU DO THIS!!!11!!1!*

`npm run deploy` will deploy the latest client and server files to the currently `use`'d firebase project.  All it does is `firebase deploy --only hosting,functions`.

# Why This Way?

## Why Everything in /functions?

A chain of tragic consequences...

1. `firebase-functions` requires everything that it runs live in the `/functions` directory.  Nothing besides that gets deployed to the cloud.
2. SSR implemented by `/functions/server/src/client` needs to get bits from angular app including html
3. Both `/functions/client` and `/functions/server` code need to import shared code from `/functions/shared`

## Why `appbar` feature?

The `appbar` module provides most of the routing for the app.
All routes in this module will have a consistent appbar at the top that won't rerender.
Very few routes in the app won't use this: auth, printing, what else?

# How Does This Work?

## How Backend Firebase-Functions Work

When you `firebase deploy`, all of the names exported by `/functions/index.js` start running in the cloud.

#End-to-end testing

Make sure you are `firebase use`ing either your development environment or the qa environment when you run the e2e tests.

The end-to-end tests use Firebase Admin to manipulate directly the data. Firebase Admin needs a configuration
file named `adminsdk.json` that will be placed in: `/functions/e2e`. In order to obtain the file:
- open Firebase console for the Sparks Network Test database
- go to settings 
- select the tab Service Accounts
- click the button: GENERATE NEW PRIVATE KEY
- rename the downloaded file to `adminsdk.json` and place it in `/functions/e2e`