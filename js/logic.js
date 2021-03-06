// Один раз загружаємо в localStorage-------------------------
export const funcStart = (note, archives) => {
  let startLoadData = localStorage.getItem("startData");
  if (startLoadData == null) {
    localStorage.setItem("notesList", JSON.stringify(note));
    localStorage.setItem("archive", JSON.stringify(archives));
    localStorage.setItem("archiveNotes", JSON.stringify([]));
    localStorage.setItem("startData", "start");
  }
};

// -----удаляю пробели першу літеру роблю малою
export let formatNameCategory = (category) => {
  let category_item = category.replace(/\s/g, "");
  return category_item[0].toLowerCase() + category_item.slice(1);
};
//   -----наступний id--------------------------
export let nextId = (id) => {
  return id.map((item) => item.id).sort((a, b) => b - a)[0] + 1;
};
// ---сума нотатків по категоріям-------------
export const totalNones = (note, categories) => {
  let active_notes = {};
  for (let i = 0; i < categories.length; i++) {
    active_notes[categories[i]] = note.filter((elem) => elem.category == categories[i]).length;
  }
  return active_notes;
};
// ----видаляємо нотатку------
export let onDelete = (list, index, item) => {
  let partOne = list.slice(0, parseInt(index));
  let partTwo = list.slice(parseInt(index) + 1);
  let tmpList = [...partOne, ...partTwo];
  localStorage.setItem(item, JSON.stringify(tmpList));
};
// -----добавляю нотатку----------------------
export let onAddLocal = (note) => {
  let notesAll = JSON.parse(localStorage.getItem("notesList"));
  let notes = [...notesAll, ...[note]];
  localStorage.setItem("notesList", JSON.stringify(notes));
};
// ----------Загальний підсумок-------------------------
export let funcTotal = (active, listNotes) => {
  let archiveStorage = JSON.parse(localStorage.getItem("archive"));
  let totalArchive = [];
  for (let i = 0; i < listNotes.length; i++) {
    let obj_atchive = {};
    obj_atchive["category"] = listNotes[i];
    obj_atchive["active"] = active[listNotes[i]];
    obj_atchive["archived"] = archiveStorage[listNotes[i]];
    totalArchive.push(obj_atchive);
  }
  return totalArchive;
};
