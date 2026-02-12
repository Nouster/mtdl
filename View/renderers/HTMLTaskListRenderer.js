import { AbstractTaskRenderer } from "../abstracts/AbstractTaskRenderer.js";
import { CATEGORY_STYLES } from "../components/theme.js";
export class HTMLTaskListRenderer extends AbstractTaskRenderer {
	render(tasks) {
		if (tasks.length === 0) {
			return "";
		}

		return tasks
			.map((task) => {
				const categoryClass =
					CATEGORY_STYLES[task.category] || "badge bg-secondary";

				return `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between align-items-center">
                    <span style="${task.completed ? "text-decoration: line-through" : ""}">
                        ${task.text} <span class="${categoryClass}">${task.category}</span>
                    </span>
                    <div>
                        <button class="toggle-btn btn btn-sm btn-outline-success">Fait</button>
                        <button class="delete-btn btn btn-sm btn-outline-danger">Supprimer</button>
                    </div>
                </li>
            `;
			})
			.join("");
	}
}
