export class AbstractTaskRenderer {
    constructor() {
        if (new.target === AbstractTaskRenderer) {
            throw new TypeError("Cannot construct AbstractTaskRenderer instances directly");
        }
    }

    render(tasks) {
        throw new Error("Method 'render()' must be implemented.");
    }
}
