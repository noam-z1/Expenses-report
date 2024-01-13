import React from 'react';
import { ExpenseData } from 'src/models/ExpenseData';

export default function ExpensesDetails({
    expenses,
}: {
    expenses: ExpenseData[],
}) {
    if (expenses.length == 0) {
        return (
            <>
                <h1> Expense Details</h1>
                <label>Please Add Expense</label>
            </>
        )
    }
    return <>
        <h1>
            I'm here
        </h1>
    </>
    // let expense = expenses[0];
    // const date = new Date(expense.date)
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();

    // if (expenses.length == 2) {
    //     return (
    //         <>
    //             <h1> Expense Details</h1>
    //             <label>Expense category</label>
    //             <h3>{expense.category}</h3>
    //             <label>Expense month</label>
    //             <h3>{`${month}/${year}`}</h3>
    //             <h2>Loading data...</h2>
    //         </>
    //     )
    // }

    // return (
    //     <>
    //         <h1> Expense Details</h1>
    //         <label>Expense category</label>
    //         <h3>{expense.category}</h3>
    //         <label>Expense month</label>
    //         <h3>{`${month}/${year}`}</h3>
    //         <h3>Old value - {expense.oldValue}</h3>
    //         <h3>New value - {expense.newValue}</h3>
    //     </>
    // )

}
