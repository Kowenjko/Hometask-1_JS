let arr_icon = {
  task: "<i class='fas fa-shopping-cart'></i>",
  idea: "<i class='fas fa-lightbulb'></i>",
  quote: "<i class='fas fa-quote-right'></i>",
  randomThought: "<i class='fas fa-head-side-virus'></i>",
  editNote: "<i class='fas fa-pen'></i>",
  deleteNote: "<i class='fas fa-trash'></i>",
  archiveNote: "<i class='fas fa-archive'></i>",
};
let now_data = new Date().toLocaleDateString();
console.log(now_data);
let categories = ["Task", "Quote", "Random Thought", "Idea"];

let formatNameCategory = (category) => {
  let category_item = category.replace(/\s/g, "");
  return category_item[0].toLowerCase() + category_item.slice(1);
};

let nextId = (id) => {
  return id.sort((a, b) => b - a)[0] + 1;
};

let notes = [
  {
    id: 1,
    name: "Shoping list",
    created: "Sun Oct 03 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    id: 2,
    name: "New Feature",
    created: "Sun Oct 02 2021",
    category: "Idea",
    content: "Implement new...",
  },
  {
    id: 3,
    name: "William Gaddis",
    created: "Sun Oct 03 2021",
    category: "Quote",
    content: "Power doesn't co...",
  },
  {
    id: 4,
    name: "The theory of evolut...",
    created: "Sun Oct 01 2021",
    category: "Random Thought",
    content: "The evolut..",
  },
];

let tableHeader = document.querySelectorAll("table#noteList th"),
  tableBody = document.querySelector("table#noteList tbody");
let buttonCreate = document.querySelector(".button-create button");
let buttonAdd = document.querySelector(".button-add button");
let tableCreate = document.querySelector(".table-create ");
console.log(tableHeader);
console.log(tableBody);
// Функція для введення даних в таблицю
function addItem(obj) {
  let tr = document.createElement("TR");
  tr.classList.add(`id`);
  for (let item of tableHeader) {
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
      td.textContent = obj[item.innerText.toLowerCase()];
    }
    tr.append(td);
  }
  tableBody.append(tr);
}
// Удаляємо вибрану нотатку
notes.forEach((item) => addItem(item));
let itemNote = document.querySelectorAll("table#noteList .id");
let itemDelete = document.querySelectorAll("table#noteList tbody .delete_note");
itemDelete.forEach((note, index) => {
  note.addEventListener("click", () => {
    itemNote[index].remove();
  });
});
// Визиваємо таблицю для додавання нотаток
buttonCreate.addEventListener("click", function () {
  tableCreate.classList.toggle("active");
  this.classList.toggle("active");
});
// добавляємо нотатку

console.log(itemNote);
console.log(itemDelete);

// addItem(notes[0]);
submit.addEventListener("click", function (event) {
  tableCreate.classList.toggle("active");
  buttonCreate.classList.toggle("active");
  let item = {
    id: nextId([6]),
    name: "Shoping list",
    created: "Sun Oct 03 2021",
    category: "Task",
    content: "Tomatoes, bread",
  };

  console.log(item);
  addItem(item);
});
