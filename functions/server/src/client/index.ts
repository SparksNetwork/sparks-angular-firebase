import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModuleNgFactory } from '../../../client/dist/ngfactory/client/src/app/app.server.module.ngfactory'
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Foo } from '../../../shared'

enableProdMode();

const app = express();

const assetPath = join(__dirname, '..', '..', '..', '..', '..', 'client', 'dist', 'bundled')
let template = readFileSync(join(assetPath, 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'client/dist/bundled')

app.get('*.*', express.static(assetPath));

app.get('*', (req, res) => {
  res.render('index', { req });
});

import * as functions from 'firebase-functions'

export const client = functions.https.onRequest((req,res) => {
  // NOTE: You need to add a trailing slash to the root URL becasue of this issue: https://github.com/firebase/firebase-functions/issues/27
  // without trailing "/", req.path = null, req.url = null
  // won't match to your app.get('/', ...) route
  // open issue: https://github.com/firebase/firebase-functions/issues/27
  if (!req.path) { req.url = `/${req.url}` }
  return app(req,res)
});
