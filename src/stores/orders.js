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

    // Create default order structure with all 37 fields
    createDefaultOrder() {
      return {
        // Shipper Details
        shipperName: '',
        shipperCompany: '',
        shipperCountry: '',
        shipperAddress: '',
        shipperProvince: '',
        shipperPostalCode: '',
        shipperEmail: '',
        shipperPhoneNumber: '',
        
        // Consignee Details
        consigneeName: '',
        consigneeCompany: '',
        consigneeCountry: '',
        consigneeAddress: '',
        consigneeProvince: '',
        consigneePostalCode: '',
        consigneeEmail: '',
        consigneePhoneNumber: '',
        
        // Customer Details
        customerName: '',
        customerCompany: '',
        customerContactNo: '',
        customerEmail: '',
        
        // Item & Package Details
        itemDescription: '',
        itemValue: 0,
        itemQuantity: 1,
        weight: 0,
        weightUnit: 'kg',
        boxDimensionL: 0,
        boxDimensionW: 0,
        boxDimensionH: 0,
        containsFragile: false,
        containsLiquids: false,
        insuranceAdded: false,
        
        // Order & Instructions
        loadNumber: '',
        wordpressOrderNumber: '',
        pickupInstructions: '',
        deliveryInstructions: '',
        sellerNotes: '',
        datePickedUp: '',
        dateDelivered: '',
        
        // Status and metadata
        status: 'pending'
      }
    },

    // Initialize with sample data if empty
    initializeSampleData() {
      if (this.orders.length === 0) {
        const sampleOrders = [
          {
            ...this.createDefaultOrder(),
            customerName: 'John Doe',
            customerCompany: 'Tech Solutions Inc',
            customerEmail: 'john.doe@techsolutions.com',
            customerContactNo: '+1-555-0123',
            itemDescription: 'High-performance laptop for business use',
            itemValue: 999.99,
            itemQuantity: 1,
            weight: 2.5,
            weightUnit: 'kg',
            shipperName: 'Alice Johnson',
            shipperCompany: 'Global Shipping Co',
            shipperCountry: 'USA',
            shipperAddress: '123 Warehouse St, Industrial Park',
            shipperProvince: 'California',
            shipperPostalCode: '90210',
            shipperEmail: 'alice@globalshipping.com',
            shipperPhoneNumber: '+1-555-0100',
            consigneeName: 'John Doe',
            consigneeCompany: 'Tech Solutions Inc',
            consigneeCountry: 'USA',
            consigneeAddress: '456 Business Ave, Suite 100',
            consigneeProvince: 'California',
            consigneePostalCode: '90211',
            consigneeEmail: 'john.doe@techsolutions.com',
            consigneePhoneNumber: '+1-555-0123',
            status: 'pending',
            loadNumber: 'LD001',
            wordpressOrderNumber: 'WP12345',
            boxDimensionL: 40,
            boxDimensionW: 30,
            boxDimensionH: 10,
            containsFragile: true,
            insuranceAdded: true
          },
          {
            ...this.createDefaultOrder(),
            customerName: 'Jane Smith',
            customerCompany: 'Mobile World',
            customerEmail: 'jane@mobileworld.com',
            customerContactNo: '+1-555-0124',
            itemDescription: 'Latest smartphone with accessories',
            itemValue: 599.99,
            itemQuantity: 2,
            weight: 1.2,
            weightUnit: 'kg',
            shipperName: 'Bob Wilson',
            shipperCompany: 'Express Logistics',
            shipperCountry: 'USA',
            shipperAddress: '789 Shipping Lane',
            shipperProvince: 'Texas',
            shipperPostalCode: '75201',
            shipperEmail: 'bob@expresslogistics.com',
            shipperPhoneNumber: '+1-555-0101',
            consigneeName: 'Jane Smith',
            consigneeCompany: 'Mobile World',
            consigneeCountry: 'USA',
            consigneeAddress: '321 Retail Plaza',
            consigneeProvince: 'Texas',
            consigneePostalCode: '75202',
            consigneeEmail: 'jane@mobileworld.com',
            consigneePhoneNumber: '+1-555-0124',
            status: 'shipped',
            loadNumber: 'LD002',
            wordpressOrderNumber: 'WP12346',
            boxDimensionL: 25,
            boxDimensionW: 15,
            boxDimensionH: 8,
            containsFragile: true,
            datePickedUp: '2025-07-15',
            pickupInstructions: 'Handle with care - electronics'
          },
          {
            ...this.createDefaultOrder(),
            customerName: 'Bob Johnson',
            customerCompany: 'Tablet Plus',
            customerEmail: 'bob@tabletplus.com',
            customerContactNo: '+1-555-0125',
            itemDescription: 'Professional tablet with stylus',
            itemValue: 299.99,
            itemQuantity: 1,
            weight: 0.8,
            weightUnit: 'kg',
            shipperName: 'Carol Davis',
            shipperCompany: 'Fast Track Shipping',
            shipperCountry: 'USA',
            shipperAddress: '555 Commerce Blvd',
            shipperProvince: 'Florida',
            shipperPostalCode: '33101',
            shipperEmail: 'carol@fasttrack.com',
            shipperPhoneNumber: '+1-555-0102',
            consigneeName: 'Bob Johnson',
            consigneeCompany: 'Tablet Plus',
            consigneeCountry: 'USA',
            consigneeAddress: '999 Technology Drive',
            consigneeProvince: 'Florida',
            consigneePostalCode: '33102',
            consigneeEmail: 'bob@tabletplus.com',
            consigneePhoneNumber: '+1-555-0125',
            status: 'delivered',
            loadNumber: 'LD003',
            wordpressOrderNumber: 'WP12347',
            boxDimensionL: 30,
            boxDimensionW: 20,
            boxDimensionH: 5,
            datePickedUp: '2025-07-10',
            dateDelivered: '2025-07-12',
            deliveryInstructions: 'Signature required'
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
          ...this.createDefaultOrder(),
          ...orderData,
          id: this.generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        this.orders.push(newOrder)
        resolve(newOrder)
      })
    },

    // Add a new order with default values
    addOrder() {
      return this.createOrder(this.createDefaultOrder())
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
    searchOrders(query, fields = ['customerName', 'customerCompany', 'itemDescription', 'status', 'shipperName', 'consigneeName', 'loadNumber', 'wordpressOrderNumber']) {
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