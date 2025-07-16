import { createStore } from 'vuex'

// Mock order data with all required fields
const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1-555-0123',
    customerAddress: '123 Main St',
    customerCity: 'New York',
    customerState: 'NY',
    customerZip: '10001',
    customerCountry: 'USA',
    shipToName: 'John Doe',
    shipToAddress: '123 Main St',
    shipToCity: 'New York',
    shipToState: 'NY',
    shipToZip: '10001',
    shipToCountry: 'USA',
    billToName: 'John Doe',
    billToAddress: '123 Main St',
    billToCity: 'New York',
    billToState: 'NY',
    billToZip: '10001',
    billToCountry: 'USA',
    packageWeight: 2.5,
    packageLength: 10,
    packageWidth: 8,
    packageHeight: 6,
    packageDimensions: '10 x 8 x 6',
    serviceType: 'Ground',
    shippingCost: 15.99,
    totalCost: 115.99,
    orderDate: '2024-01-15',
    shipDate: '2024-01-16',
    deliveryDate: '2024-01-20',
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    status: 'Delivered',
    priority: 'Standard',
    specialInstructions: 'Handle with care',
    insuranceValue: 100.00,
    signature: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1-555-0456',
    customerAddress: '456 Oak Ave',
    customerCity: 'Los Angeles',
    customerState: 'CA',
    customerZip: '90210',
    customerCountry: 'USA',
    shipToName: 'Jane Smith',
    shipToAddress: '456 Oak Ave',
    shipToCity: 'Los Angeles',
    shipToState: 'CA',
    shipToZip: '90210',
    shipToCountry: 'USA',
    billToName: 'Jane Smith',
    billToAddress: '456 Oak Ave',
    billToCity: 'Los Angeles',
    billToState: 'CA',
    billToZip: '90210',
    billToCountry: 'USA',
    packageWeight: 1.2,
    packageLength: 8,
    packageWidth: 6,
    packageHeight: 4,
    packageDimensions: '8 x 6 x 4',
    serviceType: 'Express',
    shippingCost: 25.99,
    totalCost: 75.99,
    orderDate: '2024-01-16',
    shipDate: '2024-01-17',
    deliveryDate: '2024-01-18',
    trackingNumber: 'TRK987654321',
    carrier: 'UPS',
    status: 'In Transit',
    priority: 'High',
    specialInstructions: 'Leave at door',
    insuranceValue: 50.00,
    signature: true,
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-17T11:45:00Z'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerPhone: '+1-555-0789',
    customerAddress: '789 Pine Rd',
    customerCity: 'Chicago',
    customerState: 'IL',
    customerZip: '60601',
    customerCountry: 'USA',
    shipToName: 'Bob Johnson',
    shipToAddress: '789 Pine Rd',
    shipToCity: 'Chicago',
    shipToState: 'IL',
    shipToZip: '60601',
    shipToCountry: 'USA',
    billToName: 'Bob Johnson',
    billToAddress: '789 Pine Rd',
    billToCity: 'Chicago',
    billToState: 'IL',
    billToZip: '60601',
    billToCountry: 'USA',
    packageWeight: 3.8,
    packageLength: 12,
    packageWidth: 10,
    packageHeight: 8,
    packageDimensions: '12 x 10 x 8',
    serviceType: 'Ground',
    shippingCost: 18.99,
    totalCost: 128.99,
    orderDate: '2024-01-14',
    shipDate: '2024-01-15',
    deliveryDate: '2024-01-19',
    trackingNumber: 'TRK456789123',
    carrier: 'USPS',
    status: 'Cancelled',
    priority: 'Low',
    specialInstructions: 'Customer cancelled',
    insuranceValue: 110.00,
    signature: false,
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T16:30:00Z'
  }
]

const store = createStore({
  state: {
    orders: [...mockOrders],
    searchQuery: '',
    sortBy: 'orderNumber',
    sortOrder: 'asc',
    selectedOrder: null,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    isCancelModalOpen: false
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    ADD_ORDER(state, order) {
      const newOrder = {
        ...order,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      state.orders.push(newOrder)
    },
    UPDATE_ORDER(state, updatedOrder) {
      const index = state.orders.findIndex(order => order.id === updatedOrder.id)
      if (index !== -1) {
        state.orders[index] = {
          ...updatedOrder,
          updatedAt: new Date().toISOString()
        }
      }
    },
    DELETE_ORDER(state, orderId) {
      state.orders = state.orders.filter(order => order.id !== orderId)
    },
    CANCEL_ORDER(state, orderId) {
      const order = state.orders.find(order => order.id === orderId)
      if (order) {
        order.status = 'Cancelled'
        order.updatedAt = new Date().toISOString()
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    SET_SORT(state, { by, order }) {
      state.sortBy = by
      state.sortOrder = order
    },
    SET_SELECTED_ORDER(state, order) {
      state.selectedOrder = order
    },
    SET_EDIT_MODAL_OPEN(state, isOpen) {
      state.isEditModalOpen = isOpen
    },
    SET_DELETE_MODAL_OPEN(state, isOpen) {
      state.isDeleteModalOpen = isOpen
    },
    SET_CANCEL_MODAL_OPEN(state, isOpen) {
      state.isCancelModalOpen = isOpen
    }
  },
  actions: {
    createOrder({ commit }, order) {
      commit('ADD_ORDER', order)
    },
    updateOrder({ commit }, order) {
      commit('UPDATE_ORDER', order)
    },
    deleteOrder({ commit }, orderId) {
      commit('DELETE_ORDER', orderId)
    },
    cancelOrder({ commit }, orderId) {
      commit('CANCEL_ORDER', orderId)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },
    setSort({ commit }, sortConfig) {
      commit('SET_SORT', sortConfig)
    },
    openEditModal({ commit }, order) {
      commit('SET_SELECTED_ORDER', order)
      commit('SET_EDIT_MODAL_OPEN', true)
    },
    closeEditModal({ commit }) {
      commit('SET_EDIT_MODAL_OPEN', false)
      commit('SET_SELECTED_ORDER', null)
    },
    openDeleteModal({ commit }, order) {
      commit('SET_SELECTED_ORDER', order)
      commit('SET_DELETE_MODAL_OPEN', true)
    },
    closeDeleteModal({ commit }) {
      commit('SET_DELETE_MODAL_OPEN', false)
      commit('SET_SELECTED_ORDER', null)
    },
    openCancelModal({ commit }, order) {
      commit('SET_SELECTED_ORDER', order)
      commit('SET_CANCEL_MODAL_OPEN', true)
    },
    closeCancelModal({ commit }) {
      commit('SET_CANCEL_MODAL_OPEN', false)
      commit('SET_SELECTED_ORDER', null)
    }
  },
  getters: {
    filteredOrders: (state) => {
      let filtered = state.orders
      
      // Apply search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(order => 
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query) ||
          order.carrier.toLowerCase().includes(query)
        )
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[state.sortBy]
        const bValue = b[state.sortBy]
        
        let comparison = 0
        
        if (typeof aValue === 'string') {
          comparison = aValue.localeCompare(bValue)
        } else if (typeof aValue === 'number') {
          comparison = aValue - bValue
        } else if (aValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime()
        }
        
        return state.sortOrder === 'asc' ? comparison : -comparison
      })
      
      return filtered
    },
    orderById: (state) => (id) => {
      return state.orders.find(order => order.id === id)
    }
  }
})

export default store