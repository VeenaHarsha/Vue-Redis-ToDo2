<template>
  <div class="task-main-div">
    <div>
      <strong>Add Tasks For : {{ list.name }}</strong>
      <input
        type="text"
        class="task-input"
        placeholder="Add Task name .."
        v-model="name"
        @keyup.enter="addTask"
      />
    </div>
    <div v-for="task in getterData" :key="task.taskId">
		<div class="task-item">
			<input type="checkbox" v-model="task.completed" @click.stop="markComplete(task)" />
			<div class="task-label" @click.stop="showMoreInfo(task.taskId)">{{ task.name }}</div>
			<span> <img @click.stop="removeTaskItem(task.taskId)" src="../../assets/delete.png"/> </span>
		</div>
		<div v-show="moreInfo && (selectedTask ===  task.taskId)">
			<div class="task-info-div" @keyup.enter="addTaskMoreInfo(task)">
				<input type="text" class="task-more-input" v-model="task.name" />
				<textarea class="task-more-input" v-model="task.notes" cols="20" rows="10"></textarea>
				<div class='task-pr-date'>
					<select name="priority" v-model="task.priority">
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low" selected>Low</option>
					</select>
					<input type="date" name="Due Date" id="dueDate" v-model="task.dueDate"/>
				</div>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Task",
  props: ["list"],
  data() {
    return {
		name: '',
		selectedTask: '',
		notes:'',
		priority: '',
		dueDate: '',
		completed: false,
		moreInfo: false
    }   
  },
  computed: {
    getterData: function(){
		const tasks = this.getTaskItems()
		console.log('Vin Tasks:', tasks)
		return tasks
    }
  },
  methods: {
    ...mapGetters(["showTask", "getSelectedList", "getTaskItems"]),
    ...mapActions(["createTask", "getTasksForSelList", "deleteTaskItem",'submitTaskMoreInfo']),

    addTask() {
      const task = { 
        name:this.name,
        listId:this.list.listId,
        notes:this.notes,
        priority:this.priority,
        dueDate:this.dueDate,
        completed:this.completed
       }
      this.createTask(task)
      this.name = ""
    },
    markComplete(task) {
		task.completed = !task.completed
    },
    removeTaskItem(id) {
		this.deleteTaskItem(id)
		this.getTasksForSelList(this.list.listId)
    },
    showMoreInfo(id) {
		this.moreInfo = !this.moreInfo
		this.selectedTask = id
		const lid = this.getSelectedList()
		this.getTasksForSelList(lid)
    },
    addTaskMoreInfo(task){
      const taskInfo = {
			taskId:task.taskId,
			name:task.name,
			notes:task.notes,
			priority:task.priority, 
			dueDate:task.dueDate,
			completed:task.completed
		}
			this.submitTaskMoreInfo(taskInfo)
			this.moreInfo = !this.moreInfo
    }
  },
  created() {
    this.getTasksForSelList(this.list.listId)
  },
  mounted(){
    this.getTaskItems()
  }
};
</script>

<style scoped>
.task-main-div {
  width: 100%;
  padding: 5px;
}
.task-item {
  display: flex;
  align-items: center;
  border:1px dotted #ccc;
  font-size: 14px;
}
.task-item span > img{
  float: right;
}
.task-input {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  margin: 8px 0;
}
.task-label {
  padding: 0.5rem;
  border: 1px solid white;
  width:40rem;
  font-size: 14px;
}
.is-complete {
  text-decoration: line-through;
}
.task-info-div {
  justify-content: center;
  width: 80%;
  border: 1px solid #ccc;
  margin-top:0.25rem;
}
.task-more-input {
 border: 1px solid #ccc;
 display: flex;
 flex-direction: column;
  padding: 10px;
  width: 75%;
  margin: 10px;
}
.task-pr-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}
</style>