<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 ml-auto">
        <div class="info-area info-horizontal mt-5">
          <div class="icon icon-warning">
            <i class="tim-icons icon-wifi"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Marketing</h3>
            <p class="description">
              We've created the marketing campaign of the website. It was a very
              interesting collaboration.
            </p>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-primary">
            <i class="tim-icons icon-triangle-right-17"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Fully Coded in HTML5</h3>
            <p class="description">
              We've developed the website with HTML5 and CSS3. The client has
              access to the code using GitHub.
            </p>
          </div>
        </div>
        <div class="info-area info-horizontal">
          <div class="icon icon-info">
            <i class="tim-icons icon-trophy"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Built Audience</h3>
            <p class="description">
              There is also a Fully Customizable CMS Admin Dashboard for this
              product.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-7 mr-auto">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <card class="card-register card-white">
              <template slot="header">
                <img class="card-img" src="img/card-primary.png" alt="Card image"/>
                <h4 class="card-title">Register</h4>
              </template>

              <ValidationProvider
                name="fullname"
                rules="required"
                v-slot="{ passed, failed, errors }"
                >
                <base-input
                  required
                  v-model="fullname"
                  placeholder="Full Name"
                  addon-left-icon="tim-icons icon-single-02"
                  type="text"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
             </ValidationProvider>


              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed, errors }"
                >
                <base-input
                  required
                  v-model="email"
                  placeholder="Email"
                  addon-left-icon="tim-icons icon-email-85"
                  type="email"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
             </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ passed, failed, errors }"
                >
                <base-input
                  required
                  v-model="password"
                  placeholder="Password"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
             </ValidationProvider>

              <base-checkbox class="text-left">
                I agree to the <a href="#something">terms and conditions</a>.
              </base-checkbox>

              <base-button native-type="submit" slot="footer" type="primary" round block size="lg">
                Get Started
              </base-button>
            </card>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>

import { BaseCheckbox } from 'src/components';
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);

export default {
  components: {
    BaseCheckbox
  },
  data() {
    return {
        email: '',
        fullname: '',
        password: ''

    };
  },
  methods: {
    submit() {
      alert("Form has been submitted!");
    }
  }
};
</script>
<style></style>
