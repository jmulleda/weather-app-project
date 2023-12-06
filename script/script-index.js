 // My web app's Firebase configuration
 const firebaseConfig = {
 apiKey: "AIzaSyC7IlwWZfwWDgqreVC6U2FljmStcDPTpQs",
 authDomain: "web104-project-jm.firebaseapp.com",
 projectId: "web104-project-jm",
 storageBucket: "web104-project-jm.appspot.com",
 messagingSenderId: "917587784166",
 appId: "1:917587784166:web:bf54ea74d6e8b82eee6627"
 };
    
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();


let user;

function signIn(){

    let email = document.getElementById('email-login').value
    let password = document.getElementById('password-login').value
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
   var user = userCredential.user;

   console.log(userCredential);
    user = userCredential.user.uid;
    checkIfLoggedIn();

  })
  .catch((error) => {
    alert(`Incorrect email and/or password. Please try again or register first.`);
    var errorMessage = error.message;
  });
}

function checkIfLoggedIn(){

    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log(user.email)
    // alert(`Welcome ${user.email}!`);
    window.open("./loader.html", "_self");
    
  } else {
   console.log("The user is not signed in")
  }
});

}

function createLogin(){

    let email = document.getElementById('email-login').value
    let password = document.getElementById('password-login').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.email);
    alert(`Username ${user.email} has been created.`);
    })
    .catch((error) => {
      alert(`Please enter email and password, then click "Register".`);
    var errorMessage = error.message;
    // ..
    });

}
