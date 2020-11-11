<template>
  <div>
    <div>
      <h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ total_users }} Users have gone on over
        {{ total_rides }} rides going over {{ total_miles }} miles.
      </h4>
      <br />
      <p>
        Welcome to your Peloton Dashboard. Your home for analyzing all of your
        Peloton Bike Results. The charts below will help you on your journey to
        ensure you make progress day-over-day and week-over-week.
        <br />
        If at any time find yourself unsure of how to use the site, please click
        <a href="https://www.youtube.com/watch?v=KlZPHn9WCUo&feature=youtu.be"
          >Here</a
        >
        <br /><br />
        Finally, if you've found this service useful, I would love if you could
        buy me a coffee! Or visit one of our sponsors.
      </p>
      <a href="http://pelodashboard.com:5000/login">
        <base-button type="primary" id="pull">Login</base-button>
        &nbsp;&nbsp;&nbsp; </a
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="http://pelodashboard.com:5000/pull_user_data">
        <base-button type="primary" id="pull">Get Your Data</base-button>
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="https://www.buymeacoffee.com/psukardi"
        ><img
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=🍕&slug=psukardi&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
      /></a>
      <base-button>
        <ShareNetwork
          network="facebook"
          url="http://www.pelodashboard.com"
          title="Say hi to PeloDashboard the home for all your Bike Data"
          description="Come visit PeloDashboard to make the most of each ride."
          hashtags="peloton"
        >
          Share on Facebook
        </ShareNetwork>
      </base-button>
    </div>
    <div class="row">
      <div class="col-12">

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalShipments") }}
                </h5>
                <h2 class="card-title">{{ $t("dashboard.performance") }}</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <h2 class="card-title">Heart Rate Over Time</h2>

          <template slot="header">
            <h1 class="card-category">{{ $t("dashboard.heartRate") }}</h1>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="heartChart"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <h4 slot="header" class="card-title">
            {{ $t("dashboard.simpleTable") }}
          </h4>
          <div class="table-responsive">
            <user-table ref="course-table"></user-table>
          </div>
        </card>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-6">
            <div id="adsgoeshere" v-html="awsContent"></div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <Adsense
          data-ad-client="ca-pub-1865965407697407"
          data-ad-slot="1234567890"
        >
        </Adsense>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import axios from "axios";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    StatsCard,
  },
  data: {
    total_users: "",
    total_miles: "",
    total_rides: "",
    awsContent: "",
  },
  data() {
    return {
      total_users: "",
      total_miles: "",
      total_rides: "",
      awsContent: "",
      bigLineChart: {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My Avg Heart Rate",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [0, 50, 100, 150, 200],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },
  methods: {
    populateTotalUsers() {
      var self = this;
      axios
        .get("http://pelodashboard.com:5000/totals")
        .then(function (response) {
          console.log(response);
          self.total_users = response.data.total_users;
          self.total_miles = response.data.total_miles;
          self.total_rides = response.data.total_rides;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    },
    initHeartChart() {
      async function asyncFunc(refs, greenLineChart, getCookieValue) {
        var user_id = getCookieValue("USER_ID");
        var label_url = "http://pelodashboard.com:5000/get_labels/" + user_id;
        var heart_url =
          "http://pelodashboard.com:5000/get_heart_rate/" + user_id;
        const [firstResponse, secondResponse] = await Promise.all([
          axios.get(label_url),
          axios.get(heart_url),
        ]);

        let chartData = {
          datasets: [
            {
              label: "My Avg Heart Rate",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: secondResponse.data,
            },
          ],
          labels: firstResponse.data,
        };
        greenLineChart.chartData = chartData;
      }

      asyncFunc(this.$refs, this.greenLineChart, this.getCookieValue);
    },
    initBigChart(index) {
      async function asyncFunc(refs, bigLineChart, index, getCookieValue) {
        var user_id = getCookieValue("USER_ID");
        var label_url = "http://pelodashboard.com:5000/get_labels/" + user_id;
        var heart_url = "http://pelodashboard.com:5000/get_charts/" + user_id;
        const [firstResponse, secondResponse] = await Promise.all([
          axios.get(label_url),
          axios.get(heart_url),
        ]);

        let chartData = {
          datasets: [
            {
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: secondResponse.data[index],
            },
          ],
          labels: firstResponse.data,
        };

        bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMin = 5;
        bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMax = 10;
        bigLineChart.chartData = chartData;
        bigLineChart.activeIndex = index;
        refs.bigChart.updateGradients(chartData);
      }

      asyncFunc(this.$refs, this.bigLineChart, index, this.getCookieValue);
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
    this.initHeartChart();
    this.populateTotalUsers();
    this.awsContent = document.getElementById("aws-ad").innerHTML;
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
</style>
