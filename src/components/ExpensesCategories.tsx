import React from 'react';

export default function ExpensesCategories({ expenseCategories }: { expenseCategories: string[] }) {
    if (expenseCategories.length == 0) {
        return (
            <>
            <label>Category</label>
            <select id="category">
                <option>Loading...</option>
            </select>
            </>
        )
    }

    return (
        <>
            <label>Category</label>
            <select id="category">
                {expenseCategories.map(category => {
                    return <option key={category} value={category}>{category}</option>
                })}
            </select>
        </>
    )
}
