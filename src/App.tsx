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
  const [addExpensesRequest, setAddExpensesRequest] = useState([] as Expense[]);
  const [expensesData, setExpensesData] = useState<ExpenseData[] | null>([]);

  useEffect(() => {
    async function updateGoogleSheets(expenses: Expense[]): Promise<void> {
      setExpensesData(null);
      let responses = [] as ExpenseData[];
      for (const expense of expenses) {
        try {
          const response = await axios.post(
            `${config.app.URL}/Expense`,
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
  
          responses.push(expenseData);
        } catch (err) {
          console.log(JSON.stringify(err))
        }
      }
      const noNullResponses = responses.filter((value) => value !== null) as ExpenseData[];
      setExpensesData(noNullResponses)
    };
    updateGoogleSheets(addExpensesRequest)

  }, [addExpensesRequest])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Noam & Roni's {config.app.TITLE}</h1>
      </header>
      <div id="expenses-form">
        <ExpenseAddFrom setAddExpensesRequest={setAddExpensesRequest} />
      </div>
      <div id="expense-details">
        <ExpenseDetails expenses={expensesData} />
      </div>
    </div>
  );
}
