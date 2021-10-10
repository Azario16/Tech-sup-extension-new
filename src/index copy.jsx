import React from 'react'
import ReactDom from 'react-dom'
import './scss.scss'
import Colapse from 'bootstrap/js/dist/collapse.js';

window.onload = () => {
    //setTimeout(function () {
        head_list();
        statusAutofaqPeopleRender();
        console.log('ntcntncn')
    //}, 2500)

}
window.onload = () => {
    createDivIdForReact();
    statusAutofaqPeopleRender();
    console.log('ntcntncn')
}
// Создаем див на странице 
function createDivIdForReact() {
    let elm = document.createElement('li');
    document.querySelector('div[class="app-content"] > ul[role="menu"]').append(elm);
    elm.outerHTML = `
        <li id="people_head1" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
        </li>
        `;
}

function statusAutofaqPeopleRender() {
    class Reservation extends React.Component {
        constructor(props) {
            const userGroup = document.querySelector('.user_menu-dropdown-user_name').innerText.split('-')[0];
            const UserName = document.querySelector('.user_menu-dropdown-user_name').innerText
            super(props);
            this.state = {
                userGroup: userGroup,
                //userGroup: 'КЦ',
                userName: UserName,
                //userName: 'КЦ-Баркашева Анастасия ',
                userKbs: [],
                error: null,
                data: [],
                isLoadedData: false,
                isLoaded: false,
                operStatus: [],
                ArrPeople: [],
                groupCnt: 0,
                class: {
                    Online: 'bg-success',
                    Busy: 'bg-warning',
                    Pause: 'bg-danger'
                },
            };

        }

        async componentDidMount() {
            //console.log("componentDidUpdate")
            this.renderTimeout()
            setInterval(this.renderTimeout.bind(this), 15000)
        }

        async renderTimeout() {
            //console.log('renderTimeout')

            let operState = await this.getCurrentState()
            let operStatus = this.parseStatus()
            let operStatusRender = Object.assign({}, operStatus.Online, operStatus.Busy, operStatus.Pause);
            let cCntUndistributedGroup = this.checkSumContTematicGroup()
            console.log(this.state)
            this.setState({
                isLoaded: true,
                data: operState,
                operStatus: operStatus,
                groupCnt: cCntUndistributedGroup,
                ArrPeople: operStatusRender
            })
            console.log(this.state)
        }
        async getCurrentState() {
            //console.log("getCurrentState")
            try {
                const url = window.location.origin + '/api/operators/statistic/currentState';
                let operStateRes = await fetch(url, {
                    /*  headers: {
                         authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiZDY1MGY5ZDktNTUxZC00OGMwLTkxNGItM2RlNzM3YTA0MWFhIiwibG9naW4iOiJyLmcuZ3VzZXlub3ZAc2t5ZW5nLnJ1IiwiZnVsbE5hbWUiOiIwS0xRbnkzUWs5R0QwWUhRdGRDNTBMM1F2dEN5SU5DZzBMRFJoZEM0MExRPSIsImlzQWN0aXZlIjp0cnVlLCJpc05vdGlmeSI6ZmFsc2UsInNlcnZpY2VJZCI6IjM2MWM2ODFiLTM0MGEtNGU0Ny05MzQyLWM3MzA5ZTI3ZTdiNSIsImFjdGlvbnMiOlsiUmVhc29uOE9wZXJhdG9yIiwiUmVhc29uOE9wZXJhdG9yVmlld0FsbEtCIiwiU3VwZXJ2aXNvciJdLCJlbWFpbCI6InIuZy5ndXNleW5vdkBza3llbmcucnUiLCJzZXR0aW5ncyI6eyJrbm93bGVkZ2VCYXNlcyI6WzEyMDE4MV0sImF1dG9Bc3NpZ25FbmFibGVkIjp0cnVlfX0sImV4cCI6MjkyODc3OTg3Nn0.mASzSg3HOQRyr-brrT4-Wu39vYbtd2syyam1sPqjBsw',
                     }, */
                    method: 'GET',
                    mode: 'cors'
                })
                let operState = await operStateRes.json();
                console.log(operState)
                this.state.data = operState['rows'];
                return operState['rows'];
            } catch (error) {
                this.setState({ error });
            }
        }
        parseStatus() {
            //console.log('parseStatus')
            // Сброс нумераций операторов
            const online = this.parse('Online', this.state.userGroup);
            const busy = this.parse('Busy', this.state.userGroup);
            const pause = this.parse('Pause', this.state.userGroup);

            const parseResult = {
                Online: online,
                Busy: busy,
                Pause: pause
            }
            return parseResult
        }
        parse(status, groupIdParse) {
            console.log('parse')
            console.log(status, groupIdParse)
            const userList = []
            let userInfo = {};
            // статус операторов на английском, решил в массиве сразу интерпретировать а не в момент когда буду делать строку для отправки
            const statusArr = {
                Online: 'Онлайн',
                Busy: 'Занят',
                Pause: 'Перерыв',
            };
            this.state.data.forEach((person, index) => {
                // AF вместо 0 чатов отдает null, тут условие чтобы были нули
                if (person.operator !== null) {
                    // Ищем совпадения по имени того кто зашел в систему и присваиваем тематику в state
                    if (person.operator.fullName == this.state.userName) {
                        this.state.userKbs = person.operator.kbs
                    }

                    if (person.operator.status === status && person.operator.fullName.split('-')[0] == groupIdParse) {
                        if (person.aCnt === null) {
                            this.state.data[index].aCnt = 0;
                        }
                        if (person.cCnt === null) {
                            this.state.data[index].cCnt = 0;
                        }


                        // нумерация операторов
                        const name = person.operator.fullName.padEnd(30);
                        //const stats = statusArr[status].padEnd(20);
                        userInfo = {
                            name: person.operator.fullName,
                            stats: status,
                            aCnt: this.state.data[index].aCnt,
                            cCnt: this.state.data[index].cCnt,
                            sCnt: this.state.data[index].aCnt + this.state.data[index].cCnt,
                        }
                        userList.push(userInfo);
                    }
                }
            });
            return userList;
        }
        colorUndistributed(){
            if (this.state.groupCnt > 5){
                return "bg-success"
            }else{
                return "bg-danger"
            }
        }
        checkSumContTematicGroup() {
            console.log('checkSumContTematicGroup')
            const listCntUndistributed = [];
            this.state.data.forEach((operatorState) => {
                if (operatorState.operator === null) {
                    if (this.state.userKbs.includes(operatorState.kb)) {
                        listCntUndistributed.push(operatorState.cCnt)
                    }
                }
            });
            const summCnt = listCntUndistributed.reduce((sum, current) => sum + current, 0);
            return summCnt;
        }
        render() {
            console.log('Render')
            const { error, isLoaded } = this.state;
            if (error) {
                return <div>Ошибка: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Загрузка...</div>;
            } else {
                return (
                    <div>
                        <div className="ant-menu-item">
                            <div className={this.colorUndistributed() + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>{this.state.groupCnt}</div>
                            <span className="">
                                <span className="ant-badge  mx-1">Нераспред</span>
                            </span>
                        </div>
                        <div className="ant-menu-item " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <span className="ps-4 "> Список </span>
                        </div>
                        <div className="collapse show" id="collapseExample">
                            <div className="card card-body ant-menu-dark ant-menu ant-menu-sub ant-menu-inline">
                                <div className="">
                                    {
                                        this.state.operStatus.Online.map((body, number) => {
                                            console.log(body, number)
                                            return (
                                                <div key={body.name} className="ant-menu-item ant-menu-item-only-child" role="people" title="" data-link="" data-user-id="823f780e-67f0-4e87-8154-a5427f9809bb" data-is-duty="false">
                                                    <div className="app-left_menu-item">
                                                        <div className={this.state.class[body.stats] + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>{body.sCnt}</div>
                                                        <span className="">
                                                            <span className="ant-badge fs-el-0_6 ms-1">{body.name}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        this.state.operStatus.Busy.map(body => {
                                            return (
                                                <div key={body.name} className="ant-menu-item ant-menu-item-only-child" role="people" title="" data-link="" data-user-id="823f780e-67f0-4e87-8154-a5427f9809bb" data-is-duty="false">
                                                    <div className="app-left_menu-item">
                                                        <div className={this.state.class[body.stats] + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>{body.sCnt}</div>
                                                        <span className="">
                                                            <span className="ant-badge fs-el-0_6 ms-1">{body.name}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        this.state.operStatus.Pause.map((body, number) => {
                                            return (
                                                <div key={body.name} className="ant-menu-item ant-menu-item-only-child" role="people" title="" data-link="" data-user-id="823f780e-67f0-4e87-8154-a5427f9809bb" data-is-duty="false">
                                                    <div className="app-left_menu-item">
                                                        <div className={this.state.class[body.stats] + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>{body.sCnt}</div>
                                                        <span className="">
                                                            <span className="ant-badge fs-el-0_6 ms-1">{body.name}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div >
                )

            }
        }
    }

    ReactDom.render(
        //<Reservation />, document.querySelector('.ant-btn'),
        <Reservation />, document.querySelector('#people_head1'),
    );
}