import * as dataDOM from "./dataDOM.js";
import { onDelete } from "./logic.js";

export const funcMainTable = () => {
  let notes = JSON.parse(localStorage.getItem("notesList"));
  let itemNote = document.querySelectorAll("table#noteList .id");
  let itemDelete = document.querySelectorAll("table#noteList tbody .delete_note");
  let itemEdit = document.querySelectorAll("table#noteList tbody .edit_note");
  let itemArchive = document.querySelectorAll("table#noteList tbody .archive_note");
  let itemCategory = document.querySelectorAll("table#noteList tbody .category");
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

  // --------------Архівуємо нататку------------------
  itemArchive.forEach((note, index) => {
    let arr_archive = JSON.parse(localStorage.getItem("archiveNotes"));
    let archiveStorage = JSON.parse(localStorage.getItem("archive"));
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
};
