import { categories, archive_notes, notesList } from "./data.js";
import { addItem, addArchive, tableArchive } from "./show.js";
import { totalNones, funcTotal, funcStart } from "./logic.js";
import * as dataDOM from "./dataDOM.js";
import { funcMainTable } from "./mainTable.js";
import { funcEditAdd } from "./edit_add.js";
import { funcArchiveTable } from "./archiveTable.js";
// ---Загружаємо все в головну таблицю---------------------------
funcStart(notesList, archive_notes);
let notes = JSON.parse(localStorage.getItem("notesList"));
notes.forEach((item) => addItem(item));
// ---Функція в якій проводяться всі дій редагування,видалення,архівування
funcMainTable();
// Визиваємо таблицю для додавання нотаток------
dataDOM.buttonCreate.addEventListener("click", function () {
  dataDOM.buttonAdd.textContent = "Add";
  dataDOM.tableCreate.classList.toggle("active");
  this.classList.toggle("active");
  addForm.name.value = "";
  addForm.content.value = "";
});
// ---Функція в якій виводяться підсумок активних та архівних нотатків
funcEditAdd();
// ---Загружаємо все в підсумкову таблицю-------------------------
let active = totalNones(notes, categories);
funcTotal(active, categories).forEach((item) => addArchive(item));
// ----Доступ до архівної таблиці------------------------
let itemArchiveList = document.querySelectorAll("table#ArchiveList .id");
itemArchiveList.forEach((note) => {
  let sectionArchive = document.querySelector(".section-archive");
  note.addEventListener("click", () => {
    sectionArchive.classList.toggle("active");
  });
});
// ---Загружаємо все в архівну таблицю----------------------------
let archiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
archiveNotes.forEach((item) => tableArchive(item));
// ---Функція в якій проводимо дій з архівною таблицею
funcArchiveTable(archiveNotes);
// ----end---------------------------------------------
