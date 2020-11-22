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
    <div class="row">
      <div class="col-sm-6 col-lg-2">
        <base-dropdown
          title-classes="btn btn-info"
          title="Filter By Instructor"
        >
          <!--     <option v-for="jobTitle in jobTitles" :value="jobTitle.id" :key="jobTitle.id">{{ jobTitle.name }}</option> -->
          <a
            @click="instructorFilter(instructor.name)"
            v-for="instructor in instructors"
            :key="instructor.id"
            class="dropdown-item"
            >{{ instructor.name }}</a
          >
        </base-dropdown>
      </div>
      <div class="col-sm-6 col-lg-1">
        <base-dropdown title-classes="btn btn-info" title="Filter By Length">
          <a
            @click="lengthFilter(length.name)"
            v-for="length in course_length"
            :key="length.id"
            class="dropdown-item"
            >{{ length.name }}</a
          >
        </base-dropdown>
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
      <button @click="reset" type="button" class="btn btn-default">
        Reset
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="prevPage" type="button" class="btn btn-default">
        Previous
        <i data-v-01e1f50f="" class="tim-icons icon-minimal-left"></i>
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="nextPage" type="button" class="btn btn-default">
        Next
        <i data-v-01e1f50f="" class="tim-icons icon-minimal-right"></i>
      </button>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import NotificationTemplate from "../pages/Notifications/NotificationTemplate";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import BaseDropdown from "@/components/BaseDropdown";
import config from "@/config";
import * as chartConfigs from "@/components/Charts/config";

export default {
  components: {
    LineChart,
    BarChart,
    BaseDropdown
  },
  name: "ride-table",
  instrutors: [],
  filter: null,
  data() {
    return {
      showModal: false,
      modalText: "",
      pageSize: 5,
      currentPage: 1,
      backup_data: [],
      currentSort: "name",
      currentSortDir: "dsec",
      index: 0,
      workout_hash: 0,
      filter: null,
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
    },
    instructors: {
      type: Object,
      default: () => [],
      description: "Filter By Instructor"
    },
    course_length: {
      type: Object,
      default: () => [],
      description: "Filter By Class Length"
    }
  },
  mounted() {
    this.initBigChart(0);
    this.backup_data = this.data;
    this.getInstructors(this.instructors, this.course_length);
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
    reset: function() {
      this.isSearchDisabled = false;
      this.data = this.backup_data;
      this.currentPage = 1;
    },
    search: async function(ride_id, getCookieValue, trim) {
      if (this.isSearchDisabled) {
        return;
      }
      var userID = getCookieValue("USER_ID");
      try {
        var downselect_url =
          "http://pelodashboard.com:5000/ride_graph/history/" +
          userID +
          "/" +
          ride_id;
        const [hashesToKeep] = await Promise.all([axios.get(downselect_url)]);

        var hashes = hashesToKeep.data;
        trim(hashes);
        this.isSearchDisabled = true;
      } catch (err) {
        console.log(err);
      }
    },
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    },
    trim(hashes) {
      this.backup_data = this.data;
      var new_records = [];
      for (var key in this.data) {
        if (hashes.includes(this.data[key].workout_hash)) {
          new_records.push(this.data[key]);
        }
      }

      this.data = new_records;
      this.currentPage = 1;
    },
    instructorFilter: function(name) {
      this.reset();
      this.backup_data = this.data;
      var new_records = [];
      for (var key in this.data) {
        let __instructor__ = this.data[key]["instructor"];
        if (name == __instructor__) {
          new_records.push(this.data[key]);
        }
      }
      this.data = new_records;
      this.currentPage = 1;
    },
    lengthFilter: function(length) {
      this.reset();
      this.backup_data = this.data;
      var new_records = [];
      for (var key in this.data) {
        let __length__ = this.data[key]["length"];
        if (length == __length__) {
          new_records.push(this.data[key]);
        }
      }
      this.data = new_records;
      this.currentPage = 1;
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
      if (column == "Name") {
        if (this.data[item]["multiple_rides"] == true) {
          return this.data[item][column.toLowerCase()] + "*";
        } else {
          return this.data[item][column.toLowerCase()];
        }
      }
      return this.data[item][column.toLowerCase()];
    },
    dismiss() {
      this.showModal = false;
    },
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    },
    getInstructors: async function(instructors, course_length) {
      var user_id = this.getCookieValue("USER_ID");
      var course_url = "http://pelodashboard.com:5000/course_data/" + user_id;
      const [firstResponse] = await Promise.all([axios.get(course_url)]);

      // Let's get that unqiue set of instructors for filtering
      let instructor_set = new Set();
      let length_set = new Set();

      var course_dict = firstResponse.data;
      var keys = Object.keys(course_dict);
      keys.forEach(e => {
        length_set.add(course_dict[e]["length"]);
        instructor_set.add(course_dict[e]["instructor"]);
      });

      instructor_set = Array.from(instructor_set);
      length_set = Array.from(length_set);

      instructor_set.forEach(i => {
        var __instructor__ = {
          id: i,
          name: i
        };
        instructors.push(__instructor__);
      });

      length_set.forEach(i => {
        var __length__ = {
          id: i,
          name: i
        };
        course_length.push(__length__);
      });
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
      this.search(item, this.getCookieValue, this.trim);
      this.initBigChart(this.index, data[item]["workout_hash"]);
    }
  }
};
</script>
<style></style>
