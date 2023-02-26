import moment from 'moment';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Expense } from '../models/expense';
import ExpensesCategories from './ExpensesCategories';

export default function ExpenseAddFrom(
    { expenseCategories, getExpenseRequest }:
        { expenseCategories: string[], getExpenseRequest: Dispatch<SetStateAction<Expense[]>> }
) {
    const expenseName = useRef<HTMLInputElement>(null);
    const expenseValue = useRef<HTMLInputElement>(null);
    const expenseDate = useRef<HTMLInputElement>(null);
    const [expensesCategoriesValue, setExpenseCategoryChoice] = useState('');

    function sendForm(e: Event) {
        e.preventDefault();
        let name = expenseName?.current?.value || '';
        let value = expenseValue?.current?.value || '';
        let date = expenseDate?.current?.value || '';
        let category = expensesCategoriesValue || '';

        if (name === '' || value === '' || category === '') {
            return;
        }
        const expense: Expense = {
            name,
            value: parseFloat(value),
            category,
            date
        };

        getExpenseRequest([expense]);

        expenseName.current.value = '';
        expenseValue.current.value = '';
        expenseDate.current.value = moment().format("YYYY-MM-DD");
        setExpenseCategoryChoice('');
    }

    return (
        <>
            <h1> My Form</h1>
            <div className="expense-input" id="expense-name">
                <label>Name</label>
                <input type="text" ref={expenseName} />
            </div>
            <div className="expense-input" id="expense-category">
                <ExpensesCategories expenseCategories={expenseCategories} expensesCategoriesValue={expensesCategoriesValue} setExpenseCategoryChoice={setExpenseCategoryChoice} />
            </div>
            <div className="expense-input" id="expense-value">
                <label>Sum</label>
                <input type="number" ref={expenseValue} />
            </div>
            <div className="expense-input" id="expense-value">
                <label>Date</label>
                <input type="date" ref={expenseDate} min="2023-01-01" defaultValue={moment().format("YYYY-MM-DD")} />
            </div>
            <button onClick={sendForm}>Add expense</button>
        </>
    )
}

