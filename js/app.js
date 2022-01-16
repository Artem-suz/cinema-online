"use strict"

import {
    getMovies
} from "./modules/show-movies.js"

import {
    showMenu
} from "./modules/pop-up-menu.js";

import {
    modal
} from "./modules/modal.js";

import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();


const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

let homePageMark = document.querySelector(".main-title");


if (homePageMark)  getMovies(API_URL_POPULAR, 1) //условие запуска отрисовки главной страницы


const formElement = document.querySelector("form");
const searchElement = document.querySelector(".header__search");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${searchElement.value}`;
 
    if (searchElement.value) {
        getMovies(apiSearchUrl, 1);
        searchElement.value = "";
    };
});

const pages = document.querySelectorAll(".pageNumber");


for (let page of pages) {
    
    page.addEventListener("click", () => {
        let currentActive = page.firstElementChild.innerHTML;
        pages.forEach((page) => page.classList.remove("active"));
        page.classList.add("active");
        getMovies(API_URL_POPULAR, currentActive);
    })
};


//////////////////////////////////////////////////////////////////////////////
const optionsHeaderAuthLink = {
    width: "380",
    title: "Вход",
    subtitle: "Регистрация",
    borderHeader: true,
    closable: true,
    modalStyle: "small-window",
    content: `
    <div class = "auth-info"> Для входа введите email или номер телефона </div> 
    <form> <input class = "auth-input" type = "text" placeholder = "Номер телефона" tabindex = "1"> </form> 
    <form> <input class= "auth-input" type="text" placeholder = "Пароль" tabindex = "2"> </form>
    <div class = "auth-form-remember"> 
    <label><input type = "checkbox" checked = "checked" tabindex = "3"> Запомнить меня </label>
    </div>
    `,
    footer: `<div class = "form-action"> <button class = "btn" tabindex = "4"> Войти</button></div>`
}

const authBtn = document.querySelector(".header__auth-link")
authBtn.addEventListener("click", () => {
    const handlerAuth = modal(optionsHeaderAuthLink)

    handlerAuth.open()

    const regBtn = document.querySelector(".modal-subtitle")
    regBtn.addEventListener("click", () => {
        const handlerReg = modal(optionsHeaderRegistrationLink)
        handlerAuth.destroy()
        handlerReg.open()
    })
})

const optionsHeaderRegistrationLink = {
    width: "380",
    title: "Регистрация",
    subtitle: "",
    borderHeader: true,
    closable: true,
    modalStyle: "small-window",
    content: `
    <div class = "auth-info"> Для регистрации введите ваш номер телефона и пароль</div> 
    <form> <input class = "auth-input" type = "text" placeholder = "Номер телефона" tabindex = "1"> </form> 
    <form> <input class= "auth-input" type="text" placeholder = "Пароль" tabindex = "2"> </form>
    <div class = "auth-rules"> Нажимая кнопку "Зарегистрироваться" вы принимаете условия <a href = "#">Пользовательского 
    соглашения и Политики обработки персональных данных </a>
    </div>
    `,
    footer: `<div class = "form-action"> <button class = "btn" tabindex = "4"> Зарегистрироваться </button></div>`
}

const navBtns = document.querySelectorAll(".nav-item")
for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener("click", showMenu)
}



