import axios from "axios";
import swal from "sweetalert";

export class ApiMethods {
    static postFunction = (url, body) => {
        return axios
            .post(url, body, {
                headers: {
                    'content-type': 'text/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data
                } else {
                    swal("Warning", "Unknown status code.", "warning").then(() => {
                    })
                }
            }, err => {
                if (err.status === 201 || err.status === 409 || err.status === 404) {
                    swal("Warning", err.message, "warning").then(() => {
                    })
                } else if (err.status === 401) {
                    swal("Error", err.message, "error").then(() => {
                    })
                } else {
                    swal("Error", 'Something went wrong. Please try again.', "error").then(() => {
                    })
                }
                if (process.env.APP_ENV === "local") {
                    console.log('============START==============')
                    console.log(url)
                    console.log(body)
                    console.log(err)
                    console.log('=============END=============')
                }
            })
    }

    // static getFunction = (url, query) => {
    //     return axios.get(url, body).then(res => res.data).catch(err => {
    //         if (err.status === 201 || err.status === 409 || err.status === 404) {
    //             swal("Warning", err.message, "warning").then(() => {
    //             })
    //         } else if (err.status === 401) {
    //             swal("Error", err.message, "error").then(() => {
    //             })
    //         } else {
    //             swal("Error", 'Something went wrong. Please try again.', "error").then(() => {
    //             })
    //         }
    //     })
    // }
}
