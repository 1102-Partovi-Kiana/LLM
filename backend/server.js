// server.js (CommonJS)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "25mb" }));

// --- health check ---
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Gemini chat endpoint ---
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { history = [], inputText = "", images = [] } = req.body;

    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing REACT_APP_GEMINI_API_KEY" });
    }

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contents = [
      ...history,
      {
        role: "user",
        parts: [
          ...(inputText ? [{ text: inputText }] : []),
          ...images.map((img) => ({
            inlineData: { data: img.data, mimeType: img.mimeType },
          })),
        ],
      },
    ];

    const result = await model.generateContent({ contents });
    const text = result?.response?.text?.() ?? "";
    res.json({ text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Gemini request failed" });
  }
});

// --- start server ---
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
