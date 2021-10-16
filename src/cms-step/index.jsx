import React from 'react'
import ReactDom from 'react-dom'
import './../scss.scss'
import Colapse from 'bootstrap/js/dist/collapse.js';
window.onload = () => {
    setTimeout(function () {
        createDivIdForReact();
        statusAutofaqPeopleRender();
    }, 500)
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