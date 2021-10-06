export let arr_icon = {
  task: "<i class='fas fa-shopping-cart'></i>",
  idea: "<i class='fas fa-lightbulb'></i>",
  quote: "<i class='fas fa-quote-right'></i>",
  randomThought: "<i class='fas fa-head-side-virus'></i>",
  editNote: "<i class='fas fa-pen'></i>",
  deleteNote: "<i class='fas fa-trash'></i>",
  archiveNote: "<i class='fas fa-archive'></i>",
};

export const pattern = /(\d{1,2})[\.|\-\/](\d{1,2})[\.|\-|\/](\d{4})/g;

export let categories = ["Task", "Quote", "Random Thought", "Idea"];

export let archive_notes = {
  Task: 0,
  Quote: 0,
  "Random Thought": 0,
  Idea: 0,
};

export let notesList = [
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
