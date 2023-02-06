import React, { useRef } from 'react';
import useGoogleSheets from 'use-google-sheets';
import useConfig from "./useConfig";

export default function ExpenseAddFrom() {
    const expenseName = useRef();
    const expenseValue = useRef();
    const expenseDate = useRef();

    const config = useConfig()

    const apiKey = config.app.GOOGLE_API_KEY || '';
    const sheetId = config.app.GOOGLE_SHEETS_URL || '';
    const sheetName = config.app.SHEET_NAME || '';

    const { data, loading, error } = useGoogleSheets({
        apiKey,
        sheetId,
        sheetsOptions: [{ id: sheetName }]
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
                {JSON.stringify(data)}
                {console.log(`loading: ${loading}`)}
            </div>
        </>
    )
  }
  