<template>
  <div class="active-orders-view">
    <!-- Navigation Section -->
    <div class="navigation-container">
      <div class="navigation-content">
        <h1 class="page-title">Active Orders</h1>
        <div class="navigation-tabs">
          <button class="nav-tab active">
            Active Orders
          </button>
          <button @click="$emit('switch-to-archived')" class="nav-tab">
            Archived Orders
          </button>
        </div>
      </div>
      
      <!-- Search Section -->
      <div class="search-section">
        <div class="search-bar">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search active orders by customer name, product, or status..."
            class="search-input"
          />
        </div>
        <button @click="createNewOrder" class="create-order-btn">
          <span class="create-order-icon">+</span>
          Create Order
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="table-container">
      <OrdersTable 
        :orders="filteredOrders"
        @edit-order="editOrder"
        @view-order="viewOrder"
        @cancel-order="cancelOrder"
        @delete-order="deleteOrder"
      />
    </div>

    <!-- Create/Edit Modal -->
    <OrderEditModal
      v-if="showCreateModal || showEditModal"
      :show="showCreateModal || showEditModal"
      :order="currentOrder"
      :is-editing="showEditModal"
      @save="saveOrder"
      @cancel="closeModals"
    />

    <!-- View Modal -->
    <OrderViewModal
      v-if="showViewModal"
      :show="showViewModal"
      :order="selectedOrder"
      @close="closeModals"
    />

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-if="showConfirmationModal"
      :show="showConfirmationModal"
      :type="confirmationType"
      :message="confirmationMessage"
      @confirm="handleConfirmation"
      @cancel="closeConfirmation"
    />
  </div>
</template>

<script>
import { useOrdersStore } from '../stores/orders.js'
import OrdersTable from './OrdersTable.vue'
import OrderEditModal from './OrderEditModal.vue'
import OrderViewModal from './OrderViewModal.vue'
import ConfirmationModal from './ConfirmationModal.vue'

export default {
  name: 'ActiveOrders',
  components: {
    OrdersTable,
    OrderEditModal,
    OrderViewModal,
    ConfirmationModal
  },
  emits: ['switch-to-archived'],
  data() {
    return {
      orders: [],
      filteredOrders: [],
      searchQuery: '',
      showCreateModal: false,
      showEditModal: false,
      showViewModal: false,
      showConfirmationModal: false,
      currentOrder: null,
      selectedOrder: null,
      editingOrderId: null,
      confirmationType: '',
      confirmationMessage: '',
      pendingAction: null,
      activeStatuses: ['pending', 'processing', 'shipped']
    }
  },
  setup() {
    const ordersStore = useOrdersStore()
    return { ordersStore }
  },
  mounted() {
    // Initialize sample data if needed
    this.ordersStore.initializeSampleData()
    this.loadOrders()
  },
  methods: {
    async loadOrders() {
      try {
        const allOrders = await this.ordersStore.getAllOrdersAsync()
        // Filter for active orders only
        this.orders = allOrders.filter(order => 
          this.activeStatuses.includes(order.status.toLowerCase())
        )
        this.filteredOrders = [...this.orders]
      } catch (error) {
        console.error('Error loading active orders:', error)
      }
    },
    
    async handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.filteredOrders = [...this.orders]
      } else {
        try {
          const searchResults = await this.ordersStore.searchOrders(this.searchQuery)
          // Filter search results for active orders only
          this.filteredOrders = searchResults.filter(order => 
            this.activeStatuses.includes(order.status.toLowerCase())
          )
        } catch (error) {
          console.error('Error searching active orders:', error)
        }
      }
    },
    
    createNewOrder() {
      this.currentOrder = null
      this.showCreateModal = true
    },
    
    editOrder(order) {
      this.currentOrder = { ...order }
      this.editingOrderId = order.id
      this.showEditModal = true
    },
    
    viewOrder(order) {
      this.selectedOrder = order
      this.showViewModal = true
    },
    
    cancelOrder(order) {
      this.confirmationType = 'cancel'
      this.confirmationMessage = `Are you sure you want to cancel order for ${order.customerName}?`
      this.pendingAction = () => this.performCancelOrder(order.id)
      this.showConfirmationModal = true
    },
    
    deleteOrder(order) {
      this.confirmationType = 'delete'
      this.confirmationMessage = `Are you sure you want to delete this order? This action cannot be undone.`
      this.pendingAction = () => this.performDeleteOrder(order.id)
      this.showConfirmationModal = true
    },
    
    async performCancelOrder(orderId) {
      try {
        await this.ordersStore.updateOrder(orderId, { status: 'cancelled' })
        await this.loadOrders()
        this.handleSearch()
      } catch (error) {
        console.error('Error cancelling order:', error)
      }
    },
    
    async performDeleteOrder(orderId) {
      try {
        await this.ordersStore.deleteOrder(orderId)
        await this.loadOrders()
        this.handleSearch()
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    },
    
    async saveOrder(orderData) {
      try {
        if (this.showCreateModal) {
          await this.ordersStore.createOrder(orderData)
        } else {
          await this.ordersStore.updateOrder(this.editingOrderId, orderData)
        }
        await this.loadOrders()
        this.handleSearch()
        this.closeModals()
      } catch (error) {
        console.error('Error saving order:', error)
      }
    },
    
    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.showViewModal = false
      this.currentOrder = null
      this.selectedOrder = null
      this.editingOrderId = null
    },
    
    closeConfirmation() {
      this.showConfirmationModal = false
      this.confirmationType = ''
      this.confirmationMessage = ''
      this.pendingAction = null
    },
    
    handleConfirmation() {
      if (this.pendingAction) {
        this.pendingAction()
      }
      this.closeConfirmation()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.active-orders-view {
  font-family: 'Manrope', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F8FAFC;
  min-height: 100vh;
}

.navigation-container {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-bottom: 24px;
}

.navigation-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.navigation-tabs {
  display: flex;
  gap: 12px;
}

.nav-tab {
  font-family: 'Manrope', sans-serif;
  padding: 12px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.15s ease-in-out;
  background-color: #FFFFFF;
  color: #475569;
}

.nav-tab:hover {
  background-color: #F1F5F9;
  border-color: #CBD5E1;
}

.nav-tab.active {
  background-color: #EF4444;
  color: #FFFFFF;
  border-color: #EF4444;
}

.search-section {
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-bar {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  color: #1E293B;
  background-color: #FFFFFF;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.search-input::placeholder {
  color: #475569;
}

.create-order-btn {
  font-family: 'Manrope', sans-serif;
  background-color: #EF4444;
  color: #FFFFFF;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.15s ease-in-out;
  font-size: 14px;
  white-space: nowrap;
}

.create-order-btn:hover {
  background-color: #DC2626;
  transform: translateY(-1px);
  box-shadow: 0 6px 10px -1px rgba(0, 0, 0, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.create-order-icon {
  font-size: 16px;
  font-weight: bold;
}

.table-container {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}
</style>