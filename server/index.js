import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import setupSwagger from "./swagger.js";
import helloRouter from "./routes/hello.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", helloRouter);


setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server kör på: http://localhost:${PORT}`);
  console.log(`📄 Swagger docs: http://localhost:${PORT}/api/docs`);
});
