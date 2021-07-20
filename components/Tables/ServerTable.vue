<template>
  <div class="server-table">
    <el-table
      v-loading="loading"
      :data="tableData"
      :default-expand-all="defaultExpandAll"
      :row-class-name="rowClassName"
      :align="align"
    >
      <template #empty>
        <slot name="empty">
          <span>No record found yet.</span>
        </slot>
      </template>
      <slot name="before" />
      <el-table-column v-if="$scopedSlots.expand" type="expand">
        <template slot-scope="props">
          <slot v-bind="props" name="expand" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="(header,index) in headers"
        :key="index"
        :label="header.label"
      >
        <template #default="{row}">
          <!--new slot-->
          <slot :header="header" :name="header.field" :row="row" :value="getColumnValue(row, header)">
            {{ getColumnValue(row, header) }}
          </slot>
        </template>
      </el-table-column>
      <template #append>
        <slot name="append" />
      </template>
    </el-table>
    <div class="d-flex align-items-center">
      <slot name="before-pagination" />
      <div class="ml-auto" />
      <div v-if="!hidePagination" class="pagination d-flex align-items-center">
        <div v-show="itemsFrom !== undefined && itemsTo !== undefined">
          Items {{ itemsFrom }} to {{ itemsTo }}
        </div>
        <el-pagination
          :current-page.sync="tableQuery.page"
          :page-count="totalPages"
          :page-size.sync="tableQuery.perPage"
          background
          layout="prev, next, sizes"
          @current-change="loadData"
          @size-change="loadData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { forEach, get, map } from 'lodash'
import { Pagination, Table, TableColumn } from 'element-ui'
import XLSX from 'xlsx'
import moment from 'moment'
import alertsMixin from '~/mixins/alerts'

export default {
  name: 'ServerTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination
  },
  mixins: [alertsMixin],
  props: {
    url: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,
      required: false,
      default: () => null
    },
    headers: {
      type: Array,
      required: true
    },
    hidePagination: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      required: false,
      default: false
    },
    rowClassName: {
      type: [String, Function],
      required: false,
      default: undefined
    },
    align: {
      type: String,
      required: false,
      default: 'left'
    }
  },
  data () {
    return {
      loading: false,
      tableData: [],
      tableQuery: {
        page: 1,
        perPage: 10
      },
      totalPages: 1,
      itemsFrom: undefined,
      itemsTo: undefined
    }
  },
  async fetch () {
    await this.loadData()
  },
  watch: {
    /* tableQuery: {
      handler() {
        this.$nextTick(this.$fetch)
      },
      deep: true
    }, */
    queryParams: {
      handler () {
        this.$nextTick(this.$fetch)
      },
      deep: true
    },
    url () {
      this.$nextTick(this.$fetch)
    }
  },
  methods: {
    async loadData () {
      this.loading = true
      const query = Object.assign({
        page: this.tableQuery.page,
        perPage: this.tableQuery.perPage
      }, this.queryParams)

      try {
        const response = await this.$axios.$get(this.url, { params: query })
        const { data, meta, links } = response
        this.tableData = data
        if (meta) {
          this.totalPages = meta.to
          this.itemsFrom = meta.from
          this.itemsTo = meta.to
        }

        if (links && links.next) {
          this.totalPages += 1
        } else {
          this.totalPages = this.tableQuery.page
        }

        this.$emit('success', { items: data, response, query })
      } catch (e) {
        this.showTableErrorMessage()
      } finally {
        this.loading = false
      }
    },
    extractColumnValue (row, field) {
      return get(row, field)
    },
    getColumnValue (row, header) {
      return typeof header.formatValue === 'function' ? header.formatValue(this.extractColumnValue(row, header.field), row) : this.extractColumnValue(row, header.field)
    },
    async exportTo (fileName, options, type = 'XLSX') {
      const { headers, formatData } = Object.assign({
        headers: undefined,
        formatData: undefined
      }, options)
      const { data } = await this.$axios.$get(this.url, { params: this.queryParams })
      if (typeof formatData === 'function') {
        const exportData = formatData(data, headers)
        this.handleExcelDownload(exportData, fileName, { headers })
      } else if (typeof headers === 'object') {
        const exportData = map(data, (row) => {
          const newRow = {}
          forEach(headers, (header) => {
            const value = get(row, header.field, null)
            const headerLabel = (header.header || header.label)
            newRow[headerLabel] = typeof header.formatValue === 'function' ? header.formatValue(value, row, header, headers) : value
          })
          return newRow
        })
        this.handleExcelDownload(exportData, fileName)
      } else {
        this.handleExcelDownload(data, fileName)
      }
    },
    handleExcelDownload (jsonData, fileName, options = {}) {
      const { headers } = options
      const wsOptions = {}
      if (Array.isArray(headers) && headers.length > 0) {
        wsOptions.header = headers
        wsOptions.skipHeader = false
      }

      const worksheet = XLSX.utils.json_to_sheet(jsonData, wsOptions)
      const workbook = {
        Sheets: {
          Sheet1: worksheet
        },
        SheetNames: ['Sheet1']
      }
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

      const extension = '.xlsx'

      const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

      const blob = new Blob([excelBuffer], { type })

      const currentTimeString = moment().format('YYYYMMDDHHmmss')

      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = decodeURI(`${fileName}-${currentTimeString}${extension}`)
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  ::v-deep {
    .el-table__empty-text {
      width: 100%;
    }
  }
}
</style>
