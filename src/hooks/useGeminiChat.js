// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function useGeminiChat() {
//   const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

//   if (!apiKey) {
//     throw new Error("Missing REACT_APP_GEMINI_API_KEY in .env file.");
//   }

//   // Optional: Force the correct API version (v1)
//   const genAI = new GoogleGenerativeAI(apiKey, {
//     apiVersion: "v1", // prevent 404 errors from v1beta
//   });

//   // FIXED: Correct model name must be "models/gemini-pro"
//   const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

//   const sendMessage = async (userPrompt) => {
//     try {
//       const result = await model.generateContent(userPrompt);
//       const response = await result.response.text();
//       return response;
//     } catch (err) {
//       console.error("Gemini API error:", err);
//       return "Something went wrong talking to Gemini.";
//     }
//   };

//   return { sendMessage };
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useGeminiChat() {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing REACT_APP_GEMINI_API_KEY in .env file.");
  }

  // Ensure you're using the proper API version
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

  const sendMessage = async (userPrompt) => {
    try {
      const result = await model.generateContent(userPrompt);
      const response = await result.response.text();
      return response;
    } catch (err) {
      console.error("Gemini API error:", err);
      return "Something went wrong talking to Gemini.";
    }
  };

  return { sendMessage };
}

