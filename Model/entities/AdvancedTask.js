import { AbstractBaseTask } from "../abstracts/AbstractBaseTask.js";

// AdvancedTask est la classe de tâche "avancée" qui hérite de AbstractBaseTask
// Elle étend les fonctionnalités de AbstractBaseTask en ajoutant des propriétés spécifiques, comme la 'category'

export class AdvancedTask extends AbstractBaseTask {
	constructor(id, text, completed = false, category) {
		super(id, text, completed);
		if (!category) {
			throw new Error("Category is required for AdvancedTask.");
		}
		this.category = category;
	}
}
