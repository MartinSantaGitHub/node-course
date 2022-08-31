import uuid4 from "uuid4";

export default class Task {
    id = "";
    description = "";
    completedAt = null;

    constructor(description) {
        this.id = uuid4();
        this.description = description;
    }
}
