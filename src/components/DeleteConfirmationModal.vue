<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Delete Order</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <div class="warning-icon">⚠️</div>
        <p>Are you sure you want to delete this order?</p>
        <div class="order-details">
          <strong>Order Number:</strong> {{ order?.orderNumber }}<br>
          <strong>Customer:</strong> {{ order?.customerName }}<br>
          <strong>Total:</strong> ${{ order?.totalCost?.toFixed(2) }}
        </div>
        <p class="warning-text">This action cannot be undone.</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          Cancel
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('confirm')">
          Delete Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmationModal',
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
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        emit('close')
      }
    }

    return {
      handleOverlayClick
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
  max-width: 500px;
  width: 90%;
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
  font-size: 20px;
  font-weight: 600;
  color: #dc3545;
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
  text-align: center;
}

.warning-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.modal-body p {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #495057;
}

.order-details {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  text-align: left;
  font-size: 14px;
  color: #495057;
}

.warning-text {
  color: #dc3545;
  font-weight: 500;
  font-size: 14px;
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

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>