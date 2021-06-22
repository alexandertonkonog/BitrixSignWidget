const API_URL = 'https://charite.me/local/firstbit/data.php';
class Widget {
  error = false;
  errorField = false;

  constructor(item) {
    this.widget = item;
    this.idContainer = this.widget.querySelector('.UMC-widget__medic-id');
    this.id = this.idContainer.dataset.medic;
    if (!this.id) {
      this.id = this.idContainer.textContent;
    }
    this.name = 'UMC-widget' + this.id;
    this.dotName = '.' + this.name;
    this.widget.classList.add(this.name);
    
    this._init();
    if (!window.UMCWidget.list) {
      window.UMCWidget.list = [];
    }
    window.UMCWidget.list.push(this);
    window.UMCWidget['Widget'+this.id] = this;
  }

  async _init() {
    try {
      this._togglePreloader(true);
      this._setUser();
      this._widgetInit();
      this._togglePreloader(false);
    } catch (e) {
      this._togglePreloader(false);
      Widget._sendError([this.widget]);
    }
  }

  _widgetInit() {
    
    this.serviceArea = new ServiceArea(this);
    this.calendar = new Calendar(this);
		this.modal = new Modal(this);
		this.btnArea = new BtnArea(this);
		this.fieldArea = this.modal.screens.find(item => item.name === 'inputs');
		this.successScreen = this.modal.screens.find(item => item.name === 'success');
  }

  _setUser() {
    this.user = window.UMCWidget.data.find((item) => item.doctor_id === this.id);
    if (!this.user) {
      throw new Error('error');
    } else {
      State.setField("doctor_id", this.id);
    }
    
  }

  async _sendCode() {
    const codeMessage = {
      data: {
        number: '+' + State.getField('number'),
        code: State.getCode(),
      },
      method: 'sms',
    }
    try {
      let data = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(codeMessage)
      });
      return await data.json();
    } catch (e) {
      this._sendModalError(e);
    }
  }

  async _sendInformation() {
    
    const state = State.getState();	
    const payload = {data: state, method: 'appointment'};
		try {
			let data = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return await data.json();
		} catch {
			this._sendModalError();
		}
	}

  async checkNumber() {
    this.errorField = false;
    let fields = State.getRequiredFields();
    this.fieldArea.fields.forEach((item) => {
      if (fields.includes(item.name) && (item.error || item._isEmpty())) {
        this.errorField = true;
        item.sendError();
      }
    });
    if (!this.errorField) {
      State.setCode(this._createCode());
      this.btnArea._showPreloader(true);
      let result = await this._sendCode();
      this.btnArea._hidePreloader();
      if (result && result.success) {
				this.modal.setTitle("Подтвердите номер телефона");
        this.modal._changeScreen('accept');
      } else {
				this._sendModalError();
			}
    }
  }

  async submit() {
		let input = this.fieldArea.fields.find(item => item.name === 'code');
		if (input.error || input._isEmpty()) {
			input.sendError();
		} else {
			let condition = btoa(input.input.value.trim()) === State.getCode();
			if (condition) {
				this.btnArea._showPreloader(false);
				let result = await this._sendInformation();
				if (result && result.success) {
					this.modal.setTitle("Запись произведена");
					this.btnArea._hidePreloader();
					this.successScreen.setData();
					this.modal._clearInputs();
					this.modal._changeScreen('success');
					State.clearState();
				} else {
					this._sendModalError();
				}
			} else {
				input.sendCodeError();
			}
		}
	}

  _togglePreloader(start) {
    let preloader = document.querySelector(this.dotName + " .UMC-widget__preloader-wrapper");
    let form = document.querySelector(this.dotName + " .UMC-widget__calendar-container");
    if (start) {
      preloader.classList.remove("UMC-widget_class-hidden");
      form.classList.add("UMC-widget_class-hidden");
    } else {
      preloader.classList.add("UMC-widget_class-hidden");
      form.classList.remove("UMC-widget_class-hidden");
    }
  }

  static _sendError(widgets) {
    widgets.forEach(item => {
      let preloader = item.querySelector(".UMC-widget__preloader-wrapper");
      let errorArea = item.querySelector('.UMC-widget__error-area');
      let error = item.querySelector('.UMC-widget__error-wrapper');
      let serviceArea = item.querySelector('.UMC-widget__service-area');
      let textFirst = item.querySelector('.UMC-widget__text-first');
      let text = error.querySelector('.UMC-widget__success-text');
      let wrapper = document.createElement('div');
      serviceArea.classList.add('UMC-widget_class-hidden');
      preloader.classList.add('UMC-widget_class-hidden');
      textFirst.classList.add('UMC-widget_class-hidden');
      wrapper.className = 'UMC-widget__calendar-error';
      error.classList.remove('UMC-widget_class-hidden');
      text.textContent = 'Не удалось загрузить расписание. Возможно, врач не принимает в ближайшее время. Перезагрузите страницу или зайдите позднее';
      wrapper.append(error);
      errorArea.append(wrapper);
    })
  }

  _sendModalError() {
    this.modal.setTitle('Ошибка');
    this.modal._changeScreen('error');
  }

  _createCode() {
    let string = "";
    for (let i = 0; i < 3; i++) {
      string += String(Math.round(Math.random() * 100));
    }
    if (string.length === 5) {
      return string;
    } else {
      return this._createCode();
    }
  }
}

class State {
  static _state = {};
  static _code;
  static _requiredFields = [
    "name",
    "number",
    "surname",
    "fathername",
    "dateTime",
  ];

  static setField(name, value) {
    this._state[name] = value;
  }

  static getField(name) {
    return this._state[name];
  }

  static getState() {
    return this._state;
  }

  static clearState() {
		this._state = {};
		this._code = null;
  }

  static getRequiredFields() {
    return this._requiredFields;
  }

  static isRequired(name) {
    return this._requiredFields.includes(name);
  }

  static setCode(code) {
    this._code = btoa(code);
  }

  static getCode() {
    return this._code;
  }
}

class ServiceArea {
  
  serviceList = [];
  activeService = null;
  
  constructor (data) {
    this.widget = data;
    this.id = data.id;
    this.user = data.user;
    this.wrapper = data.widget.querySelector('.UMC-widget__service-area');
    this.area = data.widget.querySelector('.UMC-widget__service-list');
    this.price = data.widget.querySelector('.UMC-widget__service-title span');
    this._init();
  }
  
  _init() {
    this.wrapper.classList.remove('UMC-widget_class-hidden');
    this._renderServiceItems();
  }

  _renderServiceItems() {
    this.user.services.forEach(item => {
      let serviceItem = document.createElement('li');
      let serviceItemSpan = document.createElement('span');
      serviceItem.classList.add('UMC-widget__service');
      serviceItemSpan.textContent = item.service_name;
      serviceItem.dataset.cost = item.service_cost;
      serviceItem.dataset.id = item.service_id;
      serviceItem.dataset.time = item.service_time;
      serviceItem.append(serviceItemSpan);
      serviceItem.addEventListener('click', () => this._clickServiceItem(serviceItem, item));
      this.serviceList.push(serviceItem);
      this.area.append(serviceItem);
    })
  }

  _clickServiceItem(node, service) {
    this.serviceList.forEach(item => {
      item.classList.remove('UMC-widget__service_selected');
    });
    node.classList.add('UMC-widget__service_selected');
    this.activeService = service;
    this.widget.calendar._init();
    this.price.innerHTML = service.service_cost + ' &#8381;'
    State.setField('service_id', service.service_id);
  }
}

class Calendar {
  daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  first = false;
  calendarCount = 0;
  calendarElements = [];
  calendarScreens = [];
  timeElements = [];
  timeScreens = [];
  activeTime = null;
  countChanges = 0;
  timeArray = [];

  constructor(data) {
    this.widget = data;
    this.id = data.id;
    this.user = data.user;
    this.calendar = data.widget.querySelector(".UMC-widget__calendar");
    this.timeArea = data.widget.querySelector(".UMC-widget__time-area");
    this.firstText = data.widget.querySelector(".UMC-widget__text-first");
    this.calendarArea = data.widget.querySelector(".UMC-widget__calendar-area");
    this.firstText.classList.remove('UMC-widget_class-hidden');
  }

  _init() {
    this._clearContainers();
    this._changeTimeFormat();
    this._fetchDays();
    this._addFillDays();
    this._render();
    this._initEvents();
    this.countChanges++;
  }

  _changeTimeFormat() {
    let duration = new Date(this.widget.serviceArea.activeService.service_time);
    duration = duration.getHours() * 60 + duration.getMinutes();
    this.user.time.forEach((item, index) => {
      let start = new Date(item.time_start);
      let end = new Date(item.time_end);      
      while (start < end) {
        let firstDate = new Date(start.getTime());
        firstDate.setMinutes(firstDate.getMinutes() + duration);
        if (firstDate <= end) {
          this.timeArray.push(start.getTime());
        }
        start.setMinutes(start.getMinutes() + duration);
      }
    })
  }

  _fetchDays() {
    this.freeDays = [];
    if (this.timeArray && this.timeArray.length) {
      this.timeArray.forEach((item) => {
        let date = new Date(item);
        let day = {
          day: date.getDate(),
          time: [item],
          dayOfWeek: date.getDay(),
          month: date.getMonth(),
          fullDate: date,
          free: true,
        };
        let condition = this.freeDays.find(
          (item) => item.day === day.day && item.month === day.month
        );
        if (!condition) {
          this.freeDays.push(day);
        } else {
          condition.time.push(item);
        }
      });
    }
  }

  _addFillDays() {
    let today = new Date();
    let arr = [];
    for (let i = 0; i < 14; i++) {
      let newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      let day = this._createFillDay(newDate);
      let condition = this.freeDays.find(
        (item) => item.day === day.day && item.month === day.month
      );
      if (!condition) {
        arr.push(day);
      }
    }
    let commonArr = [...arr, ...this.freeDays].sort(
      (a, b) => a.fullDate - b.fullDate
    );
    let firstArr = commonArr.filter((item, index) => index <= 6);
    let secondArr = commonArr.filter((item, index) => index > 6);
    this.renderDays = [firstArr, secondArr];
  }

  _createFillDay(date) {
    return {
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      month: date.getMonth(),
      fullDate: date,
      free: false,
    };
  }

  _render() {
    
    this.renderDays.forEach((renderArr, renderIndex) => {
      let calendarScreen = document.createElement("div");
      calendarScreen.classList.add("UMC-widget__calendar-screen");
      calendarScreen.dataset.id = renderIndex;
      renderArr.forEach((item) => {
        let day = this._renderCalendarElement(item, this.calendarCount);
        calendarScreen.append(day);
        this.calendarElements.push(day);
        if (item.free) {
          let timeScreen = this._renderTimeScreen(item, this.calendarCount);
          this.timeArea.append(timeScreen);
          this.timeScreens.push(timeScreen);
        }
        this.calendarCount++;
      });
      this.calendar.append(calendarScreen);
      this.calendarScreens.push(calendarScreen);
    });
  }

  _renderCalendarElement(item, index) {
    let day = document.createElement("div");
    let today = new Date();
    day.classList.add("UMC-widget__day");
    if (item.free) {
      day.classList.add("UMC-widget__day_free");
    }
    day.innerHTML = `
			<div class="UMC-widget__day-top">${this.daysOfWeek[item.dayOfWeek]}</div>
			<div class="UMC-widget__day-bottom">${item.day}</div>`;
    if (today.getDate() === item.day && today.getMonth() === item.month) {
      let dot = document.createElement("div");
      dot.className = "UMC-widget__day-dot";
      day.append(dot);
    }
    day.dataset.id = index;
    day.addEventListener("click", () => {
      if (item.free) {
        this._clickCalendarElement(day);
      }
    });
    return day;
  }

  _renderTimeScreen(item, index) {
    let timeScreen = document.createElement("div");
    timeScreen.className = "UMC-widget__time-screen UMC-widget_class-hidden";
    if (!this.first) {
      this.first = index;
    }
    timeScreen.dataset.id = index;
    item.time.forEach((elem) => {
      let timeEl = document.createElement("div");
      timeEl.className = "UMC-widget__time-element-wrapper";
      let dateTime = new Date(elem);
      timeEl.innerHTML =
        '<div class="UMC-widget__time-element">' +
        ("0" + dateTime.getHours()).slice(-2) +
        ":" +
        ("0" + dateTime.getMinutes()).slice(-2) +
        "</div>";
      timeEl.dataset.date = dateTime.getDate();
      timeEl.dataset.month = dateTime.getMonth();
      timeEl.dataset.year = dateTime.getFullYear();
      timeEl.dataset.hour = dateTime.getHours();
      timeEl.dataset.minute = dateTime.getMinutes();
      timeEl.addEventListener("click", () => {
        this._clickTimeElement(timeEl);
      });
      timeScreen.append(timeEl);
      this.timeElements.push(timeEl);
    });
    return timeScreen;
  }

  _clearContainers() {
    this.calendar.innerHTML = '';
    this.timeArea.innerHTML = '';
    this.firstText.classList.add('UMC-widget_class-hidden');
    this.calendarArea.classList.remove('UMC-widget_class-hidden');
    this.first = false;
    this.calendarCount = 0;
    this.calendarElements = [];
    this.calendarScreens = [];
    this.timeElements = [];
    this.timeScreens = [];
    this.timeArray = [];
    this.activeTime = null;
  }

  _clickCalendarElement(item) {
    if (!item.classList.contains('UMC-widget__day_disabled')) {
      let timeScreen = this.timeScreens.find(
        (elem) => elem.dataset.id === item.dataset.id
      );
      this.calendarElements.forEach((elem) =>
        elem.classList.remove("UMC-widget__day_clicked")
      );
      this.timeScreens.forEach((elem) =>
        elem.classList.add("UMC-widget_class-hidden")
      );
      timeScreen.classList.remove("UMC-widget_class-hidden");
      item.classList.add("UMC-widget__day_clicked");
    }
  }

  _clickTimeElement(item) {
    if (!item.classList.contains('UMC-widget__time-element-wrapper_disable')) {
      this.timeElements.forEach((elem) =>
        elem.classList.remove("UMC-widget__time-element-wrapper_selected")
      );
      item.classList.add("UMC-widget__time-element-wrapper_selected");
      let data = item.dataset;
      let formatDate = (num) => {
        return ("0" + num).slice(-2);
      };
      let str =
        data.year +
        "-" +
        formatDate(+data.month + 1) +
        "-" +
        formatDate(data.date) +
        "T" +
        formatDate(data.hour) +
        ":" +
        formatDate(data.minute) +
        ":00";
      State.setField("dateTime", str);
      this.activeTime = item;
      this.widget.modal._showModal();
    }
  }
  
  _disableTimeElements() {
    this.timeElements.forEach(item => {
      if (!item.classList.contains('UMC-widget__time-element-wrapper_selected')) {
        item.classList.add('UMC-widget__time-element-wrapper_disable');
      }
    })
  }

  _activeTimeElements() {
    this.timeElements.forEach(item => item.classList.remove('UMC-widget__time-element-wrapper_disable'))
  }

  _removeFromScreens() {
    this.timeScreens.forEach(item => {
      if (item && !item.childNodes.length) {
        let day = this.calendarElements.find(elem => item.dataset.id === elem.dataset.id);
        day.classList.remove('UMC-widget__day_clicked');
        day.classList.add('UMC-widget__day_disabled');
        day.classList.remove('UMC-widget__day_free');
        item.remove(); 
      }
    })
  }

  _toggleCalendarScreens() {
    let toggler = document.querySelector(this.widget.dotName + " .UMC-widget__calendar-toggle");
    toggler.classList.toggle("UMC-widget__calendar-toggle_rotate");
    this.calendarScreens.forEach((item) =>
      item.classList.toggle("UMC-widget__calendar-screen_translated")
    );
  }

  _changeCalendarScreen() {
    let toggler = document.querySelector(this.widget.dotName + " .UMC-widget__calendar-toggle");
    toggler.classList.add("UMC-widget__calendar-toggle_rotate");
    this.calendarScreens.forEach((item) =>
      item.classList.add("UMC-widget__calendar-screen_translated")
    );
  }

  _initEvents() {
    let toggler = document.querySelector(this.widget.dotName + " .UMC-widget__calendar-toggle");
    let day = document.querySelector(
      this.widget.dotName + ` .UMC-widget__day[data-id="${this.first}"]`
    );
    let timeScreen = document.querySelector(
      this.widget.dotName + ` .UMC-widget__time-screen[data-id="${this.first}"]`
    );
    day.classList.add("UMC-widget__day_clicked");
    timeScreen.classList.remove("UMC-widget_class-hidden");
    if (!this.countChanges) {
      toggler.addEventListener("click", () => this._toggleCalendarScreens());
    }
    if (this.first > 6) {
      this._changeCalendarScreen();
    }
  }
}

class BtnArea {
  constructor(widget) {
    this.widget = widget;
    this.btn = document.querySelector(this.widget.dotName + " #UMC-widget__btn-sign");
    this.access = document.querySelector(this.widget.dotName + " #UMC-widget__btn-accept");
    this._init();
  }

  _init() {
    this.btn.addEventListener("click", () => {
      this.widget.checkNumber();
    });
    this.access.addEventListener("click", () => {
      this.widget.submit();
    });
  }

  _showPreloader(code) {
    if (!this.preloader) {
      this.preloader = document.createElement("img");
      this.preloader.src = "https://itprotection.ru/api/load.gif";
      this.preloader.classList.add("UMC-widget__preloader-btn");
      if (code) {
        this.btn.innerHTML = "";
        this.btn.append(this.preloader);
      } else {
        this.access.innerHTML = "";
        this.access.append(this.preloader);
      }
    }
  }

  _hidePreloader() {
    if (this.preloader) {
      this.preloader.remove();
      this.preloader = null;
		}
    this.btn.textContent = "записаться на прием";
    this.access.textContent = "подтвердить номер";
  }
}

class Modal {
	screens = [];
  activeScreen = 'inputs';

	constructor(widget) {
    this.widget = widget;
    this.title = document.querySelector(this.widget.dotName + " .UMC-widget__modal-title");
    this.modal = document.querySelector(this.widget.dotName + " .UMC-widget__modal");
    this.content = document.querySelector(this.widget.dotName + " .UMC-widget__modal-body");
    this.exit = document.querySelector(this.widget.dotName + " .UMC-widget__modal-exit");
		this._init()
	}

	_init() {
		let screens = document.querySelectorAll(this.widget.dotName + ' .UMC-widget__modal-screen');
    
		screens.forEach(item => {
			if (item.dataset.name === 'inputs') {
        
				this.screens.push(new FieldArea(item, this.widget));
        
			} else if (item.dataset.name === 'success') {
        
				this.screens.push(new SuccessScreen(item, this.widget));
        
			} else {
        
				this.screens.push(new ModalScreen(item, this.widget));
        
			}
		});
		this.exit.addEventListener("click", () => {
      this._hideModal();
    });
    this.modal.addEventListener("click", (e) => {
      if (e.target == this.modal) {
        this._hideModal();
      }
    });
	}

	_showModal() {
    document.body.style.overflow = "hidden";
    this.modal.classList.remove("UMC-widget_class-hidden");
    setTimeout(() => {
      this.content.classList.remove("UMC-widget__modal-body_hidden");
    }, 100);
  }

  _hideModal() {
    this.content.classList.add("UMC-widget__modal-body_hidden");
    setTimeout(() => {
      this.modal.classList.add("UMC-widget_class-hidden");
      document.body.style.overflow = "auto";
      this._exitModalCallback();
    }, 100);
	}
	
	_changeScreen(name) {
		this.screens.forEach(item => {
			if (item.name === name) {
				item.screen.classList.remove("UMC-widget_class-hidden");
			} else {
				item.screen.classList.add("UMC-widget_class-hidden");
			}
    })
    this.activeScreen = name;
  }
  
  _exitModalCallback() {
    switch (this.activeScreen) {
      case 'accept': {
        this.widget.calendar._disableTimeElements();
        break;
      }
      case 'success': {
        this.widget.calendar._activeTimeElements();
        this.widget.calendar.activeTime.remove();
        this.widget.calendar.activeTime = null;
        this.widget.calendar._removeFromScreens();
        this._changeScreen('inputs');
        break;
      }
      case 'error': {
        this.widget.calendar._activeTimeElements();
        // State.clearState();
        this._changeScreen('inputs');
        break;
      }
      default: {
    
      }
    }
  }

	setTitle(text) {
		this.title.textContent = text;
	}

	_clearInputs() {
		let screen = this.screens.find(item => item.name === 'inputs');
		screen.fields.forEach(item => item.input.value = '');
	}
}

class ModalScreen {
	constructor(item, widget) {
    this.widget = widget;
		this.screen = item;
		this.name = item.dataset.name;
	}
}

class FieldArea extends ModalScreen {
  fields = [];  
  
  constructor(item, widget) {
    
		super(item, widget);
    
    this._init();
  }

  _init() {
    let inputs = document.querySelectorAll(this.widget.dotName + " .UMC-widget__input-wrapper");
    let openInputBtns = document.querySelectorAll(this.widget.dotName + " .UMC-widget__open-input");
    inputs.forEach((item) => {
      this.fields.push(new Input(item, this.widget));
    });
    
    openInputBtns.forEach((item) => {
      item.addEventListener("click", () => {
        let input = document.querySelector(
          this.widget.dotName + ` .UMC-widget__input[data-name="${item.dataset.name}"]`
        );
        input.parentNode.classList.remove("UMC-widget_class-hidden");
        item.remove();
      });
    });
	}
	
	_clearInputs() {
		this.fields.forEach(item => item.value = '');
	}
}

class SuccessScreen extends ModalScreen {
	constructor(item, widget) {
		super(item, widget);
		this.node = item.querySelector(this.widget.dotName + ' .UMC-widget__success-text');
	}

	setData() {
		let state = State.getField('dateTime');
		let date = new Date(state);
		let dateStr = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
		let timeStr = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
		let user = this.widget.user.doctor_name;
		this.node.innerHTML = `Вы записались на прием к врачу <span class="UMC-widget__success-highlight">${user}<span> на <span class="UMC-widget__success-highlight">${dateStr}<span> в <span class="UMC-widget__success-highlight">${timeStr}<span>`;
	}
}

class Input {
  constructor(wrapper, widget) {
    this.wrapper = wrapper;
    this.widget = widget;
    this.input = wrapper.querySelector(this.widget.dotName + " .UMC-widget__input");
    
    this.name = this.input.dataset.name;
		this.error = false;
    this.required = State.isRequired(this.name);
    this._setValidation();
    this._setText();
    this._init();
  }

  _init() {
    if (this.required || this.name === 'code') {
      this.input.addEventListener("focusout", () => {
        let condition = this._isEmpty();
        if (condition) {
          this.sendError();
          this.error = true;
        } else {
          this.error = false;
        }
      });
		}
    if (this.name === "number" && IMask) { 
      let maskOptions = {
        mask: '+{7}(000)000-00-00'
      };
      this.mask = IMask(this.input, maskOptions);
    }
		this.input.addEventListener("focusin", () => {
			this.error = false;
			this.input.classList.remove("UMC-widget__input_empty");
			if (this.info) {
				this.info.remove();
				this.info = null;
			}
		});
    this.input.addEventListener("input", (e) => {
      if (this.name === "number" && this.mask) {        
        State.setField(this.name, this.mask.unmaskedValue);
        // State.setField(this.name, e.target.value.trim());
      } else {
        State.setField(this.name, e.target.value.trim());
      }
    });
  }

  _setText() {
    if (this.name === "number")
      this.text = `Введите номер телефона. Минимальная длина 11 символов. Допускаются только цифры`;
    else if (this.name === "name")
      this.text = `Введите имя. Минимальная длина ${this.minValue} символа`;
    else if (this.name === "surname")
      this.text = `Введите фамилию. Минимальная длина ${this.minValue} символа`;
    else if (this.name === "fathername")
      this.text = `Введите отчество. Минимальная длина ${this.minValue} символа`;
    else if (this.name === "code") this.text = `Введите пятизначный код из смс`;
    else
      this.text = `Заполните обязательное поле. Минимальная длина - ${this.minValue} символа`;
  }

  _setValidation() {
    if (this.name === "number") {
      this.minValue = 16;
      this.maxValue = 16;
    } else if (
      this.name === "name" ||
      this.name === "surname" ||
      this.name === "fathername"
    ) {
      this.minValue = 3;
      this.maxValue = 20;
    } else if (this.name === "code") {
      this.minValue = 5;
      this.maxValue = 5;
    } else {
      this.minValue = 3;
      this.maxValue = 100;
    }
    this.input.setAttribute("maxlength", this.maxValue);
  }

  sendError() {
    if (!this.info) {
      this.input.classList.add("UMC-widget__input_empty");
      this.info = document.createElement("p");
      this.info.className = "UMC-widget__input-info";
      this.info.textContent = this.text;
      this.wrapper.append(this.info);
    }
	}
	
	sendCodeError() {
		if (!this.info) {
      this.input.classList.add("UMC-widget__input_empty");
      this.info = document.createElement("p");
      this.info.className = "UMC-widget__input-info";
      this.info.textContent = 'Неправильный код';
      this.wrapper.append(this.info);
    }
	}
	
	_isEmpty() {
		return !this.input.value ||
			this.input.value.length < this.minValue ||
			this.input.value.length > this.maxValue;
	}
}

const pageInit = async () => {
  State.setField('site_id', window.location.origin);
  let widgets = document.querySelectorAll('.UMC-widget');
  let reqArray = [];
  if (!window.UMCWidget) {
    window.UMCWidget = {};
  }
  widgets.forEach(item => {
    let con = item.querySelector('.UMC-widget__medic-id');
    let id = con.dataset.medic;
    if (!id) {
      id = con.textContent;
    } 
    if (!reqArray.includes(id)) {
      reqArray.push(id);
    }
  })
  
  try {
    if (reqArray.length) {
      let payload = {
        method: 'schedule',
        data: reqArray
      }
      
      let data = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
 
      window.UMCWidget.data = await data.json();

      window.UMCWidget.dataLoaded = true;
      widgets.forEach(item => {
        new Widget(item);
      })
      
    } else {
      throw Error('There are not doctors');
    }    
  } catch (e) {
    console.log(e)
    Widget._sendError(widgets);
    window.UMCWidget.dataLoaded = false;
    
  }
} 

document.addEventListener("DOMContentLoaded", pageInit);



