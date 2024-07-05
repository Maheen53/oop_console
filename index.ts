#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];

    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    do{
    console.log(chalk.bgMagentaBright.italic("\t\t Welcome to MAHEEN IMTIAZ OOP project!!"));
    const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: chalk.blueBright.underline("Whom would you like to interact with:"),
        choices: ["Staff", "Student", "Exit"]
    });

    if (ans.select === "Staff") {
        console.log("You approach the staff room. Please feel free to ask questions.");
    } else if (ans.select === "Student") {
        const ansStudent = await inquirer.prompt({
            name: "student",
            type: "input",
            message: chalk.bgCyan("Enter a student's name you wish to engage with:")
        });

        const student = persons.students.find(val => val.name === ansStudent.student);

        if (student) {
            console.log(`Hello, I am ${student.name}. Nice to meet you!!`);
            console.log("Student already exists in the list.");
            console.log("Current student list:");
            console.log(persons.students);
        } else {
            const newStudent = new Student(ansStudent.student);
            persons.addStudent(newStudent);
            console.log(`Hello, I am ${newStudent.name}. Nice to see you!!`);
            console.log("New student added.");
            console.log("Updated student list:");
            console.log(persons.students);
        }
    } else if (ans.select === "Exit") {
        console.log("Exiting the program");
        process.exit()
    }
}while(true)
};

programStart(persons);