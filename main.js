var app = new Vue({
    el: '#full-year-calendar-app',
    data: {
      days: ['日', '一', '二', '三', '四', '五', '六'],
      year: null,
      fullYear: [],
      isYearPickerFocused: true
    },
    computed: {
    },
   async mounted() {
      await this.$nextTick()
      if (this.$refs.year) {
        this.$refs.year.focus()
      }
    },
    created () {
      this.year = new Date().getFullYear()
      this.initCalendar()
    },
    methods: {
      initCalendar () {
        for (let month = 0; month < 12; month++) {
          const firstDay = new Date(this.year, month, 1).getDay()
          let day = firstDay
          const totalDays = new Date(this.year, month + 1, 0).getDate()
          this.fullYear[month] = new Array(42)
          for (let i = 1; i <= totalDays; i++) {
            this.fullYear[month][day] = i
            day++
          }
        }
      },
      getDays (num) {
        return this.days[(num - 1) % 7]
      },
      getDates (month, count) {
        return this.fullYear[month - 1][count - 1] || ''
      },
      isWeekend (num) {
        return (num - 1) % 7 === 0 || (num - 1) % 7 === 6
      },
      changeYear () {
        this.isYearPickerFocused = false
        if (!this.year) {
          this.year = new Date().getFullYear()
        }
        this.initCalendar()
      },
      async focusYearPicker () {
        this.isYearPickerFocused = true
        await this.$nextTick()
        if (this.$refs.year) {
          this.$refs.year.focus()
        }
      }
    }
})
