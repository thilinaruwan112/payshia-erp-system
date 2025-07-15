
import type { Plan } from '@/lib/types';

export const plans: Plan[] = [
    {
        id: 'plan-free',
        name: 'Free',
        description: 'Perfect for exploring the platform.',
        price: 0,
        features: [
            'Up to 100 Orders/mo',
            'Up to 25 Products',
            '1 Location',
            'Basic Reporting'
        ],
        ctaLabel: 'Get Started'
    },
    {
        id: 'plan-basic',
        name: 'Basic',
        description: 'For small businesses getting started.',
        price: 29,
        features: [
            'Up to 1,000 Orders/mo',
            'Up to 500 Products',
            '2 Locations',
            'Basic Reporting',
            'Email Support'
        ],
        ctaLabel: 'Upgrade to Basic'
    },
    {
        id: 'plan-pro',
        name: 'Pro',
        description: 'For growing businesses that need more features.',
        price: 79,
        features: [
            'Up to 5,000 Orders/mo',
            'Up to 10,000 Products',
            '10 Locations',
            'Advanced Reporting',
            'AI Logistics Assistant',
            'Priority Support'
        ],
        ctaLabel: 'Upgrade to Pro'
    },
    {
        id: 'plan-enterprise',
        name: 'Enterprise',
        description: 'For large businesses with custom needs.',
        price: 249,
        features: [
            'Unlimited Orders',
            'Unlimited Products',
            'Unlimited Locations',
            'Custom Reporting',
            'Dedicated Account Manager',
            '24/7 Phone Support'
        ],
        ctaLabel: 'Contact Sales'
    }
];
