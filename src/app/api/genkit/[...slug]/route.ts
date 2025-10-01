import { ai } from '@/ai/genkit';
import { GenkitError } from '@genkit-ai/core';

export const { GET, POST } = ai.getAPIHandler({
  // This is necessary if you are running Genkit in a different environment
  // from your web app.
  allowCors: true,

  // An example of how to use authentication.
  // auth: async (authHeader) => {
  //   const user = await verifyToken(authHeader.substring(7));
  //   if (!user) throw new GenkitError({statusCode: 401, message: 'Unauthorized'});
  //   return user;
  // }
});
