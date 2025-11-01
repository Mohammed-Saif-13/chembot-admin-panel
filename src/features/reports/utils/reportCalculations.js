/**
 * Report Calculations Utility
 * Helper functions to calculate sales data, revenue, analytics
 * Processes orders data for reports and charts
 */

/**
 * Calculate daily revenue for chart
 * @param {Array} orders - All orders
 * @param {number} days - Number of days (default 7)
 * @returns {Array} - Daily revenue data for chart
 */
export const calculateDailyRevenue = (orders, days = 7) => {
  const today = new Date();
  const dailyData = [];

  // Generate last N days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dateStr = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });

    // Calculate revenue for this day
    const dayRevenue = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === date.getTime() && order.paymentStatus === 'paid';
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    dailyData.push({
      date: dateStr,
      day: dayName,
      revenue: dayRevenue,
      formattedRevenue: `₹${dayRevenue.toLocaleString('en-IN')}`,
    });
  }

  return dailyData;
};

/**
 * Calculate product-wise sales
 * @param {Array} orders - All orders
 * @returns {Array} - Product sales data sorted by quantity
 */
export const calculateProductSales = (orders) => {
  const productMap = {};

  // Aggregate product data from all orders
  orders.forEach((order) => {
    if (order.paymentStatus === 'paid') {
      order.products.forEach((product) => {
        if (productMap[product.name]) {
          productMap[product.name].quantity += product.quantity;
          productMap[product.name].revenue += product.total;
          productMap[product.name].orders += 1;
        } else {
          productMap[product.name] = {
            name: product.name,
            quantity: product.quantity,
            revenue: product.total,
            orders: 1,
            unit: product.unit,
          };
        }
      });
    }
  });

  // Convert to array and sort by revenue
  return Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10); // Top 10 products
};

/**
 * Calculate order status distribution
 * @param {Array} orders - All orders
 * @returns {Array} - Order status counts for pie chart
 */
export const calculateOrderStatusDistribution = (orders) => {
  const statusCounts = {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  orders.forEach((order) => {
    if (statusCounts[order.orderStatus] !== undefined) {
      statusCounts[order.orderStatus]++;
    }
  });

  // Convert to array format for pie chart
  return Object.entries(statusCounts)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      status: status,
    }))
    .filter((item) => item.value > 0); // Only show statuses with orders
};

/**
 * Calculate payment status distribution
 * @param {Array} orders - All orders
 * @returns {Array} - Payment status counts
 */
export const calculatePaymentDistribution = (orders) => {
  const paymentCounts = {
    paid: 0,
    pending: 0,
    failed: 0,
  };

  orders.forEach((order) => {
    if (paymentCounts[order.paymentStatus] !== undefined) {
      paymentCounts[order.paymentStatus]++;
    }
  });

  return Object.entries(paymentCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    status: status,
  }));
};

/**
 * Calculate top customers by revenue
 * @param {Array} orders - All orders
 * @param {Array} customers - All customers
 * @returns {Array} - Top customers data
 */
export const calculateTopCustomers = (orders, customers) => {
  const customerMap = {};

  // Aggregate customer data
  orders.forEach((order) => {
    if (order.paymentStatus === 'paid') {
      if (customerMap[order.customerId]) {
        customerMap[order.customerId].totalSpent += order.totalAmount;
        customerMap[order.customerId].totalOrders += 1;
      } else {
        customerMap[order.customerId] = {
          customerId: order.customerId,
          customerName: order.customerName,
          totalSpent: order.totalAmount,
          totalOrders: 1,
        };
      }
    }
  });

  // Convert to array and sort by total spent
  return Object.values(customerMap)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5); // Top 5 customers
};

/**
 * Calculate overall summary statistics
 * @param {Array} orders - All orders
 * @returns {Object} - Summary stats
 */
export const calculateSummaryStats = (orders) => {
  const paidOrders = orders.filter((order) => order.paymentStatus === 'paid');
  
  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter((order) => order.orderStatus === 'delivered').length;
  const pendingOrders = orders.filter((order) => order.orderStatus === 'pending').length;
  const averageOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  return {
    totalRevenue,
    totalOrders,
    completedOrders,
    pendingOrders,
    averageOrderValue,
    paidOrdersCount: paidOrders.length,
  };
};

/**
 * Filter orders by date range
 * @param {Array} orders - All orders
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Array} - Filtered orders
 */
export const filterOrdersByDateRange = (orders, startDate, endDate) => {
  if (!startDate || !endDate) return orders;

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= start && orderDate <= end;
  });
};