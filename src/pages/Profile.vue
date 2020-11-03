<template>
  <div>
    <div class="row">
      <div class="col-md-12" v-if="showUser">
        <user-card :user="user"></user-card>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  import axios from "axios";
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    methods:{
      getCookieValue(a) {
          var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
          return b ? b.pop() : 'f9982d7545db41be91e2fff28000547d';
      }
    },
    data() {
      return {
        user: {
          fullName: '',
          title: '',
          description: ``,
          photoUrl: '',
          totalAchievements: '',
          totalRides: '',
          totalMiles: '',
        },
          showUser:true,
          showLogin:true
      }
    },
    mounted() {

      const signupForm = document.getElementById('login-form');
      const email = signupForm.querySelector('input[name=email]');
      const password = signupForm.querySelector('input[name=password]');
      const user = this.user;

      signupForm.addEventListener('submit', processSignupForm);

      function processSignupForm(e){
        e.preventDefault();
        async function loadUser(user, parent){
          var user_id = getCookieValue("USER_ID");
          rollup_url = 'http://pelodashboard.com:5000/get_user_rollup/' + user_id

          const [rollup] = await Promise.all([
            axios.get(rollup_url)
          ]);

          user.totalAchievements = rollup.data.total_achievements;
          user.totalRides = rollup.data.total_rides;
          user.totalMiles = rollup.data.total_miles;

        }

        loadUser(user, this.showUser, this.getCookieValue);
      }
    }
  }
</script>
<style>
</style>
