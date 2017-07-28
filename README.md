# Sparks Angular + Firebase Monorepo.

```
/
  /functions # see note
    /client
      /src # started with ng cli
      /dist
        /bundled # result of ng build:client, can be deployed via firebase hosting
        /ngfactory # result of ng build:ssr, referenced by server-side express server running on functions
        /ssr # part of the above's build process
    /server
      /src # TS containing http, database functions
      /dist # path referenced by /functions/index.js functions bootstrapper
```
