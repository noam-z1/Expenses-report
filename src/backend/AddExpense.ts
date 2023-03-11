import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, WorksheetGridRange } from "google-spreadsheet";
import { APIGatewayEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";

let sheet: GoogleSpreadsheetWorksheet;

async function getSheet(): Promise<GoogleSpreadsheetWorksheet> {
  if (sheet) return sheet;
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_URL);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_API_KEY ?? "",
  });
  await doc.loadInfo();

  const sheet_name = process.env.SPREADSHEET_NAME ?? "";
  sheet = doc.sheetsByTitle[sheet_name];
  return sheet;
}

async function getRelevantCell(category: string, date: string): Promise<number[]> {
  const sheet = await getSheet();

  await sheet.loadCells("A1:A1");
  const a1 = sheet.getCell(0, 0);
  a1.formula = `=cell("row", VLOOKUP("${category}",B:C,2,0))`;
  await sheet.saveUpdatedCells();
  await sheet.loadCells("A1:A1");
  const row = parseInt(a1.value as string) - 1;
  a1.value = "";
  await sheet.saveUpdatedCells();

  const [year, month, _] = date.split("-");
  const col = 1 + 13 * (parseInt(year) - 2022) + parseInt(month);
  return [row, col];
}

async function updateCell(
  row: number,
  col: number,
  addition: number,
): Promise<{ initialValue: number; newValue: number }> {
  const sheet = await getSheet();
  const cellDimentions: WorksheetGridRange = {
    startRowIndex: row,
    endRowIndex: row + 1,
    startColumnIndex: col,
    endColumnIndex: col + 1,
  };
  await sheet.loadCells(cellDimentions);
  const cell = sheet.getCell(row, col);
  let initialValue: number;
  if (cell.value) {
    initialValue = parseFloat(cell.value as string);
  } else {
    initialValue = 0;
  }
  const newValue = initialValue + addition;
  cell.value = newValue;
  await sheet.saveUpdatedCells();
  return {
    initialValue,
    newValue,
  };
}

export const addExpense = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/html",
      },
      body: `No body attached to request`,
    };
  }
  const { value, category, date } = JSON.parse(event.body);
  try {
    const [row, col] = await getRelevantCell(category, date);
    const { initialValue, newValue } = await updateCell(row, col, parseFloat(value));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: JSON.stringify({
        oldValue: initialValue,
        newValue,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `${err}`,
    };
  }
};
