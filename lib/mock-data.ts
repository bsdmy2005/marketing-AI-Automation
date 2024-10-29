import { faker } from '@faker-js/faker';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  age: number;
  language: string;
  subscription: {
    plan: string;
    status: string;
    startDate: string;
    nextBilling: string;
  };
  viewingHabits: {
    favoriteGenres: string[];
    avgWatchTimeDaily: number;
    peakViewingHours: string[];
    completionRate: number;
  };
  payment: {
    method: string;
    history: {
      date: string;
      amount: number;
      status: string;
    }[];
  };
  devices: {
    type: string;
    usage: number;
    lastActive: string;
  }[];
  engagement: {
    watchedShows: {
      title: string;
      progress: number;
      rating: number;
    }[];
    totalWatchTime: number;
    recommendedGenres: string[];
  };
}

const plans = ['Premium', 'Compact Plus', 'Compact', 'Family'];
const genres = ['Drama', 'Sports', 'Movies', 'Kids', 'News', 'Reality', 'Documentary'];
const devices = ['Smart TV', 'Mobile', 'Tablet', 'Web Browser', 'Streaming Box'];
const shows = [
  'Game of Thrones', 'Breaking Bad', 'The Crown', 'Stranger Things',
  'The Mandalorian', 'Friends', 'The Office', 'Planet Earth',
  'Black Mirror', 'Succession'
];

export const generateMockCustomers = (count: number = 50): CustomerProfile[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
    },
    age: faker.number.int({ min: 18, max: 75 }),
    language: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German']),
    subscription: {
      plan: faker.helpers.arrayElement(plans),
      status: faker.helpers.arrayElement(['Active', 'Suspended', 'Cancelled']),
      startDate: faker.date.past().toISOString(),
      nextBilling: faker.date.future().toISOString(),
    },
    viewingHabits: {
      favoriteGenres: faker.helpers.arrayElements(genres, { min: 2, max: 4 }),
      avgWatchTimeDaily: faker.number.float({ min: 0.5, max: 6, precision: 0.1 }),
      peakViewingHours: faker.helpers.arrayElements(
        ['Morning', 'Afternoon', 'Evening', 'Night'],
        { min: 1, max: 2 }
      ),
      completionRate: faker.number.float({ min: 0.3, max: 0.95, precision: 0.01 }),
    },
    payment: {
      method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Direct Debit']),
      history: Array.from({ length: 5 }, () => ({
        date: faker.date.recent().toISOString(),
        amount: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
        status: faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']),
      })),
    },
    devices: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
      type: faker.helpers.arrayElement(devices),
      usage: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      lastActive: faker.date.recent().toISOString(),
    })),
    engagement: {
      watchedShows: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
        title: faker.helpers.arrayElement(shows),
        progress: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        rating: faker.number.int({ min: 1, max: 5 }),
      })),
      totalWatchTime: faker.number.float({ min: 10, max: 500, precision: 0.1 }),
      recommendedGenres: faker.helpers.arrayElements(genres, { min: 2, max: 4 }),
    },
  }));
};

export const mockCustomers = generateMockCustomers();