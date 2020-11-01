<template>
<div>
    <div slot="modal-text" v-html="modalText">
      {{ modalText }}
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
      getMusic(data, item, index){
        var music_req_url = 'http://54.90.15.230:5000/music_by_time/' + index;

        async function asyncFunc(stuff) {
            const [music] = await Promise.all([
              axios.get(music_req_url)
            ]);

          stuff.showModal = true;
          stuff.modalText = '<h3>Song List</h3><ul>';
          music.data.forEach(song => {
            stuff.modalText += "<li>" + song + '</li>';
          });
          stuff.modalText += "</ul>";
        }

        asyncFunc(this);
      }
    }
  };
</script>
<style>
</style>
