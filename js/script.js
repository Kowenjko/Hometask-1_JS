import { arr_icon, notesList, categories } from "./data.js";
import * as dataDOM from "./dataDOM.js";

// ---------------------------------
let formatNameCategory = (category) => {
  let category_item = category.replace(/\s/g, "");
  return category_item[0].toLowerCase() + category_item.slice(1);
};
// ---------------------------------
let nextId = (id) => {
  return id.map((item) => item.id).sort((a, b) => b - a)[0] + 1;
};
// ---------------------------------
const totalNones = (note, categories) => {
  let active_notes = {};
  for (let i = 0; i < categories.length; i++) {
    active_notes[categories[i]] = note.filter((elem) => elem.category == categories[i]).length;
  }
  return active_notes;
};
// ---------------------------------
let onDelete = (list, index, item) => {
  let partOne = list.slice(0, index);
  let partTwo = list.slice(index + 1);
  let tmpList = [...partOne, ...partTwo];
  //   localStorage.removeItem(item);
  localStorage.setItem(item, JSON.stringify(tmpList));
};
// ---------------------------------
let onAddLocal = (note) => {
  let notesAll = JSON.parse(localStorage.getItem("notesList"));
  let notes = [...notesAll, ...[note]];
  localStorage.setItem("notesList", JSON.stringify(notes));
};
// ---------------------------------

let startLoadData = localStorage.getItem("startData");
console.log(startLoadData);
// Один раз загружаємо в localStorage
!startLoadData == null
  ? localStorage.setItem("notesList", JSON.stringify(notesList))
  : localStorage.setItem("startData", true);

// Функція для введення даних в таблицю---------------
function addItem(obj) {
  let tr = document.createElement("TR");
  tr.classList.add(`id`, `id-${obj.id}`);
  for (let item of dataDOM.tableHeader) {
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
    } else if (item.classList.contains("category")) {
      div.classList.add(`truncate`);
      div.textContent = obj[item.innerText.toLowerCase()];
      td.classList.add(`category`);
      td.append(div);
    } else {
      div.classList.add(`truncate`);
      div.textContent = obj[item.innerText.toLowerCase()];
      td.append(div);
    }
    tr.append(td);
  }
  dataDOM.tableBody.append(tr);
}

let notes = JSON.parse(localStorage.getItem("notesList"));
notes.forEach((item) => addItem(item));

let itemNote = document.querySelectorAll("table#noteList .id");
let itemDelete = document.querySelectorAll("table#noteList tbody .delete_note");
let itemCategory = document.querySelectorAll("table#noteList tbody .category");
let itemArchive = document.querySelectorAll("table#noteList tbody .archive_note");
let itemEdit = document.querySelectorAll("table#noteList tbody .edit_note");

// Удаляємо вибрану нотатку------------------
itemDelete.forEach((note, index) => {
  note.addEventListener("click", () => {
    itemNote[index].remove();
    onDelete(notes, index, "notesList");
    window.location.reload();
  });
});

// Редагуємо вибрану нотатку-----------------------
itemEdit.forEach((note, index) => {
  note.addEventListener("click", () => {
    dataDOM.buttonAdd.textContent = "Edit";

    dataDOM.tableCreate.classList.toggle("active");
    dataDOM.buttonCreate.classList.toggle("active");

    addForm.name.value = itemNote[index].childNodes[1].textContent;
    addForm.category.value = itemNote[index].childNodes[3].textContent;
    addForm.content.value = itemNote[index].childNodes[4].textContent;

    localStorage.setItem("index", index);
    localStorage.setItem("create", itemNote[index].childNodes[2].textContent);
  });
});
// Визиваємо таблицю для додавання нотаток------
dataDOM.buttonCreate.addEventListener("click", function () {
  dataDOM.buttonAdd.textContent = "Add";
  dataDOM.tableCreate.classList.toggle("active");
  this.classList.toggle("active");
  addForm.name.value = "";
  addForm.content.value = "";
});

// кнопка cancel----------------------------------
dataDOM.buttonCancel.addEventListener("click", function () {
  dataDOM.tableCreate.classList.toggle("active");
  dataDOM.buttonCreate.classList.toggle("active");
});
// добавляємо нотатку-------------------------------
dataDOM.buttonAdd.addEventListener("click", function (event) {
  event.preventDefault();
  if (this.textContent == "Edit") {
    const index = localStorage.getItem("index");
    onDelete(notes, index, "notesList");
    itemNote[index].remove();
  }
  dataDOM.tableCreate.classList.toggle("active");
  dataDOM.buttonCreate.classList.toggle("active");

  const ald_date = new Date(localStorage.getItem("create"));
  const new_date = new Date(addForm.create.value);

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

  addItem(item);
  onAddLocal(item);
  window.location.reload();
});

// Визначаємо кількість
let archive_notes = {
  Task: 0,
  Quote: 0,
  "Random Thought": 0,
  Idea: 0,
};
// localStorage.setItem("archive", JSON.stringify(archive_notes));
let archiveStorage = JSON.parse(localStorage.getItem("archive"));
let active = totalNones(notes, categories);
let arr_archive = JSON.parse(localStorage.getItem("archiveNotes"));
// Архівуємо нататку------------------
itemArchive.forEach((note, index) => {
  note.addEventListener("click", () => {
    archiveStorage[itemCategory[index].textContent]++;
    localStorage.setItem("archive", JSON.stringify(archiveStorage));
    arr_archive.push(notes[index]);
    localStorage.setItem("archiveNotes", JSON.stringify(arr_archive));
    itemNote[index].remove();
    onDelete(notes, index, "notesList");
    window.location.reload();
  });
});
console.log(arr_archive);
// ----Загальний підсумок------------------------------
let totalArchive = [];
for (let i = 0; i < categories.length; i++) {
  let obj_atchive = {};
  obj_atchive["category"] = categories[i];
  obj_atchive["active"] = active[categories[i]];
  obj_atchive["archived"] = archiveStorage[categories[i]];
  totalArchive.push(obj_atchive);
}
// Функція для введення даних в таблицю---------------
function addArchive(obj) {
  let tr = document.createElement("TR");
  tr.classList.add(`id`);
  for (let item of dataDOM.archiveHeader) {
    let td = document.createElement("TD");
    if (item.classList.contains("id_note")) {
      td.innerHTML = arr_icon[formatNameCategory(obj.category)];
    } else {
      td.textContent = obj[item.innerText.toLowerCase()];
    }
    tr.append(td);
  }
  dataDOM.arhiveBody.append(tr);
}
// ------------------------------------------------------

// ------------------------------------------------------

// ------------------------------------------------------
// Функція для введення даних в таблицю---------------
function tableArchive(obj) {
  let div = document.createElement("DIV");
  let tr = document.createElement("TR");
  tr.classList.add(`id`, `id-${obj.id}`);
  for (let item of dataDOM.archiveTableHeader) {
    let td = document.createElement("TD");
    if (item.classList.contains("id_note")) {
      td.innerHTML = arr_icon[formatNameCategory(obj.category)];
    } else if (item.classList.contains("archive_note")) {
      td.innerHTML = arr_icon.archiveNote;
      td.classList.add(`archive_note`);
    } else if (item.classList.contains("category")) {
      td.textContent = obj[item.innerText.toLowerCase()];
      td.classList.add(`category`);
    } else {
      td.textContent = obj[item.innerText.toLowerCase()];
    }
    tr.append(td);
  }
  dataDOM.arhiveTableBody.append(tr);
}
// ---------------------------------------------
totalArchive.forEach((item) => addArchive(item));
let itemArchiveList = document.querySelectorAll("table#ArchiveList .id");
let sectionArchive = document.querySelector(".section-archive");
console.log(sectionArchive);
// ---------------------------------------------
itemArchiveList.forEach((note, index) => {
  note.addEventListener("click", () => {
    sectionArchive.classList.toggle("active");
  });
});
// ---------------------------------------------

let archiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
archiveNotes.forEach((item) => tableArchive(item));
// ---------------------------------------------
let itemNoteArchive = document.querySelectorAll("table#ArchiveTable .id");
let itemNoArchive = document.querySelectorAll("table#ArchiveTable tbody .archive_note");
let archiveCategory = document.querySelectorAll("table#ArchiveTable tbody .category");
// ---------------------------------------------

// Повертаємо назад------------------
itemNoArchive.forEach((note, index) => {
  note.addEventListener("click", () => {
    notes.push(archiveNotes[index]);
    itemNoteArchive[index].remove();
    archiveStorage[archiveCategory[index].textContent]--;
    localStorage.setItem("archive", JSON.stringify(archiveStorage));
    localStorage.setItem("notesList", JSON.stringify(notes));
    onDelete(archiveNotes, index, "archiveNotes");
    window.location.reload();
  });
});
