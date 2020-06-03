const firebase = require('firebase/app');
require('firebase/firestore');

var config = require('../server/firebase_config.js');

class Fire {
  constructor() {
    this.username = "";
    this.year = "";
    this.unit = "";
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
    this.db = firebase.firestore();
	}

  /* getFormPage   //Adapted from https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
  * Takes a string of a year (must be a Firebase doc name ) and a unit (must be a Firebase collection name)
  * and retrieves all of the docs stored under the collection "unit" (prompts -> year -> unit)
  * and combines them into an array of Javascript objects
  */
  async getFormPage(year, unit) {
    this.year = year;
    this.unit = unit;
    const snapshot = await this.db.collection("prompts").doc(year).collection(unit).get();
    return snapshot.docs.map(doc => doc.data());
  }

  /* storeUser
  * Takes a github User Object
  * and stores user name and URL in the document (users -> userloginname)
  */
  storeUser(res) {
    this.username = res.data.login;
    this.db.collection("users").doc(res.data.login).set({
        name: res.data.name,
        github_URL: res.data.url,
    })
    .then(function(docRef) {
        console.log("User written");
    })
    .catch(function(error) {
        console.error("Error adding document", error);
    });
  };

  /* storeFormInput
  * Saves state object as a Firebase doc, stored under a document "unit" (users -> user's name -> year -> unit)
  * If the user presses the submit button, alerts the user about submission
  */
  storeFormInput(state, isSubmit){
    var docRef = this.db.collection("users").doc(this.username).collection(this.year).doc(this.unit)
    docRef.set(state)
    .then(function(docRef) {
        if (isSubmit) alert("Submitted! Feel free to Resubmit.");
    })
    .catch(function(error) {
        console.error("Error adding document", error);
    });
  }

  /* getPreviousFormInput
  * Retrieves previous form input from Firebase with the username, year, and unit stored in the Fire class
  * Upon success, performs callback from prompts.js
  */
  getPreviousFormInput(callback_withform){
    console.log("getting Previous Form Input");
    var docRef = this.db.collection("users").doc(this.username).collection(this.year).doc(this.unit);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Previous Form Input exists");
          callback_withform(doc.data())
      } else {
        console.log("no previous data");
          // doc.data() will be undefined in this case
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
}

const singleton = new Fire();
export default singleton;
