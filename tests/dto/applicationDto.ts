export class ApplicationDto {
    income: number;
    debt: number;
    age: number;
    employee: boolean;
    loanAmount: number;
    loanPeriod: number;

    constructor(income: number, debt: number, age: number, employee: boolean, loanAmount: number, loanPeriod: number) {
        this.income = income;
        this.debt = debt;
        this.age = age;
        this.employee = employee;
        this.loanAmount = loanAmount;
        this.loanPeriod = loanPeriod;
    }

//add a method to create a new instance with random data
    //static createOrderWithRandomData (): OrderDto => {
    //return new OrderDto('Open', Math.floor(x: Math.random() * 100), 'new', '456677', 'new', Math.floor(Math.random() * 100));
}