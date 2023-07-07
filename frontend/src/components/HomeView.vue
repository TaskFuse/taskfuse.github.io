<template>
  <h1 class="title">Welcome to Task Fuse!</h1>
  <div class="grid grid-cols-100 gap-3 text">
    <h2>
      Task Fuse is your platform to create and manage your own personalized to
      do lists and tasks. With a user friendly interface and powerful features,
      staying organized and efficient has never been easier with Task Fuse.
    </h2>
    <br />
    <h3>
      Whether you're a busy professional juggling multiple projects, a student
      managing classes and assignments managing classes and assignments, or just
      someone who wants to stay on top of their daily of your daily tasks, Task
      Fuse will help.
    </h3>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 20px 10px 10px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 300px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.text {
  max-width: 1000px;
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 20px 10px 10px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}
</style>
