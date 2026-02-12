// AbstractBaseTask est la classe abstraite pour tous les objets de tâche
// Elle définit les propriétés fondamentales (id, text, completed) que toute tâche doit posséder.
// J'ai dû improviser un peu pour gérer une abstraction
// Comme elle est abstraite, elle ne peut pas être instanciée directement et des classes dérivées comme AdvancedTask doivent l'étendre.
// Ça garantit une structure et une interface cohérentes pour toutes les tâches.
export class AbstractBaseTask {
	constructor(id, text, completed = false) {
		if (new.target === AbstractBaseTask) {
			throw new Error(
				"Cannot instantiate abstract class AbstractBaseTask directly.",
			);
		}
		this.id = id;
		this.text = text;
		this.completed = completed;
	}
}
