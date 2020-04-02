<template>
  <div class="l-main-div">
    <input
      v-show="showList()"
      type="text"
      class="list-input"
      placeholder="Add List name.."
      v-model="listName"
      @keyup.enter="addListItem"
    />
    <list-items v-for="list in searchLists" :key="list.listId" :list="list" />
  </div>
</template>

<script>
import ListItems from "./ListItems"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "List",
  data() {
    return {
      listName: ""
    }
  },
  components: { "list-items": ListItems },
  computed: {
    searchLists: function() {
      const lists = this.getLists()
      return lists
    }
  },
  methods: {
    ...mapGetters(["getLists", "showList"]),
    ...mapActions(["getListItems", "addList"]),

    addListItem() {
      if(this.listName.trim().length == 0) return
      this.addList(this.listName)
      this.listName = ""
    }
  },
  created() {
      this.getListItems()
  }
};
</script>

<style scoped>
.l-main-div {
  width: 100%;
  padding: 5px;
}
.list-input {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>