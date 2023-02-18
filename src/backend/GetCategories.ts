import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import axios from "axios";

export const getCategories = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  const endpointURL = "https://sheets.googleapis.com/v4/spreadsheets";

  let results: string[] = [];
  try {
    const response = await axios.get(
      `${endpointURL}/${process.env.GOOGLE_SHEETS_URL}/values/${process.env.SPREADSHEET_NAME}!B:B`,
      {
        params: {
          key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        },
      },
    );

    results = response.data.values.map((category: string[]) => {
      if (category.length > 0) {
        return category[0];
      }
    });
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: "Error while fetching categories",
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: `${results}`,
  };
};
