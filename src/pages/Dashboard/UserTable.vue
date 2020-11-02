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
    methods: {
      getCookieValue(a) {
          var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
          return b ? b.pop() : '';
      }
    },
    computed: {
      table(){
        return this.$t('dashboard.usersTable');
      }
    },
    mounted() {
      // once this is loaded we can pump in the course data
      async function asyncFunc(table, getCookieValue) {
          var tmp_user_id = getCookieValue("USER_ID");
          const [firstResponse] = await Promise.all([
            axios.get('http://pelodashboard.com:5000/course_data', {
              params: {
                user_id : tmp_user_id
              }
            }),
          ]);

          table.data = firstResponse.data
      }

      asyncFunc(this.$t('dashboard.usersTable'), this.getCookieValue);
    },
  }
</script>
<style>
</style>
