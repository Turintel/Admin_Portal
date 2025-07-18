<template>
  <div class="orders-table-container">
    <table class="orders-table">
      <thead>
        <tr>
          <th @click="sortBy('id')" class="sortable">
            Order ID
            <span class="sort-icon" :class="getSortIcon('id')">↕</span>
          </th>
          <th @click="sortBy('customerName')" class="sortable">
            Customer Name
            <span class="sort-icon" :class="getSortIcon('customerName')">↕</span>
          </th>
          <th @click="sortBy('customerCompany')" class="sortable">
            Customer Company
            <span class="sort-icon" :class="getSortIcon('customerCompany')">↕</span>
          </th>
          <th @click="sortBy('itemDescription')" class="sortable">
            Item Description
            <span class="sort-icon" :class="getSortIcon('itemDescription')">↕</span>
          </th>
          <th @click="sortBy('itemQuantity')" class="sortable">
            Quantity
            <span class="sort-icon" :class="getSortIcon('itemQuantity')">↕</span>
          </th>
          <th @click="sortBy('itemValue')" class="sortable">
            Value
            <span class="sort-icon" :class="getSortIcon('itemValue')">↕</span>
          </th>
          <th @click="sortBy('weight')" class="sortable">
            Weight
            <span class="sort-icon" :class="getSortIcon('weight')">↕</span>
          </th>
          <th @click="sortBy('shipperCompany')" class="sortable">
            Shipper Company
            <span class="sort-icon" :class="getSortIcon('shipperCompany')">↕</span>
          </th>
          <th @click="sortBy('status')" class="sortable">
            Status
            <span class="sort-icon" :class="getSortIcon('status')">↕</span>
          </th>
          <th @click="sortBy('createdAt')" class="sortable">
            Created At
            <span class="sort-icon" :class="getSortIcon('createdAt')">↕</span>
          </th>
          <th class="actions-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sortedOrders" :key="order.id" class="table-row">
          <td class="order-id">{{ order.id }}</td>
          <td class="customer-name">{{ order.customerName }}</td>
          <td class="customer-company">{{ order.customerCompany || '-' }}</td>
          <td class="item-description">
            <div class="item-desc-content">{{ truncateText(order.itemDescription, 50) }}</div>
          </td>
          <td class="quantity">{{ order.itemQuantity }}</td>
          <td class="value">${{ formatCurrency(order.itemValue) }}</td>
          <td class="weight">{{ order.weight }} {{ order.weightUnit }}</td>
          <td class="shipper-company">{{ order.shipperCompany || '-' }}</td>
          <td class="status">
            <span :class="getStatusClass(order.status)">
              {{ formatStatus(order.status) }}
            </span>
          </td>
          <td class="created-at">{{ formatDate(order.createdAt) }}</td>
          <td class="actions">
            <button @click="$emit('view-order', order)" class="btn btn-sm btn-view" title="View Order">
              VIEW
            </button>
            <button @click="$emit('edit-order', order)" class="btn btn-sm btn-edit" title="Edit Order">
              EDIT
            </button>
            <button 
              v-if="canCancelOrder(order.status)"
              @click="$emit('cancel-order', order)" 
              class="btn btn-sm btn-cancel" 
              title="Cancel Order"
            >
              CANCEL
            </button>
            <button @click="$emit('delete-order', order)" class="btn btn-sm btn-delete" title="Delete Order">
              DELETE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="orders.length === 0" class="no-orders">
      <div class="no-orders-content">
        <svg class="no-orders-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3>No orders found</h3>
        <p>There are no orders to display. Create a new order to get started.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersTable',
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  emits: ['edit-order', 'view-order', 'cancel-order', 'delete-order'],
  data() {
    return {
      sortColumn: 'createdAt',
      sortDirection: 'desc'
    }
  },
  computed: {
    sortedOrders() {
      const sorted = [...this.orders].sort((a, b) => {
        let aValue = a[this.sortColumn]
        let bValue = b[this.sortColumn]
        
        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (this.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
      return sorted
    }
  },
  methods: {
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortDirection = 'asc'
      }
    },
    
    getSortIcon(column) {
      if (this.sortColumn === column) {
        return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc'
      }
      return ''
    },
    
    getStatusClass(status) {
      return `status-badge status-${status}`
    },
    
    formatStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1)
    },
    
    formatDate(dateString) {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString()
    },
    
    formatCurrency(value) {
      if (!value) return '0.00'
      return parseFloat(value).toFixed(2)
    },
    
    truncateText(text, length = 50) {
      if (!text) return '-'
      return text.length > length ? text.substring(0, length) + '...' : text
    },
    
    canCancelOrder(status) {
      return status !== 'cancelled' && status !== 'delivered'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.orders-table-container {
  font-family: 'Manrope', sans-serif;
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  background: #FFFFFF;
}

.orders-table th,
.orders-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
  font-family: 'Manrope', sans-serif;
}

.orders-table th {
  background-color: #F8FAFC;
  font-weight: 600;
  color: #1E293B;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.orders-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease-in-out;
}

.orders-table th.sortable:hover {
  background-color: #F1F5F9;
}

.sort-icon {
  margin-left: 6px;
  font-size: 12px;
  color: #94A3B8;
  transition: color 0.15s ease-in-out;
}

.sort-icon.sort-asc {
  color: #EF4444;
}

.sort-icon.sort-asc::after {
  content: '↑';
}

.sort-icon.sort-desc {
  color: #EF4444;
}

.sort-icon.sort-desc::after {
  content: '↓';
}

.table-row {
  transition: background-color 0.15s ease-in-out;
}

.table-row:hover {
  background-color: #F8FAFC;
}

.order-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: #64748B;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.customer-name {
  font-weight: 500;
  color: #1E293B;
}

.customer-company {
  color: #475569;
  font-size: 14px;
}

.item-desc-content {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #475569;
  font-size: 14px;
}

.quantity {
  text-align: center;
  font-weight: 500;
  color: #1E293B;
}

.value {
  font-weight: 600;
  color: #059669;
  text-align: right;
}

.weight {
  color: #475569;
  font-size: 14px;
}

.shipper-company {
  color: #475569;
  font-size: 14px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background-color: #FEF3C7;
  color: #92400E;
}

.status-processing {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.status-shipped {
  background-color: #D1FAE5;
  color: #065F46;
}

.status-delivered {
  background-color: #D1FAE5;
  color: #064E3B;
}

.status-cancelled {
  background-color: #FEE2E2;
  color: #991B1B;
}

.created-at {
  color: #64748B;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.actions-header {
  text-align: center;
}

.btn {
  font-family: 'Manrope', sans-serif;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.btn-view {
  background-color: #3B82F6;
  color: #FFFFFF;
}

.btn-view:hover {
  background-color: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-edit {
  background-color: #3B82F6;
  color: #FFFFFF;
}

.btn-edit:hover {
  background-color: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-cancel {
  background-color: #F59E0B;
  color: #FFFFFF;
}

.btn-cancel:hover {
  background-color: #D97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.btn-delete {
  background-color: #DC2626;
  color: #FFFFFF;
}

.btn-delete:hover {
  background-color: #B91C1C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.no-orders {
  padding: 80px 20px;
  text-align: center;
  background: #FFFFFF;
}

.no-orders-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-orders-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  color: #94A3B8;
}

.no-orders h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 12px;
}

.no-orders p {
  font-family: 'Manrope', sans-serif;
  color: #64748B;
  font-size: 16px;
  margin: 0;
}
</style>