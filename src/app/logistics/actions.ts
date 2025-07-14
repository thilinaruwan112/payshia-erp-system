'use server';

import { run } from '@genkit-ai/next/server';
import { logisticsFlow, logisticsQuerySchema } from '@/ai/flows/logistics';
import { z } from 'zod';

type FormState = {
  suggestion: string;
  error: string;
};

export async function getLogisticsSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    packageDetails: formData.get('packageDetails'),
    destination: formData.get('destination'),
    urgency: formData.get('urgency'),
  };

  const parsed = logisticsQuerySchema.safeParse(rawData);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map(e => e.message).join(', ');
    return { error: errorMessages, suggestion: '' };
  }

  try {
    const suggestion = await run(logisticsFlow, parsed.data);
    return { suggestion, error: '' };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get suggestion from AI.', suggestion: '' };
  }
}
