let addFrm = document.addfrm;
let text = addFrm.add;
let priorityDropdown = addFrm.priority;
let ul = document.querySelector(".todos");

// Load tasks from localStorage on page load
let loadTasks = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addItem(task.item, task.priority, task.date));
};

// Save tasks to localStorage
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

// Add task to the list
let addItem = (item, priority, date = null) => {
  let currentDate = date || new Date().toLocaleString();

  // Define colors for each priority
  let priorityColors = {
    High: "rgb(255,66,38)", // Red for high priority
    Medium: "rgba(255, 215, 0, 0.8)", // Yellow for medium priority
    Low: "rgba(144, 238, 144, 0.8)", // Green for low priority
  };

  let color = priorityColors[priority]; // Get the color based on priority

  let str = `<li data-priority="${priority}" style="background-color: ${color};">
      <span>${item}</span>
      <small class="task-date">Created on: ${currentDate}</small>
      <p class="delete">delete</p>
    </li>`;
  ul.innerHTML += str;

  saveTasks(); // Save tasks after adding
};

// Event listener for adding tasks
addFrm.addEventListener("submit", (e) => {
  e.preventDefault();
  let item = text.value;
  let priority = priorityDropdown.value;
  if (item.length > 0) {
    addItem(item, priority);
    text.value = "";
  }
});

// Event listener for deleting tasks
ul.addEventListener("click", (e) => {
  if (e.target.nodeName === "P") {
    e.target.parentElement.remove();
    saveTasks(); // Save tasks after deletion
  }
});

// Search functionality
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

// Dark mode toggle
let toggleButton = document.getElementById("theme-toggle");

// Check for saved theme in localStorage
let isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

// Toggle dark mode on button click
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Save the current theme preference to localStorage
  let isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Load tasks on page load
loadTasks();
