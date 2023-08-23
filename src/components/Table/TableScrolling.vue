<template>
  <div class="wrapper">
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
    <div ref="scroller" class="scroller">
      <div
          class="handle"
          :style="{top:htop+'px'}"
          @mousedown="start_handle"
      ></div>
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
      heightOne: 40,
      freeWidth: 450,
      freeHeight: 150,
      // нужное количество колонок и рядов
      cols: 0,
      rows: 0,
      htop: 0,
      hndle: false,
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
  },
  mounted () {
    document.body.style.overflowY = "hidden";
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
    window.onmousemove = this.handle;
    window.onmouseup = this.stop_handle;
  },
  unmounted() {
    document.body.style.overflowY = "auto";
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
      this.freeHeight = 150;
      if (window.innerWidth < 768) {
        this.freeWidth = 100;
        this.widthOne = 50;
      }
      else if (window.innerWidth >= 768 && window.innerWidth <= 1440) {
        this.freeWidth = 450;
        this.widthOne = 120;
      }
      else if (window.innerWidth > 1440) {
        this.freeWidth = 750;
        this.widthOne = 120;
      }
    },
    start_handle() {
      if (this.hndle) return
      this.hndle = true;
    },
    stop_handle() {
      if (!this.hndle) return
      this.hndle = false;
      this.page = this.data.slice(this.start, this.start + this.page_size);
    },
    handle(e) {
      if (!this.hndle) return
      let top = this.htop + e.movementY;
      const h = this.$refs.scroller.clientHeight - 8;
      if (top < 0) top = 0;
      else if (top > h) top = h;
      this.htop = top;
      this.start = Math.floor(this.lenData / h * this.htop + .5);
      this.page = this.data.slice(this.start, this.start + this.page_size);
    }
  },
  computed: {
    // подготовка данных к отрисовке
    paginatedData() {
      //  преобразование в двумерный массив из одномерного
      return this.page.reduce((prev, cur, i, a) => !(i % this.cols) ? prev.concat([a.slice(i, i + this.cols)]) : prev, []);
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  position relative
  width 100%
  height 100%
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

.scroller
  position absolute
  top 30px
  bottom 14px
  right 8px
  width 4px
  background red

.handle
  position absolute
  width 10px
  height 8px
  top 0
  border 1px solid #CCC
  border-radius: 3px
  left -4px
  background #FFF

</style>