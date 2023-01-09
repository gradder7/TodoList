displayItems();
let addTask = document.getElementById("addtaskbtn");
let inputTaskData = document.getElementById("addtaskinput");
let savetaskbtn = document.getElementById("savetaskbtn");

//global

addTask.addEventListener("click", () => {
  let taskobj = localStorage.getItem("localTask")
    ? JSON.parse(localStorage.getItem("localTask"))
    : [];
  let inputdata = inputTaskData.value;
  let user = {
    username: "",
    password: "",
    inputdata: inputdata,
    complete: false,
  };
  //   let webTask = localStorage.getItem("localTask");
  //   console.log("webTask", webTask);

  //   //if localTask is there parse it or
  //   //make empty array
  //   if (webTask == null) {
  //     taskobj = [];
  //   } else {
  //     //string to array
  //     //we get the array
  //     taskobj = JSON.parse(webTask);
  //   }
  //   console.log("arrraybefore", taskobj);

  if (inputdata.trim() != 0) {
    //push to an array
    taskobj.push(user);
    localStorage.setItem("localTask", JSON.stringify(taskobj));
    inputTaskData.value = "";
    //it will reload on every entry
    // location.reload();

  }
  displayItems();
});

//display
function displayItems() {
  let taskobj = localStorage.getItem("localTask")
    ? JSON.parse(localStorage.getItem("localTask"))
    : [];
  let tableContent = document.getElementById("addedtasklist");
  let html = "";
  taskobj.forEach((element, index) => {
    html += `    <tr class='trbg'>
    <th scope="row">${index + 1}</th>  
    <td class="colorChange">${element.inputdata}</td>
    <td>
    <button type="button" class="text-primary btnEdit">
    <i class="fa fa-edit"></i>Edit
    </button>
    </td>
    <td>
    <button type="button" class="text-primary delbtn">
    <i class="fa fa-trash"></i>Delete
    </button>
    </td>
    <td>
    <div class="form-check form-switch">
    <input class="form-check-input checkMe" type="checkbox">
    <label class="form-check-label" for="flexSwitchCheckDefault">Completed</label>
    </div>
    </td>
    <td class="tooltiptd">
    <div class="tooltip1">
    ?
    <span class="tooltiptext">Tooltip text</span>
    </div>
    </td>
    </tr>`;
  });
  tableContent.innerHTML = html;

  deleteTask();
  deleteAll();
  editTask();
  complete();
  unClompleteRed();
  checkWithcolor();
  searchText();
}

//delete
function deleteTask() {
  let delbtn = document.querySelectorAll(".delbtn");
  let taskobj = JSON.parse(localStorage.getItem("localTask"));
  delbtn.forEach((del, index) => {
    del.addEventListener("click", () => {
      taskobj.splice(index, 1);
      localStorage.setItem("localTask", JSON.stringify(taskobj));
      displayItems();
    });
  });
}

function deleteAll() {
  let delAll = document.getElementById("deleteallbtn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addTask = document.getElementById("addtaskbtn");
  let taskobj = JSON.parse(localStorage.getItem("localTask")); //   console.log(delAll);
  delAll.addEventListener("click", () => {
    // console.log(taskobj.length);
    taskobj.splice(0, taskobj.length);
    savetaskbtn.style.display = "none";
    addTask.style.display = "block";
    inputTaskData.value = "";
    localStorage.setItem("localTask", JSON.stringify(taskobj));
    displayItems();
  });
}

function editTask() {
  let editTask1 = document.querySelectorAll(".btnEdit");
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addTask = document.getElementById("addtaskbtn");
  let saveIndex = document.getElementById("saveindex");
  let taskobj = JSON.parse(localStorage.getItem("localTask"));
  editTask1.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      inputTaskData.value = taskobj[i].inputdata;
      addTask.style.display = "none";
      savetaskbtn.style.display = "block";
      saveIndex.value = i;
      saveButton();
    });
  });
}

function saveButton() {
  let savetaskbtn = document.getElementById("savetaskbtn");
  let taskobj = JSON.parse(localStorage.getItem("localTask"));
  savetaskbtn.addEventListener("click", () => {
    let indexOfInputHidden = document.getElementById("saveindex").value;
    taskobj[indexOfInputHidden].inputdata = inputTaskData.value;
    savetaskbtn.style.display = "none";
    addTask.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskobj));
    inputTaskData.value = "";
    displayItems();
    location.reload();
  });
}

function complete() {
  let checkbox = document.querySelectorAll(".checkMe");
  let colorChangetr = document.querySelectorAll(".trbg");
  taskobj = localStorage.getItem("localTask")
    ? JSON.parse(localStorage.getItem("localTask"))
    : [];
  checkbox.forEach((check, index) => {
    check.addEventListener("change", function (e) {
      taskobj[index].complete = e.target.checked;
      localStorage.setItem("localTask", JSON.stringify(taskobj));
      if (taskobj[index].complete) {
        colorChangetr[index].style.color = "green";
      } else {
        colorChangetr[index].style.color = "red";
      }
    });
  });
}

function checkWithcolor() {
  let checkbox = document.querySelectorAll(".checkMe");
  let colorChangetr = document.querySelectorAll(".trbg");
  taskobj = localStorage.getItem("localTask")
    ? JSON.parse(localStorage.getItem("localTask"))
    : [];
  checkbox.forEach((check, index) => {
    checkbox[index].checked = taskobj[index].complete;
    if (taskobj[index].complete) {
      colorChangetr[index].style.color = "green";
    }
  });
}

function unClompleteRed() {
  let colorChangetr = document.querySelectorAll(".trbg");
  colorChangetr.forEach((color, index) => {
    colorChangetr[index].style.color = "red";
  });
}

// todo-> complete this
function countTask() {
  let countCountainer = document.getElementById("divcount");
  taskobj = localStorage.getItem("localTask")
    ? JSON.parse(localStorage.getItem("localTask"))
    : [];
  let count = document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(count);
  countCountainer.innerHTML = `
      <h2 id="heading">0/${taskobj.length}</h2>`;
}
countTask();

function displayUserName() {
  let nameDisplay = document.getElementById("nameUser");
  let a = "hi";
  nameDisplay.innerText = `Welcome ${a}`;
}
displayUserName();

function searchText() {
  let seacrchTextBox = document.getElementById("searchtextbox");
  seacrchTextBox.addEventListener("input", function () {
    let trlist = document.querySelectorAll("tr");
    let trArray = Array.from(trlist);
    trArray.forEach((element) => {
      let searchedText = element.getElementsByTagName("td")[0].innerText;
      let searchValue = seacrchTextBox.value;
      let re = new RegExp(searchValue, "gi");
      if (searchedText.match(re)) {
        element.style.display = "table-row";
      } else {
        element.style.display = "none";
      }
    });
  });
}
