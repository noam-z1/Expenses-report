# Expenses Add Form Implementation.

### The problem
  I'm managing a budget, and therefore have a google sheets where we keep all the income/outcome money sums, per month.
  Managing a plain google sheet is annoying, so we would miss some expenses and generally it was another chore.

## The solution
  This project is meant to fix this.
  With a lambda create a form that will update the sheet for us.

### How does it work (v1)
  - The lambda is loading the base form
  - A react component is sending an api request for a function that's loading the possible categories from the sheet
  - The user adds the expense - name, category, price and date
  - A function is triggered with the data as input
    - Looking for the relevant cell to update, based on month and category
    - Gets the initial value
    - Updates the value in the sheet
    - Returns the initial value and the new value
  - Shows the user (in a different component) the old and new value for the expense

### Infrastrcture
  - I'm using AWS lambda for all the deployment, with the [serverless](http://www.serverless.com) framework.
  - I've built the frontend using react.
  - For the initial boilerplate I used [serverless-react-boilerplate](https://github.com/arabold/serverless-react-boilerplate).
  - I'm using Github actions for the CI/CD.

### Planned features
  - Save DB records of all the expenses
  - When adding a new expense show a list of this months previous expenses
  - Require authentication for the form

### What I've learned
  - First project working with react. Understanding what are components, events and hooks.
  - Working with Github Actions for CI/CD.
  - Working with google sheets API, sdk
