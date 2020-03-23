<template>
  <div class='task-main-div'>
      <div v-show='selectedList'>
         <h3>Add Tasks For :{{ list.name }} </h3>
          <input 
          type='text'
          class='task-input' 
          placeholder='Add Task name ..' 
          v-model='taskName' 
          @keyup.enter='addTask'
        />
        
        <div
          v-for='task in tasks'
          :key='task.id'
          v-bind:class="{'is-complete':task.completed}"
        >
        <div class="task-item">
          <input type='checkbox' v-on:change='markComplete(task)' />
          <div class="task-label"  @click='showTaskInfo(task.id)'> {{ task.name }} </div>  
          <!-- <span> <img @click.stop='editTaskItem(task.id)' src='../../assets/edit.png' /></span> -->
          <span> <img @click.stop='removeTaskItem(task.id)' src='../../assets/delete.png'/></span>
        </div>
        <task-more-info v-show='showTask' :task='task'  :selectedTask='selectedTask' :moreInfo='moreInfo'/>
      </div>
      
    </div>
  </div>
</template>

<script>
import TaskMoreInfo from './TaskMoreInfo'
import { mapGetters, mapMutations } from 'vuex';
export default {
	name: 'Task',
	components: {'task-more-info': TaskMoreInfo},
  props: ['list' , 'selectedList'],
  data() {
    return {
			tasks:[],
      taskName: '',
      selectedTask: '',
      moreInfo: false
    };
  },
  computed: {},
	methods:{
    ...mapMutations(['toggleShowTask']),
     ...mapGetters(['showTask']),
		addTask() {
      this.tasks.push({listid: this.list.id,name: this.taskName, completed:false});
      this.taskName = ''
    },
		markComplete(task){
			task.completed = !task.completed
		},
		removeTaskItem(id){
      this.tasks = this.tasks.filter(task => task.id !==id)
		},
		editTaskItem(task){
      this.selectedTask = task.id
    },
    showTaskInfo(id) {
      this.selectedTask = id
      this.toggleShowTask(false)
      this.moreinfo = true
    }
	}
}
</script>

<style scoped>
.task-main-div {
  width: 100%;
  padding: 5px;
  margin: 5px;
}
.task-input {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  margin-bottom: 18px;
}
.task-label {
  font-size: 14px;
  word-wrap: break-word;
}
.task-item {
  /* display: inline-flex; */
  margin-bottom: 12px;
  width: 550px;
  font-size: 14px;
  justify-content: space-between;
}
.is-complete {
  text-decoration: line-through;
}
</style>