import { CustomerProfile } from './types';
import { CDP_FIELD_MAPPINGS, MOCK_CUSTOMERS } from './config';

export class CDPClient {
  async getCustomer(id: string): Promise<CustomerProfile | null> {
    // Mock CDP API call
    return MOCK_CUSTOMERS.find(customer => customer.id === id) || null;
  }

  async getCustomers(params: { segment?: string; limit?: number } = {}): Promise<CustomerProfile[]> {
    // Mock CDP API call with filtering
    let customers = [...MOCK_CUSTOMERS];
    
    if (params.segment) {
      customers = customers.filter(c => c.segments.includes(params.segment));
    }
    
    if (params.limit) {
      customers = customers.slice(0, params.limit);
    }
    
    return customers;
  }

  async getCustomerEvents(customerId: string): Promise<CustomerProfile['events']> {
    const customer = await this.getCustomer(customerId);
    return customer?.events || [];
  }

  mapFields(data: any): Record<string, any> {
    const mapped: Record<string, any> = {};
    
    Object.entries(CDP_FIELD_MAPPINGS).forEach(([key, mapping]) => {
      const value = this.getNestedValue(data, mapping.source);
      mapped[mapping.destination] = mapping.transform ? mapping.transform(value) : value;
    });
    
    return mapped;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }
}