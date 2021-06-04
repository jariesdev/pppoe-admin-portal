export default {
  methods: {
    downloadFromServer (url, filename, options, queryParams) {
      return this.$axios.$get(url, {
        params: queryParams,
        responseType: 'blob'
      })
        .then((data) => {
          const filenameParts = filename.split('.')
          const fileExtension = filenameParts[filenameParts.length - 1]

          let fileType
          switch (fileExtension.toUpperCase()) {
            case 'XLS':
            case 'XLSX':
              fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
              break
            case 'PDF':
              fileType = 'application/pdf'
          }

          const url = window.URL.createObjectURL(new Blob([data], { fileType }))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()

          return {
            data
          }
        })
        .catch(() => {
          this.$notify({
            type: 'error',
            message: 'Unable to download from server. Please try again.'
          })
        })
    }
  }
}
