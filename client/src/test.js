import React, { Component } from 'react'
import data from './data.js'


export default class test extends Component {
    render() {

        const data_array = Object.keys(data).map(key => { return data[key] })

        return (
            <div>
                This is the data: { data_array.map(q => {
                    return q.question
                    
                }) 
            }
            </div>
        )
    }
}
