<template>
  <h1 class="title">Wrong Path</h1>
  <div class="content">
    <div class="content-title">Error 404</div>
    <div class="content-desc">
      <p>Please go back to a valid path...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WrongPathView",
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

.content {
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 10px 0 15rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.content-title {
  padding: 10px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
</style>
