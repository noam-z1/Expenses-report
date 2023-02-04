import React, { useRef } from 'react';

export default function ExpenseAddFrom() {
    const expenseName = useRef();
    const expenseValue = useRef();
    const expenseDate = useRef();

    return (
        <>
            <h1> My Form</h1>
            <div class="expense-input" id="expense-name">
                <label>Name</label>
                <input ref={expenseName} type="text" />
            </div>
            <div class="expense-input" id="expense-value">
                <label>Sum</label>
                <input ref={expenseValue} type="text" />
            </div>
            <div class="expense-input" id="expense-value">
                <label>Date</label>
                <input ref={expenseDate} type="text" />
            </div>
            <button>Add expense</button>
        </>
    )
  }
  