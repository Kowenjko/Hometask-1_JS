import { notesList, categories, archive_notes } from "./data.js";
import { addItem, addArchive, tableArchive } from "./show.js";
import { nextId, totalNones, onDelete, onAddLocal } from "./logic.js";
import * as dataDOM from "./dataDOM.js";

// Один раз загружаємо в localStorage-------------------------
let startLoadData = localStorage.getItem("startData");
if (startLoadData == null) {
  localStorage.setItem("notesList", JSON.stringify(notesList));
  localStorage.setItem("archive", JSON.stringify(archive_notes));
  localStorage.setItem("archiveNotes", JSON.stringify([]));
  localStorage.setItem("startData", "start");
}
// --------------------------------------------------------------
let notes = JSON.parse(localStorage.getItem("notesList"));
notes.forEach((item) => addItem(item));
// --------------------------------------------------------------
let itemNote = document.querySelectorAll("table#noteList .id");
let itemDelete = document.querySelectorAll("table#noteList tbody .delete_note");
let itemCategory = document.querySelectorAll("table#noteList tbody .category");
let itemArchive = document.querySelectorAll("table#noteList tbody .archive_note");
let itemEdit = document.querySelectorAll("table#noteList tbody .edit_note");
// Удаляємо вибрану нотатку---------------------
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
    itemNote[index].remove();
    onDelete(notes, index, "notesList");
  }
  dataDOM.tableCreate.classList.toggle("active");
  dataDOM.buttonCreate.classList.toggle("active");

  const old_date = new Date(localStorage.getItem("create"));
  const new_date = new Date(addForm.create.value);

  let item = {
    id: nextId(notes),
    name: addForm.name.value,
    created: new_date.toDateString(),
    category: addForm.category.value,
    content: addForm.content.value,
    dates:
      this.textContent == "Edit"
        ? `${old_date.toLocaleDateString()},${new_date.toLocaleDateString()}`
        : null,
  };

  addItem(item);
  onAddLocal(item);
  window.location.reload();
});
// --------------------------------------------------------------
let archiveStorage = JSON.parse(localStorage.getItem("archive"));
let active = totalNones(notes, categories);
let arr_archive = JSON.parse(localStorage.getItem("archiveNotes"));
// --------------Архівуємо нататку------------------
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
// ----------Загальний підсумок-------------------------
let totalArchive = [];
for (let i = 0; i < categories.length; i++) {
  let obj_atchive = {};
  obj_atchive["category"] = categories[i];
  obj_atchive["active"] = active[categories[i]];
  obj_atchive["archived"] = archiveStorage[categories[i]];
  totalArchive.push(obj_atchive);
}
// ------------------------------------------------------
totalArchive.forEach((item) => addArchive(item));
// ------------------------------------------------------
let itemArchiveList = document.querySelectorAll("table#ArchiveList .id");
let sectionArchive = document.querySelector(".section-archive");
// ----Доступ до архівної таблиці------------------------
itemArchiveList.forEach((note, index) => {
  note.addEventListener("click", () => {
    sectionArchive.classList.toggle("active");
  });
});
// ------------------------------------------------------
let archiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
// ------------------------------------------------------
archiveNotes.forEach((item) => tableArchive(item));
// ------------------------------------------------------
let itemNoteArchive = document.querySelectorAll("table#ArchiveTable .id");
let itemNoArchive = document.querySelectorAll("table#ArchiveTable tbody .archive_note");
let archiveCategory = document.querySelectorAll("table#ArchiveTable tbody .category");
// Повертаємо назад із архів в основну таблицю-----------
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
