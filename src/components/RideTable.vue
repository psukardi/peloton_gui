<template>
  <div>
    <div @click="dismiss()">
      <base-alert v-if="showModal" type="info">
        <span data-notify="message" v-html="modalText">Heart Rate</span>
      </base-alert>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">
                  Output for your most recently selected ride
                </h5>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index, null)"
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
    <table class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
        <tr>
          <slot name="columns">
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </slot>
        </tr>
      </thead>
      <tbody :class="tbodyClasses">
        <!-- <tr v-for="(item, index) in data" :key="index"> -->
        <tr v-for="(item, index) in sortedWorkouts" :key="index">
          <slot :row="item">
            <td
              v-for="(column, index) in columns"
              :key="index"
              v-if="hasValue(item, column)"
            >
              {{ itemValue(item, column) }}
            </td>
            <td>
              <base-button
                slot="footer"
                @click="getRideChart(data, item, index)"
                type="primary"
                fill
                >Populate Ride Chart</base-button
              >
            </td>
          </slot>
        </tr>
      </tbody>
      <p>
        <button @click="prevPage">Previous</button>
        <button @click="nextPage">Next</button>
      </p>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import NotificationTemplate from "../pages/Notifications/NotificationTemplate";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import config from "@/config";
import * as chartConfigs from "@/components/Charts/config";

export default {
  components: {
    LineChart,
    BarChart
  },
  name: "ride-table",
  data() {
    return {
      showModal: false,
      modalText: "",
      pageSize: 5,
      currentPage: 1,
      currentSort: "name",
      currentSortDir: "dsec",
      index: 0,
      workout_hash: 0,

      bigLineChart: {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: []
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
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
              data: [0, 50, 100, 150, 200]
            }
          ]
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)"
        ],
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns"
    },
    data: {
      type: Object,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes"
    }
  },
  mounted() {
    this.initBigChart(0);
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
    sortedWorkouts: function() {
      return Object.keys(this.data)
        .sort((a, b) => {
          let modifier = 1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
    bigLineChartCategories() {
      return this.$t("dashboard.graphCategories");
    }
  },
  methods: {
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < Object.keys(this.data).length)
        this.currentPage++;
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return this.data[item][column.toLowerCase()];
    },
    dismiss() {
      this.showModal = false;
    },
    initBigChart(index, item) {
      this.index = index;
      async function asyncFunc(refs, bigLineChart, index, workout_hash) {
        try {
          var workout_hash_url =
            "http://pelodashboard.com:5000/ride_graph/" + workout_hash;
          const [chartResults] = await Promise.all([
            axios.get(workout_hash_url)
          ]);
          var chartResultData = chartResults.data;
          var seconds_since_start = chartResultData["seconds_since_start"];
          switch (index) {
            case 0:
              chartData = chartResultData["output"];
              break;
            case 1:
              chartData = chartResultData["cadence"];
              break;
            case 2:
              chartData = chartResultData["resistance"];
              break;
            case 3:
              chartData = chartResultData["speed"];
              break;
          }
        } catch (err) {
          console.log(
            "the users didn't select anything yet.  No reason for alarm"
          );
        }

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
              data: chartData
            }
          ],
          labels: seconds_since_start
        };

        bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMin = 5;
        bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMax = 10;
        bigLineChart.chartData = chartData;
        bigLineChart.activeIndex = index;
        refs.bigChart.updateGradients(chartData);
      }

      if (item == null) {
        item = this.workout_hash;
      }
      asyncFunc(this.$refs, this.bigLineChart, index, item);
    },
    getRideChart(data, item, index) {
      this.workout_hash = data[item]["workout_hash"];
      this.initBigChart(this.index, data[item]["workout_hash"]);
    }
  }
};
</script>
<style></style>
