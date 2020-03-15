<template>
  <div class="l-main-div">
    <input
      v-show="showList"
      type="text" 
      class='list-input'
      placeholder="Add List name .."
      v-model="listName"
      @keyup.enter="addListItem"
    />
    <div v-for="(list,index) in lists" :key="list.listId" class="list-items">
        <div
          v-if="list.listId !== selectedList" 
          v-show="sList" 
          class="list-label"
          @click="showTasksComp(list)">
          {{ list.listName }}
        </div>
        <input v-else type="text"
          @blur="updateList(selectedList,list.listName)"
          @keyup.enter="updateList(selectedList,list.listName)"
          class="list-edit" 
          v-model="list.listName"
         >
        <span> <img v-show="sList"  @click.stop="editListItem(list.listId)" src="../../assets/edit.png"></span>
        <span> <img  v-show="sList" @click.stop="removeListItem(list.listId,index)" src="../../assets/delete.png"></span>
        <task :list="list" v-show="showTask" @click="showTasksComp(list.listId)"/>
    </div>
  </div>
</template>

<script>
import Task from '../task/Task'
import { eventBus } from '../../main'
export default {
  name: 'List',
  props: ['showList'],
  components: { 'task': Task },
  data(){
    return{
      listId: 0,
      listName: '',
      lists: [],
      sList: this.showList,
      showTask: false,
      editable:false,
      selectedList:0
    }
  },
  methods:{
    async addListItem(){
      const response = await window.fetch('http://localhost:8000/list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ listName: this.listName })
        })
      const result = await response.json()
        this.lists.push({
          listId: result.listId,
          listName: this.listName
        });
      this.listName= ''
    },

    editListItem(listId){
      console.log('Edit List : ', listId)
      this.selectedList = listId
      this.editable = true
    },

    async updateList(listId,listName){
      console.log('Updated list: ', listId,listName)
      const response = await window.fetch('http://localhost:8000/list/' + listId,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ listName: this.listName })
        })
      let result = response.json() 
      this.listName = result.listName
      this.editable = false
      this.selectedList=''
    },

    async removeListItem (listId){
      await window.fetch('http://localhost:8000/list/' + listId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.lists = this.lists.filter(list => list.listId !== listId)
    },
    showTasksComp(list){
      console.log('Clicking...',list.listId,'=>',list.id)
      this.showTask = true
      this.sList = false
      eventBus.$emit('showComp', list.listId  )
    }
  },

  async created(){
    console.log('VVeena:', this.lists)
    const response = await window.fetch('http://localhost:8000/list/')
    const result =   await response.json()
    this.lists = result.lists
  }
}
</script>

<style scoped>
.l-main-div {
  width:100%;
  padding: 5px;
  margin: 5px;
  border:1px solid #ccc;
}
.list-input {
  border: 1px solid #ccc;
  padding:10px;
  width: 100%;
  margin-bottom: 18px;
}
.list-items {
  display: flex;
  margin-bottom: 12px;
  margin-left: 12px;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
}
.list-label {
  width:80%;
  font-size: 14px;
  word-wrap: break-word;
}
.list-input {
  border: 1px solid #ccc;
  /* margin-left: 12px; */
  padding:10px;
  width: 100%;
  margin-bottom: 18px;
}
</style>