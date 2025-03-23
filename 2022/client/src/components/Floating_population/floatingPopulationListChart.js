import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";

class floatingPopulationListChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseFPList: '',
            append_FPList: '',
        }
    }

    componentDidMount = async () => {
        axios.get('http://openapi.seoul.go.kr:8088/65425255506a797939336957444c46/json/CardSubwayStatsNew/1/10/20220201', {
        })
        .then( response => {
            try {
                this.setState({ responseFPList: response });
                this.setState({ append_FPList: this.state.responseFPList.data.CardSubwayStatsNew.row });
            } catch (error) {
                alert(error)
            }
        })
        .catch( error => {alert(error); return false;} );
    }

    render () {
        return (
            <LineChart
              width={1000}
              height={300}
              data={this.state.append_FPList}
              margin={{
                top: 5, right: 50, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="SUB_STA_NM" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="RIDE_PASGR_NUM" stroke="#8884d8" />
            </LineChart>
          );
    }
}

export default floatingPopulationListChart;