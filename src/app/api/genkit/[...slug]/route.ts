import { ai } from '@/ai/genkit';
import { GenkitError } from '@genkit-ai/core';

export const GET = async (req) => {
  try {
    const response = await ai({ apiKey: process.env.GENKIT_API_KEY, allowCors: true })
      .handleRequest(req); // new method in 1.19+
    return response;
  } catch (err) {
    if (err instanceof GenkitError) {
      return new Response(err.message, { status: err.statusCode });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const POST = GET;

