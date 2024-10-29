import { CDPFieldMapping } from './types';

export const CDP_FIELD_MAPPINGS: Record<string, CDPFieldMapping> = {
  external_id: {
    source: 'id',
    destination: 'customerId',
    type: 'string',
  },
  email: {
    source: 'email',
    destination: 'emailAddress',
    type: 'string',
  },
  first_name: {
    source: 'firstName',
    destination: 'firstName',
    type: 'string',
  },
  last_name: {
    source: 'lastName',
    destination: 'lastName',
    type: 'string',
  },
  lifetime_value: {
    source: 'attributes.lifetimeValue',
    destination: 'ltv',
    type: 'number',
  },
  last_purchase: {
    source: 'attributes.lastPurchaseDate',
    destination: 'lastPurchase',
    type: 'date',
  },
  segment_ids: {
    source: 'segments',
    destination: 'segmentIds',
    type: 'string',
  }
};

// Mock CDP data for development
export const MOCK_CUSTOMERS = [
  {
    id: "cust_001",
    email: "sarah.smith@example.com",
    firstName: "Sarah",
    lastName: "Smith",
    phone: "+1234567890",
    segments: ["high_value", "frequent_buyer"],
    attributes: {
      lifetimeValue: 2450.00,
      lastPurchaseDate: "2024-01-15",
      totalOrders: 24,
      preferredChannel: "email",
      joinDate: "2023-01-10"
    },
    events: [
      {
        id: "evt_001",
        type: "purchase",
        timestamp: "2024-01-15T14:30:00Z",
        properties: {
          orderId: "ord_789",
          amount: 150.00
        }
      }
    ],
    consent: {
      email: true,
      sms: true,
      lastUpdated: "2024-01-01T10:00:00Z"
    }
  }
];