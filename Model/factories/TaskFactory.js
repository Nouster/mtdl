import { AdvancedTask } from "../entities/AdvancedTask.js";

// Mise en place d'une factory pour créer des tâches de manière centralisée pour faciliter la gestion des différentes catégories de tâches et garantir que toutes les tâches créées respectent les contraintes définies (comme les catégories autorisées par exempe)

export class TaskFactory {
	static ALLOWED_CATEGORIES = ["travail", "maison", "divers"];

	static createTask(text, category) {
		const lowerCaseCategory = category.toLowerCase();
		if (!TaskFactory.ALLOWED_CATEGORIES.includes(lowerCaseCategory)) {
			throw new Error(
				`Invalid category: "${category}". Allowed categories are: ${TaskFactory.ALLOWED_CATEGORIES.join(", ")}`,
			);
		}
		return new AdvancedTask(Date.now(), text, false, lowerCaseCategory);
	}
}
