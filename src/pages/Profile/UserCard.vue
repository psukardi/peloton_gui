<template>
  <card type="user">
    <p class="card-text">
    </p>
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
