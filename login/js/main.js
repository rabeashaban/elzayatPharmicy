const firebaseConfig = {
  apiKey: "AIzaSyB_tln2Up198eBaCmPkDOEip7kLti4kL8Q",
  authDomain: "elzayatpharmicy.firebaseapp.com",
  databaseURL: "https://elzayatpharmicy-default-rtdb.firebaseio.com",
  projectId: "elzayatpharmicy",
  storageBucket: "elzayatpharmicy.appspot.com",
  messagingSenderId: "706734482155",
  appId: "1:706734482155:web:3ca8cb19580e935fe114ae",
  measurementId: "G-0BWS968WW8"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

// Initialize Cloud Firestore and get a reference to the service

/* Start auth */
//انشاء حساب تسجيل الدخول
$("#CreateInAcc").click(function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var listtName = $("#listtName").val();
  var email = $("#email").val();
  var password = $("#password").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //تخزين بيانات المستخدم
      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: firstName+" "+listtName
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });

      // Signed in
      var user = userCredential.user;
      database.ref("users/" + user.uid).set({
        firstName: firstName,
        listtName: listtName,
        email: email,
        password: password,
      });

      alert("User created successfully");
      window.location.href = "LogOut.html"; //   اذهب اللي  تسجيل الدخول
      $("#firstName").val("");
      $("#listtName").val("");
      $("#email").val("");
      $("#password").val("");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorMessage);
      alert(errorMessage);
      // ..
    });
});

// عمل عملية تسجيل الدخول
$("#Login").click(function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // تم تسجيل الدخول بنجاح
      var user = userCredential.user;
      alert("done");

      //فضي البيانات
      $("#email").val("");
      $("#password").val("");
      window.location.href = "Home.html"; // بعد ما تسجل دخول اذهب اللي الصفحة دي
    })
    .catch((error) => {
      // حدث خطأ أثناء تسجيل الدخول
      const errorCode = error.code;

      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// يعرف العملية التي قام بها المستخدم
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log(user.displayName);
    $("#WEl").text("Welcome to " + user.displayName); // يظهر اسم المستخدم في الصفحة
    // $("#user").hide();
    // $("#out").show();
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//عملية تسجيل خروج
$("#Logout-user").click(function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("Sign-out successful.");
      window.location = "index.html"; // بعد ما تعمل تسجيل خروج اذهب اللي الصفحة دي
    })
    .catch((error) => {
      // An error happened.
      alert("An error happened.");
    });
});

/* Data */

// Initialize Cloud Firestore and get a reference to the service
