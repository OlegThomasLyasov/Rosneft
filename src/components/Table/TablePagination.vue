<template>
<div v-resize="checkSize">
    <table>
      <thead>
        <tr>
          <th v-for="col in cols" :key="col">col{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row">
          <th v-for="col in row" :key="col">{{col}}</th>
        </tr>
      </tbody>
    </table>
    <div class="buttonsWrapper">
      <button @click="top()">&laquo;</button>
      <button @click="prevPage()">&#8249;</button>
      <input v-model="num" @change="go()">
      <span>of {{pages}}</span>
      <button @click="nextPage()">&#8250;</button>
      <button @click="bottom()">&raquo;</button>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      // массив который будем отрисовывать
      page: [],
      // сколько элементов на 1 странице
      page_size: 0,
      // общее количество страниц
      pages: 0,
      // начальная страница
      start: 1,
      // переменная для отслеживания текущей страницы
      num: 0,
      // всего записей
      lenData: this.data.length - 1,
      // ширина 1 элемента
      widthOne: 120,
      // высота 1 элемента
      heightOne: 40,
      freeWidth: 450,
      freeHeight: 150,
      // нужное количество колонок и рядов
      cols: 0,
      rows: 0,
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
  },
  mounted () {
    // просмотр размера экрана
    this.checkSize();
    // определяем какие элементы отрисовать
    this.page = this.data.slice(1, this.page_size);
  },
  watch: {
    // если меняется стартовая, то пересчитываем
    start(value) {
      this.start = value;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    // если меняется количество элементво, то берем нужное
    page_size(size) {
      const num = Math.floor(this.start / size);
      this.start = num * this.page_size + 1;
      this.pages = Math.floor(this.lenData / this.page_size + .5);
      this.page = this.data.slice(this.start, this.start + this.page_size);
    }
  },
  methods: {
    checkSize() {
      const windowWidth =  window.screen.width;
      const windowHeight =  window.screen.height;
      // проверка под мобильный размер
      if (windowWidth < 768) {
        this.freeWidth = 50;
        this.widthOne = 50;
      }
      // проверка под планшетный размер
      else if (windowWidth >= 768 && windowWidth <= 1024) {
        this.freeWidth = 250;
        this.widthOne = 120;
      }
      // проверка под комп размер
      else if (windowWidth > 1024 && windowWidth <= 1440) {
        this.freeWidth = 450;
        this.widthOne = 120;
      }
      // проверка под большой комп. размер
      else if (windowWidth > 1440) {
        this.freeWidth = 750;
        this.widthOne = 120;
      }
      // получаем нужно количество колонок
      this.cols = Math.floor((windowWidth - this.freeWidth) / this.widthOne);
      // получаем нужно количество рядов
      this.rows =  Math.floor((windowHeight - this.freeHeight) / this.heightOne);
      // подсчитываем общее количество элементов
      this.page_size = this.cols * this.rows;
    },
    go() {
      // переход на конкретную страницу
      this.start = (this.num - 1) * this.page_size + 1;
    },
    prevPage() {
      // переход к предыдущей странице
      if (this.num === 1) return;
      --this.num;
      this.start -= this.page_size;
    },
    nextPage() {
      // переход к следующей странице
      if (this.num === this.pages) return;
      ++this.num;
      this.start += this.page_size;
    },
    top() {
      // переход к первой странице
      this.start = this.num = 1;
    },
    bottom() {
      // переход к последней странице
      this.num = this.pages;
      this.start = (this.num - 1) * this.page_size;
    }
  },
  computed: {
    // подготовка данных к отрисовке
    paginatedData() {
      // преобразование в двумерный массив из одномерного
      return this.page.reduce((prev, cur, i, a) => !(i % this.cols) ? prev.concat([a.slice(i, i + this.cols)]) : prev, []);
    }
  }
}
</script>
<style lang="stylus" scoped>
.buttonsWrapper
  margin-top 10px
  display flex
  gap 5px
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