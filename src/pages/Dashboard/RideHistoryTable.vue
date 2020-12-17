<template>
  <ride-table
    :data="table.data"
    :columns="table.columns"
    thead-classes="text-primary"
  >
  </ride-table>
</template>
<script>
import { RideTable } from "@/components";
import axios from "axios";
export default {
  components: {
    RideTable
  },
  computed: {
    table() {
      return this.$t("dashboard.usersTable");
    }
  },
  methods: {
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    }
  },
  mounted() {
    // once this is loaded we can pump in the course data
    async function asyncFunc(table, getCookieValue) {
      var user_id = getCookieValue("USER_ID");
      var course_url = "https://pelodashboard.com:5000/course_data/" + user_id;
      const [firstResponse] = await Promise.all([axios.get(course_url)]);

      // Let's get that unqiue set of instructors for filtering
      let instructor_set = new Set();

      var course_dict = firstResponse.data;
      var keys = Object.keys(course_dict);
      keys.forEach(e => {
        instructor_set.add(course_dict[e]['instructor']);
      });
  
      instructor_set = Array.from(instructor_set);
      table.data = firstResponse.data;
    }

    asyncFunc(this.$t("dashboard.usersTable"), this.getCookieValue);
  }
};
</script>
<style></style>
