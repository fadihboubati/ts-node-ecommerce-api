import express, {Express, Request, Response} from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
const app : Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.use('/api', rootRouter);

app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' });
});

export const prismaClient = new PrismaClient({
    log: ["query"]
});


app.use(errorMiddleware);

prismaClient.$connect().then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
        console.log("server started");
    });

}).catch(err => {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit the process with an error code
});