import React, { useRef, useState } from 'react';
import ExpensesCategories from './ExpensesCategories';

export default function ExpenseAddFrom({ expenseCategories }: { expenseCategories: string[] }) {
    const expenseName = useRef<HTMLInputElement>(null);
    const expenseValue = useRef<HTMLInputElement>(null);
    const expenseDate = useRef<HTMLInputElement>(null);
    const [expensesCategoriesValue, setExpenseCategoryChoice] = useState('');

    return (
        <>
            <h1> My Form</h1>
            <div className="expense-input" id="expense-name">
                <label>Name</label>
                <input ref={expenseName} type="text" />
            </div>
            <div className="expense-input" id="expense-category">
                <ExpensesCategories expenseCategories={expenseCategories} expensesCategoriesValue={expensesCategoriesValue} setExpenseCategoryChoice={setExpenseCategoryChoice} />
            </div>
            <div className="expense-input" id="expense-value">
                <label>Sum</label>
                <input ref={expenseValue} type="text" />
            </div>
            <div className="expense-input" id="expense-value">
                <label>Date</label>
                <input ref={expenseDate} type="text" />
            </div>
            <button>Add expense</button>
        </>
    )
}

