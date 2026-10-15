import express from "express";
import cors from "cors";

// import { login } from "./controllers/AuthController.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// http: localhost:5000/api/auth/login

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);

app.get("/", (req, res) => {
  // req: mengambil data dari body dan parameter
  // req.body, req.params
  // res.send();
  res.json({ message: "Welcome to POS API" });
});

export default app;
