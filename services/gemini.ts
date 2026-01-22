import { GoogleGenAI, Type, Modality } from "@google/genai";

// Initialize AI Client lazily to prevent top-level crashes if process is undefined
const getAiClient = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey });
};

export async function chatWithGenie(history: { role: string; parts: string }[], message: string) {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `أنت "الخبير الرقمي" لدى شركة حلبي للخدمات.
        شخصيتك: ذكي جداً، فخم، لبق، ومحترف. تتحدث باللهجة السورية الراقية أو العربية الفصحى حسب سياق العميل.
        مهمتك: الإجابة عن استفسارات العملاء بخصوص الخدمات في سوريا (جوازات، عقارات، تحويل أموال، تصميم، إلخ).
        القاعدة الذهبية: لا تخطئ أبداً. إذا لم تكن متأكداً، اطلب من العميل التواصل مع المهندس جمعة عبر الواتساب.
        أسلوبك: مختصر ومفيد. استخدم الإيموجي المناسب للفخامة (✨, 💎, 🤝).`,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.parts }],
      })),
    });

    const result = await chat.sendMessage({ message: message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "عذراً، حدث خطأ تقني بسيط. يرجى المحاولة مجدداً.";
  }
}

export async function generateMarketingIdea(
  serviceName: string, 
  businessName: string = "حلبي للخدمات",
  platform: string = "Story",
  tone: string = "Luxurious"
) {
  try {
    const ai = getAiClient();
    const prompt = `
      بصفتك خبير تسويق رقمي في السوق السوري، قم بإنشاء فكرة إعلان جذابة.
      اسم المشروع: ${businessName}
      الخدمة: ${serviceName}
      المنصة المستهدفة: ${platform}
      أسلوب الخطاب: ${tone} (فخامة، شبابي، أو مهني)
      
      المتطلبات:
      1. عنوان قصير ومبهر.
      2. نص إعلاني مقنع يناسب المنصة المختارة.
      3. عبارة حث على اتخاذ إجراء (CTA) تدعو للتواصل عبر واتساب أو الدفع عبر شام كاش.
      الرد يجب أن يكون باللغة العربية حصراً وبأسلوب إبداعي جداً.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: "عنوان جذاب للإعلان" },
            body: { type: Type.STRING, description: "نص الإعلان المقترح" },
            cta: { type: Type.STRING, description: "عبارة الحث على اتخاذ إجراء" }
          },
          required: ["headline", "body", "cta"]
        },
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    const text = response.text;
    if (text) {
      return { ...JSON.parse(text), platform };
    }
  } catch (error) {
    console.error("Gemini Text Error:", error);
    return null;
  }
}

// Feature: Fast AI responses using Flash Lite
export async function generateQuickDescription(serviceName: string, category: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `اكتب وصفاً احترافياً وجذاباً وقصيراً (أقل من 300 حرف) باللغة العربية لخدمة بعنوان "${serviceName}" تندرج تحت تصنيف "${category}".`,
    });
    return response.text;
  } catch (error) {
    console.error("Quick Description Error:", error);
    return null;
  }
}

// Feature: Google Search Grounding for Market Trends
export async function getMarketTrends(category: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `ما هي أحدث الاتجاهات والخدمات المطلوبة حالياً في سوريا بخصوص "${category}"؟ أعطني 3 نقاط رئيسية مختصرة.`,
      config: {
        tools: [{googleSearch: {}}],
      }
    });
    
    // Extract text and grounding chunks (URLs)
    const text = response.text;
    // @ts-ignore
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      // @ts-ignore
      .map((c: any) => c.web?.uri)
      .filter((uri: string) => uri);

    return { text, sources: [...new Set(sources)] }; // Remove duplicates
  } catch (error) {
    console.error("Search Trends Error:", error);
    return null;
  }
}

export async function generateAdImage(serviceName: string, adText: string, tone: string = "Luxurious") {
  try {
    const ai = getAiClient();
    let visualStyle = "dark luxury aesthetic with gold accents and high-end lighting";
    if (tone === "Youthful") visualStyle = "vibrant neon cyberpunk aesthetic with energetic colors and modern motion blur";
    if (tone === "Professional") visualStyle = "clean corporate minimalist aesthetic with soft blues, whites, and sharp focus";

    const prompt = `A professional high-end digital advertisement for "${serviceName}".
    Visual Style: ${visualStyle}.
    Mood: ${tone}.
    The image should have a placeholder for text or contain high-quality 3D icons related to "${serviceName}".
    Luxurious studio photography, 8k resolution, cinematic composition. No low quality, no blur.
    Suitable for an Instagram ${tone === "Youthful" ? "TikTok" : "Story"}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return null;
  }
}

export async function editImageWithAI(base64Image: string, mimeType: string, editPrompt: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `As a professional photo editor for 'Halabi Digital Services', please edit this image according to this request: "${editPrompt}". 
            Maintain the luxurious and professional quality. Return the edited image.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1" // Or maintain original if possible, but 1:1 is safe
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Edit Error:", error);
    return null;
  }
}

export async function generateSpeech(textToSpeak: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `بلهجة عربية فخمة ومحترفة، اقرأ النص التالي بوضوح وتأثير: ${textToSpeak}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}

export async function analyzeDesign(base64Image: string, mimeType: string) {
  try {
    const ai = getAiClient();
    const systemPrompt = `أنت الخبير الإبداعي لموقع 'حلبي للخدمات الرقمية'. حلل التصميم المرفق في الصورة بأسلوب ملهم واحترافي. 
    استخدم التفكير العميق لتحليل العناصر البصرية: (الألوان، التكوين، الإضاءة، والرسالة الإبداعية).
    ركز على تقديم نصائح عملية للتحسين، ثم اربط هذه النصائح بذكاء بخدمات 'حلبي للخدمات'.
    اجعل الرد باللغة العربية بلهجة مهنية وجذابة.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { text: systemPrompt },
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          } as any
        ],
      },
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        temperature: 1.0,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Design Analysis Error:", error);
    return "عذراً، حدث خطأ أثناء تحليل الصورة. يرجى المحاولة مرة أخرى.";
  }
}