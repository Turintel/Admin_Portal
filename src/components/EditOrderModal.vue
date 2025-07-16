<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Order' : 'Create New Order' }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <form class="modal-body" @submit.prevent="handleSubmit">
        <!-- Order Information -->
        <div class="field-group">
          <h3>Order Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Order Number</label>
              <input 
                type="text" 
                v-model="formData.orderNumber" 
                required 
                :disabled="isEditing"
              />
            </div>
            <div class="form-field">
              <label>Order Date</label>
              <input 
                type="date" 
                v-model="formData.orderDate" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Status</label>
              <select v-model="formData.status" required>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div class="form-field">
              <label>Priority</label>
              <select v-model="formData.priority">
                <option value="Low">Low</option>
                <option value="Standard">Standard</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="field-group">
          <h3>Customer Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Customer Name</label>
              <input 
                type="text" 
                v-model="formData.customerName" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Customer Email</label>
              <input 
                type="email" 
                v-model="formData.customerEmail" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Customer Phone</label>
              <input 
                type="tel" 
                v-model="formData.customerPhone" 
              />
            </div>
            <div class="form-field full-width">
              <label>Customer Address</label>
              <textarea 
                v-model="formData.customerAddress" 
                rows="2"
              ></textarea>
            </div>
            <div class="form-field">
              <label>Customer City</label>
              <input 
                type="text" 
                v-model="formData.customerCity" 
              />
            </div>
            <div class="form-field">
              <label>Customer State</label>
              <input 
                type="text" 
                v-model="formData.customerState" 
              />
            </div>
            <div class="form-field">
              <label>Customer ZIP</label>
              <input 
                type="text" 
                v-model="formData.customerZip" 
              />
            </div>
            <div class="form-field">
              <label>Customer Country</label>
              <input 
                type="text" 
                v-model="formData.customerCountry" 
              />
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="field-group">
          <h3>Shipping Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Ship To Name</label>
              <input 
                type="text" 
                v-model="formData.shipToName" 
                required 
              />
            </div>
            <div class="form-field full-width">
              <label>Ship To Address</label>
              <textarea 
                v-model="formData.shipToAddress" 
                rows="2"
                required
              ></textarea>
            </div>
            <div class="form-field">
              <label>Ship To City</label>
              <input 
                type="text" 
                v-model="formData.shipToCity" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Ship To State</label>
              <input 
                type="text" 
                v-model="formData.shipToState" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Ship To ZIP</label>
              <input 
                type="text" 
                v-model="formData.shipToZip" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Ship To Country</label>
              <input 
                type="text" 
                v-model="formData.shipToCountry" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Ship Date</label>
              <input 
                type="date" 
                v-model="formData.shipDate" 
              />
            </div>
            <div class="form-field">
              <label>Delivery Date</label>
              <input 
                type="date" 
                v-model="formData.deliveryDate" 
              />
            </div>
          </div>
        </div>

        <!-- Billing Information -->
        <div class="field-group">
          <h3>Billing Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Bill To Name</label>
              <input 
                type="text" 
                v-model="formData.billToName" 
                required 
              />
            </div>
            <div class="form-field full-width">
              <label>Bill To Address</label>
              <textarea 
                v-model="formData.billToAddress" 
                rows="2"
                required
              ></textarea>
            </div>
            <div class="form-field">
              <label>Bill To City</label>
              <input 
                type="text" 
                v-model="formData.billToCity" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Bill To State</label>
              <input 
                type="text" 
                v-model="formData.billToState" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Bill To ZIP</label>
              <input 
                type="text" 
                v-model="formData.billToZip" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Bill To Country</label>
              <input 
                type="text" 
                v-model="formData.billToCountry" 
                required 
              />
            </div>
          </div>
        </div>

        <!-- Package Information -->
        <div class="field-group">
          <h3>Package Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Package Weight (lbs)</label>
              <input 
                type="number" 
                step="0.1" 
                v-model.number="formData.packageWeight" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Package Length (in)</label>
              <input 
                type="number" 
                step="0.1" 
                v-model.number="formData.packageLength" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Package Width (in)</label>
              <input 
                type="number" 
                step="0.1" 
                v-model.number="formData.packageWidth" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Package Height (in)</label>
              <input 
                type="number" 
                step="0.1" 
                v-model.number="formData.packageHeight" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Package Dimensions</label>
              <input 
                type="text" 
                v-model="formData.packageDimensions" 
                :placeholder="dimensionsPlaceholder"
                readonly
              />
            </div>
          </div>
        </div>

        <!-- Shipping & Carrier Information -->
        <div class="field-group">
          <h3>Shipping & Carrier Information</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Service Type</label>
              <select v-model="formData.serviceType" required>
                <option value="Ground">Ground</option>
                <option value="Express">Express</option>
                <option value="Overnight">Overnight</option>
                <option value="2-Day">2-Day</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
            <div class="form-field">
              <label>Carrier</label>
              <select v-model="formData.carrier" required>
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="USPS">USPS</option>
                <option value="DHL">DHL</option>
              </select>
            </div>
            <div class="form-field">
              <label>Tracking Number</label>
              <input 
                type="text" 
                v-model="formData.trackingNumber" 
              />
            </div>
            <div class="form-field">
              <label>Shipping Cost</label>
              <input 
                type="number" 
                step="0.01" 
                v-model.number="formData.shippingCost" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Total Cost</label>
              <input 
                type="number" 
                step="0.01" 
                v-model.number="formData.totalCost" 
                required 
              />
            </div>
            <div class="form-field">
              <label>Insurance Value</label>
              <input 
                type="number" 
                step="0.01" 
                v-model.number="formData.insuranceValue" 
              />
            </div>
            <div class="form-field full-width">
              <label>
                <input 
                  type="checkbox" 
                  v-model="formData.signature" 
                /> 
                Signature Required
              </label>
            </div>
            <div class="form-field full-width">
              <label>Special Instructions</label>
              <textarea 
                v-model="formData.specialInstructions" 
                rows="3"
                placeholder="Enter any special instructions for this order..."
              ></textarea>
            </div>
          </div>
        </div>
      </form>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" @click="handleSubmit">
          {{ isEditing ? 'Update Order' : 'Create Order' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'EditOrderModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const formData = ref({
      orderNumber: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      customerCity: '',
      customerState: '',
      customerZip: '',
      customerCountry: '',
      shipToName: '',
      shipToAddress: '',
      shipToCity: '',
      shipToState: '',
      shipToZip: '',
      shipToCountry: '',
      billToName: '',
      billToAddress: '',
      billToCity: '',
      billToState: '',
      billToZip: '',
      billToCountry: '',
      packageWeight: 0,
      packageLength: 0,
      packageWidth: 0,
      packageHeight: 0,
      packageDimensions: '',
      serviceType: 'Ground',
      shippingCost: 0,
      totalCost: 0,
      orderDate: '',
      shipDate: '',
      deliveryDate: '',
      trackingNumber: '',
      carrier: 'FedEx',
      status: 'Pending',
      priority: 'Standard',
      specialInstructions: '',
      insuranceValue: 0,
      signature: false
    })

    const isEditing = computed(() => !!props.order)

    const dimensionsPlaceholder = computed(() => {
      if (formData.value.packageLength && formData.value.packageWidth && formData.value.packageHeight) {
        return `${formData.value.packageLength} x ${formData.value.packageWidth} x ${formData.value.packageHeight}`
      }
      return ''
    })

    // Watch for dimension changes to update package dimensions
    watch(
      [() => formData.value.packageLength, () => formData.value.packageWidth, () => formData.value.packageHeight],
      () => {
        if (formData.value.packageLength && formData.value.packageWidth && formData.value.packageHeight) {
          formData.value.packageDimensions = `${formData.value.packageLength} x ${formData.value.packageWidth} x ${formData.value.packageHeight}`
        }
      }
    )

    // Watch for order changes to populate form
    watch(
      () => props.order,
      (newOrder) => {
        if (newOrder) {
          formData.value = { ...newOrder }
        } else {
          // Reset form for new order
          formData.value = {
            orderNumber: `ORD-${Date.now()}`,
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: '',
            customerCity: '',
            customerState: '',
            customerZip: '',
            customerCountry: 'USA',
            shipToName: '',
            shipToAddress: '',
            shipToCity: '',
            shipToState: '',
            shipToZip: '',
            shipToCountry: 'USA',
            billToName: '',
            billToAddress: '',
            billToCity: '',
            billToState: '',
            billToZip: '',
            billToCountry: 'USA',
            packageWeight: 0,
            packageLength: 0,
            packageWidth: 0,
            packageHeight: 0,
            packageDimensions: '',
            serviceType: 'Ground',
            shippingCost: 0,
            totalCost: 0,
            orderDate: new Date().toISOString().split('T')[0],
            shipDate: '',
            deliveryDate: '',
            trackingNumber: '',
            carrier: 'FedEx',
            status: 'Pending',
            priority: 'Standard',
            specialInstructions: '',
            insuranceValue: 0,
            signature: false
          }
        }
      },
      { immediate: true }
    )

    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        emit('close')
      }
    }

    const handleSubmit = () => {
      emit('save', { ...formData.value })
    }

    return {
      formData,
      isEditing,
      dimensionsPlaceholder,
      handleOverlayClick,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.modal-body {
  padding: 24px;
}

.field-group {
  margin-bottom: 32px;
}

.field-group h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #495057;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.form-field label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #495057;
  font-size: 14px;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-field input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.form-field textarea {
  resize: vertical;
  min-height: 80px;
}

.form-field input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
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
</style>