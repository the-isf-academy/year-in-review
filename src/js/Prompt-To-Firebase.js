//To use this file, change promptFile to the path (line 8)
//In terminal, run "node Prompt-To-Firebase.js"

//Adapted from https://medium.com/lucas-moyer/how-to-import-json-data-into-firestore-2b370486b622
const firebase = require("firebase");
require("firebase/firestore");
var config = require('../server/firebase_config.js');
const promptFile = require('../json/2019-2020_EndofYear.json');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(config);
var db = firebase.firestore();

//Read from specific promptFile
var year = promptFile.year;
var unit = promptFile.unit;
var formPages = promptFile.formPages;
console.log(formPages);

//send JSON file to Firebase
formPages.forEach(function(obj) {
    db.collection("prompts").doc(year).collection(unit).doc(obj.id).set({
      id: obj.id,
      criterion: obj.criterion,
      questions: obj.questions
    })
    .then(function(docRef) {
        console.log("Document written");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
