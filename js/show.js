import { arr_icon } from "./data.js";
import { formatNameCategory } from "./logic.js";
import * as dataDOM from "./dataDOM.js";
// Заповнюю основну таблицю---------------
export function addItem(obj) {
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
// Заповнюю підсумкову таблицю---------------
export function addArchive(obj) {
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
// Заповнюю таблицю яка з архівами---------------
export function tableArchive(obj) {
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
