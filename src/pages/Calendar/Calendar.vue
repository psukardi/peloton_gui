<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <full-calendar
          :options="calendarOptions"
          id="fullCalendar"
          ref="fullCalendar"
          :events="events"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth"
        },
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        events: [],
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
      }
    };
  },
  methods: {
    handleEventClick: function(arg) {
    },
    getCookieValue(a) {
      var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "f9982d7545db41be91e2fff28000547d";
    }
  },
  mounted() {
    // once this is loaded we can pump in the course data
    async function asyncFunc(calendar, getCookieValue) {
      var user_id = getCookieValue("USER_ID");
      var course_url = "http://pelodashboard.com:5000/course_data/" + user_id;
      const [firstResponse] = await Promise.all([axios.get(course_url)]);

      var dictionary = firstResponse.data;
      Object.keys(dictionary).forEach(function(key) {
        var __event__ = dictionary[key];
        var date  = __event__['date'];
        var title = __event__['name'];
        var duration = __event__['length'];
        calendar.push({
          title: title,
          date: date,
          duration: duration
        });
      });

      // pop all the data into calendar.push
    }

    asyncFunc(this.calendarOptions.events, this.getCookieValue);
    // this.calendarOptions.events.push({
    //   title: 'event 1', date: '2020-11-10'
    // });
  }
};
</script>
<style>
#fullCalendar {
  min-height: 400px;
}

.el-loading-spinner .path {
  stroke: #66615b !important;
}

.fc .fc-popover {
  position: fixed;
  top: 0;
  -shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.fc .fc-popover-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px 4px;
}

.fc .fc-col-header-cell {
  background: #ffffff;
}

.fc .fc-daygrid-day-frame {
  background: #ffffff;
}

.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 2px 4px;
}
</style>
