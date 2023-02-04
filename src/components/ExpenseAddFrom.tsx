import React, { useRef } from 'react';
import useGoogleSheets from 'use-google-sheets';

export default function ExpenseAddFrom() {
    const expenseName = useRef();
    const expenseValue = useRef();
    const expenseDate = useRef();

    // const apiKey = process.env.GOOGLE_API_KEY || '';
    // const sheetId = process.env.GOOGLE_SHEETS_URL || '';

    const { data, loading, error } = useGoogleSheets({
        apiKey: '',
        sheetId: '',
    })

    return (
        <>
            <h1> My Form</h1>
            <div className="expense-input" id="expense-name">
                <label>Name</label>
                <input ref={expenseName} type="text" />
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
            <div>
                {console.log(`error: ${error}`)}
            </div>
        </>
    )
  }
  