export interface Subscriber {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  subscribedAt: string;
}
