//تثبيت الداتا بيز ريل تيم

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_tln2Up198eBaCmPkDOEip7kLti4kL8Q",
  authDomain: "elzayatpharmicy.firebaseapp.com",
  databaseURL: "https://elzayatpharmicy-default-rtdb.firebaseio.com",
  projectId: "elzayatpharmicy",
  storageBucket: "elzayatpharmicy.appspot.com",
  messagingSenderId: "706734482155",
  appId: "1:706734482155:web:3ca8cb19580e935fe114ae",
  measurementId: "G-0BWS968WW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//استدعاء البيانات من الداتا بيز
var database = getDatabase(app);
var PostCollection = ref(database, "/UserEmp");
//اظهر البيانات علطول لما بتحس ان في تغيير
onValue(PostCollection, (data) => {
  Show(data.val());
  ShowSale(data.val());
});

// الموظفين
// نعرف الجافا اسكربت ان ده من الاتش تي ام ال
window.AddEmp = AddEmp;

/// دالة الحفظ تحفظ الداتا داخل الداتا بيز
function AddEmp() {
  var ID = $("#ID").val();
  var empName = $("#empName").val();
  var gender = $("#Gender").val();
  var emailUser = $("#emailUser").val();
  var mobile = $("#mobile").val();
  var alhalat_aliajtimaeia = $("#alhalat_Aliajtimaeia").val();
  var national_id = $("#National_ID").val();

  alert("add new");
  $("#ID").val("");
  $("#empName").val("");
  $("#Gender").val("");
  $("#emailUser").val("");
  $("#mobile").val("");
  $("#alhalat_Aliajtimaeia").val("");
  $("#National_ID").val("");
  var DataInfo = {
    EmPname: empName,
    Gender: gender,
    email: emailUser,
    mb: mobile,
    Alhalat_Aliajtimaeia: alhalat_aliajtimaeia,
    National_ID: national_id,
  };
  if (ID == "") {
    //لو الايدي فاضي اعمل اضافة
    push(PostCollection, DataInfo);
  } else {
    //عملية التعديل
    const Upddets = {};
    Upddets[`/UserEmp/${ID}`] = DataInfo;
    return update(ref(database), Upddets);
  }
}

//عرض البيانات من الداتا بيز

function Show(posts) {
  $("#TableEmp").empty();
  for (var idKay in posts) {
    var dataShow = `
             
                  <tr>   
                  <th>${idKay}</th>
                  <th> ${posts[idKay].EmPname} </th>
                  <th> ${posts[idKay].Gender} </th>
                  <th> ${posts[idKay].Alhalat_Aliajtimaeia} </th>
                  <th> ${posts[idKay].mb} </th>
                  <th> ${posts[idKay].email} </th>
                  <th> ${posts[idKay].National_ID}</th>
                  <td> <i class="fa-solid fa-xmark" onclick="del('${idKay}')" ></i></td>
                  </tr>
                  
                  `;
    $("#TableEmp").append(dataShow);
  }
}

//الحذف
window.del = del;
function del(id) {
  const Upddets = {};
  Upddets[`/UserEmp/${id}`] = null; // احذف
  return update(ref(database), Upddets);
}
/*************************/

// المبيعات
var AddSale = ref(database, "/addSales");
onValue(AddSale, (data) => {
  ShowSale(data.val());
});

//ADD
window.Add_Sale = Add_Sale;
function Add_Sale() {
  var NameAdwea = $("#nameAdwea").val();
  var Alnowa = $("#alnowa").val();
  var Prise = $("#prise").val();
  var Alkmea = $("#alkmea").val();
  var Date = $("#date").val();

  alert("add new");
  $("#nameAdwea").val("");
  $("#alnowa").val("");
  $("#prise").val("");
  $("#alkmea").val("");
  $("#date").val("");

  var DataSale = {
    nameAdwea: NameAdwea,
    alnowa: Alnowa,
    prise: Prise,
    alkmea: Alkmea,
    date: Date,
  };

  push(AddSale, DataSale);
}
window.ShowSale = ShowSale;
function ShowSale(daSale) {
  $("#table_Sale").empty();
  for (var idK in daSale) {
    var dataSh = `
                    <tr>   
                    <th>${daSale[idK].nameAdwea}</th>
                    <th>${daSale[idK].alnowa}</th>
                    <th>${daSale[idK].prise}</th>
                    <th>${daSale[idK].alkmea}</th>
                    <th>${daSale[idK].date}</th>
                    <td> <i class="fa-solid fa-xmark" onclick="dele('${idK}')" ></i></td>

                    </tr>
                    
                    `;
    $("#table_Sale").append(dataSh);
  }
}

window.dele = dele;
function dele(id) {
  const Upddets = {};
  Upddets[`/addSales/${id}`] = null; // احذف
  return update(ref(database), Upddets);
}

/******************************/

// اضافة وعرض الادوية 
var almakhzan = ref(database, "/almakhzan");
onValue(almakhzan, (data) => {
  Show_almakhzan(data.val());
});

//ADD
window.Add_Adwea = Add_Adwea;
function Add_Adwea() {
  var NameAladwea = $("#NameAladwea").val();
  var Alkmea = $("#Alkmea").val();
  var prise = $("#prise").val();
  var dete = $("#dete").val();

  alert("add new");
  $("#NameAladwea").val("");
  $("#Alkmea").val("");
  $("#prise").val("");
  $("#dete").val("");

  var Data_Add_Adwea = {
    nameAladwea: NameAladwea,
    alkmea: Alkmea,
    Prise: prise,
    Dete: dete,
  };

  push(almakhzan, Data_Add_Adwea);
}










window.Show_almakhzan = Show_almakhzan;
function Show_almakhzan(almakhzan) {
  $("#Show_almakhzan").empty();
  for (var idK in almakhzan) {
    var dataSh = `
                    <tr>   
                    <th>${almakhzan[idK].nameAladwea}</th>
                    <th>${almakhzan[idK].alkmea}</th>
                    <th>${almakhzan[idK].Prise}</th>
                    <th>${almakhzan[idK].Dete}</th>
                    <td> <i class="fa-solid fa-xmark" onclick="remov('${idK}')" ></i></td>

                    </tr>
                    
                    `;
    $("#Show_almakhzan").append(dataSh);
  }
}


window.remov = remov;
function remov(id) {
  const Upddets = {};
  Upddets[`/almakhzan/${id}`] = null; // احذف
  return update(ref(database), Upddets);
}



/*********************************/