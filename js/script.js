let arr_icon = {
  task: "<i class='fas fa-shopping-cart'></i>",
  idea: "<i class='fas fa-lightbulb'></i>",
  quote: "<i class='fas fa-quote-right'></i>",
  randomThought: "<i class='fas fa-head-side-virus'></i>",
  editNote: "<i class='fas fa-pen'></i>",
  deleteNote: "<i class='fas fa-trash'></i>",
  archiveNote: "<i class='fas fa-archive'></i>",
};
// let now_data = new Date().toLocaleDateString();
let now_data = new Date().toDateString();
console.log(now_data);
let categories = ["Task", "Quote", "Random Thought", "Idea"];

let formatNameCategory = (category) => {
  let category_item = category.replace(/\s/g, "");
  return category_item[0].toLowerCase() + category_item.slice(1);
};
// ---------------------------------
let nextId = (id) => {
  return id.map((item) => item.id).sort((a, b) => b - a)[0] + 1;
};
// ---------------------------------
let onDelete = (list, index) => {
  let partOne = list.slice(0, index);
  let partTwo = list.slice(index + 1);
  let tmpList = [...partOne, ...partTwo];
  localStorage.removeItem("notesList");
  localStorage.setItem("notesList", JSON.stringify(tmpList));
};
// ---------------------------------

let notesList = [
  {
    id: 1,
    name: "Shoping list",
    created: "Sun Oct 03 2021",
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
  },
  {
    id: 2,
    name: "New Feature",
    created: "Sun Oct 02 2021",
    category: "Idea",
    content: "Implement new...",
    dates: "",
  },
  {
    id: 3,
    name: "William Gaddis",
    created: "Sun Oct 03 2021",
    category: "Quote",
    content: "Power doesn't co...",
    dates: "",
  },
  {
    id: 4,
    name: "The theory of evolut...",
    created: "Sun Oct 01 2021",
    category: "Random Thought",
    content: "The evolut..",
    dates: "",
  },
  {
    id: 5,
    name: "The theory of evolut...",
    created: "Sun Oct 01 2021",
    category: "Quote",
    content: "The evolut..",
    dates: "",
  },
  {
    id: 6,
    name: "The theory of evolut...",
    created: "Sun Oct 01 2021",
    category: "Random Thought",
    content: "The evolut..",
    dates: "",
  },
  {
    id: 7,
    name: "New Feature",
    created: "Sun Oct 02 2021",
    category: "Idea",
    content: "Implement new...",
    dates: "",
  },
];

// localStorage.setItem("notesList", JSON.stringify(notesList));

let tableHeader = document.querySelectorAll("table#noteList th"),
  tableBody = document.querySelector("table#noteList tbody");
let buttonCreate = document.querySelector(".button-create button");
let buttonCancel = document.querySelector(".button-cancel");
let buttonAdd = document.querySelector(".button-add");
let tableCreate = document.querySelector(".table-create ");

console.log(tableHeader);
console.log(tableBody);
// Функція для введення даних в таблицю
function addItem(obj) {
  let tr = document.createElement("TR");
  tr.classList.add(`id`, `id-${obj.id}`);
  for (let item of tableHeader) {
    let div = document.createElement("DIV");
    let td = document.createElement("TD");
    if (item.classList.contains("id_note")) {
      td.innerHTML = arr_icon[formatNameCategory(obj.category)];
    } else if (item.classList.contains("edit_note")) {
      td.innerHTML = arr_icon.editNote;
      td.classList.add(`edit_note`);
    } else if (item.classList.contains("archive_note")) {
      td.innerHTML = arr_icon.archiveNote;
      td.classList.add(`archive_note`);
    } else if (item.classList.contains("delete_note")) {
      td.innerHTML = arr_icon.deleteNote;
      td.classList.add(`delete_note`);
    } else {
      div.classList.add(`truncate`);
      div.textContent = obj[item.innerText.toLowerCase()];
      td.append(div);
    }
    tr.append(td);
  }
  tableBody.append(tr);
}

let notes = JSON.parse(localStorage.getItem("notesList"));
notes.forEach((item) => addItem(item));
// Удаляємо вибрану нотатку

let itemNote = document.querySelectorAll("table#noteList .id");
let itemDelete = document.querySelectorAll("table#noteList tbody .delete_note");
let itemEdit = document.querySelectorAll("table#noteList tbody .edit_note");
itemDelete.forEach((note, index) => {
  note.addEventListener("click", () => {
    itemNote[index].remove();
    onDelete(notes, index);
    // localStorage.setItem("notesList", JSON.stringify(itemNote));
  });
});
// Редагуємо вибрану нотатку
itemEdit.forEach((note, index) => {
  note.addEventListener("click", () => {
    buttonAdd.textContent = "Edit";
    tableCreate.classList.toggle("active");
    buttonCreate.classList.toggle("active");
    addForm.name.value = itemNote[index].childNodes[1].textContent;
    addForm.category.value = itemNote[index].childNodes[3].textContent;
    addForm.content.value = itemNote[index].childNodes[4].textContent;
    localStorage.setItem("index", index);
    localStorage.setItem("create", itemNote[index].childNodes[2].textContent);
  });
});
// Визиваємо таблицю для додавання нотаток
buttonCreate.addEventListener("click", function () {
  buttonAdd.textContent = "Add";
  tableCreate.classList.toggle("active");
  this.classList.toggle("active");
  addForm.name.value = "";
  addForm.content.value = "";
});

// кнопка отмена
buttonCancel.addEventListener("click", function () {
  tableCreate.classList.toggle("active");
  buttonCreate.classList.toggle("active");
});
// добавляємо нотатку
buttonAdd.addEventListener("click", function (event) {
  console.log(this.textContent);
  //   event.preventDefault();
  if (this.textContent == "Edit") {
    const index = localStorage.getItem("index");
    onDelete(notes, index);
    itemNote[index].remove();
  }
  tableCreate.classList.toggle("active");
  buttonCreate.classList.toggle("active");
  const ald_date = new Date(localStorage.getItem("create"));
  console.log(ald_date);
  const new_date = new Date(addForm.create.value);
  console.log(new_date);
  let item = {
    id: nextId(notes),
    name: addForm.name.value,
    created: new_date.toDateString(),
    category: addForm.category.value,
    content: addForm.content.value,
    dates:
      this.textContent == "Edit"
        ? `${ald_date.toLocaleDateString()},${new_date.toLocaleDateString()}`
        : null,
  };

  //   console.log(item);
  console.log(item);
  addItem(item);
  //   localStorage.removeItem("notesList");
  let not = JSON.parse(localStorage.getItem("notesList"));
  console.log(not);
  let arr = [...not, ...[item]];
  console.log(arr);
  localStorage.setItem("notesList", JSON.stringify(arr));
});
