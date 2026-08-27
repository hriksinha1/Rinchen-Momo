export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  status: 'created' | 'pending' | 'paid' | 'failed';
}

export const paymentService = {
  async createPaymentOrder(amount: number): Promise<PaymentOrder> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id: `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      amount,
      currency: 'INR',
      status: 'created'
    };
  },
  
  async processPayment(orderId: string): Promise<boolean> {
    // Simulate real payment popup delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return true; // Mock success
  }
};
