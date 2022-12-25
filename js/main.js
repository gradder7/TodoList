let addTask = document.getElementById("addtaskbtn");
let inputTaskData = document.getElementById("addtaskinput");
let savetaskbtn = document.getElementById("savetaskbtn");

//global
taskobj = localStorage.getItem("localTask")
  ? JSON.parse(localStorage.getItem("localTask"))
  : [];

addTask.addEventListener("click", () => {
  let inputdata = inputTaskData.value;
  let user = {
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
    displayItems();
    //it will reload on every entry
    location.reload();
  }
});

function displayItems() {
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
    </tr>`;
  });
  tableContent.innerHTML = html;

  deleteTask();
  deleteAll();
  editTask();
  complete();
  unClompleteRed();
}
// console.log(taskobj);

//delete
function deleteTask() {
  let delbtn = document.querySelectorAll(".delbtn");
  //   console.log(delbtn);
  delbtn.forEach((del, index) => {
    // console.log(del);
    del.addEventListener("click", () => {
      //   console.log("hello",[index]);
      // console.log(taskobj);
      taskobj.splice(index, 1);
      localStorage.setItem("localTask", JSON.stringify(taskobj));
      location.reload();
    });
  });
}

function deleteAll() {
  let delAll = document.getElementById("deleteallbtn");
  //   console.log(delAll);
  delAll.addEventListener("click", () => {
    // console.log(taskobj.length);
    taskobj.splice(0, taskobj.length);
    localStorage.setItem("localTask", JSON.stringify(taskobj));
    location.reload();
  });
}

function editTask() {
  let editTask1 = document.querySelectorAll(".btnEdit");
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addTask = document.getElementById("addtaskbtn");
  let saveIndex = document.getElementById("saveindex");
  // console.log(editTask1);
  editTask1.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      console.log(btn);
      inputTaskData.value = taskobj[i].inputdata;
      // console.log('task edit index',i)
      addTask.style.display = "none";
      savetaskbtn.style.display = "block";
      // console.log(saveIndex.value);
      saveIndex.value = i;
      saveButton();
    });
  });
}

function saveButton() {
  let savetaskbtn = document.getElementById("savetaskbtn");
  savetaskbtn.addEventListener("click", () => {
    let z = document.getElementById("saveindex").value;
    taskobj[z].inputdata = inputTaskData.value;
    savetaskbtn.style.display = "none";
    addTask.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskobj));
    displayItems();
    // inputTaskData.value = "";
    location.reload();
  });
}

window.onload = () => {
  displayItems();
};

function complete() {
  let checkbox = document.querySelectorAll(".checkMe");
  let colorChange = document.querySelectorAll(".colorChange");
  let colorChangetr = document.querySelectorAll(".trbg");
  // console.log(colorChange);
  // console.log(checkbox);
  checkbox.forEach((check, index) => {
    check.addEventListener("change", function (e) {
      // console.log("i am clicked", index);
      taskobj[index].complete = e.target.checked;
      localStorage.setItem("localTask", JSON.stringify(taskobj));
      if (taskobj[index].complete) {
        // console.log("Checkbox is checked..");
        // colorChange[index].style.color = "green";
        // taskobj[index].complete = true;
        colorChangetr[index].style.color = "green";
        // console.log("task value=>", taskobj[index].complete);
        // console.log("checked True=>", this.checked);
      } else {
        // console.log(this.checked);
        // console.log("Checkbox is not checked..");
        // colorChange[index].style.color = "black";
        // taskobj[index].complete = false;
        colorChangetr[index].style.color = "red";

        // console.log("task value=>", taskobj[index].complete);
        // console.log("checked True=>", this.checked);
      }
    });
  });
}

function unClompleteRed() {
  let colorChangetr = document.querySelectorAll(".trbg");
  colorChangetr.forEach((color, index) => {
    colorChangetr[index].style.color = "red";
  });
}

function countTask() {
  let countCountainer = document.getElementById("divcount");
  // let checkbox = document.querySelector(".checkMe");
  // console.log(checkbox);
  // console.log(countCountainer);
  let count = document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(count);
  countCountainer.innerHTML = `
      <h2 id="heading">0/${taskobj.length}</h2>`;
}
countTask();
