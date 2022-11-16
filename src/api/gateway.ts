import customerRoutes from '../api/customer/customer.router';
import billingRoutes from '../api/billing/billing.router';

const routes = (app:any) => {
  app.use(`/customer`, customerRoutes);
  app.use(`/billing`, billingRoutes);
};

export default routes;