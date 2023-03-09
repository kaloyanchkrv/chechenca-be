import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app: Express = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Express server with TypeScript");
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${port}`);
});
