import React, { useState } from 'react';

export default function ExpensesCategories({
    expenseCategories,
    expensesCategoriesValue,
    setExpenseCategoryChoice
}: {
    expenseCategories: string[],
    expensesCategoriesValue: string,
    setExpenseCategoryChoice: (str: string) => void
}) {

    const HandleChange = (e: any) => {
        setExpenseCategoryChoice(e.target.value);
    }

    if (expenseCategories.length == 0) {
        return (
            <>
                <label>Category</label>
                <select id="category" value={expensesCategoriesValue} onChange={HandleChange}>
                    <option value="">Loading...</option>
                </select>
            </>
        )
    }

    return (
        <>
            <label>Category</label>
            <select id="category" value={expensesCategoriesValue} onChange={HandleChange}>
                <option value="">Please choose a category</option>
                {expenseCategories.map(category => {
                    return <option key={category} value={category}>{category}</option>
                })}
            </select>
        </>
    )
}
