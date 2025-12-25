
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDescription = async (name: string, condition: string, features: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a compelling 3-sentence product description for a student marketplace. 
                 Item: ${name}
                 Condition: ${condition}
                 Details: ${features}
                 Tone: Student-friendly, technical but accessible.`,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });
    return response.text?.trim() || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating description. Please write manually.";
  }
};

export const suggestPrice = async (name: string, condition: string): Promise<{ suggestedPrice: number; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a pricing expert for hobbyist electronics. 
                 Suggest a fair second-hand price in USD for: ${name} in ${condition} condition.
                 Return your response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["suggestedPrice", "reasoning"]
        }
      },
    });
    
    return JSON.parse(response.text || '{"suggestedPrice": 0, "reasoning": "Could not determine price."}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { suggestedPrice: 10, reasoning: "Default pricing due to error." };
  }
};
