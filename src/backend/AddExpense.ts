import { APIGatewayEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";

export const addExpense = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  const results = event.body;
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: `${results}`,
  };
};
