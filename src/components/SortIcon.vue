<template>
  <span class="sort-icon">
    <span v-if="field === currentSort">
      {{ order === 'asc' ? '▲' : '▼' }}
    </span>
    <span v-else class="sort-inactive">
      ▲▼
    </span>
  </span>
</template>

<script>
export default {
  name: 'SortIcon',
  props: {
    field: {
      type: String,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    },
    order: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.sort-icon {
  display: inline-block;
  margin-left: 8px;
  font-size: 10px;
  color: #007bff;
}

.sort-inactive {
  opacity: 0.3;
}
</style>