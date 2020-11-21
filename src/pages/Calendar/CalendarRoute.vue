<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-10">
        <card class="card-calendar"> <calendar></calendar> </card>
      </div>
    </div>
  </div>
</template>
<script>
/*  We lazy load (async) the Calendar component because it contains 2 big libraries (jquery and fullcalendar)
      If the component is not loaded within 100ms, we display a loading component in the meanwhile.
      This way, we don't bloat the main bundle with 2 unnecessary libs that we only need for this page :)
   */
import Loading from '@/pages/Layout/LoadingMainPanel.vue';

const Calendar = () => ({
  component: import('./Calendar.vue'),
  loading: Loading,
  delay: 100
});
export default {
  components: {
    Calendar
  }
};
</script>
<style>
.card-calendar {
  min-height: 400px;
}
</style>
