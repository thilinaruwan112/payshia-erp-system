
import { plans, products, locations, orders } from './data';
import type { Plan } from './types';

// In a real app, you'd get this from the user's session or authentication context.
const MOCK_CURRENT_USER_PLAN_ID = 'plan-basic';

/**
 * Parses the feature string to extract the limit number.
 * e.g., "Up to 1,000 Orders/mo" -> 1000
 * e.g., "10 Locations" -> 10
 */
function getLimitFromFeature(feature: string): number {
  if (feature.toLowerCase().startsWith('unlimited')) {
    return Infinity;
  }
  const match = feature.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
}

function findFeature(plan: Plan, keyword: string): string | undefined {
    return plan.features.find(f => f.toLowerCase().includes(keyword));
}

type LimitType = 'products' | 'locations' | 'orders';

/**
 * Checks the current user's plan limits for a specific feature.
 */
export async function checkPlanLimit(type: LimitType): Promise<{
  hasAccess: boolean;
  limit: number;
  usage: number;
  name: string;
}> {
  const currentPlan = plans.find((p) => p.id === MOCK_CURRENT_USER_PLAN_ID);

  if (!currentPlan) {
    // Default to a restricted state if the plan isn't found
    return { hasAccess: false, limit: 0, usage: 0, name: 'Unknown' };
  }

  let limit = Infinity;
  let usage = 0;
  let featureString: string | undefined;

  switch (type) {
    case 'products':
      featureString = findFeature(currentPlan, 'product');
      usage = products.length;
      break;
    case 'locations':
      featureString = findFeature(currentPlan, 'location');
      usage = locations.length;
      break;
    case 'orders':
       featureString = findFeature(currentPlan, 'order');
       // In a real app, you'd filter orders by the current month
       usage = orders.length;
       break;
  }

  if (featureString) {
      limit = getLimitFromFeature(featureString);
  }

  return {
    hasAccess: usage < limit,
    limit,
    usage,
    name: currentPlan.name,
  };
}
