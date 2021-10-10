var jq = document.createElement('script');
jq.src = "https://unpkg.com/react@17/umd/react.development.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var jq = document.createElement('script');
jq.src = "https://unpkg.com/react-dom@17/umd/react-dom.development.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var jq = document.createElement('script');
jq.src = "https://unpkg.com/@babel/standalone/babel.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var jq = document.createElement('script');
jq.src = "https://unpkg.com/@babel/standalone/babel.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

document.onreadystatechange = () => {
    setTimeout(function () {
        head_list();
        sayHi();
    }, 1000)

}
function head_list() {
    let elm = document.createElement('li');
    document.querySelector('div[class="app-content"] > ul[role="menu"]').append(elm);
    elm.outerHTML = `
        <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
            <div class="ant-menu-submenu-title" role="button" aria-expanded="true" aria-haspopup="true" style="padding-left: 16px;" aria-owns="people_list">
                <span class="ant-badge">
                    <span role="img" aria-label="message" type="message" class="anticon anticon-message"></span>
                    <span class="nav-text">Список</span>
                </span>
                <i class="ant-menu-submenu-arrow"></i>
            </div>
            <ul id="people_list" class="ant-menu ant-menu-sub ant-menu-inline" role="people" style="display: none;"></ul>
        </li>
        `;
}




/* class Reservation extends React.Component {
    constructor(props) {
        const options = {
            timeZone: 'Europe/Moscow',
        };
        const nowDate = new Date();
        const endDateYearMontDay = nowDate.toLocaleDateString('ru-Ru', options).split('.').reverse().join('-');

        nowDate.setDate(nowDate.getDate() - 1)
        const startDateYearMontDay = nowDate.toLocaleDateString('ru-Ru', options).split('.').reverse().join('-');

        super(props);
        this.state = {
            serachId: '',
            serachText: '',
            error: null,
            isLoadedData: false,
            isLoaded: false,
            data: [],
            datePickerValue: startDateYearMontDay,
            dateStart: startDateYearMontDay,
            dateEnd: endDateYearMontDay,
        };

    }

    render() {
        const { error, isLoaded, data, reserv } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            console.log('Render')
            return (
                <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
                    <div class="ant-menu-submenu-title" role="button" aria-expanded="true" aria-haspopup="true" style="padding-left: 16px;" aria-owns="people_list">
                        <span class="ant-badge">
                            <span role="img" aria-label="message" type="message" class="anticon anticon-message"></span>
                            <span class="nav-text">Списокwdaw</span>
                        </span>
                        <i class="ant-menu-submenu-arrow"></i>
                    </div>
                    <ul id="people_list" class="ant-menu ant-menu-sub ant-menu-inline" role="people" style="display: none;"></ul>
                </li>
            )
        }
    }
}

ReactDOM.render(
    <Reservation />,
    document.querySelector('#people_list'),
); */