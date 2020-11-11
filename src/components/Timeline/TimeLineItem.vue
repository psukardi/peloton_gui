<template>
  <li :class="{ 'timeline-inverted': inverted }">
    <slot name="badge">
      <div class="timeline-badge" :class="badgeType">
        <i :class="badgeIcon"></i>
      </div>
    </slot>
    <div class="timeline-panel">
      <div class="timeline-heading"><slot name="header"></slot></div>
      <div class="timeline-body" v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <div v-if="$slots.footer" class="timeline-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: 'time-line-item',
  props: {
    inverted: Boolean,
    badgeType: {
      type: String,
      default: 'success'
    },
    badgeIcon: {
      type: String,
      default: ''
    }
  }
};
</script>
<style></style>
