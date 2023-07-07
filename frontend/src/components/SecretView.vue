<template>
  <h1 class="title">Secret</h1>
  <p class="text">Secret coming soon! :}</p>
</template>

<script>
export default {
  name: "SecretView",
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
  -webkit-box-shadow: #fff 0 -1px 4px, lightblue 0 -2px 10px,
    dodgerblue 0 -10px 20px, blue 0 -18px 40px,
    20px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: #fff 0 -1px 4px, lightblue 0 -2px 10px, dodgerblue 0 -10px 20px,
    blue 0 -18px 40px, 20px 5px 15px 5px rgba(0, 0, 0, 0);
}

.text {
  margin: 0 0 300px;
}
</style>
