<template>
  <div class="t-main-div">
    <h1>{{ list.listName }} -{{ list.listId }} -{{ selectedList }}</h1>
    <input class="task-input"
      v-if="list.listId === selectedList"
      @keyup.enter="addTaskItem" 
      type="text" v-model="taskName" 
      placeholder="Add Task..." 
    />
    <input v-else class="task-input"
      @keyup.enter="addTaskItem" 
      type="text" v-model="taskName" 
      placeholder="Add Task..." 
    />

  </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
  name: "Task",
  props: ["list"],
   data(){
    return {
      taskName:'',
      selectedList: 0
    }
   },
  created() {
    console.log("Am listening...");
     eventBus.$on("showComp", (listId) => {
      this.selectedList = listId;
     });
  } 
};
</script>

<style>
*, *::before, *::after {
    box-sizing: border-box;
}
.t-main-div {
  width:100%;
  padding: 5px;
  margin: 5px;
  border:1px solid cyan;
}
.images {
  width: 16px;
  height: 16px;
  padding:10px;
}
[type="checkbox"] {
    margin-right: 1rem;
    font-size: 2rem;
}
.task-input {
  border: 1px solid #ccc;
  /* margin-left: 10px; */
  padding:10px 10px;
  width: 100%;
  /* margin-bottom: 18px; */
}
.task-items {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 4px;
  width:100%;
}
.task-label-item {
  width:60%;
  word-wrap: break-word;
}
span > img {
  width:32px;
  height:32px;
  padding: 5px;
}
</style>