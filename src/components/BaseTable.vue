<template>
<div>
    <div @click="dismiss()">
      <base-alert v-if="showModal" type="info">
          <span data-notify="message" v-html="modalText">{{modalText}}</span>
      </base-alert>
    </div>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
              {{itemValue(item, column)}}
        </td>
        <td>
          <base-button slot="footer" @click="getMusic(data, item, index)" type="primary" fill>Music Set</base-button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
  import axios from "axios";
  import NotificationTemplate from '../pages/Notifications/NotificationTemplate';

  export default {
    name: 'base-table',
    data () {
      return {
          showModal: false,
          modalText: ''
      }
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data",
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.toLowerCase()];
      },
      dismiss(){
        this.showModal = false;
      },
      getMusic(data, item, index){
        var music_req_url = 'http://54.90.15.230:5000/music_by_time/' + index;

        async function asyncFunc(parent) {
            const [music] = await Promise.all([
              axios.get(music_req_url)
            ]);


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
<style>
</style>
