<template>
  <div>
    <h4>Weekly Schedule</h4>
    <table class="table table-borderless table-sm">
      <thead>
      <tr>
        <th :style="{maxWidth: '100px'}">Day</th>
        <th>Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="schedule in schedules">
        <td>{{ getDayText(schedule.day) }}</td>
        <td>{{ schedule.allDay ? 'All Day' : formatTimeRange(schedule.time_range) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {find, forEach, map} from "lodash";
import moment from 'moment'

export default {
  name: 'WeeklySchedule',
  data() {
    return {
      schedules: [],
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
  props: {
    content: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.schedules = this.decodeRadiusLoginTime(this.content)
  },
  methods: {
    generateDailyValue() {
      return map(this.days, o => {
        return {
          day: o.value,
          allDay: true,
          time_range: null,
        }
      })
    },
    getDayText(dayValue) {
      return find(this.days, o => {
        return o.value === dayValue
      }).label
    },
    formatTimeRange(timeRange) {
      if (!timeRange) return null
      return map(timeRange, time => moment(time, "HH:mm:ss").format("h:mm a")).join(' - ')
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
    }
  }
}
</script>
