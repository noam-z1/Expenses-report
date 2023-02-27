import "./App.css";

import React, { useState, useEffect } from 'react';

import useConfig from "./components/useConfig";
import ExpenseAddFrom from "./components/ExpenseAddFrom";
import ExpenseDetails from "./components/ExpenseDetails";
import axios from "axios";
import { Expense } from "./models/expense";
import { ExpenseData } from "./models/ExpenseData";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [addExpenseRequest, setAddExpenseRequest] = useState({} as Expense);
  const [expenseData, setExpenseData] = useState({} as ExpenseData);

  useEffect(() => {
    async function updateGoogleSheets(expense: Expense): Promise<void> {
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
        const expenseData: ExpenseData = {
          category: expense.category,
          date: expense.date,
          oldValue,
          newValue,
        }

        setExpenseData(expenseData);
      } catch (err) {
        console.log(JSON.stringify(err))
      }

    };

    if (Object.keys(addExpenseRequest).length > 0) {
      setExpenseData({
        category: addExpenseRequest.category,
        date: addExpenseRequest.date
      })

      updateGoogleSheets(addExpenseRequest)
    };

  }, [addExpenseRequest])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Noam & Roni's {config.app.TITLE}</h1>
      </header>
      <div id="expenses-form">
        <ExpenseAddFrom setAddExpenseRequest={setAddExpenseRequest} />
      </div>
      <div id="expense-details">
        <ExpenseDetails expense={expenseData} />
      </div>
    </div>
  );
}
