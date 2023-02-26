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
  const [expenseCategories, getExpensesCategories] = useState(Array<string>());
  const [addExpenseRequest, getExpenseRequest] = useState({} as Expense);

  let results: string[] = [];
  useEffect(() => {
    async function asyncGetExpensesCategories() {
      try {
        const response = await axios.get(`${config.app.URL}/getCategories`, {
          headers: {
            "Content-Type": "text/html",
          },
        });

        results = response.data.split(',')
      } catch (err) {
        console.log(JSON.stringify(err))
      }

      getExpensesCategories(results);
    };

    asyncGetExpensesCategories();
  }, [])

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

      getExpensesCategories(results);
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
        <ExpenseAddFrom expenseCategories={expenseCategories} getExpenseRequest={getExpenseRequest} />
      </div>
    </div>
  );
}
