<template>
  <div>
    <div @click="dismiss()">
      <base-alert v-if="showModal" type="info">
        <span data-notify="message" v-html="modalText">{{ modalText }}</span>
      </base-alert>
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
                @click="getMusic(data, item, index)"
                type="primary"
                fill
                >Music Set</base-button
              >
            </td>
          </slot>
        </tr>
      </tbody>
      <p>
        <button @click="prevPage" type="button" class="btn btn-default">
          Previous
          <i data-v-01e1f50f="" class="tim-icons icon-minimal-left"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="nextPage" type="button" class="btn btn-default">
          Next
          <i data-v-01e1f50f="" class="tim-icons icon-minimal-right"></i>
        </button>
      </p>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import NotificationTemplate from "../pages/Notifications/NotificationTemplate";

export default {
  name: "base-table",
  data() {
    return {
      showModal: false,
      modalText: "",
      pageSize: 10,
      currentPage: 1,
      currentSort: "name",
      currentSortDir: "asc"
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
    }
  },
  methods: {
    sort: function(s) {
      alert("in the sort");
      //if s == current sort, reverse
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
      if (column == "Miles Ridden") {
        return this.data[item]["miles_ridden"];
      }
      else if (column == "Total Output") {
        return this.data[item]['total_output'];
      } else {
      return this.data[item][column.toLowerCase()];
      }
    },
    dismiss() {
      this.showModal = false;
    },
    getMusic(data, item, index) {
      var music_req_url = "https://pelodashboard.com:5000/music_by_time/" + item;

      async function asyncFunc(parent) {
        const [music] = await Promise.all([axios.get(music_req_url)]);

        var music_html = "<h3>Song List</h3><ul>";
        music.data.forEach(song => {
          music_html += "<li>" + song + "</li>";
        });

        parent.modalText = music_html;
        parent.showModal = true;
      }

      asyncFunc(this);
    }
  }
};
</script>
<style></style>
