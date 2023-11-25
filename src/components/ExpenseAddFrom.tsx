import axios from 'axios';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Expense } from '../models/expense';
import ExpensesCategories from './ExpensesCategories';
import useConfig from './useConfig';

export default function ExpenseAddFrom(
    { setAddExpenseRequest }: { setAddExpenseRequest: Dispatch<SetStateAction<Expense>> }
) {
    const expenseName = useRef<HTMLInputElement>(null);
    const expenseValue = useRef<HTMLInputElement>(null);
    const expenseDate = useRef<HTMLInputElement>(null);

    const [expenseCategories, setExpensesCategories] = useState(Array<string>());
    const [expensesCategoriesValue, setExpenseCategoryChoice] = useState('');
    const config = useConfig();

    let results: string[] = [];
    useEffect(() => {
        async function asyncGetExpensesCategories() {
            try {
                const response = await axios.get(`${config.app.URL}/Categories`, {
                    headers: {
                        "Content-Type": "text/html",
                    },
                });
                results = response.data.split(',')
            } catch (err) {
                console.log(JSON.stringify(err))
            }
            setExpensesCategories(results);
        };

        asyncGetExpensesCategories();
    }, [])

    function sendForm(e: Event) {
        e.preventDefault();
        const name = expenseName.current!.value ?? '';
        const value = expenseValue.current!.value ?? '';
        const date = expenseDate.current!.value ?? '';
        const category = expensesCategoriesValue ?? '';

        if (name === '' || value === '' || category === '') {
            return;
        }
        const expense: Expense = {
            name,
            value: parseFloat(value),
            category,
            date
        };

        setAddExpenseRequest(expense);

        expenseName.current!.value = '';
        expenseValue.current!.value = '';
        expenseDate.current!.value = moment().format("YYYY-MM-DD");
        setExpenseCategoryChoice('');
    }

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [hasPickedCategory, setHasPickedCategory] = useState(false);
    const newCategoryCheckbox = useRef<HTMLInputElement>(null);

    function handleCheckboxChange() {
        setShowAddCategory(!showAddCategory);
    }

    function handleCategoryChange(value: string) {
        setHasPickedCategory(value !== '');
    }

    const minFormYear = config.app.FORM_YEAR_START;
    return (
        <>
            <h1> My Form</h1>
            <div className="expense-input" id="expense-name">
                <label>Name</label>
                <input type="text" ref={expenseName} />
            </div>
            <div className="expense-input" id="expense-category">
                <ExpensesCategories expenseCategories={expenseCategories} expensesCategoriesValue={expensesCategoriesValue} setExpenseCategoryChoice={(value) => { setExpenseCategoryChoice(value); handleCategoryChange(value); }} />
            </div>
            {hasPickedCategory && (
                <div className="expense-input" id="add-category-checkbox">
                    <label>
                        Add Another category?
                        <input type="checkbox" ref={newCategoryCheckbox} onChange={handleCheckboxChange} />
                    </label>
                </div>
            )}
            {showAddCategory && (
                <div className="expense-input" id="new-category">
                    <label>New Category</label>
                    <input type="text" />
                </div>
            )}
            <div className="expense-input" id="expense-value">
                <label>Sum</label>
                <input type="number" min="0" ref={expenseValue} />
            </div>
            <div className="expense-input" id="expense-value">
                <label>Date</label>
                <input type="date" ref={expenseDate} min={`${minFormYear}-01-01`} defaultValue={moment().format("YYYY-MM-DD")} />
            </div>
            <button onClick={sendForm}>Add expense</button>
        </>
    )
}

