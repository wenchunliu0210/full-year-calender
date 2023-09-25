var app = new Vue({
    el: '#full-year-calendar-app',
    data: {
      dayTitles: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat'],
      monthTitles: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
      year: null,
      fullYear: [],
      isYearPickerFocused: true
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
      getMonthTitles (month) {
        return this.monthTitles[month - 1]
      },
      getDayTitles (day) {
        return this.dayTitles[(day - 1) % 7]
      },
      getDates (month, day) {
        return this.fullYear[month - 1][day - 1] || ''
      },
      isWeekend (day) {
        return (day - 1) % 7 === 0 || (day - 1) % 7 === 6
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
