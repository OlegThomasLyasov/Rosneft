<template>
  <div>
    <h1 class="title"> Web-визуализатор (просмоторщик)</h1>
    <div class="tabs">
      <button
          v-for="tab in tabs" :key="tab"
          :class="['tab-button', { active: active === tab.component }]"
          @click="active = tab.component">
        {{ tab.title }}
      </button>
    </div>
    <div class="tab-content">
      <component :is="active" :data="data"/>
    </div>
  </div>
</template>

<script>
// если нужна пагинация
import TablePagination from "@components/Table/TablePagination.vue";
import TableScrolling from "@components/Table/TableScrolling.vue";
import { shallowRef } from "vue";
export default {
  components: {
    TablePagination
  },
  data() {
    return {
      active: shallowRef(TablePagination),
      tabs: [{
        component: shallowRef(TablePagination),
        title: 'Pagination'
      },
      {
        component: shallowRef(TableScrolling),
        title: 'Scrolling'
      }]
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
  },
}

</script>
<style lang="stylus" scoped>
.title
  font-size 24px
  color green
  margin-top 10px

.tab-wrapper
  width 100%

.tab-content
  margin-top 20px

.tabs
  height 30px
  display flex
  gap 10px

.tab-button
  padding 6px 10px
  border-top-left-radius 3px
  border-top-right-radius 3px
  border 1px solid #ccc
  cursor pointer
  background #E0E0E0
  margin-bottom -1px
  margin-right 0
  height 30px

.tab-button
  &:hover
    background #ff5f5f

.tab-button
  &.active
    background #ff5f5f
    border-bottom 1px dotted #ffdcdc

</style>