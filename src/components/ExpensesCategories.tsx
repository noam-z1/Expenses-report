import React, { useState } from 'react';

export default function ExpensesCategories({ expenseCategories }: { expenseCategories: string[] }) {

    const [expensesCategoriesValue, setExpenseCategoryChoice] = useState('');

    const HandleChange = (e: any) => {

        setExpenseCategoryChoice(e.target.value);
    }

    if (expenseCategories.length == 0) {
        return (
            <>
            <label>Category</label>
            <select id="category"  value={expensesCategoriesValue} onChange={HandleChange}>
                <option value="">Loading...</option>
            </select>
            </>
        )
    }

    return (
        <>
            <label>Category</label>
            <select id="category" value={expensesCategoriesValue}  onChange={HandleChange}>
                <option value="">Please choose a category</option>
                {expenseCategories.map(category => {
                    return <option key={category} value={category}>{category}</option>
                })}
            </select>
        </>
    )
}
