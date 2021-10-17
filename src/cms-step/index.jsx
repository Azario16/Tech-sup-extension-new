import React from 'react'
import ReactDom from 'react-dom'
import './../scss.scss'
import Colapse from 'bootstrap/js/dist/collapse.js';
window.onload = () => {
    setTimeout(function () {
        createDivIdForReact();
        statusAutofaqPeopleRender();
    }, 2000)
}
// Создаем див на странице 
function createDivIdForReact() {
    let elm = document.createElement('div');
    document.querySelector('[class="root -type-primary"]').append(elm);
    elm.outerHTML = `<div id="appReact" class="btn"></div>`;
}

async function statusAutofaqPeopleRender() {
    class Reservation extends React.Component {
        constructor(props) {
            const room = location.href.split('/')[6].split('?')[0]
            super(props);
            this.state = {
                room: room,
                error: null,
                data: [],
                isLoadedData: false,
                isLoaded: false,
            };

        }

        async componentDidMount() {
            let roomInfo = await this.getRoomInfo()
        }
        getStepUuid(elm) {
            console.log(elm)
            const stepName = document.querySelector('[class="title"] > span.title').innerText
            console.log(stepName)
            this.state.data.map((body, count) => {
                if (body.contentCard.name == stepName) {
                    elm.target.className = "bg-success btn"
                    const url = `https://content.vimbox.skyeng.ru/cms/stepStore/update/stepId/${body.contentCard.stepUuid}`
                    copyText(url)
                    setTimeout(colorButton, 1000, elm)
                }
            })
            function copyText(text) {
                navigator.clipboard.writeText(text);
            }
            function colorButton(elm) {
                elm.target.className ="btn"
            }
        }
        async getRoomInfo() {
            //console.log("getRoomInfo")
            try {
                const url = `https://api-english.skyeng.ru/api/v1/rooms/${this.state.room}`;
                let roomInfoRes = await fetch(url, {
                    method: 'GET',
                    credentials: 'include'
                })
                let roomInfo = await roomInfoRes.json();
                console.log(roomInfo)
                this.state.data = roomInfo['homeworkCards'];
                this.setState({
                    isLoaded: true,
                    data: roomInfo['homeworkCards']
                })
                return roomInfo['homeworkCards'];
            } catch (error) {
                this.setState({ error });
            }
        }
        render() {
            //console.log('Render')
            const { error, isLoaded } = this.state;
            if (error) {
                return <div>Ошибка: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Загрузка...</div>;
            } else {
                return (
                    <div id="url-cms-copy" className="btn" onClick={this.getStepUuid.bind(this)}>
                        Ссылка в CMS
                    </div>
                )

            }
        }
    }

    ReactDom.render(
        <Reservation />, document.querySelector('#appReact'),
    );
}