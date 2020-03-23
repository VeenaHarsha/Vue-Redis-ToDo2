<template>
  <div>
    <div class='list-items' v-show='showList()'>
      <div v-show='!editable'
           class='list-label'
           @click.stop='showTasksComp(list.listId)'
      > {{ list.name }} </div>
      <input
        type='text'
        v-show='editable'
        @blur='updateListItem( selectedList, list.name )'
        @keyup.enter='updateListItem( selectedList, list.name )'
        class='list-edit'
        v-model='list.name'
      />
      <span> <img @click='editListItem(list.listId)' src='../../assets/edit.png' /> </span>
      <span> <img @click='removeListItem(list.listId)' src='../../assets/delete.png' /> </span>
    </div>
    <task-item :list='list' :selectedList='selectedList' v-show='showTask'/>
  </div>
</template>

<script>
import Task from '../tasks/Task';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ListItems',
  props: ['list'],
  data() {
    return {
      editable: false,
      selectedList: ''
    };
  },
  computed: {},
  components: { 'task-item': Task },
  methods: {
    ...mapGetters(['getLists', 'showList', 'showTask']),
    ...mapActions(['deleteList', 'getListItems','updateList']),
    ...mapMutations(['toggleShowList','toggleShowTask']),
    
    showTasksComp(listId) {
      this.selectedList = listId
      this.toggleShowList(false)
      this.toggleShowTask(true)
    },

    removeListItem(listId){
      this.deleteList(listId)
      this.getListItems()
    },

    editListItem(listId) {
      this.editable = true;
      this.selectedList = listId;
    },

    updateListItem(lId, name) {
     this.updateList( {id: lId, name: name})
     this.editable = false
    }
  },
  created(){
      this.getListItems()
    }
}
</script>

<style scoped>
.list-items {
  display: flex;
  margin-bottom: 12px;
  margin-left: 12px;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
}
.list-label {
  width: 80%;
  font-size: 14px;
  word-wrap: break-word;
}
</style>