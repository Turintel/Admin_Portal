<template>
  <div class="archived-orders-view">
    <!-- Navigation Section -->
    <div class="navigation-container">
      <div class="navigation-content">
        <h1 class="page-title">Archived Orders</h1>
        <div class="navigation-tabs">
          <button @click="$emit('switch-to-active')" class="nav-tab">
            Active Orders
          </button>
          <button class="nav-tab active">
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
            placeholder="Search archived orders by customer name, product, or status..."
            class="search-input"
          />
        </div>
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
  name: 'ArchivedOrders',
  components: {
    OrdersTable,
    OrderEditModal,
    OrderViewModal,
    ConfirmationModal
  },
  emits: ['switch-to-active'],
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
      archivedStatuses: ['delivered', 'cancelled', 'completed']
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
        // Filter for archived orders only
        this.orders = allOrders.filter(order => 
          this.archivedStatuses.includes(order.status.toLowerCase())
        )
        this.filteredOrders = [...this.orders]
      } catch (error) {
        console.error('Error loading archived orders:', error)
      }
    },
    
    async handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.filteredOrders = [...this.orders]
      } else {
        try {
          const searchResults = await this.ordersStore.searchOrders(this.searchQuery)
          // Filter search results for archived orders only
          this.filteredOrders = searchResults.filter(order => 
            this.archivedStatuses.includes(order.status.toLowerCase())
          )
        } catch (error) {
          console.error('Error searching archived orders:', error)
        }
      }
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

.archived-orders-view {
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
}

.search-bar {
  width: 100%;
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

.table-container {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}
</style>