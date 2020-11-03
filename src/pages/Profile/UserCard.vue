<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
    <p></p>
    <h4 class="title">Historcial Info</h4>
    <ul>
      <li>Total Achievements: {{user.totalAchievements}} </li>
      <li>Total Rides:  {{user.totalRides}} </li>
      <li>Total Miles: {{user.totalMiles}} </li>
      </ul>
  </card>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
