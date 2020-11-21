<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 ml-auto mr-auto text-center">
        <h1 class="title">Pick the best plan for you</h1>
        <h4 class="description">
          You have Free Unlimited Updates and Premium Support on each package.
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-primary"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">pro</h1>
          <img class="card-img" src="img/card-primary.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">300 messages</li>
            <li class="list-group-item">150 emails</li>
            <li class="list-group-item">24/7 Support</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>95</h3>
            <h5 class="text-on-back">95</h5>
            <p class="plan">Professional plan</p>
          </div>
          <base-button slot="footer" round type="primary" class="btn-just-icon">
            Get started
          </base-button>
        </card>
      </div>

      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-success card-white"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">basic</h1>
          <img class="card-img" src="img/card-success.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">50 messages</li>
            <li class="list-group-item">100 emails</li>
            <li class="list-group-item">24/7 Support</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>57</h3>
            <h5 class="text-on-back">57</h5>
            <p class="plan">Basic plan</p>
          </div>

          <base-button slot="footer" round type="success" class="btn-just-icon">
            Get started
          </base-button>
        </card>
      </div>

      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-warning card-raised card-white"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">mid</h1>
          <img class="card-img" src="img/card-warning.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">200 messages</li>
            <li class="list-group-item">130 emails</li>
            <li class="list-group-item">24/7 Support</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>72</h3>
            <h5 class="text-on-back">72</h5>
            <p class="plan">Medium plan</p>
          </div>

          <base-button slot="footer" round type="warning" class="btn-just-icon">
            Get started
          </base-button>
        </card>
      </div>
      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-danger card-white"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">trial</h1>
          <img class="card-img" src="img/card-danger.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">50 messages</li>
            <li class="list-group-item">50 emails</li>
            <li class="list-group-item">No Support</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>9</h3>
            <h5 class="text-on-back">9</h5>
            <p class="plan">Trial plan</p>
          </div>

          <base-button slot="footer" round type="danger" class="btn-just-icon">
            Get started
          </base-button>
        </card>
      </div>
    </div>
    <div class="col-md-12 mt-5"><h3 class="title">Professional Plan</h3></div>
    <div class="row">
      <div class="col-md-4">
        <p>
          Premium pricing is the strategy of consistently pricing at, or near,
          the high end of the possible price range to help attract
          status-conscious consumers. The high pricing of a premium product ...
        </p>
      </div>
      <div class="col-md-6 ml-auto">
        <base-progress
          type="warning"
          :show-value="false"
          badge="500GB"
          :value="75"
        />

        <base-progress
          type="primary"
          :show-value="false"
          badge="4 years"
          :value="50"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { BaseProgress } from 'src/components';

export default {
  name: 'pricing-page',
  components: {
    BaseProgress
  }
};
</script>
<style></style>
