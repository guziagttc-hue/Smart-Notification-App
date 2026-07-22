import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import admin from "firebase-admin";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Firebase Initialization
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase initialized");
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT not set, skipping Firebase initialization");
  }

  app.use(express.json());

  // API routes
  app.post("/api/send-notification", async (req, res) => {
    if (!admin.apps.length) {
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
      const response = await admin.messaging().send(message);
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
