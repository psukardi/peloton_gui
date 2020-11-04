<template>
  <div>
        <div>
          <a href="https://www.buymeacoffee.com/psukardi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=🍕&slug=psukardi&button_colour=FF5F5F&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>        <br />
          <br />
            <blockquote>
              <p class="blockquote blockquote-primary">
              Welcome to your Peloton Dashboard. Your new home to analyzing your riding metrics. Here you can see information
              like average output, cadence, resistance, speed and miles-per-ride over the course of your journey.  You can now easilly tell
              if you've hit a wall or are still making progress day-over-day and week-over-week <br/> <br />To see your own data, please first login with your Pelton Credentials.  After you've
              successfully logged-in and are re-directed back to this screen, simiply click the 'Get Your Data' button.  Please be patient,
              as this can take some time.

              If the instructions are unclear or you need some assistance, please click <a href="https://www.youtube.com/watch?v=KlZPHn9WCUo&feature=youtu.be">Here</a>
              <br/><br/>
              Finally, if you've found this service useful, I would love if you could buy me a coffee!
              </p>
              <a href="http://pelodashboard.com:5000/login">
                      <base-button type="primary" id="pull">Login</base-button> &nbsp;&nbsp;&nbsp;
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a href="http://pelodashboard.com:5000/pull_user_data">
                      <base-button type="primary" id="pull">Get Your Data</base-button>
                    </a>
            </blockquote>
          </div>


    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div> -->
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.heartRate')}}</h5>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="heartChart"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table ref="course-table"></user-table>
          </div>
        </card>
      </div>
    </div>
<a href="https://www.buymeacoffee.com/psukardi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=🍕&slug=psukardi&button_colour=FF5F5F&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import axios from "axios";

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
    data() {
      return {
        bigLineChart: {
          allData: [
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: [],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: [],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My Avg Heart Rate",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [0, 50, 100, 150, 200],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      getCookieValue(a) {
          var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
          return b ? b.pop() : 'f9982d7545db41be91e2fff28000547d';
      },
      initHeartChart() {
        async function asyncFunc(refs, greenLineChart, getCookieValue) {
          var user_id = getCookieValue("USER_ID");
          var label_url = 'http://pelodashboard.com:5000/get_labels/' + user_id;
          var heart_url = 'http://pelodashboard.com:5000/get_heart_rate/' + user_id;
          const [firstResponse, secondResponse] = await Promise.all([
            axios.get(label_url),
            axios.get(heart_url)
          ]);

          let chartData = {
            datasets: [{
              label: "My Avg Heart Rate",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: secondResponse.data
            }],
            labels: firstResponse.data
          }
          greenLineChart.chartData = chartData;
        }

        asyncFunc(this.$refs, this.greenLineChart, this.getCookieValue);
      },
      initBigChart(index) {
        async function asyncFunc(refs, bigLineChart, index, getCookieValue) {
          var user_id = getCookieValue("USER_ID");
          var label_url = 'http://pelodashboard.com:5000/get_labels/' + user_id;
          var heart_url = 'http://pelodashboard.com:5000/get_charts/' + user_id;
          const [firstResponse, secondResponse] = await Promise.all([
            axios.get(label_url),
            axios.get(heart_url)
          ]);

          let chartData = {
            datasets: [{
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: secondResponse.data[index],
            }],
            labels: firstResponse.data
          }

          bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMin = 5;
          bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMax = 10;
          bigLineChart.chartData = chartData;
          bigLineChart.activeIndex = index;
          refs.bigChart.updateGradients(chartData);
        }

        asyncFunc(this.$refs, this.bigLineChart, index, this.getCookieValue);
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
      this.initHeartChart();
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
