import Vue from 'vue'
import Form from 'vform'
import {AlertErrors} from 'vform'

Vue.component(AlertErrors.name, AlertErrors)

export default ({$axios}) => {
    Form.axios = $axios

    // const overrideSubmit = function (method, url, config = {}) {
    //     this.startProcessing()
    //
    //     const data = method === 'get'
    //         ? {params: this.data()}
    //         : this.data()
    //
    //     // config = Object.assign({}, config, {
    //     //     headers: {
    //     //         'X-HTTP-METHOD-OVERRIDE': method
    //     //     }
    //     // })
    //
    //     return new Promise((resolve, reject) => {
    //         (Form.axios || axios).request({url: this.route(url), method, data, ...config, })
    //             .then(response => {
    //                 this.finishProcessing()
    //
    //                 resolve(response)
    //             })
    //             .catch(error => {
    //                 this.busy = false
    //
    //                 if (error.response) {
    //                     this.errors.set(this.extractErrors(error.response))
    //                 }
    //
    //                 reject(error)
    //             })
    //     })
    // }
    //
    // Form.submit = overrideSubmit
}
