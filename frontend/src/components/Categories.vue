<template>
  <div class="category-list">
    <div class="category-title">
      <div class="title-wrapper">
        <div class="title">{{ title }}</div>
        <div
          class="add-icon-wrapper"
          v-show="title === 'Open'"
          @click="isAddEditTaskModalOpen = true"
        >
          <AddIcon svg-class="w-10 h-10" />
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { isAddEditTaskModalOpen } from "./ListView.vue";
import AddIcon from "@/icons/AddIcon.vue";

export default {
  name: "CategoryView",
  components: { AddIcon },
  props: ["title"],
  setup() {
    return {
      isAddEditTaskModalOpen,
    };
  },
};
</script>

<style>
.category-list {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 0 10px 100px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 300px;
  font-family: sans-serif;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.category-title {
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
}

.title {
  text-align: center;
}

.add-icon-wrapper svg {
  margin-left: auto;
}
</style>
