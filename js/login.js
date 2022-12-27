//fetch data
let fetchApi = async () => {
  let response = await fetch("/data/data.json");
  // console.log(response);
  let newResponse = await response.json();
  console.log(newResponse);
  userValidation(newResponse);
};
fetchApi();

function userValidation(data) {
  let loginbtn = document.getElementById("loginclick");
  function getInfo() {
    var email = document.getElementById("form3Example3").value;
    var password = document.getElementById("form3Example4").value;
    for (let i = 0; i < data.length; i++) {
      if (email === data[i].email && password === data[i].password) {
        console.log("sucessfull");
        window.location.href = "index.html";
        return;
      }
    }
    console.log("wrong");
  }
  loginbtn.addEventListener("click", getInfo);
}
