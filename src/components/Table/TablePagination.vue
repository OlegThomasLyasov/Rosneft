<template>
<section>
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
</section>
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
    this.checkSize();
    // считаем количество колонок
    this.cols = Math.floor((window.innerWidth - this.freeWidth) / this.widthOne);
    // считаем количество рядов
    this.rows =  Math.floor((window.innerHeight - this.freeHeight) / this.heightOne);
    // нужное количество элементов из массива
    this.page_size = this.cols * this.rows;
    this.page = this.data.slice(1, this.page_size);
    window.onresize = () => {
      this.checkSize();
      this.cols = Math.floor((window.innerWidth - this.freeWidth) / this.widthOne);
      this.rows =  Math.floor((window.innerHeight - this.freeHeight) / this.heightOne);
      // нужное количество элементов
      this.page_size = this.cols * this.rows;
    }
  },
  watch: {
    cols(size) {
      const num = Math.floor(this.start / size);
      this.start = num * this.page_size + 1;
      this.page = this.data.slice(this.start, this.start + this.page_size);
      this.pages = Math.floor(this.lenData / this.page_size + .5);
    },
    rows(size) {
      const num = Math.floor(this.start / size);
      this.start = num * this.page_size + 1;
      this.page = this.data.slice(this.start, this.start + this.page_size);
      this.pages = Math.floor(this.lenData / this.page_size + .5);
    },
  },
  methods: {
    // проверка под мобильный размер
    checkSize() {
      if (window.innerWidth < 768) {
        this.freeWidth = 100;
        this.widthOne = 50;
      }
      else {
        this.freeWidth = 450;
        this.widthOne = 120;
      }
    },
    go() {
      // переход на конкретную страницу
      this.start = (this.num - 1) * this.page_size + 1;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    prevPage() {
      // переход к предыдущей странице
      if (this.num === 1) return;
      --this.num;
      this.start -= this.page_size;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    nextPage() {
      // переход к следующей странице
      if (this.num === this.pages) return;
      ++this.num;
      this.start += this.page_size;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    top() {
      // переход к первой странице
      this.start = this.num = 1;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    bottom() {
      // переход к последней странице
      this.num = this.pages;
      this.start = (this.num - 1) * this.page_size;
      this.page = this.data.slice(this.start, this.start + this.page_size);
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