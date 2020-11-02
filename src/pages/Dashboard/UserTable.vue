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
    methods:{
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
        async function asyncFunc(table, getCookieValue){
          var tmp_user_id = getCookieValue("USER_ID")
          var url = 'http://pelodashboard.com:5000/course_data/' + tmp_user_id;
          const [firstResponse] = await Promise.all([
              axios({
                method: 'get',
                url: url,
              }).catch(function (error){
                alert(error);
                alert(JSON.stringify(error));
              })
          ]);

          table.data = firstResponse.data
        }

        asyncFunc(this.$t('dashboard.usersTable'), this.getCookieValue);
    },
  }
</script>
<style>
</style>
