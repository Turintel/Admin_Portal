import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: []
  }),

  getters: {
    getAllOrders: (state) => state.orders,
    
    getOrderById: (state) => (id) => {
      return state.orders.find(order => order.id === id) || null
    }
  },

  actions: {
    generateId() {
      return Date.now() + Math.random()
    },

    // Initialize with sample data if empty
    initializeSampleData() {
      if (this.orders.length === 0) {
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
        ]

        sampleOrders.forEach(order => {
          this.createOrder(order)
        })
      }
    },

    // Create a new order
    createOrder(orderData) {
      return new Promise((resolve) => {
        const newOrder = {
          ...orderData,
          id: this.generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        this.orders.push(newOrder)
        resolve(newOrder)
      })
    },

    // Get all orders (returns a promise for compatibility)
    getAllOrdersAsync() {
      return new Promise((resolve) => {
        resolve([...this.orders])
      })
    },

    // Get order by ID (returns a promise for compatibility)
    getOrderByIdAsync(id) {
      return new Promise((resolve) => {
        const order = this.orders.find(item => item.id === id)
        resolve(order || null)
      })
    },

    // Update order
    updateOrder(id, updateData) {
      return new Promise((resolve, reject) => {
        const index = this.orders.findIndex(item => item.id === id)
        if (index === -1) {
          reject(new Error('Record not found'))
          return
        }

        const updatedOrder = {
          ...this.orders[index],
          ...updateData,
          updatedAt: new Date().toISOString()
        }

        this.orders[index] = updatedOrder
        resolve(updatedOrder)
      })
    },

    // Delete order
    deleteOrder(id) {
      return new Promise((resolve) => {
        const initialLength = this.orders.length
        this.orders = this.orders.filter(item => item.id !== id)
        const deleted = this.orders.length < initialLength
        
        resolve(deleted ? 1 : 0)
      })
    },

    // Search orders
    searchOrders(query, fields = ['customerName', 'product', 'status']) {
      return new Promise((resolve) => {
        const searchRegex = new RegExp(query, 'i')
        const results = this.orders.filter(item => {
          return fields.some(field => {
            const value = item[field]
            return value && searchRegex.test(value.toString())
          })
        })
        resolve(results)
      })
    }
  },

  persist: {
    key: 'orders-store',
    storage: localStorage
  }
})