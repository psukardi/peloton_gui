<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <card class="card">
          <h4 slot="header" class="card-title">
            Populating a ride chart will get all the metrics for an individual ride
          </h4>
          <div class="table-responsive">
            <ride-history-table ref="ride-history"></ride-history-table>
            <!-- <user-table ref="course-table"></user-table> -->
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import axios from "axios";
import RideHistoryTable from './Dashboard/RideHistoryTable.vue';

export default {
  components: {
    TaskList,
    RideHistoryTable,
  },
  data() {
    return {
      total_users: "",
      total_miles: "",
      total_rides: "",
      bigLineChart: {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: []
        },
        extraOptions: chartConfigs.purpleChartOptions,
        categories: []
      },
    };
  },
  computed: {

  },
  methods: {
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    }
  },
  mounted() {
    document.getElementById("aws-ad").style.display = "none";
  },
  beforeDestroy() {
  }
};
</script>
<style></style>
