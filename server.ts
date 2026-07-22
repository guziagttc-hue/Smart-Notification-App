import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { getApps } from "firebase-admin/app";


async function startServer() {
  const app = express();
  const PORT = 3000;

  // Firebase Initialization
  try {
    initializeApp({
      credential: applicationDefault(),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
  }

  app.use(express.json());

  // API routes
  app.post("/api/save-token", (req, res) => {
    const { token } = req.body;
    console.log("Token saved:", token);
    res.status(200).json({ success: true });
  });

  app.post("/api/send-notification", async (req, res) => {
    if (!getApps().length) {
      return res.status(503).json({ error: "Firebase not initialized" });
    }
    const { deviceToken, title, body, extraData } = req.body;

    if (!deviceToken) {
      return res.status(400).json({ error: "Device Token প্রয়োজন" });
    }

    const message = {
      notification: {
        title: title || "নতুন নোটিফিকেশন",
        body: body || "আপনার কাছে নতুন একটি বার্তা এসেছে。",
      },
      data: extraData || {},
      token: deviceToken,
    };

    try {
      const response = await getMessaging().send(message);
      res.status(200).json({
        success: true,
        message: "নোটিফিকেশন সফলভাবে পাঠানো হয়েছে",
        messageId: response,
      });
    } catch (error: any) {
      console.error("FCM Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
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
