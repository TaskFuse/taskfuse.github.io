<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-left">
          <div class="link">
            <img src="./assets/logo.png" alt="Task Fuse Logo" class="logo" />
          </div>
        </div>
        <div class="navbar-middle">
          <b>
            <router-link to="/" class="link">Home</router-link>
            <router-link to="/list" class="link">TaskList</router-link>
            <router-link to="/about" class="link">About</router-link>
          </b>
        </div>
        <div class="navbar-right">
          <UserIcon id="userLogo" svg-class="w-30 h-30" />
        </div>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
    <footer class="footer">
      <div class="footer-content container mx-auto">
        <div class="footer-left">
          <img
            @click="plus"
            src="./assets/logo.png"
            alt="Task Fuse Logo"
            class="logo cursor-not-allowed"
          />
          <p>TaskFuse</p>
        </div>
        <div class="footer-middle">
          <p>
            Contact via E-Mail:
            <a
              href="mailto:taskfuse.website@gmail.com"
              style="text-decoration: underline"
              >taskfuse.website@gmail.com
            </a>
          </p>
        </div>
        <div class="footer-right">
          <ul class="footer-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/list">TaskList</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import UserIcon from "@/icons/UserIcon.vue";
let secretClicks = 0;

export default {
  name: "App",
  components: { UserIcon },

  mounted() {
    const randomBgNumber = Math.floor(Math.random() * 5) + 1;
    const bgUrl = require(`@/assets/BG${randomBgNumber}.png`);
    this.$nextTick(() => {
      this.$el.style.backgroundImage = `url(${bgUrl})`;
    });
  },

  setup() {
    function plus() {
      secretClicks++;

      if (secretClicks === 3) {
        secretClicks = 0;
        location.href = "/secret";
      }
      return;
    }

    return {
      secretClicks,
      plus,
    };
  },
};
</script>

<style scoped>
#app {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
}

footer li {
  margin: 0 0 0 0;
}

footer {
  margin-top: 100px;
  background-color: #a0d3ff;
  padding: 30px;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -15px 16px -5px rgba(0, 0, 0, 0.3);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-left p {
  margin-left: 10px;
}

.footer-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

footer ul {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.navbar {
  background-color: #a0d3ff;
  padding: 5px;
  display: flex;
  position: relative;
  margin-top: 0;
  width: 100%;
  box-shadow: 0 15px 16px -5px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-middle {
  display: flex;
  align-items: center;
  font-size: 19px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.link {
  margin-right: 35px;
}

.logo {
  box-shadow: 0px 0px 35px 7px #62b7ff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

#userLogo {
  width: 40px;
  height: 40px;
}
</style>

<!-- Global styling to this component and to its children -->
<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  @apply font-sans antialiased text-blue-800;
}

.content {
  width: 100%;
  max-width: 600px; /* adjust as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link {
  @apply mx-4;
}

nav {
  @apply my-8;
}

h1 {
  @apply text-4xl font-bold text-blue-500 mb-4 text-center;
}

ul {
  @apply list-none;
  width: 100%;
  max-width: 500px; /* adjust as needed */
}

ul li {
  @apply mb-2 text-center;
}
</style>
