import "./App.css";

import React, { useState, useEffect } from 'react';

import useConfig from "./components/useConfig";
import ExpenseAddFrom from "./components/ExpenseAddFrom";
import axios from "axios";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [expenseCategories, getExpensesCategories] = useState(Array<string>());

  let results: string[] = [];
  useEffect(() => {
    async function asyncGetExpensesCategories() {
      try {
        const response = await axios.get('/getCategories');

        results = response.data.split(',')
      } catch (err) {
        console.log(JSON.stringify(err))
      }

      getExpensesCategories(results);
    };

    asyncGetExpensesCategories();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Noam & Roni's {config.app.TITLE}</h1>
      </header>
      <div id="expenses-form">
        <ExpenseAddFrom expenseCategories={expenseCategories} />
      </div>
    </div>
  );
}
