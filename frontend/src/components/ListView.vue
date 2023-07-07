<template>
  <h1 class="title">Task List</h1>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__bounceInRight"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <div
      v-if="showScrollToTop"
      class="cursor-pointer fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="scrollToTop"
    >
      <ArrowUpIcon class="w-10 h-10" />
    </div>
  </Transition>
  <div class="Lists-Container">
    <CategoryView title="Open" category="Open">
      <ul>
        <draggable
          v-model="openTasks.value"
          group="tasks"
          class="drag-list"
          @add="($event) => updateTaskCategory($event, 'Open')"
        >
          <li
            v-for="task in openTasks"
            :key="task.id"
            class="card"
            :data-task-id="task.taskId"
            :style="{
              backgroundColor:
                colors.find((c) => c.name === task.color)?.hex || task.color,
            }"
          >
            <div>
              <b>{{ task.title }}</b
              ><br /><br />
              {{ task.desc }}
              <div
                class="text-blue-500 hover:text-blue-700 font-bold rounded flex justify-end"
              >
                <EditIcon
                  svg-class="w-10 h-10"
                  @click="editTask(task)"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </li>
        </draggable>
      </ul>
    </CategoryView>
    <CategoryView title="In Progress" category="InProgress">
      <ul>
        <draggable
          v-model="inProgressTasks.value"
          group="tasks"
          class="drag-list"
          @add="($event) => updateTaskCategory($event, 'InProgress')"
        >
          <li
            v-for="task in inProgressTasks"
            :key="task.id"
            class="card"
            :data-task-id="task.taskId"
            :style="{
              backgroundColor:
                colors.find((c) => c.name === task.color)?.hex || task.color,
            }"
          >
            <div>
              <b>{{ task.title }}</b
              ><br /><br />
              {{ task.desc }}
              <div
                class="text-blue-500 hover:text-blue-700 font-bold rounded flex justify-end"
              >
                <EditIcon
                  svg-class="w-10 h-10"
                  @click="editTask(task)"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </li>
        </draggable>
      </ul>
    </CategoryView>
    <CategoryView title="Closed" category="Closed">
      <ul>
        <draggable
          v-model="closedTasks.value"
          group="tasks"
          class="drag-list"
          @add="($event) => updateTaskCategory($event, 'Closed')"
        >
          <li
            v-for="task in closedTasks"
            :key="task.id"
            class="card"
            :data-task-id="task.taskId"
            :style="{
              backgroundColor:
                colors.find((c) => c.name === task.color)?.hex || task.color,
            }"
          >
            <div>
              <b>{{ task.title }}</b
              ><br /><br />
              {{ task.desc }}
              <div
                class="text-blue-500 hover:text-blue-700 font-bold rounded flex justify-end"
              >
                <EditIcon
                  svg-class="w-10 h-10"
                  @click="editTask(task)"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </li>
        </draggable>
      </ul>
    </CategoryView>
  </div>
  <AddEditTaskModal
    v-if="isAddEditTaskModalOpen"
    @cancel-add-task-modal="closeTaskModal"
    @fetch-tasks="fetchTasks"
    :task-data="getTaskData"
    :is-update="!!taskData?.taskId"
  />
</template>

<script>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import axios from "axios";
import AddEditTaskModal from "@/components/AddEditTaskModal.vue";
import CategoryView from "@/components/Categories.vue";
import { VueDraggableNext } from "vue-draggable-next";
import EditIcon from "@/icons/EditIcon.vue";
import ArrowUpIcon from "@/icons/ArrowUpIcon.vue";
import { colors } from "@/assets/colors";

export const isAddEditTaskModalOpen = ref(false);
export function isValidHexCode(hexCode) {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(hexCode);
}

export default {
  isAddEditTaskModalOpen,
  isValidHexCode,
  name: "HomeView",
  components: {
    CategoryView,
    EditIcon,
    ArrowUpIcon,
    AddEditTaskModal,
    draggable: VueDraggableNext,
  },
  setup() {
    const tasks = ref([]);
    const taskData = ref(null);

    const openTasks = computed(() =>
      tasks.value.filter((task) => task.taskCategory === "Open")
    );
    const inProgressTasks = computed(() =>
      tasks.value.filter((task) => task.taskCategory === "InProgress")
    );
    const closedTasks = computed(() =>
      tasks.value.filter((task) => task.taskCategory === "Closed")
    );

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const showScrollToTop = ref(false);

    const handleScroll = () => {
      showScrollToTop.value = window.scrollY > 300;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeMount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const saveTask = async (task) => {
      const updatedTask = {
        taskId: task.taskId,
        title: task.title,
        desc: task.desc,
        taskCategory: task.taskCategory,
        color: isValidHexCode(task.color)
          ? task.color
          : colors.find((c) => c.name === task.color.toLowerCase())?.hex ||
            "#DBEAFEFF",
      };

      taskData.value = updatedTask;

      try {
        await fetch(
          `${process.env.VUE_APP_BACKEND_URL}/tasks/${updatedTask.taskId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    const editTask = (task) => {
      taskData.value = task;
      isAddEditTaskModalOpen.value = true;
    };

    const getTaskData = computed(() => {
      if (taskData.value === null) {
        return {
          title: "",
          desc: "",
          taskCategory: "Open",
          color: "#DBEAFEFF",
        };
      }
      return {
        taskId: taskData.value?.taskId,
        title: taskData.value?.title,
        desc: taskData.value?.desc,
        taskCategory: taskData.value?.taskCategory,
        color: taskData.value?.color,
      };
    });

    const closeTaskModal = () => {
      isAddEditTaskModalOpen.value = false;
      taskData.value = null;
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/tasks`
        );
        const { open, inProgress, closed } = response.data;
        tasks.value = [...open, ...inProgress, ...closed];
      } catch (error) {
        console.error(error);
      }
    };

    const updateTaskCategory = async (event, newCategory) => {
      const taskElement = event.item; // Get the task element from the event data
      const taskId = taskElement.dataset.taskId; // Get the taskId from the dataset attribute

      // Find the task in the tasks array based on the taskId
      const task = tasks.value.find((task) => task.taskId === taskId);

      if (!task) {
        console.error("Task not found");
        return;
      }

      // Check if the task has already been dragged to a category
      if (task.taskCategory !== newCategory) {
        // Update the task category
        task.taskCategory = newCategory;

        // Make the API call to update the task on the server
        try {
          await saveTask(task);
        } catch (error) {
          console.error(error);
        }
      }
    };

    onMounted(fetchTasks);

    return {
      tasks,
      taskData,
      scrollToTop,
      isAddEditTaskModalOpen,
      showScrollToTop,
      editTask,
      isValidHexCode,
      saveTask,
      getTaskData,
      closeTaskModal,
      fetchTasks,
      openTasks,
      inProgressTasks,
      closedTasks,
      updateTaskCategory,
      colors,
    };
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.Lists-Container {
  display: flex !important;
}

ul {
  list-style: none;
}

li {
  background-color: #dbeafeff;
  overflow-wrap: break-word;
  border-radius: 0.5rem /* 8px */;
  padding: 1rem /* 16px */;
  margin-top: 0.5rem /* 8px */;
  margin-bottom: 0.5rem /* 8px */;
  color: rgb(30 58 138);
}

.title {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  margin: 20px 10px 10px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 300px;
  box-shadow: 4px 10px 16px -5px rgba(0, 0, 0, 0.7);
}

.drag-list {
  min-height: 50px;
  padding: 0;
}

.card {
  color: #3490dc;
  text-decoration: none;
  list-style: none;
}

.card:hover {
  color: #1d68a7;
}

@media only screen and (max-width: 1000px) {
  .Lists-Container {
    display: inline !important;
  }

  .category-list {
    margin-bottom: 20px !important;
  }
}
</style>
