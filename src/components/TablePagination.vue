<template>
<section>
    <h1 class="title"> Web-визуализатор (просмоторщик)</h1>
    <button @click="prevPage" :disabled="pageNumber === 0">
      Previous
    </button>
    <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">
      Next
    </button>
    <keep-alive>
      <table>
          <thead>
              <tr>
                  <th>Порядковый номер</th>
                  <th>Число</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(element, index) of paginatedData" :key="index">
                  <th >{{ index }}</th>
                  <th >{{ element }}</th>
              </tr>
          </tbody>
      </table>
    </keep-alive>
</section>
</template>

<script>
export default {
    data() {
      return {
        pageNumber: 0
      }
    },
    props: {
          data: {
              type: Array,
              required: true
          },
          size: {
            type: Number,
            required: false,
            default: 1000
          }
    },
    methods: {
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      }
    },
    computed: {
      // количество страниц
      pageCount() {
        const length = this.data.length, size = this.size;
        return Math.ceil(length/size);
      },
      // сколько данных на одной странице
      paginatedData() {
        const start = this.pageNumber * this.size, end = start + this.size;
        return this.data.slice(start, end);
      }
    }
}

</script>
<style lang="stylus" module scoped>
.title
    font-size 24px
    color green
table 
    border 2px solid #42b983
    border-radius 3px
    background-color #fff
th 
    background-color #42b983
    color rgb(255, 255, 255)
      
td 
    background-color #f9f9f9
thead
  tr
    th
      background-color red
th,
td
  min-width 50px
  padding 5px 10px
  +mediaQuery768()
    min-width 120px
    padding 10px 20px
</style>