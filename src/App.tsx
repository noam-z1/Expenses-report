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
      console.log(JSON.stringify(expenses))
      setExpensesData(null);
      const responses = await Promise.all(
        expenses.map(async (expense) => {
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
    
            return expenseData;
          } catch (err) {
            console.log(JSON.stringify(err))
            return null;
          }
        }
          )
      );
      console.log(JSON.stringify(responses))
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
