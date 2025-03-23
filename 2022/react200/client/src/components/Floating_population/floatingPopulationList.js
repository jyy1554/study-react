import React, { Component } from 'react';
import axios from 'axios';

class floatingPopulationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseFPList: '',
            append_FPList: '',
        }
    }

    componentDidMount() {
        this.callFloatPopulListApi()
    }

    callFloatPopulListApi = async () => {
        axios.get('http://openapi.seoul.go.kr:8088/65425255506a797939336957444c46/json/CardSubwayStatsNew/1/10/20220201', {})
            .then( response => {
                try {
                    this.setState({ responseFPList: response });
                    this.setState({ append_FPList: this.FloatPopulListAppend() });
                } catch (error) {
                    alert(error)
                }
            })
            .catch( error => {alert(error); return false;} );
    }

    FloatPopulListAppend = () => {
        let result = []
        var FPList = this.state.responseFPList.data

        for(let i=0; i<FPList.CardSubwayStatsNew.row.length; i++) {
            var data = FPList.CardSubwayStatsNew.row[i]
            var idx = i+1
            result.push(
                <tr className="hidden_type">
                    <td>{idx}</td>
                    <td>{data.USE_DT}</td>
                    <td>{data.LINE_NUM}</td>
                    <td>{data.SUB_STA_NM}</td>
                    <td>{data.RIDE_PASGR_NUM}</td>
                    <td>{data.ALIGHT_PASGR_NUM}</td>
                    <td>{data.WORK_DT}</td>
                </tr>
            )
        }

        return result
    }

    render () {
        return (
            <section className ="sub_wrap" >
                <article className ="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                    <div className ="li_top">
                        <h2 className ="s_tit1">서울시 지하철호선별 역별 승하차 인원 정보 - 2022년 02월 01일</h2>
                    </div>
                    <div className ="list_cont list_cont_admin">
                        <table className ="table_ty1 fp_tlist">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>사용일자</th>
                                    <th>호선명</th>
                                    <th>역명</th>
                                    <th>승차총승객수</th>
                                    <th>하차총승객수</th>
                                    <th>등록일자</th>
                                </tr>
                            </thead>
                        </table>
                        <table className ="table_ty2 fp_tlist">
                            <tbody>
                                {this.state.append_FPList}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>
        );
    }
}

export default floatingPopulationList;