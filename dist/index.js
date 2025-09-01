import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./routes/user.routes.js";
import admin from "./routes/admin.routes.js";
import auth from "./routes/auth.routes.js";
import movies from "./routes/movies.routes.js";
import { errorHandler } from "./middlewares/error/error.middlewares.js";
const app = express();
const PORT = Number(process.env.PORT) || 3000;
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
// Check if user is logged in
app.use("/api/auth", auth);
// Routes
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/movies", movies);
app.get("/test", (req, res) => {
    res.send("Test route works");
});
// Global Error Handler
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map