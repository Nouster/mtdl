export class AbstractTaskView {
	constructor() {
		if (new.target === AbstractTaskView) {
			throw new Error(
				"Abstract class 'AbstractTaskView' cannot be instantiated directly.",
			);
		}
	}

	displayTasks(tasks) {
		throw new Error("Method 'displayTasks()' must be implemented.");
	}

	bindEvents(handler) {
		throw new Error("Method 'bindEvents()' must be implemented.");
	}
}
