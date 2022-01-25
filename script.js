class Main {}

class Employee {
  /**
   * @type string
   */
  name;

  /**
   * @type int
   */
  age;

  /**
   * @type int
   */
  annualSalary;

  /**
   * @type string
   */
  employee_type;

  /**
   * @type int
   */
  payRate;

  /**
   * @type int
   */
  hours;

  constructor(name, age, payRate, hours) {
    this.name = name;
    this.age = age;
    this.hours = hours;
    this.payRate = payRate;
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = 52 * this.hours * this.payRate;
    console.log("pay has been calculated ", this.annualSalary);
    return this.annualSalary;
  }

  toString() {
    return [
      this.name,
      this.annualSalary,
      this.hours,
      this.payRate,
      this.employee_type,
    ]
      .map(this.#padText)
      .join(" ");
  }

  #padText(text) {
    let result = String(text);

    while (result.length < 12) {
      result = result + " ";
    }

    return result;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age, payRate, hours);
    this.employee_type = "Part Time";
  }
}

class Manager extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age, payRate, hours);
    this.employee_type = "Full Time";
  }

  calculatePay() {
    this.annualSalary = super.calculatePay() - 1000;
  }
}

class Menu {
  menu_options = [1, 2, 3, 4];

  /**
   * @type {Employee[]}
   */
  employees;

  constructor() {
    try {
      this.employees = [];
      this.run();
    } catch (error) {
      console.error(error);
    }
  }

  run() {
    let selection;
    let repeat_application = true;

    this.#addDefaultEmployees();

    this.displayEmployees();

    do {
      selection = this.printMenu();
      console.log("user selected", selection);
      switch (selection) {
        case "1":
          this.addEmployee();
          break;
        case "2":
          this.removeEmployee();
          break;
        case "3":
          this.editEmployee();
          break;
        case "4":
          this.displayEmployees();
          break;
        case "5": {
          alert("application terminating");
          repeat_application = false;
          break;
        }
        default: {
          console.log("invalid input", selection);
        }
      }
    } while (repeat_application);
  }

  addEmployee() {
    let inputs = prompt(`
      You have chosen to add an employee
      Please provide name, age hours, payrate  
      `)
      .split(",")
      .map((value) => value.trim());

    if (inputs.length !== 4) {
      throw Error(
        `Expecting 4 values separated by commas, ${inputs.length} given`
      );
    }

    // variable declarations, assignment, control/ conditional structures, loops
    let [name, age, hours, payrate] = inputs;

    let emp = this.#makeEmployee(
      name,
      Number(age),
      Number(payrate),
      Number(hours)
    );
    this.employees.push(emp);

    alert(`
    new employee added
    ${emp}
    `);
  }

  #makeEmployee(name, age, hours, payrate) {
    if (
      !(typeof name == "string") ||
      !(typeof age == "number") ||
      !(typeof hours == "number") ||
      !(typeof payrate == "number")
    ) {
      throw Error("Invalid inputs provided");
    }

    if (Number(hours) < 40) {
      return new PartTime(name, Number(age), Number(payrate), Number(hours));
    } else {
      return new Manager(name, Number(age), Number(payrate), Number(hours));
    }
  }

  removeEmployee() {
    console.log("removing employee");

    let selection = prompt(
      "please provide the id or name of employee to remove"
    ).trim();

    let position = -1;

    if (selection.match(/\d+/)) {
      //remove by position
      position = Number(selection) - 1;
    } else {
      //remove by name

      let name = String(selection);

      position = this.employees.findIndex(
        (employee) =>
          employee.name.toLocaleLowerCase() == name.toLocaleLowerCase()
      );
    }

    if (position < 0 || position >= this.employees.length) {
      throw Error(
        "Invalid position either name not valid or position out of bounds"
      );
    }

    let employee = this.employees[position];

    this.employees = this.employees.filter((emp, index) => index !== position);

    alert(`
    Employee deleted
    ${employee}
    `);
  }

  editEmployee() {
    console.log("editing employee");

    let selection = prompt(
      "please provide the id or name of employee to remove"
    ).trim();

    let position = -1;

    if (selection.match(/\d+/)) {
      //edit by position
      position = Number(selection) - 1;
    }

    if (position < 0 || position >= this.employees.length) {
      throw Error(
        "Invalid position either name not valid or position out of bounds"
      );
    }

    let new_pay_rate = prompt(`
    Enter the new pay rate for 
    ${this.employees[position]}
    `);

    this.employees[position].payRate = new_pay_rate;

    let output = `
    Payrate  updated
    ${this.employees[position]}`;

    console.log(output);
    alert(output);
  }

  displayEmployees() {
    console.log("displaying employees");
    let heading = ["ID", "NAME", "SALARY", "HOURS", "PAY", "FT/PT"]
      .map(this.#padText)
      .join(" ");

    let employee_array = this.employees
      .map(
        (employee, index) =>
          `${this.#padText(index + 1)} ${employee.toString()}`
      )
      .join("\n");

    let output = `${heading}\n${employee_array}`;
    alert(output);

    console.log(output);
  }

  #padText(text) {
    let result = String(text);

    while (result.length < 12) {
      result = result + " ";
    }

    return result;
  }

  #addDefaultEmployees() {
    this.employees.push(this.#makeEmployee("Scott", 40, 40, 10));
    this.employees.push(this.#makeEmployee("Dave", 23, 40, 5));
    this.employees.push(this.#makeEmployee("Lisa", 26, 12, 8));
  }

  printMenu() {
    return prompt(`
    Main Menu
    1. Add Employee
    2. Remove Employee
    3. Edit Employee
    4. Display Employees
    5. close application 

    Enter selection
    `);
  }
}
(() => {
  new Menu();
})();
