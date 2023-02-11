import React, { useRef } from 'react';
import ExpensesCategories from './ExpensesCategories';

export default function ExpenseAddFrom({ expenseCategories }: { expenseCategories: string[] }) {
    const expenseName = useRef();
    const expenseValue = useRef();
    const expenseDate = useRef();

    return (
        <>
        <h1> My Form</h1>
        <div className="expense-input" id="expense-name">
            <label>Name</label>
            <input ref={expenseName} type="text" />
        </div>
        <div className="expense-input" id="expense-category">
            <ExpensesCategories expenseCategories={expenseCategories} />
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
    </>
    )
}

// export class ExpenseAddFrom extends Component {

    // private async getExpensesCategories(config: Config) {
    //     const clientEmail = config.app.GOOGLE_SHEETS_CLIENT_EMAIL || '';
    //     const privateKey = config.app.GOOGLE_SHEETS_KEY || '';
    //     const sheetId = config.app.GOOGLE_SHEETS_URL || '';
    //     const sheetName = config.app.SHEET_NAME || '';
    //     return 'aa'
    // }

    // async componentDidMount() {
    //     const config = useConfig();
    //     const result = await this.getExpensesCategories(config);
    //     console.log(result)
    //     this.setState({ data: result });
    // }
    
// const loadExpenses = async (config: Config) => {
//     const clientEmail = config.app.GOOGLE_SHEETS_CLIENT_EMAIL || '';
//     const privateKey = config.app.GOOGLE_SHEETS_KEY || '';
//     const sheetId = config.app.GOOGLE_SHEETS_URL || '';
//     const sheetName = config.app.SHEET_NAME || '';
//     console.log(sheetId)

//     const doc = new GoogleSpreadsheet(sheetId);
//     console.log(JSON.stringify(doc))
    
//     await doc.useServiceAccountAuth({
//         client_email: clientEmail,
//         private_key: privateKey,
//     });
//     await doc.loadInfo();
    
//     const sheet = doc.sheetsById[sheetName];
//     console.log(sheet)
//     // const result = await sheet.loadCells('B1:B41');
//     // return sheetId;
// }

// export default async function ExpenseAddFrom() {
//     const expenseName = useRef();
//     const expenseValue = useRef();
//     const expenseDate = useRef();

//     const config = useConfig()

//     await loadExpenses(config)

//     // const { data, error, isPending } = useAsync({promiseFn: loadExpenses, config})

//     return (
//         <>
//             <h1> My Form</h1>
//             <div className="expense-input" id="expense-name">
//                 <label>Name</label>
//                 <input ref={expenseName} type="text" />
//             </div>
//             <div className="expense-input" id="expense-value">
//                 <label>Sum</label>
//                 <input ref={expenseValue} type="text" />
//             </div>
//             <div className="expense-input" id="expense-value">
//                 <label>Date</label>
//                 <input ref={expenseDate} type="text" />
//             </div>
//             <button>Add expense</button>
//             <div>
//                 {/* {console.log(`error: ${error}`)}
//                 {JSON.stringify(data)}
//                 {console.log(`loading: ${isPending}`)} */}
//             </div>
//         </>
//     )
//   }
  