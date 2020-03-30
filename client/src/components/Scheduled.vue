<template>
	<div class='sch-container'>
		<div>
			<h3>Completed</h3>
			<h3>Task Name</h3>
			<h3>List Name</h3>
			<h3>Due Date</h3>
		</div>
		<div class='sch-items' v-for="task in getterData" :key="task.taskId">	
			<input class="task-label" type="checkbox" v-model="task.completed"/>
			<div class="task-label">{{ task.name }}</div>
			<div class="task-label">{{ task.listName }}</div>
			<div class="task-label">{{ task.dueDate }}</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Scheduled',
	computed: {
		getterData: function(){
			const tasks = this.getScheduledTasks()
			return tasks
		}
	},
	methods: {
		...mapGetters(['getScheduledTasks']),
		...mapActions(['getSchTasks'])
	},
	created(){
		this.getSchTasks()
	}
}
</script>

<style scoped>
	* {
		margin: 0;
		text-align: justify;	
	}
	.sch-container{
		border: 1px solid #ccc;
	}
	h3 {
		display: inline-block;
		width: 25%;
		padding: 0.5rem;
		border-bottom: 1px solid #ccc;
	}
	.sch-items {
		display: flex;
		align-items: center;
		border:1px dotted #ccc;
		font-size: 14px;
	}
	.task-label {
		display: inline-block;
		padding: 0.5rem;
		width: 25%;
	}
</style>