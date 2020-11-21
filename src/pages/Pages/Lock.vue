<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <card class="card-lock card-white text-center">
        <img slot="header" src="img/emilyz.jpg" alt="..." />

        <h4 class="card-title">Joe Gardner</h4>
        <base-input
          type="password"
          placeholder="Password"
          addon-left-icon="tim-icons icon-key-25"
        >
        </base-input>

        <base-button slot="footer" type="primary" size="lg" round>
          Unlock
        </base-button>
      </card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
