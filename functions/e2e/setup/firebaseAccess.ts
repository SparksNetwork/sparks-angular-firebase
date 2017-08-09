import * as fs from 'fs'
import * as firebaseAdmin from 'firebase-admin'

const environment = getEnvironment()
const serviceAccount = require("../../../" + environment.firebaseAdminCredentialFilename)
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: environment.firebase.databaseURL,
});
const db = firebaseAdmin.database();

function getEnvironment() {
    const envName = process.env['ANGULAR_ENV'] || 'qa'
    console.log('*** running in angular environment', envName)
    return require('../../client/src/environments/environment.' + envName).environment
}

export const loadFile = function (filePath:string, parentRefName:string) {

    let fileContent = fs.readFileSync(filePath, 'utf8');

    let parentRef = db.ref(parentRefName);
    parentRef.update((JSON.parse(fileContent)));

}

export const deleteLoadedData = function (parentRefName:string,startingKey:number,endingKey:number){

    let parentRef = db.ref(parentRefName);
    for(let i=startingKey;i<=endingKey;i++){
        let ref = db.ref(parentRefName+"/"+i);
        ref.remove();
    }
   
}

export const deleteItemByKey = function (parentRefName:string, key:string){
     let parentRef = db.ref(parentRefName);
     var ref = db.ref(parentRefName+"/"+key);
     ref.remove();
}