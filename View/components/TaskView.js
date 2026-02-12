import { AbstractTaskView } from "../abstracts/AbstractTaskView.js";
export class TaskView extends AbstractTaskView {
	constructor(renderer) {
		super();
		this.renderer = renderer;

		this.taskList = document.getElementById("task-list");
		this.input = document.getElementById("task-input");
		this.addButton = document.getElementById("add-btn");
		this.searchInput = document.querySelector('input[type="search"]');
		this.categorySelect = document.getElementById("category-select");
		this.filterCategorySelect = document.getElementById(
			"filter-category-select",
		);
	}

	displayTasks(tasks) {
		this.taskList.innerHTML = this.renderer.render(tasks);
	}

	bindEvents(
		handleAdd,
		handleToggle,
		handleDelete,
		handleSearch,
		handleFilter,
	) {
		this.addButton.onclick = () => {
			handleAdd(this.input.value, this.categorySelect.value);
			this.input.value = "";
		};

		this.taskList.onclick = (e) => {
			const li = e.target.closest("li");
			if (!li) return;

			const id = parseInt(li.id);
			if (e.target.classList.contains("toggle-btn")) handleToggle(id);
			if (e.target.classList.contains("delete-btn")) handleDelete(id);
		};

		this.searchInput.oninput = (e) => handleSearch(e.target.value);
		this.filterCategorySelect.onchange = (e) => handleFilter(e.target.value);
	}
}
