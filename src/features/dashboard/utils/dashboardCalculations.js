/**
 * Dashboard Calculations Utility
 * Helper functions for dashboard stats and data
 */

/**
 * Calculate dashboard summary statistics
 * @param {Array} orders - All orders
 * @param {Array} customers - All customers
 * @param {Array} products - All products
 * @returns {Object} - Dashboard stats
 */
export const calculateDashboardStats = (orders, customers, products) => {
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Calculate total revenue (paid orders only)
  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // Calculate pending orders
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  ).length;

  // Calculate active customers
  const activeCustomers = customers.filter(
    (customer) => customer.status === "active"
  ).length;

  // Calculate low stock products
  const lowStockProducts = products.filter(
    (product) =>
      product.status === "Low Stock" || product.status === "Out of Stock"
  ).length;

  return {
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue,
    pendingOrders,
    activeCustomers,
    lowStockProducts,
  };
};

/**
 * Get recent orders (last 5)
 * @param {Array} orders - All orders
 * @returns {Array} - Recent orders sorted by date
 */
export const getRecentOrders = (orders) => {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
};

/**
 * Get top selling products
 * @param {Array} orders - All orders
 * @returns {Array} - Top 5 products by revenue
 */
export const getTopProducts = (orders) => {
  const productMap = {};

  // Aggregate product sales from all orders
  orders.forEach((order) => {
    if (order.paymentStatus === "paid") {
      order.products.forEach((product) => {
        if (productMap[product.name]) {
          productMap[product.name].quantity += product.quantity;
          productMap[product.name].revenue += product.total;
        } else {
          productMap[product.name] = {
            name: product.name,
            quantity: product.quantity,
            revenue: product.total,
            unit: product.unit,
          };
        }
      });
    }
  });

  // Convert to array and sort by revenue
  return Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
};

/**
 * Get low stock products
 * @param {Array} products - All products
 * @returns {Array} - Low stock and out of stock products
 */
export const getLowStockProducts = (products) => {
  return products
    .filter(
      (product) =>
        product.status === "Low Stock" || product.status === "Out of Stock"
    )
    .sort((a, b) => a.stock - b.stock) // Sort by stock (lowest first)
    .slice(0, 10); // Show top 10 low stock items
};

/**
 * Calculate daily revenue for last 7 days
 * @param {Array} orders - All orders
 * @returns {Array} - Daily revenue data
 */
export const getDailyRevenue = (orders) => {
  const today = new Date();
  const dailyData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dayName = date.toLocaleDateString("en-IN", { weekday: "short" });

    // Calculate revenue for this day
    const dayRevenue = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return (
          orderDate.getTime() === date.getTime() &&
          order.paymentStatus === "paid"
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    dailyData.push({
      day: dayName,
      revenue: dayRevenue,
      formattedRevenue: `₹${dayRevenue.toLocaleString("en-IN")}`,
    });
  }

  return dailyData;
};
