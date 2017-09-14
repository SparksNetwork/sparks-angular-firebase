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

You should create a separate environment for your development work so that you do not accidentally make changes to the data that breaks someone else's work in progress.  To do this:

1. Create a new angular environment file and edit the contents to match your project.
2. Set up a new firebase project, get service credentials for it, and put those in your angular environment file.
3. Set a local environment variable to tell the npm scripts what to work against.
4. Set the active firebase project to your new firebase project.

### Create a New Angular Environment File

Create a new environment named after yourself.  Copy one of the existing environments to see what you need.  E.g. for Steve DeBaun you would create `/functions/environments/environment.dev-sd.ts`.

### Set Up a New Firebase Project

1. Create a new firebase project through the firebase console.
2. In the firebase console for that project, from the *Overview* page, select "Add Firebase to your web app", and get the config properties you find there.  Copy those to `environment.dev-sd.ts`.
3. In the firebase console, from the *Project Settings* page, *Service Accounts* tab, generate and download a new private key.  Move that file to e.g. `/firebaseAdminCredentials.dev-sd.json` and then set that filename in `environment.dev-sd.ts`.
4. In the firebase console, use *Authentication* and then *Sign-In Method*, make sure you enable at least Email/Password and Google.  Enabling Facebook requires you to have an actual Facebook app so it's OK to skip it.

*`firebaseAdminCredentials` CONTAINS SECURE CREDENTIALS! DO NOT COMMIT IT! MAKE SURE IT IS `gitignore`d!*

The project's `.gitignore` includes `firebaseAdminCredentials.**.json` so that files named like this will not be accidentally committed to the repo.

See `/functions/client/environments/environment.dev-sd` for an example of stevo's environment.

### Set a Local Environment Variable

You need to set an `ANGULAR_ENV` variable to the unique part of the name of your environment file.  E.g. for `environment.dev-sd.ts` your `ANGULAR_ENV` should be `dev-sd`.  This is used by many of the `npm` scripts.

For bash shell:
```
% export ANGULAR_ENV=dev-sd
```

For windows shell:
```
C:\> SET ANGULAR_ENV=dev-sd
```

Note that these commands only set the environment variable for your current shell.  How to make it permanent is dependant on your shell.

### Set the Active Firebase Project

Simple use `npm run use` to set your current firebase project to the `ANGULAR_ENV` variable you just set.  You should only have to do this once, or if you need to work against another development environment.  The `npm run stage` command automatically points everything at the `staging` environment.

## Useful npm scripts

There are many `npm` scripts, and many of them require you to set your ANGULAR_ENV environment variable, as described above.

### Start Development Server

`% npm run start`

Using the current ANGULAR_ENV setting, this will start both the client and the server and reload both on any file changes.

If, for some reason, you only want to run the client or server locally, you can use `npm run start:client` or `npm run start:server`.

### Loading Test Data

`% npm run preload`

When you're developing locally, you usually want to preload the database with some valid test data so that the app has something to work with.  There is an npm script to do this, that overwrites the firebase database specified by your current ANGULAR_ENV files with the contents of the `/e2e/fixtures/fully-loaded.json` file.

Before it does that, it runs json schema validation against that data using the schema found at `/functions/database.model.json`.

### Deploy to Staging

`% npm run stage`

This preloads the database, builds the client and server, and deploys them both.

It automatically uses `staging` for the `ANGULAR_ENV` variable and firebase project.  After you run this command, your `ANGULAR_ENV` and firebase project will be whatever they were originally.

If you only need to deploy a new client or server, you can use `npm run stage:client` and `npm run stage:server` with the same behavior.

### Run E2E Tests

All end-to-end tests can be run with `npm run e2e`.  They will use the environment specified by your `ANGULAR_ENV` environment variable.

You must run `npm run start:server` in a separate window to provide a complete stack.  `npm run e2e` will serve the client automatically, but not the server.

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
