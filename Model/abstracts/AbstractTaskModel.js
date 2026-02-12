// AbstractTaskModel est une classe abstraite qui va définir "l'interface" commune pour les gestionnaires de tâches
// À ne pas confondre avec AbstractBaseTask qui est la classe de base abstraite pour les objets de tâche eux-mêmes
// Elle déclare les méthodes "abstraites" que toute classe concrète de tâche doit implémenter.
// Pas de classe abstraite native en JavaScript, mais je simule son comportement en lançant une erreur
// si quelqu'un essaie d'instancier la classe directement ou d'appeler des méthodes non implémentées.
export class AbstractTaskModel {
	constructor() {
		if (new.target === AbstractTaskModel) {
			throw new TypeError(
				"Cannot construct AbstractTaskModel instances directly",
			);
		}
	}

	addTask(text) {
		throw new Error("Method 'addTask()' must be implemented.");
	}

	getTasks() {
		throw new Error("Method 'getTasks()' must be implemented.");
	}

	toggleTask(id) {
		throw new Error("Method 'toggleTask()' must be implemented.");
	}

	deleteTask(id) {
		throw new Error("Method 'deleteTask()' must be implemented.");
	}
}
