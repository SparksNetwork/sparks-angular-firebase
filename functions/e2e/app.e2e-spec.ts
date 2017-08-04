import * as firebase from 'firebase/app';
import { ClientPage } from './app.po';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { inject } from '@angular/core/testing';

//imports for test bed initialiation and set up
import 'core-js'; // ES6 + reflect-metadata
// zone.js
import 'zone.js/dist/zone-node';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/jasmine-patch';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

var firebaseConfigModule = require('./firebase.conf');
var firebaseDb;

describe('client App', () => {
  let page: ClientPage;
  let firebaseDb: AngularFireDatabase;

  beforeEach(() => {

    page = new ClientPage();

    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(firebaseConfigModule.firebaseConfig)]
    }).compileComponents();


    //If I comment out this piece of code it will not work
    //I have not found another way to inject the AngularFireDatabase class in my tests
    //inject([AngularFireDatabase], (angularFireDatabase: AngularFireDatabase) => {
      //firebaseDb = angularFireDatabase;
    //})();
  });

  it('test', () => {
    page.navigateTo();
    expect(true).toBe(true);
  });

});