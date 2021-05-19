<template>
  <div>
    <div class="daily-scheduler">
      <table class="table table-sm table-borderless">
        <thead>
        <tr>
          <th :style="{width:'100px'}">Day</th>
          <th>Schedule</th>
        </tr>
        </thead>
        <template v-for="daySchedule in dailySchedule">
          <tr class="day-schedule">
            <td>
              <span class="day-text">{{ getDayText(daySchedule.day) }}</span>
            </td>
            <td>
              <div class="d-flex">
                <div class="day-time-schedule mr-3">
                  <el-checkbox v-model="daySchedule.allDay" :disabled="readOnly" @change="emitInputValue()">All Day</el-checkbox>
                </div>
                <div v-if="!daySchedule.allDay" class="day-custom-schedule d-flex">
                  <el-time-picker :readonly="readOnly" v-model="daySchedule.time_range"
                                  :picker-options="{format: 'hh:mm a'}"
                                  arrow-control
                                  class="time-picker" is-range
                                  label="Time From"
                                  range-separator="To"
                                  size="mini"
                                  value-format="HH:mm"
                                  @change="emitInputValue()"/>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import {TimePicker} from 'element-ui'
import {every, find, forEach, map} from 'lodash'

export default {
  name: 'WeeklyScheduleControl',
  props: {
    value: null,
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    [TimePicker.name]: TimePicker
  },
  data() {
    return {
      inputValue: 'Wk',
      dayOfWeek: 'Wk',
      dailySchedule: [],
      days: [
        {
          label: 'Monday',
          value: 'Mo'
        },
        {
          label: 'Tuesday',
          value: 'Tu'
        },
        {
          label: 'Wed',
          value: 'Wed'
        },
        {
          label: 'Thursday',
          value: 'Th'
        },
        {
          label: 'Friday',
          value: 'Fr'
        },
        {
          label: 'Saturday',
          value: 'Sa'
        },
        {
          label: 'Sunday',
          value: 'Su'
        }
      ]
    }
  },
  created() {
    this.dailySchedule = this.generateDailyValue()
  },
  computed: {
    finalValue() {
      return this.encodeRadiusLoginTime(this.dailySchedule)
    }
  },
  mounted() {
    this.setInitialValue()
    this.emitInputValue()
  },
  methods: {
    encodeRadiusLoginTime(scheduleArray) {
      const allDays = every(scheduleArray, o => o.allDay)
      if (allDays) {
        return 'Wk'
      } else {
        return map(scheduleArray, (o) => {
          if (o.time_range) {
            const from = String(o.time_range[0]).replaceAll(':', '').substring(0,5)
            const to = String(o.time_range[1]).replaceAll(':', '').substring(0,5)
            return o.day + from + '-' + to
          } else {
            return o.day
          }
        }).join(',')
      }
    },
    decodeRadiusLoginTime(scheduleString) {
      let values = this.generateDailyValue()
      if (scheduleString === 'Wk') {
        return values
      }

      const dailySchedules = scheduleString.split(',')
      // preg_match('/([\d]{4}-[\d]{4})$/', 'Mo-We-Fr2300-0855', $matches);return $matches[0] .' ::::: ' . substr('Mo-We-Fr2300-0855', 0, -strlen($matches[0]))
      for (let i = 0; i < dailySchedules.length; i++) {
        const dailySchedule = dailySchedules[i]
        const dayMatches = String(dailySchedule).match(/[a-zA-Z]+/gi)
        const timeMatches = String(dailySchedule).match(/([\d]{4}-[\d]{4})+/g)

        const day = dayMatches[0]

        let timeRange = null
        if (timeMatches) {
          timeRange = timeMatches[0].split('-');
          timeRange = map(timeRange, o => o.substring(0, 2) + ':' + o.substr(2) + ':00')
        }

        if (day === 'Wk' && timeRange !== null) {
          // Week with time
          // We set all days to time set
          values = map(values, o => {
            return {
              day: o.day,
              allDay: false,
              time_range: timeRange
            }
          })
        } else if (day && timeRange !== null) {
           forEach(values, (schedule, index) => {
            if (day === schedule.day) {
              values[index].allDay = false
              values[index].time_range = timeRange
            }
          })
        } else if (day) {
           forEach(values, (schedule, index) => {
            if (day === schedule.day) {
              values[index].allDay = true
            }
          })
        }
      }
      return values
    },
    setInitialValue() {
      if (this.value !== null) {
        this.dailySchedule = this.decodeRadiusLoginTime(this.value)
      }
      // this.emitInputValue()
    },
    emitInputValue() {
      this.inputValue = this.finalValue
      this.$emit('input', this.inputValue)
      this.emitInputValueChange()
    },
    emitInputValueChange() {
      this.inputValue = this.finalValue
    },
    getDayText(dayValue) {
      return find(this.days, o => {
        return o.value === dayValue
      }).label
    },
    generateDailyValue() {
      return map(this.days, o => {
        return {
          day: o.value,
          allDay: true,
          time_range: null,
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.time-picker {
  background-color: transparent;

  ::v-deep {
    .el-range-input {
      color: white;
      background-color: transparent;
    }

    .el-range-separator {
      color: white;
    }
  }
}
</style>
