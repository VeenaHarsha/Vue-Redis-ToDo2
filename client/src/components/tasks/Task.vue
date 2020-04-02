<template>
	<div class="task-main-div">
		<div class="navleft">
			<img v-on:click.stop="goBackToList" src="../../assets/left-arrow.png" />
			<p>{{ list.name }}</p>
		</div>
		<input
			type="text"
			class="task-input"
			placeholder="Add Task name .."
			v-model="name"
			@keyup.enter="addTask"
		/>
		<div v-for="task in getterData" :key="task.taskId">
			<div class="task-item">
				<input type="checkbox" v-model="task.completed" v-on:click.self="markComplete(task)" />
				<div class="task-label" :class="{ completed : task.completed }" v-on:click.stop="showMoreInfo(task.taskId)">{{ task.name }}</div>
				<img v-on:click.self="deleteTaskItem(task.taskId)" src="../../assets/delete.png" />
			</div>
			<div class="moreinfo-container" v-show="moreInfo && (selectedTask ===  task.taskId)">
				<div class="task-info-div" >
					<div class="task-name-note" ><input type="text" v-model="task.name" /></div>
					<div class="task-name-note" ><textarea  v-model="task.notes" cols="20" rows="10"></textarea></div>
				</div>
				<div class="task-info-div">
					<div class="task-pri-duedate"><input type="date" name="Due Date" id="dueDate" v-model="task.dueDate"/></div>
					<div class="task-pri-duedate">
						<select name="priority" v-model="task.priority">
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low" selected>Low</option>
						</select>
					</div>
					<div class="update"><button type="submit" @click="addTaskMoreInfo(task)"> Update Task </button></div>
				</div>
			</div>
		</div>
		<!-- <input type="button" name="submit" value="Submit" @click="addTaskMoreInfo(task)"/></div> -->
		<div class="task-foot-div">
			<div> <label><input type="checkbox" :checked="!isAllCompleted" @change="checkAllTasks"/> Check All</label></div>
			<div> {{ getActiveTasks }} Item(s) Left </div>
			<div>
				<button :class="{ active: filter == 'all'}"
						@click="filter = 'all'"> All
				</button>
				<button :class="{ active: filter == 'active'}"
						@click="filter = 'active'"> Active
				</button>
				<button :class="{ active: filter == 'completed'}"
						@click="filter = 'completed'"> Completed
				</button>
			</div>
			<div>
				<button v-if="showClearCompleted" @click="clearCompletedTasks"> Clear Completed </button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name: "Task",
  props: ["list"],
  data() {
    return {
		name: "",
		selectedTask: "",
		notes: "",
		priority: "",
		dueDate: "",
		completed: false,
		moreInfo: false,
		filter: 'all'
    };
  },
  computed: {
    getterData: function() {
		const tasks = this.getTaskItems();
		if(this.filter == 'active'){
			return tasks.filter(task => !task.completed)
		}else if(this.filter == 'completed'){
			return tasks.filter(task => task.completed)
		} else {
			return tasks;
		}
	},
	getActiveTasks(){
		const tasks = this.getTaskItems();
		return tasks.filter(task => !task.completed).length
	},
	isAllCompleted(){
		return this.getActiveTasks !== 0
	},
	showClearCompleted(){
		const tasks = this.getTaskItems();
		return tasks.filter(task => task.completed).length > 0
	}
  },
  methods: {
    ...mapGetters(["getLists", "showTask", "getSelectedList", "getTaskItems"]),
    ...mapActions(["createTask", "getTasksForSelList", "deleteTaskItem", "submitTaskMoreInfo", "getListItems" ]),
	...mapMutations(["toggleShowList", "toggleShowTask"]),
	
    addTask() {
		const task = {
			name: this.name,
			listId: this.list.listId,
			notes: this.notes,
			priority: this.priority,
			dueDate: this.dueDate,
			completed: this.completed
		};
		this.createTask(task);
		this.name = "";
    },
    markComplete(task) {
		// task.completed = !task.completed
		task.completed = (task.completed === 'false') ? !task.completed : task.completed
		this.submitTaskMoreInfo({ taskId: task.taskId , task:task })
    },
    showMoreInfo(id) {
		this.moreInfo = !this.moreInfo;
		this.selectedTask = id;
    },
    addTaskMoreInfo(task) {
      const taskInfo = {
        // taskId: task.taskId,
        name: task.name,
        notes: task.notes,
        priority: task.priority,
        dueDate: task.dueDate,
        completed: task.completed
      };
      this.submitTaskMoreInfo({ taskId: task.taskId , task:taskInfo });
      this.moreInfo = !this.moreInfo;
    },
    goBackToList() {
      this.toggleShowList(true);
      this.toggleShowTask(false);
      this.getListItems();
    },
	checkAllTasks(){
		const tasks = this.getTaskItems();
		tasks.forEach((task)=> {
			task.completed = event.target.checked
		})
	},
	clearCompletedTasks(){
		const tasks = this.getTaskItems();
		let compTasks = tasks.filter(task => task.completed)
		compTasks.forEach((task)=> {
			this.deleteTaskItem(task.taskId)	
		})
		
	}
  },
  created() {
	this.getTasksForSelList(this.list.listId);
  }
};
</script>

<style scoped>
.task-main-div {
  width: 100%;
  padding: 5px;
}
.navleft img {
  float: left;
  margin: 0;
  padding: 0 ;
}
.navleft p {
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
}
.task-item {
  display: flex;
  align-items: center;
  border: 1px dotted #ccc;
  font-size: 14px;
}
.task-item img {
  float: right;
}
.task-input {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  margin: 5px 0;
}
.task-label {
  padding: 0.5rem;
  border: 1px solid white;
  width: 40rem;
  font-size: 14px;
}
.completed {
  text-decoration: line-through;
}
.moreinfo-container {
	display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    border: 1px dotted #ccc;
	margin-top: 0.5rem;
}
.task-name-note input , textarea{
	flex-basis: 60%;
	margin-top: 0.5rem;
	border: 1px solid #ccc;
	width:160%;
}
.task-info-div {
	display: inline-block;
	margin-left: 20%;

}
.task-pri-duedate {
    flex-basis: 40%;
    padding-left: 0.5rem;
	margin: 0.5rem;
}

button {
	margin-left:0.9rem;
	padding:0.2rem;
	font-weight: bold;
}
.task-foot-div {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  text-align: center;
  background-color: lightgray;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}
.active {
	background-color: grey;
	color:white;
}
</style>