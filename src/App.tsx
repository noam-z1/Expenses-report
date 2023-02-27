import "./App.css";

import React, { useState, useEffect } from 'react';

import useConfig from "./components/useConfig";
import ExpenseAddFrom from "./components/ExpenseAddFrom";
import axios from "axios";
import { Expense } from "./models/expense";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [addExpenseRequest, getExpenseRequest] = useState({} as Expense);

  useEffect(() => {
    async function updateGoogleSheets(expense: Expense) {
      try {
        const response = await axios.post(
          `${config.app.URL}/addExpense`,
          { ...expense },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        const { oldValue, newValue } = response.data;
      } catch (err) {
        console.log(JSON.stringify(err))
      }

    };
    if (Object.keys(addExpenseRequest).length > 0) {
      updateGoogleSheets(addExpenseRequest)
    };

  }, [addExpenseRequest])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Noam & Roni's {config.app.TITLE}</h1>
      </header>
      <div id="expenses-form">
        <ExpenseAddFrom getExpenseRequest={getExpenseRequest} />
      </div>
    </div>
  );
}
