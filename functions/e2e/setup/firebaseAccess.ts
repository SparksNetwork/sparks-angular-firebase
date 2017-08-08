const fs = require('fs');
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./adminsdk.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://sparksnetworktest.firebaseio.com/"
});
const db = firebaseAdmin.database();

export const loadFile = function (filePath:string, parentRefName:string) {

    let fileContent = fs.readFileSync(filePath, 'utf8');

    let parentRef = db.ref(parentRefName); 
    parentRef.update((JSON.parse(fileContent)));

}

export const deleteLoadedData = function (parentRefName:string,startingKey:number,endingKey:number){

    let parentRef = db.ref(parentRefName);
    for(let i=startingKey;i<=endingKey;i++){
        var ref = db.ref(parentRefName+"/"+i);
        ref.remove();
    }
   
}