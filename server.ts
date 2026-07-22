import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Removed Firebase Initialization

  app.use(express.json());

  // API routes
  app.post("/api/save-token", (req, res) => {
    const { token } = req.body;
    console.log("Token saved:", token);
    res.status(200).json({ success: true });
  });

  app.post("/api/send-notification", async (req, res) => {
    // Firebase is not initialized, so we cannot send notifications
    res.status(503).json({ error: "Firebase functionality is disabled" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
