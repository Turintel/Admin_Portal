<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Order' : 'Create New Load' }}</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>
      
      <form @submit.prevent="submitOrder" class="modal-form">
        <div class="form-sections">
          
          <!-- Shipper Details Section -->
          <div class="form-section">
            <h3 class="section-title">Shipper Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="shipperName">Shipper Name</label>
                <input
                  id="shipperName"
                  v-model="formData.shipperName"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperCompany">Shipper Company</label>
                <input
                  id="shipperCompany"
                  v-model="formData.shipperCompany"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperCountry">Shipper Country</label>
                <input
                  id="shipperCountry"
                  v-model="formData.shipperCountry"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperProvince">Shipper Province</label>
                <input
                  id="shipperProvince"
                  v-model="formData.shipperProvince"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperPostalCode">Shipper Postal Code</label>
                <input
                  id="shipperPostalCode"
                  v-model="formData.shipperPostalCode"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperEmail">Shipper Email</label>
                <input
                  id="shipperEmail"
                  v-model="formData.shipperEmail"
                  type="email"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="shipperPhoneNumber">Shipper Phone Number</label>
                <input
                  id="shipperPhoneNumber"
                  v-model="formData.shipperPhoneNumber"
                  type="text"
                  class="form-input"
                />
              </div>
            </div>
            <div class="form-group full-width">
              <label for="shipperAddress">Shipper Address</label>
              <textarea
                id="shipperAddress"
                v-model="formData.shipperAddress"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>
          </div>

          <!-- Consignee Details Section -->
          <div class="form-section">
            <h3 class="section-title">Consignee Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="consigneeName">Consignee Name</label>
                <input
                  id="consigneeName"
                  v-model="formData.consigneeName"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneeCompany">Consignee Company</label>
                <input
                  id="consigneeCompany"
                  v-model="formData.consigneeCompany"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneeCountry">Consignee Country</label>
                <input
                  id="consigneeCountry"
                  v-model="formData.consigneeCountry"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneeProvince">Consignee Province</label>
                <input
                  id="consigneeProvince"
                  v-model="formData.consigneeProvince"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneePostalCode">Consignee Postal Code</label>
                <input
                  id="consigneePostalCode"
                  v-model="formData.consigneePostalCode"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneeEmail">Consignee Email</label>
                <input
                  id="consigneeEmail"
                  v-model="formData.consigneeEmail"
                  type="email"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="consigneePhoneNumber">Consignee Phone Number</label>
                <input
                  id="consigneePhoneNumber"
                  v-model="formData.consigneePhoneNumber"
                  type="text"
                  class="form-input"
                />
              </div>
            </div>
            <div class="form-group full-width">
              <label for="consigneeAddress">Consignee Address</label>
              <textarea
                id="consigneeAddress"
                v-model="formData.consigneeAddress"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>
          </div>

          <!-- Customer Details Section -->
          <div class="form-section">
            <h3 class="section-title">Customer Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="customerName">Customer Name *</label>
                <input
                  id="customerName"
                  v-model="formData.customerName"
                  type="text"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="customerCompany">Customer Company</label>
                <input
                  id="customerCompany"
                  v-model="formData.customerCompany"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="customerContactNo">Customer Contact No</label>
                <input
                  id="customerContactNo"
                  v-model="formData.customerContactNo"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="customerEmail">Customer Email</label>
                <input
                  id="customerEmail"
                  v-model="formData.customerEmail"
                  type="email"
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <!-- Item & Package Details Section -->
          <div class="form-section">
            <h3 class="section-title">Item & Package Details</h3>
            <div class="form-group full-width">
              <label for="itemDescription">Item Description *</label>
              <textarea
                id="itemDescription"
                v-model="formData.itemDescription"
                rows="3"
                required
                class="form-textarea"
              ></textarea>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label for="itemValue">Item Value *</label>
                <input
                  id="itemValue"
                  v-model.number="formData.itemValue"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="itemQuantity">Item Quantity *</label>
                <input
                  id="itemQuantity"
                  v-model.number="formData.itemQuantity"
                  type="number"
                  min="1"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="weight">Weight</label>
                <input
                  id="weight"
                  v-model.number="formData.weight"
                  type="number"
                  step="0.1"
                  min="0"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="weightUnit">Weight Unit</label>
                <select
                  id="weightUnit"
                  v-model="formData.weightUnit"
                  class="form-input"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="g">g</option>
                  <option value="oz">oz</option>
                </select>
              </div>
              <div class="form-group">
                <label for="boxDimensionL">Box Length (cm)</label>
                <input
                  id="boxDimensionL"
                  v-model.number="formData.boxDimensionL"
                  type="number"
                  step="0.1"
                  min="0"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="boxDimensionW">Box Width (cm)</label>
                <input
                  id="boxDimensionW"
                  v-model.number="formData.boxDimensionW"
                  type="number"
                  step="0.1"
                  min="0"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="boxDimensionH">Box Height (cm)</label>
                <input
                  id="boxDimensionH"
                  v-model.number="formData.boxDimensionH"
                  type="number"
                  step="0.1"
                  min="0"
                  class="form-input"
                />
              </div>
            </div>
            <div class="form-checkboxes">
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="formData.containsFragile"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  Contains Fragile Items
                </label>
              </div>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="formData.containsLiquids"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  Contains Liquids
                </label>
              </div>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    v-model="formData.insuranceAdded"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  Insurance Added
                </label>
              </div>
            </div>
          </div>

          <!-- Order & Instructions Section -->
          <div class="form-section">
            <h3 class="section-title">Order & Instructions</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="loadNumber">Load Number</label>
                <input
                  id="loadNumber"
                  v-model="formData.loadNumber"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="wordpressOrderNumber">WordPress Order Number</label>
                <input
                  id="wordpressOrderNumber"
                  v-model="formData.wordpressOrderNumber"
                  type="text"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="datePickedUp">Date Picked Up</label>
                <input
                  id="datePickedUp"
                  v-model="formData.datePickedUp"
                  type="date"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="dateDelivered">Date Delivered</label>
                <input
                  id="dateDelivered"
                  v-model="formData.dateDelivered"
                  type="date"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="status">Status *</label>
                <select
                  id="status"
                  v-model="formData.status"
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
            </div>
            <div class="form-group full-width">
              <label for="pickupInstructions">Pickup Instructions</label>
              <textarea
                id="pickupInstructions"
                v-model="formData.pickupInstructions"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>
            <div class="form-group full-width">
              <label for="deliveryInstructions">Delivery Instructions</label>
              <textarea
                id="deliveryInstructions"
                v-model="formData.deliveryInstructions"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>
            <div class="form-group full-width">
              <label for="sellerNotes">Seller Notes</label>
              <textarea
                id="sellerNotes"
                v-model="formData.sellerNotes"
                rows="3"
                class="form-textarea"
              ></textarea>
            </div>
          </div>

        </div>

        <div class="form-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Update Order' : 'Create Order' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderEditModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: null
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      formData: {
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
        
        // Status
        status: 'pending'
      }
    }
  },
  watch: {
    order: {
      immediate: true,
      handler(newOrder) {
        if (newOrder) {
          this.formData = { ...newOrder }
        } else {
          this.resetForm()
        }
      }
    }
  },
  methods: {
    submitOrder() {
      this.$emit('save', { ...this.formData })
    },
    
    closeModal() {
      this.$emit('cancel')
    },
    
    resetForm() {
      this.formData = {
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
        
        // Status
        status: 'pending'
      }
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

.modal-form {
  padding: 32px;
}

.form-sections {
  margin-bottom: 32px;
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E2E8F0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 24px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #EF4444;
  display: inline-block;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  font-family: 'Manrope', sans-serif;
  padding: 12px 16px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  background-color: #FFFFFF;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 16px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  font-family: 'Manrope', sans-serif;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 4px;
  margin-right: 12px;
  transition: all 0.15s ease-in-out;
  background-color: #FFFFFF;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #EF4444;
  border-color: #EF4444;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-input:focus + .checkbox-custom {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-actions {
  display: flex;
  gap: 16px;
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

.btn-primary {
  background-color: #EF4444;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #DC2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
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
  .modal-form {
    padding: 20px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-checkboxes {
    flex-direction: column;
    gap: 16px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
    padding: 14px 24px;
  }
}
</style>