<template>
  <div class='task-info-div' v-show='showTask()'>
    <div v-show='moreInfo && selectedTask'>
      <input type="text" class="task-input" v-model="task.name"/>
      <input type="text" class="task-input" v-model="info" />
      <div class='task-item'>
        <select name="priority">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input type="date" name="Due Date" id="duedate">
      </div>
      
    <input type="button" value="Submit">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'TaskMoreInfo',
	props:['task','selectedTask','moreInfo'],
	data(){
		return{
			info:''
		}
  },
  methods:{
      ...mapGetters(['showTask']),
  }
};
</script>

<style scoped>
.task-info-div {
  width: 100%;
  padding: 5px;
  margin: 5px;
  left: 0px;
  border: 1px solid #ccc;
}
.task-input {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  margin-bottom: 18px;
}
.task-item {
  display: flex;
  margin-bottom: 12px;
  /* margin-left: 12px; */
  /* align-items: center; */
  font-size: 14px;
  justify-content: space-between;
  /* background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted; */
}
</style>