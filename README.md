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

## Setup

Check out the branch and `npm install` to get all the dependencies installed.

### Client Only

If you run `npm run start:client`, you will get a JIT version of the client on your local machine.  This is just running `ng serve`.

I am *pretty sure* that this local development server will talk to the *deployed* version of the backend.

### Full Stack

Make changes.  Run: `npm run start:server`.

The latest `firebase-functions` will run locally and you can hit `http://localhost:5000` to get a live server.

I am *somewhat sure* that this local development server will talk to the *local* version of the backend.

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

# Deployment

`firebase deploy` pushes the most recent built files to the cloud project that is selected.  Right now that is just one project.

TODO: `npm run deploy` to push to staging, this should be a CI action when new merge to develop.  Also `npm run deploy:production`, a CI action to push to staging when new merge to master.

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
