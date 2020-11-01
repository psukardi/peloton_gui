<template>
  <div>
    <div class="row">
      <div class="col-md-4" v-if="showLogin">
        <card>
        <form id="login-form">
          <input label="Email address"
                      name="email"
                      type="email"
                      placeholder="Enter email">
              <small slot="helperText" id="emailHelp" class="form-text text-muted">
                We will not save this information, simply log you into peloton.
              </small>
          </input>
          <input label="Password"
                      name="password"
                      type="password"
                      placeholder="Password">
          </input>
        <base-button native-type="submit" type="primary">Submit</base-button>
        </form>
    </card>
      </div>
      <div class="col-md-8" v-if="showUser">
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
          const [credentials] = await Promise.all([
             axios.post('http://pelodashboard.com:5000/peloton_login',{ email: email.value, passwd: password.value})
          ]);

          const user_info = await axios.get('http://pelodashboard.com:5000/get_user_rollup', {
            params: credentials.data
          });

          user.fullName = user_info.data.name;
          user.photoUrl = user_info.data.photo_url;
          user.totalAchievements = user_info.data.total_achievements;
          user.totalRides = user_info.data.total_rides;
          user.totalMiles = user_info.data.total_miles;

        }

        loadUser(user, this.showUser);
      }
    }
  }
</script>
<style>
</style>
