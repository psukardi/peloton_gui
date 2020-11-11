<template>
  <div
    class="tab-pane fade"
    role="tabpanel"
    :id="tabId"
    :aria-hidden="!active"
    :aria-labelledby="`step-${tabId}`"
    :class="{ 'active show': active }"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'wizard-tab',
  props: {
    label: String,
    id: String,
    beforeChange: Function
  },
  inject: ['addTab', 'removeTab'],
  data() {
    return {
      active: false,
      checked: false,
      hasError: false,
      tabId: ''
    };
  },
  mounted() {
    this.addTab(this);
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.removeTab(this);
  }
};
</script>
<style></style>
