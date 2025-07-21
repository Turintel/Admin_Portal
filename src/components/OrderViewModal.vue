<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>Order Details</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>
      
      <div class="modal-content">
        <div class="order-sections">
          
          <!-- Order Summary -->
          <div class="order-summary">
            <div class="summary-card">
              <div class="summary-item">
                <span class="summary-label">Order ID</span>
                <span class="summary-value order-id">{{ order.id }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Status</span>
                <span :class="getStatusClass(order.status)" class="status-badge">
                  {{ formatStatus(order.status) }}
                </span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Created</span>
                <span class="summary-value">{{ formatDate(order.createdAt) }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Updated</span>
                <span class="summary-value">{{ formatDate(order.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Shipper Details Section -->
          <div class="detail-section">
            <h3 class="section-title">Shipper Details</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Name</span>
                <span class="detail-value">{{ order.shipperName || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Company</span>
                <span class="detail-value">{{ order.shipperCompany || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Country</span>
                <span class="detail-value">{{ order.shipperCountry || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Province</span>
                <span class="detail-value">{{ order.shipperProvince || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Postal Code</span>
                <span class="detail-value">{{ order.shipperPostalCode || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ order.shipperEmail || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">{{ order.shipperPhoneNumber || '-' }}</span>
              </div>
            </div>
            <div class="detail-item full-width" v-if="order.shipperAddress">
              <span class="detail-label">Address</span>
              <span class="detail-value">{{ order.shipperAddress }}</span>
            </div>
          </div>

          <!-- Consignee Details Section -->
          <div class="detail-section">
            <h3 class="section-title">Consignee Details</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Name</span>
                <span class="detail-value">{{ order.consigneeName || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Company</span>
                <span class="detail-value">{{ order.consigneeCompany || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Country</span>
                <span class="detail-value">{{ order.consigneeCountry || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Province</span>
                <span class="detail-value">{{ order.consigneeProvince || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Postal Code</span>
                <span class="detail-value">{{ order.consigneePostalCode || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ order.consigneeEmail || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">{{ order.consigneePhoneNumber || '-' }}</span>
              </div>
            </div>
            <div class="detail-item full-width" v-if="order.consigneeAddress">
              <span class="detail-label">Address</span>
              <span class="detail-value">{{ order.consigneeAddress }}</span>
            </div>
          </div>

          <!-- Customer Details Section -->
          <div class="detail-section">
            <h3 class="section-title">Customer Details</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Name</span>
                <span class="detail-value">{{ order.customerName || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Company</span>
                <span class="detail-value">{{ order.customerCompany || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Contact No</span>
                <span class="detail-value">{{ order.customerContactNo || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ order.customerEmail || '-' }}</span>
              </div>
            </div>
          </div>

          <!-- Item & Package Details Section -->
          <div class="detail-section">
            <h3 class="section-title">Item & Package Details</h3>
            <div class="detail-item full-width" v-if="order.itemDescription">
              <span class="detail-label">Description</span>
              <span class="detail-value">{{ order.itemDescription }}</span>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Value</span>
                <span class="detail-value value">${{ formatCurrency(order.itemValue) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Quantity</span>
                <span class="detail-value">{{ order.itemQuantity || 0 }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Weight</span>
                <span class="detail-value">{{ order.weight || 0 }} {{ order.weightUnit || 'kg' }}</span>
              </div>
            </div>
            
            <div class="detail-subsection">
              <h4 class="subsection-title">Dimensions</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Length</span>
                  <span class="detail-value">{{ order.boxDimensionL || 0 }} cm</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Width</span>
                  <span class="detail-value">{{ order.boxDimensionW || 0 }} cm</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Height</span>
                  <span class="detail-value">{{ order.boxDimensionH || 0 }} cm</span>
                </div>
              </div>
            </div>

            <div class="detail-subsection">
              <h4 class="subsection-title">Package Properties</h4>
              <div class="properties-grid">
                <div class="property-item">
                  <span class="property-icon" :class="{ active: order.containsFragile }">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span class="property-label">Contains Fragile</span>
                  <span class="property-status" :class="{ active: order.containsFragile }">
                    {{ order.containsFragile ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div class="property-item">
                  <span class="property-icon" :class="{ active: order.containsLiquids }">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8.5a.5.5 0 00-.5-.5H9a1 1 0 00-1 1v3a1 1 0 001 1h2.5a.5.5 0 00.5-.5v-4z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span class="property-label">Contains Liquids</span>
                  <span class="property-status" :class="{ active: order.containsLiquids }">
                    {{ order.containsLiquids ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div class="property-item">
                  <span class="property-icon" :class="{ active: order.insuranceAdded }">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span class="property-label">Insurance Added</span>
                  <span class="property-status" :class="{ active: order.insuranceAdded }">
                    {{ order.insuranceAdded ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order & Instructions Section -->
          <div class="detail-section">
            <h3 class="section-title">Order & Instructions</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Load Number</span>
                <span class="detail-value">{{ order.loadNumber || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">WordPress Order Number</span>
                <span class="detail-value">{{ order.wordpressOrderNumber || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Date Picked Up</span>
                <span class="detail-value">{{ formatDate(order.datePickedUp) || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Date Delivered</span>
                <span class="detail-value">{{ formatDate(order.dateDelivered) || '-' }}</span>
              </div>
            </div>
            
            <div class="instructions-section">
              <div class="detail-item full-width" v-if="order.pickupInstructions">
                <span class="detail-label">Pickup Instructions</span>
                <span class="detail-value">{{ order.pickupInstructions }}</span>
              </div>
              <div class="detail-item full-width" v-if="order.deliveryInstructions">
                <span class="detail-label">Delivery Instructions</span>
                <span class="detail-value">{{ order.deliveryInstructions }}</span>
              </div>
              <div class="detail-item full-width" v-if="order.sellerNotes">
                <span class="detail-label">Seller Notes</span>
                <span class="detail-value">{{ order.sellerNotes }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="modal-actions">
          <button @click="closeModal" class="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderViewModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    getStatusClass(status) {
      return `status-badge status-${status}`
    },
    
    formatStatus(status) {
      return status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'
    },
    
    formatDate(dateString) {
      if (!dateString) return '-'
      try {
        return new Date(dateString).toLocaleDateString()
      } catch {
        return '-'
      }
    },
    
    formatCurrency(value) {
      if (!value) return '0.00'
      return parseFloat(value).toFixed(2)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal {
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 20px 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #E2E8F0;
  background: #F8FAFC;
  border-radius: 12px 12px 0 0;
}

.modal-header h2 {
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #64748B;
  transition: color 0.15s ease-in-out;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #1E293B;
}

.modal-content {
  padding: 32px;
}

.order-summary {
  margin-bottom: 32px;
}

.summary-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
}

.order-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  color: #475569;
}

.detail-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #EF4444;
  display: inline-block;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  line-height: 1.4;
}

.detail-value.value {
  font-weight: 600;
  color: #059669;
}

.detail-subsection {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #F1F5F9;
}

.subsection-title {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 16px 0;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
}

.property-icon {
  width: 20px;
  height: 20px;
  color: #94A3B8;
  transition: color 0.15s ease-in-out;
}

.property-icon.active {
  color: #EF4444;
}

.property-label {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  flex: 1;
}

.property-status {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-status.active {
  color: #059669;
}

.instructions-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  width: fit-content;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #E2E8F0;
}

.btn {
  font-family: 'Manrope', sans-serif;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.15s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary {
  background-color: #6B7280;
  color: #FFFFFF;
}

.btn-secondary:hover {
  background-color: #4B5563;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.2);
}

@media (max-width: 768px) {
  .modal {
    margin: 10px;
    max-width: calc(100vw - 20px);
  }
  
  .modal-header,
  .modal-content {
    padding: 20px;
  }
  
  .summary-card,
  .detail-grid,
  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>