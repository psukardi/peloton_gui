<template>
  <base-table :data="table.data"
              :columns="table.columns"
              thead-classes="text-primary">
  </base-table>
</template>
<script>
  import { BaseTable } from "@/components";
  import axios from "axios";
  export default {
    components: {
      BaseTable
    },
    computed: {
      table(){
        return this.$t('dashboard.usersTable');
      }
    },
    mounted() {
      // once this is loaded we can pump in the course data
      async function asyncFunc(table) {
          const [firstResponse] = await Promise.all([
            axios.get('http://pelodashboard.com:5000/course_data'),
          ]);

          table.data = firstResponse.data
      }

      asyncFunc(this.$t('dashboard.usersTable'));
    },
  }
</script>
<style>
</style>
