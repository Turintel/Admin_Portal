// Browser-compatible database utility using localStorage
class BrowserDatabase {
  constructor(storeName) {
    this.storeName = storeName;
    this.data = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storeName);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storeName, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  generateId() {
    return Date.now() + Math.random();
  }

  // Create a new record
  create(record) {
    return new Promise((resolve) => {
      const newRecord = {
        ...record,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.data.push(newRecord);
      this.saveToStorage();
      resolve(newRecord);
    });
  }

  // Get all records
  getAll() {
    return new Promise((resolve) => {
      resolve([...this.data]);
    });
  }

  // Get record by ID
  getById(id) {
    return new Promise((resolve) => {
      const record = this.data.find(item => item.id === id);
      resolve(record || null);
    });
  }

  // Update record
  update(id, updateData) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Record not found'));
        return;
      }

      const updatedRecord = {
        ...this.data[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      this.data[index] = updatedRecord;
      this.saveToStorage();
      resolve(updatedRecord);
    });
  }

  // Delete record
  delete(id) {
    return new Promise((resolve) => {
      const initialLength = this.data.length;
      this.data = this.data.filter(item => item.id !== id);
      const deleted = this.data.length < initialLength;
      
      if (deleted) {
        this.saveToStorage();
      }
      
      resolve(deleted ? 1 : 0);
    });
  }

  // Search records
  search(query, fields = []) {
    return new Promise((resolve) => {
      const searchRegex = new RegExp(query, 'i');
      const results = this.data.filter(item => {
        return fields.some(field => {
          const value = item[field];
          return value && searchRegex.test(value.toString());
        });
      });
      resolve(results);
    });
  }
}

// Create orders database instance
const ordersDB = new BrowserDatabase('orders');

// Initialize with sample data if empty
ordersDB.getAll().then(orders => {
  if (orders.length === 0) {
    // Add some sample orders
    const sampleOrders = [
      {
        customerName: 'John Doe',
        product: 'Laptop',
        quantity: 1,
        price: 999.99,
        status: 'pending'
      },
      {
        customerName: 'Jane Smith',
        product: 'Phone',
        quantity: 2,
        price: 599.99,
        status: 'processing'
      },
      {
        customerName: 'Bob Johnson',
        product: 'Tablet',
        quantity: 1,
        price: 299.99,
        status: 'shipped'
      }
    ];

    sampleOrders.forEach(order => {
      ordersDB.create(order);
    });
  }
});

// Orders database operations
export const ordersDatabase = {
  // Create a new order
  createOrder(order) {
    return ordersDB.create(order);
  },

  // Get all orders
  getAllOrders() {
    return ordersDB.getAll();
  },

  // Get order by ID
  getOrderById(id) {
    return ordersDB.getById(id);
  },

  // Update order
  updateOrder(id, updateData) {
    return ordersDB.update(id, updateData);
  },

  // Delete order
  deleteOrder(id) {
    return ordersDB.delete(id);
  },

  // Search orders
  searchOrders(query) {
    return ordersDB.search(query, ['customerName', 'product', 'status']);
  }
};