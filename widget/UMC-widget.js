let store = { //state
    send: {
        name: '',
        surname: '',
        number: '',
        address: '',
        comment: '',
        email: '',
        clinic: null,
        spec: null,
        medic: null,
        dateTime: null
    },
    state: null,
    error: false,
    clinic: null,
    spec: null,
    medic: null,
    dateTime: {},
    medicDateTime: null
}
let initWidget = () => { //init widget
    fetch('./widget/settings.json')
        .then(res => res.json())
        .then(res => {
            store.state = res;
            firstLoad();
        })
}
let renderWidget = state => { // rendering widget
    let getPosition = str => { // choose widget position
        if(str === 'left-top') {
            return 'left: 10px; top: 10px;'
        } else if (str === 'right-top') {
            return 'right: 10px; top: 10px;'
        } else if (str === 'left-bottom') {
            return 'left: 10px; bottom: 10px;'
        } else {
            return 'right: 10px; bottom: 10px;'
        }
    }
    let svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">
                <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                    "/>
                </svg>`;
    let preloader = `<svg class="UMC-widget__preloader UMC-widget__preloader_hidden" viewBox="0 0 97.541 97.54" xml:space="preserve">
        <path d="M70.063,27.182c1.398,1.175,3.174,1.821,4.996,1.821c2.312,0,4.488-1.014,5.974-2.782
            c2.76-3.289,2.329-8.211-0.96-10.973c-1.4-1.175-3.176-1.822-5-1.822c-2.311,0-4.487,1.014-5.971,2.782
            C66.341,19.498,66.773,24.419,70.063,27.182z"/>
        <path d="M88.445,36.096c-0.483,0-0.971,0.043-1.448,0.127c-4.485,0.791-7.493,5.086-6.702,9.573
            c0.696,3.955,4.111,6.825,8.119,6.825c0.482,0,0.972-0.043,1.451-0.126c4.485-0.792,7.492-5.086,6.701-9.571
            C95.868,38.968,92.452,36.096,88.445,36.096z"/>
        <path d="M88.158,63.113c-1.328-0.768-2.834-1.172-4.354-1.172c-3.118,0-6.022,1.675-7.579,4.371
            c-1.165,2.019-1.477,4.371-0.872,6.625s2.052,4.139,4.069,5.304c1.329,0.769,2.835,1.174,4.357,1.174
            c3.116,0,6.02-1.674,7.576-4.369C93.761,70.874,92.327,65.521,88.158,63.113z"/>
        <path d="M63.316,78.646c-1.07,0-2.13,0.188-3.15,0.558c-2.31,0.841-4.153,2.532-5.193,4.761c-1.039,2.229-1.148,4.729-0.308,7.04
            c1.32,3.626,4.798,6.063,8.654,6.063c1.07,0,2.13-0.188,3.147-0.559c2.308-0.841,4.15-2.531,5.191-4.764
            c1.04-2.23,1.15-4.73,0.312-7.037C70.651,81.083,67.172,78.646,63.316,78.646z"/>
        <path d="M39.903,78.757c-1.074-0.39-2.188-0.588-3.31-0.588c-4.054,0-7.71,2.562-9.097,6.375
            c-0.886,2.431-0.771,5.06,0.322,7.403c1.092,2.344,3.031,4.121,5.462,5.006c1.072,0.391,2.187,0.587,3.312,0.587
            c4.056,0,7.711-2.562,9.097-6.372c0.884-2.426,0.768-5.055-0.326-7.4C44.268,81.42,42.33,79.641,39.903,78.757z"/>
        <path d="M24.916,65.6c-1.81-3.133-5.183-5.078-8.805-5.078c-1.771,0-3.522,0.472-5.067,1.361c-2.35,1.357-4.03,3.549-4.731,6.166
            c-0.703,2.62-0.343,5.357,1.014,7.706c1.81,3.134,5.184,5.08,8.806,5.08c1.77,0,3.521-0.472,5.065-1.362
            C26.046,76.674,27.714,70.45,24.916,65.6z"/>
        <path d="M11.495,54.991c5.158,0,9.555-3.695,10.453-8.786c0.492-2.797-0.133-5.617-1.762-7.94
            c-1.627-2.326-4.063-3.878-6.861-4.372c-0.62-0.108-1.247-0.163-1.86-0.163c-5.158,0-9.555,3.694-10.453,8.785
            C0.52,45.31,1.145,48.13,2.774,50.456c1.628,2.325,4.065,3.878,6.861,4.371C10.252,54.936,10.878,54.991,11.495,54.991z"/>
        <path d="M24.849,32.319c2.599,0,5.131-0.923,7.13-2.598c2.268-1.903,3.659-4.58,3.918-7.538c0.259-2.958-0.647-5.836-2.551-8.104
            c-2.114-2.52-5.217-3.965-8.511-3.965c-2.603,0-5.135,0.922-7.131,2.597c-2.271,1.906-3.665,4.583-3.923,7.537
            c-0.259,2.952,0.648,5.831,2.555,8.104C18.453,30.873,21.555,32.319,24.849,32.319z"/>
    <circle cx="49.955" cy="12.076" r="12.076"/>
    </svg>`;
    let html = `
        <style>
        .UMC-widget {
            position: ${state.style.widgetPosition};
            ${state.style.widgetPosition === 'fixed' ? getPosition(state.style.widgetPositionPlace) : ''}
            background: ${state.style.backgroundColor};
            width: ${state.style.backgroundWidth};
            max-height: ${state.style.backgroundMaxHeight};
        }
        .UMC-widget__list-title {
            color: ${state.style.placeholderFontColor};
        }
        .UMC-widget__list-title_selected {
            color: ${state.style.inputFontColor};
        }
        .UMC-widget__preloader {
            fill: ${state.style.inputFontColor};
        }
        .UMC-widget::-webkit-scrollbar-thumb {
            background-color: ${state.style.scrollBarColor};
        }
        .UMC-widget::-webkit-scrollbar-thumb:hover {
            background-color: ${state.style.scrollBarColorHover};
        }
        .UMC-widget__input {
            color: ${state.style.inputColor};
            background-color: ${state.style.inputBackGround};
        }
        .UMC-widget__input::-webkit-input-placeholder {
            color: ${state.style.placeholderFontColor};
            font-size: ${state.style.placeholderFontSize};
        }
        .UMC-widget__input::-moz-placeholder {
            color: ${state.style.placeholderFontColor};
            font-size: ${state.style.placeholderFontSize};
        }
        .UMC-widget__input:-moz-placeholder {
            color: ${state.style.placeholderFontColor};
            font-size: ${state.style.placeholderFontSize};
        }
        .UMC-widget__input:-ms-input-placeholder {
            color: ${state.style.placeholderFontColor};
            font-size: ${state.style.placeholderFontSize};
        }
        .UMC-widget__icon {
            fill: ${state.style.placeholderFontColor};
        }
        
        .UMC-widget__button {
            background-color: ${state.style.buttonColor};
            color: ${state.style.buttonFontColor};
            font-size: ${state.style.buttonFontSize};
        }
        .UMC-widget__hr {
            background-color: ${state.style.textColor};
        }
        .UMC-widget__text {
            color: ${state.style.textColor};
        }
        .UMC-widget__success-text, .UMC-widget__return-back, .UMC-widget__success-icon, .UMC-widget__success-title {
            fill: ${state.style.inputColor};
            color: ${state.style.inputColor};
            text-align: center;
        }
        .UMC-widget__text_hr {
            background-color: ${state.style.backgroundColor};
        }
        .UMC-widget__list-header {
            color: ${state.style.placeholderFontColor};
            background-color: ${state.style.inputBackGround};
        }
        .UMC-widget__list-header:hover {
            background-color: ${state.style.listItemColorHover};
        }
        .UMC-widget__list {
            color: ${state.style.placeholderFontColor};
        }
        .UMC-widget__list-item {
            color: ${state.style.placeholderFontColor};
            border-top: 1px solid ${state.style.placeholderFontColor};
        }
        .UMC-widget__list-item:hover {
            background-color: ${state.style.listItemColorHover};
            color: ${state.style.listItemFontColorHover}
        }
        .UMC-widget__list::-webkit-scrollbar-thumb {
            background-color: ${state.style.scrollBarColor};
        }
        .UMC-widget__list::-webkit-scrollbar-thumb:hover {
            background-color: ${state.style.scrollBarColorHover};
        }
        .UMC-widget__open-input {
            color: ${state.style.textColor};
        }
        </style>
        <form class="UMC-widget__form" id="UMC-widget__form" method="POST">
            <div class="UMC-widget__inputs-wrapper">
                <div class="UMC-widget__inputs">
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" data-type="Клиника">
                    <div class="UMC-widget__input UMC-widget__elem UMC-widget__down-list" data-type="Клиника">
                        <header class="UMC-widget__list-header">
                            <p class="UMC-widget__list-title">Клиника *</p>
                            <div class="UMC-widget__icon UMC-widget__icon_arrow">
                                ${svg}
                            </div>
                        </header>
                        <ul class="UMC-widget__list" data-type="Клиника" ></ul>
                    </div>
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" data-type="Специализация">
                    <div class="UMC-widget__input UMC-widget__elem UMC-widget__down-list" data-type="Специализация">
                        <header class="UMC-widget__list-header">
                            <p class="UMC-widget__list-title">Специализация *</p>
                            <div class="UMC-widget__icon UMC-widget__icon_arrow">
                                ${svg}
                            </div>
                        </header>
                        <ul class="UMC-widget__list" data-type="Специализация" ></ul>
                    </div>
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" data-type="Врач">
                    <div class="UMC-widget__input UMC-widget__elem UMC-widget__down-list" data-type="Врач">
                        <header class="UMC-widget__list-header">
                            <p class="UMC-widget__list-title">Врач *</p>
                            <div class="UMC-widget__icon UMC-widget__icon_arrow">
                                ${svg}
                            </div>
                        </header>
                        <ul class="UMC-widget__list" data-type="Врач" ></ul>
                    </div>
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" data-type="Время приема">
                    <div class="UMC-widget__input UMC-widget__elem UMC-widget__down-list" data-type="Время приема">
                        <header class="UMC-widget__list-header">
                            <p class="UMC-widget__list-title">Время приема *</p>
                            <div class="UMC-widget__icon UMC-widget__icon_arrow">
                                ${svg}
                            </div>
                        </header>
                        <ul class="UMC-widget__list" data-type="Время приема" ></ul>
                    </div>
                    </div>
                    <div class="UMC-widget__input-wrapper" >
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="Имя *" data-name="name" />
                    </div>
                    <div class="UMC-widget__input-wrapper">
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="Фамилия *" data-name="surname" />
                    </div>
                    <div class="UMC-widget__input-wrapper">
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="Телефон *" data-name="number" />
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input">
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="email" name="email" data-name="email" />
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" >
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="Адрес" data-name="address" />
                    </div>
                    <div class="UMC-widget__input-wrapper UMC-widget__hide-input" >
                        <input class="UMC-widget__input UMC-widget__elem" placeholder="Комментарий" data-name="comment" />
                    </div>
                </div>
                <div class="UMC-widget__inputs-dop">
                    ${preloader}
                </div>
                <p class="UMC-widget__open-input" data-value="address" >Адрес</p>
                <p class="UMC-widget__open-input" data-value="comment" >Комментарий</p>
            </div>
            <p class="UMC-widget__error-wrapper UMC-widget__error-wrapper_hidden UMC-widget__info">В данной клинике нет свободных врачей. Пожалуйста выберите другую.</p>
            <p class="UMC-widget__error-wrapper UMC-widget__error-wrapper_hidden UMC-widget__error">Заполните помеченные звездочкой обязательные поля</p> 
            <button class="UMC-widget__button UMC-widget__elem" id="UMC-widget__btn-order">Записаться на прием</button>
            <hr class="UMC-widget__hr">
            <p class="UMC-widget__text UMC-widget__text_hr">или</p>
            <p class="UMC-widget__text UMC-widget__text_info">вы можете оставить заявку
                для записи на ближайшее время, оператор свяжется
                с вами для уточнения удобной даты и времени, в этом случае ввод врача и времени приема необязателен</p>
            <button class="UMC-widget__button UMC-widget__elem" id="UMC-widget__btn-call">оставить заявку</button>
        </form>
        <div class="UMC-widget__success-page UMC-widget__page_hidden"></div>`;
    let insertWidget = (state) => { // inserting widget in container or body
        let wrapper = document.createElement('div');
        wrapper.className = 'UMC-widget';
        wrapper.id = 'UMC-widget';
        wrapper.innerHTML = html;
        if(state.style.containerClass) {
            let container = document.querySelector(state.style.containerClass);
            container.append(wrapper);
        } else {
            document.body.append(wrapper);
        }
    }
    insertWidget(store.state);
}
let firstLoad = () => {
    renderWidget(store.state);
    togglePreloader(false);
    initInputs();
    initBtnEvents();
    initAddingInputs();
    
    fetch(`${store.state.settings.addresFile}?type=clinic`)
        .then(res => res.json())
        .then(res => {
            store.clinic = res;
            togglePreloader(true);
            renderFirstInput(store.state);
        }).catch(err => {
            finalRender('err');
            togglePreloader(true);
        })
}


let clinicLiCallback = item => {
    store.send.clinic = {
        id: item.id,
        name: item.name
    }
    let list = ['Врач', 'Время приема', 'Cпециализация'].map(item => document.querySelector(`.UMC-widget__input-wrapper[data-type="${item}"]`));
    hideInputs(list);
    delayRender();
}
let specLiCallback = item => {
    store.send.spec = {
        id: item.id,
        name: item.name
    }
    let input = document.querySelector(`.UMC-widget__input-wrapper[data-type="Врач"]`);
    let input1 = document.querySelector(`.UMC-widget__input-wrapper[data-type="Время приема"]`);
    let arr = store.medic.filter(item => item.spec === store.send.spec.name);
    if(!input.classList.contains('UMC-widget__hide-input')) {
        removeInputItem('Врач');
        rerenderInputItem('Врач', arr, medicCallback);
        cancelChoose('Врач');
    } else {
        renderInput('Врач', arr, medicCallback);
        cancelChoose('Врач');
    }
    if (!input1.classList.contains('UMC-widget__hide-input')) {
        removeInputItem('Время приема');
        rerenderInputItem('Время приема', timeLiCallback);
        cancelChoose('Время приема');
    } else {
        renderInput('Время приема', {}, timeLiCallback);
        cancelChoose('Врач');
    }
}
let medicCallback = item => {
    store.send.medic = {
        id: item.id,
        name: item.name
    }
    removeInputItem('Время приема');
    rerenderInputItem('Время приема', timeLiCallback);
    cancelChoose('Время приема');
}
let timeLiCallback = (item, el) => {
    store.send.dateTime = {
        id: item.id,
        time: el.replace(' ', 'T')
    }
    store.send.medic = {
        id: item.id,
        name: item.name
    }
    let medicInput = document.querySelector(`.UMC-widget__down-list[data-type="Врач"]`);
    selectInputItem(item, medicInput);
}
let sendCallbackCall = () => {
    togglePreloader(false);
    let d = new Date();
    let str = ( d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00");
    let obj = {
        type: 'call',
        spec: store.send.spec.name,
        clinic: store.send.clinic.id,
        name: store.send.name.trim(),
        surname: store.send.surname.trim(),
        number: store.send.number.trim(),
        comment: store.send.comment.trim(),
        address: store.send.address.trim(),
        today:  store.send.dateTime ? store.send.dateTime.time : str,
        dateTime: store.send.dateTime ? store.send.dateTime.time : str
    };
    fetch(store.state.settings.addresFile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json()).then(res => {
        finalRender('call', res);
        toggleButton(false);
        togglePreloader(true);
    }).catch(err => {
        toggleButton(false);
        togglePreloader(true);
        finalRender('err');
    })
}
let sendCallbackSign = () => {
    togglePreloader(false);
    let obj = {
        type: 'sign',
        spec: store.send.spec.name,
        medic: store.send.medic.id,
        clinic: store.send.clinic.id,
        name: store.send.name.trim(),
        surname: store.send.surname.trim(),
        number: store.send.number.trim(),
        comment: store.send.comment.trim(),
        address: store.send.address.trim(),
        today: store.send.dateTime.time,
        dateTime: store.send.dateTime.time
    };
    fetch(store.state.settings.addresFile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json()).then(res => {
        console.log(res);
        toggleButton(false);
        finalRender('sign', res);
        togglePreloader(true);
    }).catch(err => {
        toggleButton(false);
        togglePreloader(true);
        finalRender('err');
    })
}


let renderFirstInput = () => {
    if(store.clinic.length > 1) {
        renderInput('Клиника', store.clinic, clinicLiCallback)
    } else {
        store.send.clinic = {
            id: store.clinic[0].id,
            name: store.clinic[0].name
        }
        delayRender();
    }
}
let delayRender = () => {
    togglePreloader(false);
    let info = document.querySelector('.UMC-widget__info');
    info.classList.add('UMC-widget__error-wrapper_hidden');
    let d = new Date();
    
    let string = ( d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00");
    fetch(`${store.state.settings.addresFile}?type=time&clinicId=${store.send.clinic.id}&startDate=${string}`)
        .then(res => res.json())
        .then(res => {
            
            if(res.success) {
                info.classList.remove('UMC-widget__error-wrapper_hidden');
            } else {
                setState(res);
                let input = document.querySelector(`.UMC-widget__input-wrapper[data-type="Специализация"]`);
                if (!input.classList.contains('UMC-widget__hide-input')) {
                    removeInputItem('Специализация', 'Врач', 'Время приема');
                    rerenderInputItem('Специализация', store.spec, specLiCallback);
                    cancelChoose('Специализация', 'Врач', 'Время приема');
                } else {
                    renderInput('Специализация', store.spec, specLiCallback);
                }
            }
            togglePreloader(true);
        }).catch(err => {
            
            togglePreloader(true);
            finalRender('err');
        })
}
let renderInput = (str, state = {}, callback) => { //input rendering
    let input = document.querySelector(`.UMC-widget__input-wrapper[data-type="${str}"]`);
    let downList = input.querySelector('.UMC-widget__down-list');
    input.classList.remove('UMC-widget__hide-input');
    if(str === 'Время приема') {
        let arr = store.medic.filter(item => item.spec === store.send.spec.name);
        renderTimeInputItems(arr, downList, timeLiCallback);
    } else {
        renderInputItems(state, downList, callback, str); //render items of input
    }
}
let renderTimeInputItems = (state, target, callback) => {
    let list = target.querySelector('.UMC-widget__list');
    state.forEach(item => {
        let timeList = flat(item.time);
        timeList.forEach(el => {
            let li = document.createElement('li');
            li.className = 'UMC-widget__list-item';
            li.textContent = el.slice(0, el.length-3)+' '+item.name;
            li.dataset.id = item.id;
            li.dataset.name = item.name;
            li.dataset.time = el;
            li.addEventListener('click', () => {
                let title = target.querySelector(`.UMC-widget__list-title`);
                title.classList.add('UMC-widget__list-title_selected');
                title.textContent = el.slice(0, el.length-3) +' '+item.name;
                store.error = false;
                toggleError();
                target.classList.remove('UMC-widget__down-list_open');
                callback(item, el);
            })
            list.append(li); 
        })
        
    })
}
let renderInputItems = (items, target, callback) => {
    let list = target.querySelector('.UMC-widget__list');
    items.forEach(item => { 
        let li = document.createElement('li');
        li.className = 'UMC-widget__list-item';
        li.textContent = item.name;
        li.dataset.id = item.id;
        li.addEventListener('click', () => selectInputItem(item, target, callback));
        list.append(li); 
    })
}
let rerenderInputItem = (str, state, callback = () => {} ) => {
    let input = document.querySelector(`.UMC-widget__down-list[data-type="${str}"]`);
    if(str === 'Время приема') {
        let arr = store.send.medic ? 
        store.medic.filter(item => item.name === store.send.medic.name) : 
        store.medic.filter(item => item.spec === store.send.spec.name);
        renderTimeInputItems(arr, input, timeLiCallback);
    } else {
        renderInputItems(state, input, callback, str);
    }
}
let removeInputItem = (...str) => {
    let wrappers = str.map(item => document.querySelector(`.UMC-widget__list[data-type="${item}"]`));
    wrappers.forEach(item => {
        let li = item.querySelectorAll('.UMC-widget__list-item');
        li.forEach(el => el.remove());
    }) 
}
let hideInputs = list => {
    list.forEach(item => {
        if(item) {
            item.classList.add('UMC-widget__hide-input');
        }
    })
}
let finalRender = (str, res = {}) => {
    let getString = () => {
        if(str === 'err') return `<h3 class="UMC-widget__success-title">Что-то пошло не так!</h3>
                        <p class="UMC-widget__success-text">Попробуйте отправить заявку снова или зайдите позднее.</p>
                        <p class="UMC-widget__return-back">Вернуться к заполнению</p>`;
        else if (res.success === 'false') return `<h3 class="UMC-widget__success-title">Что-то пошло не так!</h3>
                                                 <p class="UMC-widget__success-text">Скорее всего данное время занято, попробуйте выбрать другое.</p>
                                                <p class="UMC-widget__return-back">Вернуться к заполнению</p>`;
        else if (res.success === 'half') return `<h3 class="UMC-widget__success-title">Что-то пошло не так!</h3>
                                                <p class="UMC-widget__success-text">Время было забронировано, но Ваши данные не добавлены.</p>
                                                <p class="UMC-widget__return-back">Вернуться к заполнению</p>`;
        else if (str === 'sign') return `<h3 class="UMC-widget__success-title">Заявка отправлена!</h3>
                                                                    <p class="UMC-widget__success-text">${store.send.name} ${store.send.surname} записан (а) на прием к доктору ${store.send.medic.name} на ${store.send.dateTime.time.replace('T', ' ').slice(0, store.send.dateTime.time.length-3)}.</p>`;
        else if (str === 'call') return `<h3 class="UMC-widget__success-title">Заявка отправлена!</h3>
                                        <p class="UMC-widget__success-text">Вам перезвонят в ближайшее время.</p>`;
        else return `<h3 class="UMC-widget__success-title">Что-то пошло не так!</h3>
                    <p class="UMC-widget__success-text">Попробуйте отправить заявку снова или зайдите позднее.</p>
                    <p class="UMC-widget__return-back">Вернуться к заполнению</p>`;
    }
    let svg = (str === 'err' || res.success === 'false') ? `<svg class="UMC-widget__success-icon" viewBox="0 0 512.001 512.001" xml:space="preserve">
	<g><path d="M503.839,395.379l-195.7-338.962C297.257,37.569,277.766,26.315,256,26.315c-21.765,0-41.257,11.254-52.139,30.102
			L8.162,395.378c-10.883,18.85-10.883,41.356,0,60.205c10.883,18.849,30.373,30.102,52.139,30.102h391.398
			c21.765,0,41.256-11.254,52.14-30.101C514.722,436.734,514.722,414.228,503.839,395.379z M477.861,440.586
			c-5.461,9.458-15.241,15.104-26.162,15.104H60.301c-10.922,0-20.702-5.646-26.162-15.104c-5.46-9.458-5.46-20.75,0-30.208
			L229.84,71.416c5.46-9.458,15.24-15.104,26.161-15.104c10.92,0,20.701,5.646,26.161,15.104l195.7,338.962
			C483.321,419.836,483.321,431.128,477.861,440.586z"/></g><g>
		<rect x="241.001" y="176.01" width="29.996" height="149.982"/></g><g>
		<path d="M256,355.99c-11.027,0-19.998,8.971-19.998,19.998s8.971,19.998,19.998,19.998c11.026,0,19.998-8.971,19.998-19.998
			S267.027,355.99,256,355.99z"/></g>
</svg>`: `<svg class="UMC-widget__success-icon" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
            <g id="check-circle-outline">
                <path d="M150.45,206.55l-35.7,35.7L229.5,357l255-255l-35.7-35.7L229.5,285.6L150.45,206.55z M459,255c0,112.2-91.8,204-204,204
                    S51,367.2,51,255S142.8,51,255,51c20.4,0,38.25,2.55,56.1,7.65l40.801-40.8C321.3,7.65,288.15,0,255,0C114.75,0,0,114.75,0,255
                    s114.75,255,255,255s255-114.75,255-255H459z"/>
            </g>
        </svg>`;
    let widget = document.querySelector('.UMC-widget__form');
    widget.classList.add('UMC-widget__page_hidden');
    let div = document.querySelector('.UMC-widget__success-page');
    let ok =   `<div>${svg + ''+ getString(str, res, err = '')}</div>`;
    div.innerHTML = ok;
    if (str === 'err' || res.success === 'false') {
        let back = div.querySelector('.UMC-widget__return-back');
        back.addEventListener('click', () => {
            div.classList.add('UMC-widget__page_hidden');
            widget.classList.remove('UMC-widget__page_hidden');
        });
        let list = ['Врач', 'Время приема', 'Cпециализация'].map(item => document.querySelector(`.UMC-widget__input-wrapper[data-type="${item}"]`));
        hideInputs(list);
    }
    div.classList.remove('UMC-widget__page_hidden');
    cancelChoose('Специализация', 'Врач', 'Время приема');
}


let selectInputItem = (item, target, callback = () => {}) => {
    let title = target.querySelector(`.UMC-widget__list-title`);
    title.classList.add('UMC-widget__list-title_selected');
    title.textContent = item.name;
    store.error = false;
    toggleError();
    target.classList.remove('UMC-widget__down-list_open');
    callback(item);
}
let closeLists = (node = null) => {
    let lists = document.querySelectorAll('.UMC-widget__down-list');
    lists.forEach(item => {
        if(node !== item) item.classList.remove('UMC-widget__down-list_open');
    });
}
let cancelChoose = (...str) => {
    let clearSelector = str => {
        let item;
        if (str === 'Специализация') item = 'spec';
        else if (str === 'Врач') item = 'medic';
        else if (str === 'Время приема') item = 'dateTime';
        else if (str === 'Клиника') item = 'clinic';
        store.send[item] = null;
    }

    str.map(item => {
        clearSelector(item);
        return document.querySelector(`.UMC-widget__input[data-type="${item}"] .UMC-widget__list-title`)
    }).forEach((elem, ind) => {
        elem.classList.remove('UMC-widget__list-title_selected');
        elem.textContent = str[ind]+'  *';
    });
}
let initInputs = () => {
    let list = document.querySelectorAll('input');
    list.forEach(item => item.addEventListener('input', e => {
        store.error = false;
        toggleError();
        let name = item.dataset.name;
        store.send[name] = e.target.value;
    }))
    let headers = document.querySelectorAll('.UMC-widget__list-header'); //binding header's event
    headers.forEach(item => {
        item.addEventListener('click', () => {
            closeLists(item.parentNode);
            item.parentNode.classList.toggle('UMC-widget__down-list_open');
        })
    })
}
let toggleError = () => {
    let wrap = document.querySelector('.UMC-widget__error');
    if (store.error) {
        wrap.classList.remove('UMC-widget__error-wrapper_hidden');
    } else {
        wrap.classList.add('UMC-widget__error-wrapper_hidden');
    }
}
let initBtnEvents = () => {
    let btnCall = document.getElementById('UMC-widget__btn-call');
    let btnOrder = document.getElementById('UMC-widget__btn-order');
    
    btnCall.addEventListener('click', e => {
        e.preventDefault();
        if (!store.send.email) {
            if (store.send.name && store.send.surname && store.send.number && store.send.clinic && store.send.spec) {
                toggleButton(true);
                sendCallbackCall(btnCall);
            } else {
                store.error = true;
            };
            toggleError();
        }
    })
    btnOrder.addEventListener('click', e => {
        e.preventDefault();
        if (!store.send.email) {
            if (store.send.medic && store.send.name && store.send.surname && store.send.number && store.send.clinic && store.send.dateTime) {
                toggleButton(true);
                sendCallbackSign(btnOrder);
            } else {
                store.error = true;
            };
            toggleError();
        }
    })
}
let initAddingInputs = () => {
    let text = document.querySelectorAll('.UMC-widget__open-input');
    text.forEach(item => item.addEventListener('click', () => {
        let input = document.querySelector(`.UMC-widget__input[data-name="${item.dataset.value}"]`);
        input.parentNode.classList.remove('UMC-widget__hide-input');
        item.remove();
        closeLists();
    }))
}
let setState = res => {
    store.spec = [...(new Set(res.map(item =>  item.employee.spec)))].map((item, ind) => ({name: item, id: ind+1}));
    store.medic = res.map(item => ({name: item.employee.name, id: item.employee.id, time: item.time, spec: item.employee.spec}));
}
let flat = arr => {
    let flatInside = (arr, need) => {
        arr.forEach(item => {
            if(Array.isArray(item)) {
                return flatInside(item, newArr);
            } else {
                need.push(item);
            }
        })
    }
    let newArr = [];
    flatInside(arr, newArr);
    return newArr;
}
let toggleButton = value => {
    let btns = document.querySelectorAll('button');
    btns.forEach(item => {
        item.disabled = value;
    })
}
let togglePreloader = value => {
    let loader = document.querySelector('.UMC-widget__preloader');
    let inputs = document.querySelectorAll('.UMC-widget__input-wrapper');
    if(value) {
        loader.classList.add('UMC-widget__preloader_hidden');
        inputs.forEach(item => {
            item.classList.remove('UMC-widget__input-wrapper_untouchable');
        })
    } else {
        loader.classList.remove('UMC-widget__preloader_hidden');
        inputs.forEach(item => {
            item.classList.add('UMC-widget__input-wrapper_untouchable');
        })
    }
}

initWidget();
