export class Task {

    constructor(title,completed,completeDate ) {

        this.title = title;
        this.completed = completed;
        this.completeDate = completeDate;
    }

    getFormattedDate () {

        let day = this.completeDate.toLocaleString();

        return day;

    }
}

