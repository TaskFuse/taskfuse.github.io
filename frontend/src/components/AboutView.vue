<template>
  <h1 class="title">About</h1>
  <div class="credits">
    <div class="mainCredit">
      <p>
        This website is developed by Abdul4968 and Darrenefecto. The frontend
        was mainly done by Abdul4968, while the backend was done by
        Darrenefecto.
      </p>
    </div>

    <div class="darren-credits">
      <div class="darren-title">Darrenefecto</div>
      <div class="darren-desc">
        <p>
          Website:
          <a
            style="text-decoration: underline"
            href="https://darrenefecto.github.io/"
            >darrenefecto.github.io/</a
          >
        </p>
        <br /><br />
        <p>...</p>
      </div>
    </div>

    <div class="abdul-credits">
      <div class="abdul-title">Abdul4968</div>
      <div class="abdul-desc">
        <p>
          Website:
          <a
            style="text-decoration: underline"
            href="https://abdul4968.github.io/"
            >abdul4968.github.io/</a
          >
        </p>
        <p></p>
        <br /><br />
        <p>...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components: {},
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

.credits {
  display: block !important;
  justify-content: space-between;
}

.mainCredit {
  max-width: 550px;
  font-size: 25px;
  background-color: rgba(200, 230, 255, 0.9);
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.abdul-credits {
  max-width: 550px;
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.abdul-title {
  padding: 10px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.darren-credits {
  max-width: 550px;
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.darren-title {
  padding: 10px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

@media only screen and (min-width: 1000px) {
  .mainCredit .darren-credits .abdul-credits {
    font-size: 40px;
  }
}
</style>
