<template>
  <Dialog :open="true" @close="closeModal" class="relative z-50">
    <div
      class="fixed inset-0 flex items-center justify-center p-4 bg-gray-900/90"
    >
      <DialogPanel
        class="w-full max-w-lg rounded bg-white px-4 py-4 rounded-md"
      >
        <div class="flex justify-between">
          <DialogTitle class="font-bold text-lg mb-4">
            <span v-if="isUpdate">Edit Task</span>
            <span v-else>New Task</span>
          </DialogTitle>
          <button
            v-if="isUpdate"
            class="button secondary-button"
            @click="deleteTask"
          >
            <TrashIcon />
          </button>
        </div>
        <form>
          <p class="input-label">Title</p>
          <input
            class="input-field"
            placeholder="My new task"
            v-model="editedTask.title"
            maxlength="21"
            @keyup.enter="saveTask"
          />
          <p class="input-label">Description</p>
          <input
            class="input-field"
            placeholder="My new description"
            v-model="editedTask.desc"
            maxlength="201"
            @keyup.enter="saveTask"
          />
          <p class="input-label">Color</p>
          <input
            class="input-field"
            placeholder="My new Color (HEX-Code)"
            v-model="editedTask.color"
            maxlength="201"
            @keyup.enter="saveTask"
          />
        </form>
        <div class="grid grid-cols-2 gap-2 mt-8">
          <button class="button default-button" @click="closeModal">
            <!--Styling aliases defined in tailwind.css-->
            Cancel
          </button>
          <button class="button primary-button" @click="saveTask">Save</button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script>
import { ref } from "vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import TrashIcon from "@/icons/TrashIcon.vue";
import { isValidHexCode } from "./ListView.vue";
import { colors } from "@/assets/colors";

export default {
  components: {
    TrashIcon,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  props: {
    taskData: Object,
    isUpdate: Boolean,
  },
  setup(props, { emit }) {
    const BASE_BACKEND_URL = process.env.VUE_APP_BACKEND_URL;
    const emptyTask = {
      taskId: "",
      title: "",
      desc: "",
      taskCategory: "",
      color: "",
    };

    const editedTask = ref(
      props.taskData ? { ...props.taskData } : { ...emptyTask }
    );

    const closeModal = () => {
      emit("cancel-add-task-modal");
    };

    const fetchTasks = () => {
      emit("fetch-tasks");
    };

    const saveTask = async () => {
      const taskBase = {
        title: editedTask.value.title,
        desc: editedTask.value.desc,
        taskCategory: editedTask.value.taskCategory,
        color: isValidHexCode(editedTask.value.color)
          ? editedTask.value.color
          : colors.find((c) => c.name === editedTask.value.color.toLowerCase())
              ?.hex || "#DBEAFEFF",
      };
      let charDescLimit = 200;
      let charTitleLimit = 20;

      // Character limit
      if (taskBase.desc.length > charDescLimit) {
        taskBase.desc = taskBase.desc.substring(0, charDescLimit);
        alert(
          "You cannot reach over " +
            charDescLimit +
            " characters in your description field."
        );
      }

      if (taskBase.title.length > charTitleLimit) {
        taskBase.title = taskBase.title.substring(0, charTitleLimit);
        alert(
          "You cannot reach over " +
            charTitleLimit +
            " characters in your title field."
        );
      }

      // if task is empty, delete task
      if (taskBase.title === "") {
        return closeModal();
      }

      try {
        if (props.isUpdate && editedTask.value.taskId) {
          await fetch(`${BASE_BACKEND_URL}/tasks/${editedTask.value.taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskBase),
          });
        } else {
          await fetch(`${BASE_BACKEND_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskBase),
          });
        }
        fetchTasks();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteTask = async () => {
      try {
        await fetch(`${BASE_BACKEND_URL}/tasks/${editedTask.value.taskId}`, {
          method: "DELETE",
        });

        fetchTasks();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      emptyTask,
      editedTask,
      deleteTask,
      closeModal,
      saveTask,
    };
  },
};
</script>
