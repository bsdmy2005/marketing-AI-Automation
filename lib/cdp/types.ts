export interface CustomerProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  segments: string[];
  attributes: {
    lifetimeValue: number;
    lastPurchaseDate?: string;
    totalOrders: number;
    preferredChannel: string;
    joinDate: string;
  };
  events: CustomerEvent[];
  consent: {
    email: boolean;
    sms: boolean;
    lastUpdated: string;
  };
}

export interface CustomerEvent {
  id: string;
  type: string;
  timestamp: string;
  properties: Record<string, any>;
}

export interface CDPFieldMapping {
  source: string;
  destination: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  transform?: (value: any) => any;
}