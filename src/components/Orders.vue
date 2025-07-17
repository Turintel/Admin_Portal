<template>
  <div class="orders-container">
    <div class="orders-header">
      <h1>Orders Management</h1>
      <button @click="showCreateModal = true" class="btn btn-primary">
        Create New Order
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search orders by customer name, product, or status..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Orders Table -->
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
            <th @click="sortBy('product')" class="sortable">
              Product
              <span class="sort-icon" :class="getSortIcon('product')">↕</span>
            </th>
            <th @click="sortBy('quantity')" class="sortable">
              Quantity
              <span class="sort-icon" :class="getSortIcon('quantity')">↕</span>
            </th>
            <th @click="sortBy('price')" class="sortable">
              Price
              <span class="sort-icon" :class="getSortIcon('price')">↕</span>
            </th>
            <th @click="sortBy('status')" class="sortable">
              Status
              <span class="sort-icon" :class="getSortIcon('status')">↕</span>
            </th>
            <th @click="sortBy('createdAt')" class="sortable">
              Created At
              <span class="sort-icon" :class="getSortIcon('createdAt')">↕</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.quantity }}</td>
            <td>${{ order.price }}</td>
            <td>
              <span :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td class="actions">
              <button @click="editOrder(order)" class="btn btn-sm btn-edit">
                Edit
              </button>
              <button @click="deleteOrder(order.id)" class="btn btn-sm btn-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredOrders.length === 0" class="no-orders">
        <p>No orders found.</p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ showCreateModal ? 'Create New Order' : 'Edit Order' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="submitOrder" class="modal-form">
          <div class="form-group">
            <label for="customerName">Customer Name:</label>
            <input
              id="customerName"
              v-model="currentOrder.customerName"
              type="text"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="product">Product:</label>
            <input
              id="product"
              v-model="currentOrder.product"
              type="text"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input
              id="quantity"
              v-model="currentOrder.quantity"
              type="number"
              min="1"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              id="price"
              v-model="currentOrder.price"
              type="number"
              step="0.01"
              min="0"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select
              id="status"
              v-model="currentOrder.status"
              required
              class="form-input"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              {{ showCreateModal ? 'Create Order' : 'Update Order' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ordersDatabase } from '../utils/database.js';

export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      filteredOrders: [],
      searchQuery: '',
      showCreateModal: false,
      showEditModal: false,
      currentOrder: {
        customerName: '',
        product: '',
        quantity: 1,
        price: 0,
        status: 'pending'
      },
      editingOrderId: null,
      sortColumn: 'id',
      sortDirection: 'asc'
    };
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        this.orders = await ordersDatabase.getAllOrders();
        this.filteredOrders = [...this.orders];
        this.applySorting();
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    
    async handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.filteredOrders = [...this.orders];
      } else {
        try {
          this.filteredOrders = await ordersDatabase.searchOrders(this.searchQuery);
        } catch (error) {
          console.error('Error searching orders:', error);
        }
      }
      this.applySorting();
    },
    
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      this.applySorting();
    },
    
    applySorting() {
      this.filteredOrders.sort((a, b) => {
        let aValue = a[this.sortColumn];
        let bValue = b[this.sortColumn];
        
        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (this.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
    
    getSortIcon(column) {
      if (this.sortColumn === column) {
        return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
      }
      return '';
    },
    
    editOrder(order) {
      this.currentOrder = { ...order };
      this.editingOrderId = order.id;
      this.showEditModal = true;
    },
    
    async deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?')) {
        try {
          await ordersDatabase.deleteOrder(orderId);
          await this.loadOrders();
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      }
    },
    
    async submitOrder() {
      try {
        if (this.showCreateModal) {
          await ordersDatabase.createOrder(this.currentOrder);
        } else {
          await ordersDatabase.updateOrder(this.editingOrderId, this.currentOrder);
        }
        await this.loadOrders();
        this.closeModal();
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    },
    
    closeModal() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.currentOrder = {
        customerName: '',
        product: '',
        quantity: 1,
        price: 0,
        status: 'pending'
      };
      this.editingOrderId = null;
    },
    
    getStatusClass(status) {
      return `status-${status}`;
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.orders-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.orders-header h1 {
  color: #333;
  margin: 0;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.orders-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.orders-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.orders-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.orders-table th.sortable:hover {
  background-color: #e9ecef;
}

.sort-icon {
  margin-left: 5px;
  font-size: 12px;
}

.sort-icon.sort-asc::after {
  content: '↑';
}

.sort-icon.sort-desc::after {
  content: '↓';
}

.orders-table tbody tr:hover {
  background-color: #f8f9fa;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-processing {
  background-color: #cce5ff;
  color: #004085;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-shipped {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-delivered {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-cancelled {
  background-color: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
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

.btn-edit {
  background-color: #28a745;
  color: white;
}

.btn-edit:hover {
  background-color: #1e7e34;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.no-orders {
  text-align: center;
  padding: 40px;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.modal-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>