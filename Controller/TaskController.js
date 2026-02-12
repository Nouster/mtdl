import { TaskModel } from "../Model/TaskModel.js";
import { TaskView } from "../View/components/TaskView.js";
import { HTMLTaskListRenderer } from "../View/renderers/HTMLTaskListRenderer.js";

class TaskController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.currentCategoryFilter = "all";
		this.currentTextFilter = "";

		this.view.bindEvents(
			this.handleAdd.bind(this),
			this.handleToggle.bind(this),
			this.handleDelete.bind(this),
			this.handleSearch.bind(this),
			this.handleFilter.bind(this),
		);
	}

	updateView() {
		let tasksToDisplay = this.model.getTasks();

		if (this.currentCategoryFilter !== "all") {
			tasksToDisplay = tasksToDisplay.filter(
				(task) => task.category === this.currentCategoryFilter,
			);
		}

		if (this.currentTextFilter) {
			tasksToDisplay = tasksToDisplay.filter((task) =>
				task.text.toLowerCase().includes(this.currentTextFilter.toLowerCase()),
			);
		}

		this.view.displayTasks(tasksToDisplay);
	}

	handleAdd(text, category) {
		if (text.trim() !== "") {
			try {
				this.model.addTask(text, category);
				this.updateView();
			} catch (error) {
				alert(error.message);
				console.error(error);
			}
		}
	}

	handleToggle(id) {
		this.model.toggleTask(id);
		this.updateView();
	}

	handleDelete(id) {
		this.model.deleteTask(id);
		this.updateView();
	}

	handleSearch(query) {
		this.currentTextFilter = query;
		this.updateView();
	}

	handleFilter(category) {
		this.currentCategoryFilter = category;
		this.updateView();
	}
}

async function initializeApp() {
	const model = new TaskModel();
	// Je mets en pause l'exécution pour pouvoir charger les tâches depuis le fichier JSON avant de continuer à initialiser la vue et le contrôleur.
	await model.initialize();
	const view = new TaskView(new HTMLTaskListRenderer());
	const app = new TaskController(model, view);
	app.updateView();
}

initializeApp();
