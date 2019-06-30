import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import connectToSQL from "../utils/connectSql";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { log } = context;
  const { LastName, FirstName, Address, City } = req.body;
  log("Incoming request", JSON.stringify(req.body));
  try {
    const sql = await connectToSQL();
    await sql.query`INSERT INTO Persons (LastName, FirstName, Address, City) VALUES (${LastName}, ${FirstName}, ${Address}, ${City})`;
    context.res = { status: 200, body: "Successfully inserted new Person into the database" };
  } catch (e) {
    context.res = { status: 500, message: "An unexpected error occur" };
    log("Failed to query database ", e);
  }
  context.done();
};

export default httpTrigger;
