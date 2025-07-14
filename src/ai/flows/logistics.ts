import {ai} from '@/ai/genkit';
import {defineFlow} from 'genkit/flow';
import {z} from 'zod';

export const logisticsQuerySchema = z.object({
  packageDetails: z
    .string()
    .min(3, 'Package details must be at least 3 characters.')
    .describe('Details of the package (e.g., dimensions, weight)'),
  destination: z
    .string()
    .min(2, 'Destination must be at least 2 characters.')
    .describe('Shipping destination'),
  urgency: z.string().describe('How urgent the shipment is (e.g., standard, express)'),
});

export const logisticsFlow = defineFlow(
  {
    name: 'logisticsFlow',
    inputSchema: logisticsQuerySchema,
    outputSchema: z.string(),
  },
  async (query) => {
    const prompt = `
      You are a logistics assistant for an ERP system called BranchBrain.
      Given the following order requirements, suggest a suitable shipping vendor and explain why.
      Be concise and helpful. Format your response as clean HTML.

      Order Details:
      - Package: ${query.packageDetails}
      - Destination: ${query.destination}
      - Urgency: ${query.urgency}

      Start your response with a <h4> tag for the suggested vendor.
    `;

    const llmResponse = await ai.generateText({
      prompt,
      model: 'googleai/gemini-2.0-flash',
    });

    return llmResponse;
  }
);
