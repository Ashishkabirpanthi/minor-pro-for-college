let addFrm = document.addfrm;
let text = addFrm.add;
let priorityDropdown = addFrm.priority;
let ul = document.querySelector(".todos");

let loadTasks = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addItem(task.item, task.priority, task.date));
};

let saveTasks = () => {
  let listItems = Array.from(ul.children).map((li) => {
    return {
      item: li.querySelector("span").innerText,
      priority: li.getAttribute("data-priority"),
      date: li.querySelector(".task-date").innerText.split("Created on: ")[1],
    };
  });
  localStorage.setItem("tasks", JSON.stringify(listItems));
};
let addItem = (item, priority, date = null) => {
  let currentDate = date || new Date().toLocaleString();

  let priorityColors = {
    High: "rgb(255,66,38)",
    Medium: "rgba(255, 215, 0, 0.8)",
    Low: "rgba(144, 238, 144, 0.8)",
  };

  let color = priorityColors[priority];

  let str = `<li data-priority="${priority}" style="background-color: ${color};">
      <span>${item}</span>
      <small class="task-date">Created on: ${currentDate}</small>
      <p class="delete">delete</p>
    </li>`;
  ul.innerHTML += str;

  saveTasks();
};

addFrm.addEventListener("submit", (e) => {
  e.preventDefault();
  let item = text.value;
  let priority = priorityDropdown.value;
  if (item.length > 0) {
    addItem(item, priority);
    text.value = "";
  }
});

ul.addEventListener("click", (e) => {
  if (e.target.nodeName === "P") {
    e.target.parentElement.remove();
    saveTasks();
  }
});

let searchItem = (text) => {
  let listItems = ul.children;
  for (let li of listItems) {
    if (li.innerText.toLowerCase().indexOf(text) == -1)
      li.classList.add("filtered");
    else li.classList.remove("filtered");
  }
};

let searchText = document.querySelector(".search input");
searchText.addEventListener("keyup", (e) => {
  searchItem(searchText.value.toLowerCase());
});

let toggleButton = document.getElementById("theme-toggle");

let isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  let isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
})
loadTasks();
