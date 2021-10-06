import { onDelete } from "./logic.js";
export const funcArchiveTable = (archiveNotes) => {
  // Повертаємо назад із архів в основну таблицю-----------
  let itemNoArchive = document.querySelectorAll("table#ArchiveTable tbody .archive_note");
  console.log(itemNoArchive);
  itemNoArchive.forEach((note, index) => {
    console.log(note);
    let notes = JSON.parse(localStorage.getItem("notesList"));
    let itemNoteArchive = document.querySelectorAll("table#ArchiveTable .id");
    let archiveCategory = document.querySelectorAll("table#ArchiveTable tbody .category");
    let archiveStorage = JSON.parse(localStorage.getItem("archive"));

    note.addEventListener("click", () => {
      console.log(note);
      notes.push(archiveNotes[index]);
      itemNoteArchive[index].remove();
      archiveStorage[archiveCategory[index].textContent]--;
      localStorage.setItem("archive", JSON.stringify(archiveStorage));
      localStorage.setItem("notesList", JSON.stringify(notes));
      onDelete(archiveNotes, index, "archiveNotes");
      window.location.reload();
    });
  });
};
