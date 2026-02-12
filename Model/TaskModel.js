import { AbstractTaskModel } from "./abstracts/AbstractTaskModel.js"; // Updated path
import { TaskFactory } from "./factories/TaskFactory.js"; // Updated path
import { AdvancedTask } from "./entities/AdvancedTask.js"; // Updated path

// TaskModel est l'implémentation concrète de AbstractTaskModel.
// C'est le gestionnaire central des tâches de l'application.
// Sa responsabilité est de gérer une collection d'objets AdvancedTask (les entités tâche)
// en fournissant des opérations CRUD  sur ces tâches et en orchestrant leur chargement (ici depuis data.json) et leur manipulation en mémoire.
export class TaskModel extends AbstractTaskModel {
	constructor() {
		if (TaskModel.instance) {
			return TaskModel.instance;
		}
		super();
		this.tasks = [];
		TaskModel.instance = this;
	}

	async initialize() {
		await this.#loadTasksFromJson();
	}

	// Pour avoir des données d'entrée, je vais charger un fichier JSON qui contient des tâches.
	// On n'a pas vraiment de paramètre de visibilité des membres de classe en JS, mais je vais utiliser une méthode privée (avec #) pour indiquer que cette méthode est destinée à être utilisée uniquement à l'intérieur de la classe TaskModel.
	async #loadTasksFromJson() {
		try {
			const response = await fetch("../Model/data/data.json"); // Updated path
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			// Filrer les tâches inclure que celles avec des catégories valides
			this.tasks = data
				.filter((task) =>
					TaskFactory.ALLOWED_CATEGORIES.includes(task.category.toLowerCase()),
				)
				.map(
					(taskData) =>
						new AdvancedTask(
							taskData.id,
							taskData.text,
							taskData.completed,
							taskData.category.toLowerCase(),
						),
				);
			console.log("Tasks loaded from data.json:", this.tasks);
		} catch (error) {
			console.error("Failed to load tasks from data.json:", error);
			// Fallback au cas où
			this.tasks = [];
		}
	}

	addTask(text, category) {
		// Ici, j'utilise le TaskFactory pour créer une nouvelle tâche avec le texte et la catégorie fournis, puis je l'ajoute à la liste des tâches.
		const task = TaskFactory.createTask(text, category);
		this.tasks.push(task);
	}

	getTasks() {
		return this.tasks;
	}

	toggleTask(id) {
		this.tasks = this.tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
	}

	deleteTask(id) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}
}
