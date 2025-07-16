<template>
  <div class="orders-container">
    <header class="orders-header">
      <h1>Orders</h1>
      <div class="header-actions">
        <button class="btn btn-primary" @click="openCreateModal">
          <i class="icon-plus"></i> Create New Order
        </button>
      </div>
    </header>

    <div class="orders-filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search orders..."
          class="search-input"
        />
        <i class="icon-search"></i>
      </div>
    </div>

    <div class="orders-table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th @click="sort('orderNumber')" class="sortable">
              Order Number
              <SortIcon :field="'orderNumber'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th @click="sort('customerName')" class="sortable">
              Customer
              <SortIcon :field="'customerName'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th @click="sort('orderDate')" class="sortable">
              Order Date
              <SortIcon :field="'orderDate'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th @click="sort('status')" class="sortable">
              Status
              <SortIcon :field="'status'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th @click="sort('carrier')" class="sortable">
              Carrier
              <SortIcon :field="'carrier'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th @click="sort('totalCost')" class="sortable">
              Total Cost
              <SortIcon :field="'totalCost'" :currentSort="sortBy" :order="sortOrder" />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="order in filteredOrders" 
            :key="order.id"
            :class="{ 'cancelled-row': order.status === 'Cancelled' }"
          >
            <td>{{ order.orderNumber }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ formatDate(order.orderDate) }}</td>
            <td>
              <span :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>{{ order.carrier }}</td>
            <td>${{ order.totalCost.toFixed(2) }}</td>
            <td class="actions">
              <button 
                class="btn btn-sm btn-secondary" 
                @click="editOrder(order)"
                title="Edit"
              >
                <i class="icon-edit"></i>
              </button>
              <button 
                class="btn btn-sm btn-warning" 
                @click="cancelOrder(order)"
                :disabled="order.status === 'Cancelled'"
                title="Cancel"
              >
                <i class="icon-cancel"></i>
              </button>
              <button 
                class="btn btn-sm btn-danger" 
                @click="deleteOrder(order)"
                title="Delete"
              >
                <i class="icon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Modal -->
    <EditOrderModal 
      :isOpen="isEditModalOpen" 
      :order="selectedOrder"
      @close="closeEditModal"
      @save="saveOrder"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal 
      :isOpen="isDeleteModalOpen"
      :order="selectedOrder"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <!-- Cancel Confirmation Modal -->
    <CancelConfirmationModal 
      :isOpen="isCancelModalOpen"
      :order="selectedOrder"
      @close="closeCancelModal"
      @confirm="confirmCancel"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SortIcon from './SortIcon.vue'
import EditOrderModal from './EditOrderModal.vue'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'
import CancelConfirmationModal from './CancelConfirmationModal.vue'

export default {
  name: 'OrdersComponent',
  components: {
    SortIcon,
    EditOrderModal,
    DeleteConfirmationModal,
    CancelConfirmationModal
  },
  setup() {
    const store = useStore()
    
    const searchQuery = computed({
      get: () => store.state.searchQuery,
      set: (value) => store.dispatch('setSearchQuery', value)
    })
    
    const filteredOrders = computed(() => store.getters.filteredOrders)
    const sortBy = computed(() => store.state.sortBy)
    const sortOrder = computed(() => store.state.sortOrder)
    const selectedOrder = computed(() => store.state.selectedOrder)
    const isEditModalOpen = computed(() => store.state.isEditModalOpen)
    const isDeleteModalOpen = computed(() => store.state.isDeleteModalOpen)
    const isCancelModalOpen = computed(() => store.state.isCancelModalOpen)
    
    const sort = (field) => {
      const newOrder = sortBy.value === field && sortOrder.value === 'asc' ? 'desc' : 'asc'
      store.dispatch('setSort', { by: field, order: newOrder })
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }
    
    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'status-delivered'
        case 'in transit':
          return 'status-in-transit'
        case 'cancelled':
          return 'status-cancelled'
        case 'pending':
          return 'status-pending'
        default:
          return 'status-default'
      }
    }
    
    const openCreateModal = () => {
      store.dispatch('openEditModal', null)
    }
    
    const editOrder = (order) => {
      store.dispatch('openEditModal', order)
    }
    
    const cancelOrder = (order) => {
      store.dispatch('openCancelModal', order)
    }
    
    const deleteOrder = (order) => {
      store.dispatch('openDeleteModal', order)
    }
    
    const closeEditModal = () => {
      store.dispatch('closeEditModal')
    }
    
    const closeDeleteModal = () => {
      store.dispatch('closeDeleteModal')
    }
    
    const closeCancelModal = () => {
      store.dispatch('closeCancelModal')
    }
    
    const saveOrder = (order) => {
      if (order.id) {
        store.dispatch('updateOrder', order)
      } else {
        store.dispatch('createOrder', order)
      }
      closeEditModal()
    }
    
    const confirmDelete = () => {
      store.dispatch('deleteOrder', selectedOrder.value.id)
      closeDeleteModal()
    }
    
    const confirmCancel = () => {
      store.dispatch('cancelOrder', selectedOrder.value.id)
      closeCancelModal()
    }
    
    return {
      searchQuery,
      filteredOrders,
      sortBy,
      sortOrder,
      selectedOrder,
      isEditModalOpen,
      isDeleteModalOpen,
      isCancelModalOpen,
      sort,
      formatDate,
      getStatusClass,
      openCreateModal,
      editOrder,
      cancelOrder,
      deleteOrder,
      closeEditModal,
      closeDeleteModal,
      closeCancelModal,
      saveOrder,
      confirmDelete,
      confirmCancel
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.orders-container {
  font-family: 'Manrope', sans-serif;
  padding: 24px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.orders-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-warning:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.orders-filters {
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.icon-search {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.orders-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  background-color: #f8f9fa;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
}

.orders-table th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.orders-table th.sortable:hover {
  background-color: #e9ecef;
}

.orders-table td {
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
}

.orders-table tr:hover {
  background-color: #f8f9fa;
}

.cancelled-row {
  background-color: #ffeaea !important;
}

.cancelled-row:hover {
  background-color: #ffe0e0 !important;
}

.actions {
  display: flex;
  gap: 8px;
}

.status-delivered {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-in-transit {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-default {
  background-color: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* Simple icon replacements */
.icon-plus::before { content: '+ '; }
.icon-edit::before { content: '✏️ '; }
.icon-cancel::before { content: '❌ '; }
.icon-trash::before { content: '🗑️ '; }
.icon-search::before { content: '🔍'; }
</style>