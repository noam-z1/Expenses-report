import "./App.css";

import React, { useState, useEffect } from 'react';

import useConfig from "./components/useConfig";
import ExpenseAddFrom from "./components/ExpenseAddFrom";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [expenseCategories, getExpensesCategories] = useState(Array<string>());

  useEffect(() => {
    async function asyncGetExpensesCategories(){
      const results = ['aa', 'bb'];

      getExpensesCategories(results);
    };

    asyncGetExpensesCategories();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Noam & Roni's {config.app.TITLE}</h1>
      </header>
      <form id="expenses-form">
        <ExpenseAddFrom expenseCategories={expenseCategories}/>
      </form>
    </div>
  );
}
