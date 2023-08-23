<template>
<section>
    <h1 class="title"> Web-визуализатор (просмоторщик)</h1>
    <keep-alive>
      <table>
          <thead>
              <tr>
                  <th>Порядковый номер</th>
                  <th>Число</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(element, index) of data" :key="index">
                  <th >{{ index }}</th>
                  <th >{{ element }}</th>
              </tr>
          </tbody>
      </table>
    </keep-alive>
</section>
</template>

<script lang="ts">
export default {
    props: {
          data: {
              type: Object,
              required: true
          },
          size: {
            type: Number,
            required: false,
            default: 1000
          }
      },
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