<template>
  <div class='l-main-div'>
    <div>
      <input
        v-show='showList()'
        type='text'
        class='list-input'
        placeholder='Add List name..'
        v-model='listName'
        @keyup.enter='addListItem'
      />
    <list-items v-for='list in searchLists' :key='list.listId' :list='list' />
    </div>
  </div>
</template>

<script>
import ListItems from './ListItems'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'List',
  data() {
    return {
      listName: '',
      editable: false,
      selectedList: ''
    }
  },
  components: { 'list-items': ListItems },
  computed: {
     searchLists: function() {
      const lists = this.getLists()
      return lists
    }
  },
  methods: {
    ...mapGetters(['getLists','showList']),
    ...mapActions(['getListItems', 'addList']),

    addListItem() {
      this.addList(this.listName)
      this.listName = ''
    }
  },
  created(){
      this.getListItems()
    }
}
</script>

<style scoped>
  .l-main-div {
    width: 100%;
    padding: 5px;
    margin: 5px;
    border: 1px solid #ccc;
  }
  .list-input {
    border: 1px solid #ccc;
    padding: 10px;
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
    width: 80%;
    font-size: 14px;
    word-wrap: break-word;
  }
</style>