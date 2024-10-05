import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import router from './app/router'

const app: Application = express()

//parser

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000'] }));

//application routes
app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Tech Tips Trick Hub Project!')
})
// global error handler
app.use(globalErrorHandler)
// Not Found
app.use(notFound)
export default app
