import OpenAI from 'openai';
import { cvData, chatbotKnowledge } from '@/data/cvData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;
export const preferredRegion = 'iad1';

const greetingResponse = "Hello. I'm Qaiser's portfolio AI assistant. How can I help you today? Would you like to know about Qaiser's skills, experience, projects or availabality?";

const systemPrompt = `You are Qaiser's portfolio AI assistant.

Rules:
- Answer as a helpful assistant about Qaiser Farooq.
- Keep responses concise, friendly, and professional.
- If asked about availability, clearly say he is available and suggest WhatsApp contact: ${cvData.personal.social.whatsapp}
- For general questions not directly about Qaiser (for example math or trivia), answer briefly and then add one short line that Qaiser is available and can be contacted on WhatsApp.
- If unsure, guide user to ask about skills, experience, projects, education, or contact.

Profile Context:
- Name: ${cvData.personal.name}
- Title: ${cvData.personal.title}
- Bio: ${cvData.personal.bio}
- Email: ${cvData.personal.email}
- Phone: ${cvData.personal.phone}
- Location: ${cvData.personal.location}
- Availability: ${chatbotKnowledge.availability}
- Skills Summary: ${chatbotKnowledge.skills_summary}
- Education Summary: ${chatbotKnowledge.education_summary}
- Experience Summary: ${chatbotKnowledge.experience_summary}
- Projects Summary: ${chatbotKnowledge.projects_summary}`;

const profileKeywords = [
  'qaiser',
  'skill',
  'experience',
  'project',
  'education',
  'contact',
  'email',
  'phone',
  'whatsapp',
  'available',
  'availability',
  'hire',
  'work',
  'ai',
  'research',
];

function isGeneralQuestion(message = '') {
  const lower = message.toLowerCase();
  return !profileKeywords.some((keyword) => lower.includes(keyword));
}

function isGreetingMessage(message = '') {
  const lower = message.trim().toLowerCase();
  return /^(hi|hello|hey|salam|assalamualaikum|asalamualaikum)[!.,\s]*$/.test(lower);
}

function getProviderConfig() {
  const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (groqApiKey) {
    return {
      provider: 'groq',
      apiKey: groqApiKey,
      baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    };
  }

  if (openaiApiKey) {
    return {
      provider: 'openai',
      apiKey: openaiApiKey,
      baseURL: process.env.OPENAI_BASE_URL,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    };
  }

  return null;
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (isGreetingMessage(message)) {
      return Response.json({ reply: greetingResponse });
    }

    const providerConfig = getProviderConfig();

    if (!providerConfig) {
      return Response.json(
        {
          error: 'No AI provider configured. Set GROQ_API_KEY or OPENAI_API_KEY on the server.',
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: providerConfig.apiKey,
      baseURL: providerConfig.baseURL,
      timeout: 25000,
      maxRetries: 1,
    });

    const completion = await client.chat.completions.create({
      model: providerConfig.model,
      temperature: 0.5,
      max_tokens: 350,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    let reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return Response.json({ error: 'No response generated.' }, { status: 502 });
    }

    if (
      isGeneralQuestion(message) &&
      !reply.toLowerCase().includes('available')
    ) {
      reply = `${reply}\n\nQaiser is available for opportunities. You can contact him directly on WhatsApp: ${cvData.personal.social.whatsapp}`;
    }

    return Response.json({ reply });
  } catch (error) {
    return Response.json(
      {
        error: 'Chat request failed.',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
