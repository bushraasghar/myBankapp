#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

// bank account interface
interface bankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount:number): void
    deposite(amount:number):void
    checkBalance():void
}
// bank account class
class bankAccount implements bankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
//Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
    
    console.log(chalk.italic.green(`Amount of $${amount} withdrawl sucessfully. Remaining balance is $${this.balance}`));
    }else{
        console.log(chalk.italic.red('Your balance is not enough for this transaction.'));
        
    }
}
// credit money
deposite(amount: number): void {
    if(amount > 100){
        amount -= 1; //charges deduction uptoo 100 withdrawl
       }this.balance += amount;
          console.log(chalk.italic.green(`Your amount $${amount} credited successfully. Remaining balance is $${this.balance} `));
    
}
// check balance
checkBalance(): void {
    console.log(chalk.bold.italic.yellow(`your current balance is $${this.balance}`));
    
}
} 
// customer class
class customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number
    account: bankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number,mobileNumber: number, account: bankAccount)
    {this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// creat bank account
const accounts : bankAccount[] = [
    new bankAccount (1001 , 500),
    new bankAccount (1002 , 5000),
    new bankAccount (1003 , 1000)
];
// create customer
const customers: customer[]=[
    new customer('Bushra','Asghar','female',23,78667898980,accounts[0]),
    new customer('bisma','ghani','female',25,7878676899,accounts[1]),
    new customer('Ahmed','raza','male',28,535446767,accounts[2])
]


// function to interact with accounts
async function services(){
    do{
        const accountInput = await inquirer.prompt({

       name:'accountNumber',
       message:'Enter your account number:',
       type:'number'

        })
const customer = customers.find(customer => customer.account.accountNumber === accountInput.accountNumber )
if(customer){
    console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`);
    const ans = await inquirer.prompt([{
        name:'select',
        message:'select an operation:',
        type:'list',
        choices:['Deposite','Withdraw','check balance','Exit']
    }]);
    switch (ans.select) {
        case 'Deposite':
            let depositeAmount = await inquirer.prompt([{
                name:'amount',
                message:'Enter the amount to deposite: ',
                type:'number'
            }])
            customer.account.deposite(depositeAmount.amount);
            break;
    
    
        case'Withdraw':
        let withDraw = await inquirer.prompt([{
            name:'amount',
            message:'Enter the amount to withdraw:',
            type:'number'
        }])
        customer.account.withdraw(withDraw.amount);
            break;
    
    
        case'check balance':
        customer.account.checkBalance();
        break;

        case'Exit':
        console.log(chalk.gray("Exiting..."));
        console.log(chalk.italic.blue("Thank you for visiting. Have a great day!"));
        return;
        
    }
    
}else{
    console.log(chalk.bold.red("Invalid account number. Please try again."));
    
}
    } while(true)
}

services();

