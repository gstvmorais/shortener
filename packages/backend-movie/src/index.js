import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Pitangflix" });
});

app.listen(PORT, () => {
  console.log(`Listening PORT: ${PORT}`);
});
