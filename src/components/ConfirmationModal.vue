<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-content">
        <div class="icon-container">
          <div v-if="type === 'delete'" class="icon-circle delete">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div v-else-if="type === 'cancel'" class="icon-circle warning">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        
        <div class="message-container">
          <h3 class="modal-title">
            {{ type === 'delete' ? 'Delete Order' : 'Cancel Order' }}
          </h3>
          <p class="modal-message">{{ message }}</p>
        </div>

        <div class="action-buttons">
          <button @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="confirmAction" class="btn" :class="type === 'delete' ? 'btn-danger' : 'btn-warning'">
            {{ type === 'delete' ? 'Delete' : 'Cancel Order' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['delete', 'cancel'].includes(value)
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['confirm', 'cancel'],
  methods: {
    confirmAction() {
      this.$emit('confirm')
    },
    
    closeModal() {
      this.$emit('cancel')
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
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-content {
  padding: 32px;
  text-align: center;
}

.icon-container {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.icon-circle.delete {
  background-color: #FEE2E2;
  color: #DC2626;
}

.icon-circle.warning {
  background-color: #FEF3C7;
  color: #F59E0B;
}

.icon {
  width: 32px;
  height: 32px;
}

.message-container {
  margin-bottom: 32px;
}

.modal-title {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 12px 0;
}

.modal-message {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
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
  min-width: 120px;
}

.btn-secondary {
  background-color: #F1F5F9;
  color: #475569;
  border: 1px solid #E2E8F0;
}

.btn-secondary:hover {
  background-color: #E2E8F0;
  transform: translateY(-1px);
}

.btn-danger {
  background-color: #DC2626;
  color: #FFFFFF;
}

.btn-danger:hover {
  background-color: #B91C1C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.btn-warning {
  background-color: #F59E0B;
  color: #FFFFFF;
}

.btn-warning:hover {
  background-color: #D97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

@media (max-width: 480px) {
  .modal {
    margin: 20px;
    max-width: calc(100vw - 40px);
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>