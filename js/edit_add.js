import * as dataDOM from "./dataDOM.js";
import { nextId, onDelete, onAddLocal } from "./logic.js";
import { addItem } from "./show.js";
import { pattern } from "./data.js";

export const funcEditAdd = () => {
  let notes = JSON.parse(localStorage.getItem("notesList"));
  // кнопка cancel----------------------------------
  dataDOM.buttonCancel.addEventListener("click", function () {
    dataDOM.tableCreate.classList.toggle("active");
    dataDOM.buttonCreate.classList.toggle("active");
  });
  // добавляємо нотатку-------------------------------
  dataDOM.buttonAdd.addEventListener("click", function (event) {
    let itemNote = document.querySelectorAll("table#noteList .id");
    event.preventDefault();
    if (this.textContent == "Edit") {
      const index = localStorage.getItem("index");
      itemNote[index].remove();
      onDelete(notes, index, "notesList");
    }
    dataDOM.tableCreate.classList.toggle("active");
    dataDOM.buttonCreate.classList.toggle("active");

    const new_date = new Date();
    const result = addForm.content.value.match(pattern);

    let item = {
      id: nextId(notes),
      name: addForm.name.value,
      created: new_date.toDateString(),
      category: addForm.category.value,
      content: addForm.content.value,
      dates: result ? `${result}` : null,
    };

    addItem(item);
    onAddLocal(item);
    window.location.reload();
  });
};
