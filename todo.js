///Todo class model
// todo.js

class Todo {
  constructor(id, title, detail, date, isCompleted = false) {
    this.id = id;
    this.title = title;
    this.detail = detail;
    this.date = date;
    this.isCompleted = isCompleted;
  }
  matchesFiltersTitle(titleFilter) {
    const isTitleMatch = this.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    return isTitleMatch;
  }

  ///ope===> for operator
  matchesFiltersDate(dateFilter, ope) {
    const isDateMatch = this.compareDates(this.date, dateFilter, ope);
    return isDateMatch;
  }

  compareDates(date1, date2, ope) {
    switch (ope) {
      case ">": {
        return new Date(date1).getTime() > new Date(date2).getTime();
      }

      case "<": {
        return new Date(date1).getTime() < new Date(date2).getTime();
      }

      case "=": {
        new Date(date1).getTime() === new Date(date2).getTime();
      }

      default:
        return true; // No valid operator provided, return all todos
    }
  }
}

/////todos mock data
let todos = [
  new Todo(
    1,
    "Learn Node.js",
    "Study Express.js and Node.js fundamentals",
    "2024-06-20"
  ),
  new Todo(
    2,
    "Build CRUD API",
    "Create a CRUD API using Node.js and Express.js",
    "2024-06-20"
  ),
];

module.exports = {
  Todo,
  todos,
};
