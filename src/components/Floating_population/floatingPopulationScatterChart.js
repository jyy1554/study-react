import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from "axios";

class floatingPopulationScatterChart extends Component {
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
            <ScatterChart
              width={1000}
              height={300}
              margin={{
                top: 5, right: 50, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="SUB_STA_NM" name="역명" />
              <YAxis type="number" dataKey="RIDE_PASGR_NUM" name="승차총승객수" unit="명" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.state.append_FPList} fill="#003458" />
            </ScatterChart>
          );
    }
}

export default floatingPopulationScatterChart;