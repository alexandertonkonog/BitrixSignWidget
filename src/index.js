import IMask from 'imask';

class UMCWidget {
  error = false;
  errorField = false;

  constructor(options) {
    // this.API_URL = 'http://test.loc';
    this.API_URL = 'https://gp2dzm-platno.com/1bit/index.php';
    this.options = options;
    this.template = `<section class="UMC-widget">
    <div class="UMC-widget__form" id="UMC-widget__form">
      <div class=" UMC-widget__servicegroups-wrapper UMC-widget__block">
        <div class="UMC-widget__list-header UMC-widget__section-header">Группа услуг:</div>
        <div class="UMC-widget__list shadow-box shadow-box_loading">
          <p class="UMC-widget__list-item">Группа услуг 1</p>
          <p class="UMC-widget__list-item UMC-widget__list-item_selected">Группа услуг 2</p>
          <p class="UMC-widget__list-item">Группа услуг 3</p>
          <p class="UMC-widget__list-item">Группа услуг 4</p>
          <p class="UMC-widget__list-item">Группа услуг 5</p>
          <p class="UMC-widget__list-item">Группа услуг 6</p>
        </div>
      </div>
      <div class="UMC-widget__services-wrapper UMC-widget__block">
        <div class="UMC-widget__list-header UMC-widget__section-header">
          <p>Услуга:</p>
          <p class="UMC-widget__list-header-price"></p>
        </div>
        <div class="UMC-widget__list shadow-box shadow-box_hidden">
          <p class="UMC-widget__list-item">Услуга 1</p>
          <p class="UMC-widget__list-item">Услуга 2</p>
          <p class="UMC-widget__list-item UMC-widget__list-item_selected">Услуга 3</p>
          <p class="UMC-widget__list-item">Услуга 4</p>
          <p class="UMC-widget__list-item">Услуга 5</p>
          <p class="UMC-widget__list-item">Услуга 6</p>
        </div>
      </div>
      <div class="UMC-widget__medic-wrapper UMC-widget__block">
        <div class="UMC-widget__list-header UMC-widget__section-header">
          Врач:
        </div>
        <div class="UMC-widget__list shadow-box shadow-box_hidden">
          <p class="UMC-widget__list-item">Врач 1</p>
          <p class="UMC-widget__list-item">Врач 2</p>
          <p class="UMC-widget__list-item UMC-widget__list-item_selected">Врач 3</p>
          <p class="UMC-widget__list-item">Врач 4</p>
          <p class="UMC-widget__list-item">Врач 5</p>
          <p class="UMC-widget__list-item">Врач 6</p>
        </div>
      </div>
      <div class="UMC-widget__calendar-wrapper UMC-widget__block">
        <p class="UMC-widget__calendar-header UMC-widget__section-header">
          <span class="UMC-widget__header-item">Пн</span>
          <span class="UMC-widget__header-item">Вт</span>
          <span class="UMC-widget__header-item">Ср</span>
          <span class="UMC-widget__header-item">Чт</span>
          <span class="UMC-widget__header-item">Пт</span>
          <span class="UMC-widget__header-item UMC-widget__header-item_last">Сб</span>
          <span class="UMC-widget__header-item UMC-widget__header-item_last">Вс</span>
        </p>
        <div class="UMC-widget__calendar shadow-box shadow-box_hidden">
          <p class="UMC-widget__calendar-item">1</p>
          <p class="UMC-widget__calendar-item">2</p>
          <p class="UMC-widget__calendar-item">3</p>
          <p class="UMC-widget__calendar-item">4</p>
          <p class="UMC-widget__calendar-item">5</p>
          <p class="UMC-widget__calendar-item">6</p>
          <p class="UMC-widget__calendar-item">7</p>
          <p class="UMC-widget__calendar-item UMC-widget__calendar-item_busy">8</p>
          <p class="UMC-widget__calendar-item">9</p>
          <p class="UMC-widget__calendar-item">10</p>
          <p class="UMC-widget__calendar-item">11</p>
          <p class="UMC-widget__calendar-item">12</p>
          <p class="UMC-widget__calendar-item">13</p>
          <p class="UMC-widget__calendar-item">14</p>
          <p class="UMC-widget__calendar-item">15</p>
          <p class="UMC-widget__calendar-item UMC-widget__calendar-item_busy">16</p>
          <p class="UMC-widget__calendar-item">17</p>
          <p class="UMC-widget__calendar-item">18</p>
          <p class="UMC-widget__calendar-item">19</p>
          <p class="UMC-widget__calendar-item">20</p>
          <p class="UMC-widget__calendar-item">21</p>
          <p class="UMC-widget__calendar-item UMC-widget__calendar-item_selected">22</p>
          <p class="UMC-widget__calendar-item">23</p>
          <p class="UMC-widget__calendar-item">24</p>
          <p class="UMC-widget__calendar-item">25</p>
          <p class="UMC-widget__calendar-item">26</p>
          <p class="UMC-widget__calendar-item">27</p>
          <p class="UMC-widget__calendar-item">28</p>
          <p class="UMC-widget__calendar-item">29</p>
          <p class="UMC-widget__calendar-item">30</p>
        </div>
        <div class="UMC-widget__calendar-des">
          <div class="UMC-widget__calendar-des-item">
            <p class="UMC-widget__calendar-item UMC-widget__calendar-item_busy"></p>
            <p class="UMC-widget__calendar-des-text">Занято</p>
          </div>
          <div class="UMC-widget__calendar-des-item">
            <p class="UMC-widget__calendar-item"></p>
            <p class="UMC-widget__calendar-des-text">Свободно</p>
          </div>
          <div class="UMC-widget__calendar-des-item">
            <div class="UMC-widget__calendar-des-item-icon" title="Следующий месяц"></div>
          </div>
        </div>
      </div>
      <div class="UMC-widget__time-container UMC-widget__block">
        <p class="UMC-widget__time-header UMC-widget__section-header">Время записи</p>
        <div class="UMC-widget__time-wrapper">
          <div class="UMC-widget__time shadow-box shadow-box_hidden">
            <p class="UMC-widget__time-item UMC-widget__time-item_free">
              09:00-10:00
            </p>
            <p class="UMC-widget__time-item UMC-widget__time-item_free">
              10:00-11:00
            </p>
          </div>
        </div>
      </div>       
    </div>
    <div class="UMC-widget__modal UMC-widget_class-hidden">
      <div class="UMC-widget__modal-body">
        <div class="UMC-widget__modal-header">
          <h3 class="UMC-widget__modal-title">Введите личные данные</h3>
          <div class="UMC-widget__modal-exit"></div>
        </div>
        <div class="UMC-widget__modal-content UMC-widget__modal-content_inside">
          <div class="UMC-widget__inputs-wrapper UMC-widget__modal-screen" data-name="inputs">
            <div class="UMC-widget__inputs">
              <div class="UMC-widget__input-wrapper">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Имя"
                  data-name="name"
                />
              </div>
              <div class="UMC-widget__input-wrapper">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Отчество"
                  data-name="fathername"
                />
              </div>
              <div class="UMC-widget__input-wrapper">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Фамилия"
                  data-name="surname"
                />
              </div>
              <div class="UMC-widget__input-wrapper">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Телефон"
                  data-name="number"
                />
              </div>
              <div class="UMC-widget__input-wrapper UMC-widget_class-hidden">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="email"
                  name="email"
                  data-name="email"
                />
              </div>
              <div class="UMC-widget__input-wrapper UMC-widget_class-hidden">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Адрес"
                  data-name="address"
                />
              </div>
              <div class="UMC-widget__input-wrapper UMC-widget_class-hidden">
                <input
                  class="UMC-widget__input UMC-widget__elem"
                  placeholder="Комментарий"
                  data-name="comment"
                />
              </div>
            </div>
            <div class="UMC-widget__button-area">
              <button class="UMC-widget__button" id="UMC-widget__btn-sign">
                Записаться
              </button>
            </div>
            <p class="UMC-widget__private-text">
              Нажимая "Записаться на прием", Вы даете согласие на обработку
              <a class="UMC-widget__private-link" href="#">
                персональных данных</a
              >.
            </p>
          </div>
          <div class="UMC-widget__accept-wrapper UMC-widget_class-hidden UMC-widget__modal-screen" data-name="accept">
            <div class="UMC-widget__input-wrapper">
              <input
                class="UMC-widget__input UMC-widget__elem"
                placeholder="Код из смс"
                data-name="code"
              />
            </div>
            <p class="UMC-widget__private-text">
              На Ваш номер в течение нескольких минут придет код подтверждения.
              Введите его в поле выше.
            </p>
            <div class="UMC-widget__button-area">
              <div class="UMC-widget__button" id="UMC-widget__btn-accept">
                подтвердить номер
              </div>
            </div>
          </div>
          <div class="UMC-widget__success-wrapper UMC-widget_class-hidden  UMC-widget__modal-screen" data-name="success">
            <div class="UMC-widget__success-area">
                <p class="UMC-widget__success-text"></p>
            </div>
          </div>
          <div class="UMC-widget__error-wrapper UMC-widget_class-hidden UMC-widget__modal-screen" data-name="error">
            <div class="UMC-widget__success-area">
                <p class="UMC-widget__success-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>`;
    this._init();
  }

  async _init() {
    try {
      this._setTemplate();
      this._setSettings();
      await this._getData();
      this._formatData();
      this._widgetInit();
    } catch (e) {
      console.error(e)
    }
  }

  async _getData() {
    const type = this.options.type || 'doctor';
    const payload = {
        method: type === 'doctor' ? 'schedule' : 'services',
        data: this.options.entities || []
    };
    const data = await fetch(this.API_URL, {
      method: 'POST',
      // method: 'GET',
      body: JSON.stringify(payload),
    });
    this.data = await data.json();
  }

  _setTemplate() {
    if (this.options.root) {
      const root = document.querySelector('#' + this.options.root);
      if (root) {
        root.innerHTML = this.template;
        this.widget = document.querySelector('.UMC-widget');
      }
    } else {
      this.modalMode = true;
      const modalTemplate = `
        <div class="UMC-widget__modal UMC-widget__modal_global UMC-widget_class-hidden">
          <div class="UMC-widget__modal-body UMC-widget__modal-body_global">
            <div class="UMC-widget__modal-header">
              <h3 class="UMC-widget__modal-title">Запись на прием</h3>
              <div class="UMC-widget__modal-exit"></div>
            </div>
            <div class="UMC-widget__modal-content"></div>
          </div>
        </div>`;
      this.root = document.createElement('div');
      this.root.className = 'UMC-widget__container';
      this.root.innerHTML = modalTemplate;
      this.globalModal = this.root.querySelector('.UMC-widget__modal_global');
      this.globalModalBody = this.root.querySelector('.UMC-widget__modal-body');
      this.globalModalExit = this.root.querySelector('.UMC-widget__modal-body .UMC-widget__modal-exit');
      const content = this.globalModal.querySelector('.UMC-widget__modal-content');
      content.innerHTML = this.template;
      const template = `<img src="/1bit//images/pencil.svg" class="UMC-widget__toggler-icon" alt="Запись на прием">`;
      this.toggler = document.createElement('div');
      this.toggler.className = 'UMC-widget__toggler';
      this.toggler.innerHTML = template;
      this.root.append(this.toggler);
      this.widget = this.root.querySelector('.UMC-widget');
      this.form = this.root.querySelector('.UMC-widget__form');
      this.toggler.addEventListener('click', () => {
        this.globalModal.classList.remove('UMC-widget_class-hidden');
        this.modal._hideModal();
      })
      this.globalModalExit.addEventListener('click', () => {
        this.globalModal.classList.add('UMC-widget_class-hidden');
      })
      this.globalModal.addEventListener('click', (e) => {
        if (e.target == this.globalModal) {
          this.globalModal.classList.add('UMC-widget_class-hidden');
        }
      })
      this.widgetModal = this.widget.querySelector('.UMC-widget__modal-content');
      this.widgetModal.classList.add('UMC-widget_class-hidden');
      const widgetModalContainer = this.widget.querySelector('.UMC-widget__modal-content');
      widgetModalContainer.remove();
      this.widget.append(widgetModalContainer);
      document.body.append(this.root);
    }
    if (this.options.backCall) {
      const addBtnPlace = document.querySelector('.UMC-widget__button-area');
      const btnArea = document.createElement('div');
      btnArea.className = "UMC-widget__button-area_add";
      const addBtn = `
        <p>Или оставьте заявку на обратный звонок</p>
        <button class="UMC-widget__button" id="UMC-widget__btn-back">
          оставить заявку
        </button>`;
      btnArea.innerHTML = addBtn;
      addBtnPlace.append(btnArea);
    } 
  }

  _setSettings() {
    const styles = this.options.style;
    for (let key in styles) {
      document.documentElement.style.setProperty("--" + key, styles[key]);
    }
  }

  _formatData() {
    let count = 0;
    this.groups = this.data.specializations
      .map(item => ({id: item.spec_id, name: item.spec_name, services: item.services}));
    this.doctors = this.data.doctors
      .map(item => {
        const current = {id: item.doctor_id, name: item.doctor_name, clinic_id: item.cliniс_id, time: item.time, services: item.services || []};
        if (!item.time || !item.time.length) {
          count++;
        }
        return current;
      });
    this.services = this.data.services
      .map(item => ({id: item.service_id, name: item.service_name, cost: item.service_cost, time: item.service_time}));
    this.clinics = this.data.clinics
      .map(item => ({id: item.clinic_id, name: item.clinic_name, address: item.clinic_adress, phone: item.clinic_phone}));
    const groups = this.options.groups;
    if (groups && groups.length) {
      this.groups = this.groups.filter(item => groups.includes(item.id));
    }
    if (count == this.doctors.length) {
      this.empty = true;
    }
  }

  _widgetInit() {
    this._initEvents();
    this.state = new WidgetState();
    this.serviceGroupArea = new ServiceGroupArea(this);
    this.serviceArea = new ServiceArea(this);
    this.medicArea = new MedicArea(this);
    this.calendar = new Calendar(this);
    this.timeArea = new TimeArea(this);
    //
    this.serviceGroupArea.init();
    //
		this.modal = new Modal(this);
		this.btnArea = new BtnArea(this);
		this.fieldArea = this.modal.screens.find(item => item.name === 'inputs');
		this.successScreen = this.modal.screens.find(item => item.name === 'success');

    if (this.empty) {
      this._sendModalError(this.options.text.withoutDoctors);
    }
  }

  _initEvents() {
    this.width = document.documentElement.clientWidth;
    window.addEventListener('resize', () => {
      this.width = document.documentElement.clientWidth;
    })
  }

  async _sendCode() {
    const codeMessage = {
      data: {
        number: '+' + this.state.getField('number'),
        code: this.state.code,
      },
      method: 'sms',
    }
    try {
      let data = await fetch(this.API_URL, {
        method: 'POST',
        body: JSON.stringify(codeMessage)
      });
      return await data.json();
    } catch (e) {
      this._sendModalError(e);
    }
  }

  async _sendInformation() {
    this.state.setField('site_id', window.location.origin);
    const state = this.state.getState();	
    const payload = {data: state, method: 'appointment'};
		try {
			const data = await fetch(this.API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return await data.json();
		} catch {
			this._sendModalError();
		}
	}

  async refreshInformation() {
    this.serviceGroupArea.init();
    const type = this.options.type || 'doctor';
    const payload = {
        method: type === 'doctor' ? 'schedule' : 'services',
        data: this.options.entities || []
    };
    
    let data = await fetch(this.API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    data = await data.json();
    this.data = data;
    this._formatData();
    this.calendar.medics = this.doctors;
    this.serviceGroupArea.init();
  }

  checkInputsError() {
    this.errorField = false;
    const fields = this.state.getRequiredFields();
    this.fieldArea.fields.forEach((item) => {
      if (fields.includes(item.name) && (item.error || item._isEmpty())) {
        this.errorField = true;
        item.sendError();
      }
    });
  }

  checkCode() {
    if (!this.options.sms) {
      return true;
    }
    let input = this.fieldArea.fields.find(item => item.name === 'code');
		if (input.error || input._isEmpty()) {
			input.sendError();
      return false;
		} else {
			let condition = btoa(input.input.value.trim()) === this.state.code;
      return condition;
    }
  }

  async checkNumber() {
    this.checkInputsError();
    if (!this.errorField) {
      this.state.code = this._createCode();
      this.btnArea._showPreloader('sms');
      const result = await this._sendCode();
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
    this.checkInputsError();
    const condition = this.checkCode();
    if (condition && !this.errorField) {
      this.btnArea._showPreloader('submit');
      const result = await this._sendInformation();
      this.btnArea._hidePreloader();
      if (result && result.success && !result.error) {
        this.modal.setTitle("Запись произведена");
        this.btnArea._hidePreloader();
        this.successScreen.setData();
        this.modal._clearInputs();
        this.modal._changeScreen('success');
        this.state.clearState();
        await this.refreshInformation();
      } else {
        this._sendModalError();
      }
    } 
	}

  async waitList() {
    this.checkInputsError();
    if (!this.errorField) {
      this.btnArea._showPreloader('wait');
      const result = await this._sendWaitInformation();
      this.btnArea._hidePreloader();
      if (result && result.success && !result.error) {
        this.modal.setTitle("Заявка отправлена");
        this.btnArea._hidePreloader();
        this.successScreen.setWaitData();
        this.modal._clearInputs();
        this.modal._changeScreen('success');
        this.state.clearState();
      } else {
        this._sendModalError();
      }
    } 
  }

  async _sendWaitInformation() {
    const state = this.state.getState();	
    const payload = {data: state, method: 'waitlist'};
		try {
			const data = await fetch(this.API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return await data.json();
		} catch {
			this._sendModalError();
		}
  }

  _sendModalError(str = null) {
    const text = this.widget.querySelector('.UMC-widget__error-wrapper .UMC-widget__success-text');
    text.textContent = str || this.options.text.error;
    this.modal.setTitle('Ошибка');
    this.modal._changeScreen('error');
    this.modal._showModal();
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

class WidgetState {
  _state = {};
  _code;
  _requiredFields = [
    "name",
    "number",
    "surname",
    "fathername",
    "dateTime",
  ];

  setField(name, value) {
    this._state[name] = value;
    return true;
  }

  getField(name) {
    return this._state[name];
  }

  getState() {
    return this._state;
  }

  clearState() {
    this._state = {};
    this._code = null;
    return true;
  }

  getRequiredFields() {
    return this._requiredFields;
  }

  isRequired(name) {
    return this._requiredFields.includes(name);
  }

  set code(val) {
    this._code = btoa(val);
  }

  get code() {
    return this._code;
  }
}

class Block {
  constructor(item) {
    this.wrapper = item;
    this.list = [];
    this.count = 0;
    this.block = item.querySelector('.shadow-box');
  }

  init() {
    this.renderItems();
    this.show();
    if (this.list.length === 1 && this.count > 0) {
      this.clickItem(this.list[0]);
    }
  }

  show() {
    this.block.classList.remove('shadow-box_hidden');
    this.block.classList.remove('shadow-box_loading');
    if (this.widget.width <= 768) {
      this.scroll();
    }
    if (this.count > 0 && this.deps) {
      this.deps.forEach(item => {
        if (this.widget[item]) this.widget[item].hide();
      })
    }
    this.count++;
  }

  hide() {
    this.block.classList.add('shadow-box_hidden');
  }

  scroll() {
    if (this.widget.modalMode) {
      
      this.widget.globalModalBody.scrollTo(0, this.wrapper.offsetTop - 80);
    } else {
      window.scrollTo(0, this.wrapper.offsetTop - 80);
    }
  }

  renderItems() {
    this.list = [];
    this.block.innerHTML = '';
    this.data.forEach(item => {
      const listItem = document.createElement('p');
      listItem.className = ('UMC-widget__list-item');
      listItem.textContent = item.name;
      listItem.dataset.id = item.id;
      if (item.clinic_id) {
        listItem.dataset.clinic = item.clinic_id;
        const clinic = this.widget.clinics.find(elem => elem.id === item.clinic_id);
        listItem.textContent = item.name + ' в клинике ' + clinic.name;
      }
      if (item.cost) {
        listItem.dataset.cost = item.cost;
      }
      listItem.addEventListener('click', (e) => this.clickItem(e.currentTarget));
      this.list.push(listItem);
      this.block.append(listItem);
    })
    
  }

  clickItem(element) {
    this.list.forEach(item => {
      item.classList.remove('UMC-widget__list-item_selected');
    });
    element.classList.add('UMC-widget__list-item_selected');
    this.widget.state.setField(this.name, element.dataset.id);
    if (this.widget[this.next]) this.widget[this.next].init();
  }
}

class ServiceGroupArea extends Block {
  constructor (data) {
    const area = data.widget.querySelector('.UMC-widget__servicegroups-wrapper');
    super(area);
    this.data = data.groups;
    this.name = 'spec_id';
    this.widget = data;
    this.deps = ['medicArea', 'calendar', 'timeArea'];
    this.next = 'serviceArea';
    this.init();
  }

  clickItem(element) {
    super.clickItem(element);
    if (this.widget.serviceArea) {
      this.widget.serviceArea.price = null;
    }
  }
}

class ServiceArea extends Block {
  constructor (data) {
    const area = data.widget.querySelector('.UMC-widget__services-wrapper');
    super(area);
    this.widget = data;
    this.data = data.services;
    this.name = 'service_id';
    this.next = 'medicArea';
    this.deps = ['medicArea', 'calendar', 'timeArea'];
    this._price = area.querySelector('.UMC-widget__list-header-price');
  }

  init() {
    const id = this.widget.state.getField('spec_id');
    const group = this.widget.groups.find(item => item.id === id);
    this.data = id ? this.widget.services.filter(item => group.services.includes(item.id)) : this.widget.services;
    super.init();
  }

  set price(val) {
    if (val) {
      this._price.textContent = val + ' р.';
    } else {
      this._price.textContent = '';
    }
  }

  clickItem(element) {
    super.clickItem(element);
    this.price = element.dataset.cost;
  }
}

class MedicArea extends Block { 
  constructor(data) {
    const area = data.widget.querySelector('.UMC-widget__medic-wrapper');
    super(area, data);
    const id = data.state.getField('service_id');
    this.data = id ? data.doctors.filter(item => item.services.includes(id)) : data.doctors;
    this.widget = data;
    this.name = 'doctor_id';
    this.next = 'calendar';
    this.deps = ['calendar', 'timeArea'];
  }

  init() {
    const id = this.widget.state.getField('service_id');
    this.data = id ? this.widget.doctors.filter(item => item.services.includes(id)) : this.widget.doctors;
    super.init();
  }

  clickItem(element) {
    super.clickItem(element);
    this.widget.state.setField('clinic_id', element.dataset.clinic);
  }
}

class Calendar extends Block {
  daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  calendarElements = [];
  timeArray = [];
  selectedDay = null;
  days = [];
  current = true;

  constructor(data) {
    const area = data.widget.querySelector('.UMC-widget__calendar-wrapper');
    super(area);
    this.deps = ['timeArea'];
    this.date = new Date();
    this.widget = data;
    this.medics = data.doctors;
    this.calendar = data.widget.querySelector(".UMC-widget__calendar");
    this.arrow = area.querySelector('.UMC-widget__calendar-des-item-icon');
    this._initEvents();
    this._init();
  }

  _init() {
    this._clearContainers();
    this._changeTimeFormat();
    this._fetchDays();
    this._render();
  }

  init() {
    this.show();
    this._init();
  }

  _changeTimeFormat() {
    const id = this.widget.state.getField('service_id');
    this.service = id && this.widget.services.find(item => item.id === id);
    if (this.service) {
      const time = new Date(this.service.time);
      this.duration = time.getHours() * 60 + time.getMinutes();
    } else {
      this.duration = 30;
    }
    const userId = this.widget.state.getField('doctor_id');
    this.user = userId ? this.medics.find(item => item.id === userId) : this.medics[0];
    if (!this.user) return false;
    this.user.time.forEach((item) => {
      const start = new Date(item.time_start);
      const end = new Date(item.time_end);
      while (start < end) {
        let firstDate = new Date(start.getTime());
        firstDate.setMinutes(firstDate.getMinutes() + this.duration);
        if (firstDate <= end) {
          this.timeArray.push(start.getTime());
        }
        start.setMinutes(start.getMinutes() + this.duration);
      }
    })
  }

  _fetchDays() {
    const now = new Date();
    if (this.current) {
      const date = new Date();
      now.setMonth(date.getMonth());
    } else {
      const date = new Date();
      now.setMonth(date.getMonth() + 1);
    }
    const month = now.getMonth();
    const date = now.getDate();
    now.setDate(1);
    while (now.getMonth() === month) {
      const day = {
        day: now.getDate(),
        dayOfWeek: now.getDay(),
        month: now.getMonth(),
        fullDate: now,
        free: now >= this.date,
      };
      if (day.free) {
        const elem = this.timeArray.some(item => {
          const date = new Date(item);
          return date.getDate() === day.day && date.getMonth() === day.month;
        })
        if (!elem) {
          day.free = false;
        }
      }
      this.days.push(day);
      now.setDate(now.getDate() + 1);
    }
    const dayOfWeek = this.days[0].dayOfWeek;
    if (dayOfWeek != 1) {
      const emptyBoxes = [];
      if (dayOfWeek === 0) {
        for(let i = 0; i < 6; i++) {
          emptyBoxes.push({empty: true});
        }
      } else {
        for(let i = 1; i < dayOfWeek; i++) {
          emptyBoxes.push({empty: true});
        }
      }
      
      this.days = [...emptyBoxes, ...this.days];
    }
  }

  _render() {
    this.days.forEach((item, index) => {
      const day = document.createElement('p');
      if (item.empty) {
        day.className = 'UMC-widget__calendar-item UMC-widget__calendar-item_empty';
      } else  {
        if (item.free) {
          day.className = 'UMC-widget__calendar-item';
        } else {
          day.className = 'UMC-widget__calendar-item UMC-widget__calendar-item_busy';
        }
        day.textContent = item.day;
        day.addEventListener('click', () => this._clickCalendarElement(day, item));
      }
      this.calendarElements.push(day);
      this.calendar.append(day);
    });
  }

  _clearContainers() {
    this.calendar.innerHTML = '';
    this.days = [];
    this.timeArray = [];
  }

  _clickCalendarElement(elem, data) {
    if (data.free) {
      this.calendar.querySelectorAll('.UMC-widget__calendar-item').forEach(item => {
        item.classList.remove('UMC-widget__calendar-item_selected');
      })
      elem.classList.add('UMC-widget__calendar-item_selected');
      this.selectedDay = data;
      this.widget.timeArea.init();
    }
  }

  _initEvents() {
    this.arrow.addEventListener('click', () => this.changeMonth())
  }

  changeMonth() {
    if (this.current) {
      this.arrow.classList.add('UMC-widget__calendar-des-item-icon_back');
      this.arrow.setAttribute('title', 'Предыдущий месяц');
    } else {
      this.arrow.classList.remove('UMC-widget__calendar-des-item-icon_back');
      this.arrow.setAttribute('title', 'Следующий месяц');
    }
    this.current = !this.current;
    this._init();
  }
}

class TimeArea extends Block {
  constructor(data) {
    const area = data.widget.querySelector('.UMC-widget__time-container');
    super(area, data);
    this.months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    this.widget = data;
    this.box = area.querySelector('.shadow-box');
    this.textItem = area.querySelector('.UMC-widget__time-header');
    const date = new Date();
    this.setText({day: date.getDate(), month: date.getMonth()});
  }

  init() {
    this.box.innerHTML = '';
    this.day = this.widget.calendar.selectedDay;
    this.duration = this.widget.calendar.duration;
    this.timeArray = this.widget.calendar.timeArray.filter(item => {
      const date = (new Date(item)).getDate();
      return date === this.day.day;
    });
    
    this.setText(this.day);
    this._render();
    this.show();
  }
  
  setText(day) {
    this.textItem.textContent = `Время записи на ${day.day} ${this.months[day.month]}:`;
  }

  toISOString(date) {
    const pad = (number) => {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
  } 

  clickTimeElement(item) {
    const date = new Date(item);
    this.widget.state.setField('dateTime', this.toISOString(date));
    this.widget.modal._showModal();
  }

  _render() {
    this.timeArray.forEach(item => {
      const dateTime = new Date(item);
      const start = ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2);
      dateTime.setMinutes(dateTime.getMinutes() + this.duration);
      const end = ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2);
      const timeElement = document.createElement('p');
      timeElement.textContent = `${start}-${end}`;

      if (this.day.free) {
        timeElement.className = 'UMC-widget__time-item UMC-widget__time-item_free';
      } else {
        timeElement.className = 'UMC-widget__time-item';
      }
      timeElement.addEventListener('click', () => this.clickTimeElement(item));
      this.box.append(timeElement);
    })
  }
}

class BtnArea {
  constructor(widget) {
    this.widget = widget;
    this.btn = this.widget.widget.querySelector(" #UMC-widget__btn-sign");
    this.access = this.widget.widget.querySelector(" #UMC-widget__btn-accept");
    this.wait = this.widget.widget.querySelector(" #UMC-widget__btn-back");
    this._init();
  }

  _init() {
    this.btn.addEventListener("click", () => {
      if (!this.preloader) {
        const sms = this.widget.options.sms;
        if (sms) this.widget.checkNumber();
        else this.widget.submit();
      }
    });
    this.access.addEventListener("click", () => {
      if (!this.preloader) {
        this.widget.submit();
      }
    });
    if (this.widget.options.backCall) {
      this.wait.addEventListener("click", () => {
        if (!this.preloader) {
          this.widget.waitList();
        }
      });
    }
  }

  _getBtn(code) {
    switch (code) {
      case 'submit':
        return this.btn;
      case 'sms':
        return this.access;
      case 'wait':
        return this.wait;
      default:
        return null;
    }
  }

  _showPreloader(code) {
    if (!this.preloader) {
      this.preloader = document.createElement("img");
      this.preloader.src = "https://itprotection.ru/api/load.gif";
      this.preloader.classList.add("UMC-widget__preloader-btn");
      const btn = this._getBtn(code);
      btn.innerHTML = "";
      btn.append(this.preloader);
    }
  }

  _hidePreloader() {
    if (this.preloader) {
      this.preloader.remove();
      this.preloader = null;
		}
    this.btn.textContent = "записаться на прием";
    this.access.textContent = "подтвердить номер";
    if (this.wait) {
      this.wait.textContent = "оставить заявку";
    }
    
  }
}

class Modal {
	screens = [];
  activeScreen = 'inputs';

	constructor(widget) {
    this.widget = widget;
    this.title = document.querySelector(".UMC-widget__modal-title");
    if (this.widget.modalMode) {
      this.modal = this.widget.widgetModal;
      this.exit = document.querySelector(".UMC-widget__modal-exit");
    } else {
      this.modal = this.widget.widget.querySelector(".UMC-widget__modal");
      this.content = this.widget.widget.querySelector(".UMC-widget__modal-body");
      this.exit = this.widget.widget.querySelector(".UMC-widget__modal-exit");
    } 
		this._init()
	}

	_init() {
		let screens = this.modal.querySelectorAll(' .UMC-widget__modal-screen');
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
    if (this.widget.modalMode) {
      this.widget.form.classList.add('UMC-widget_class-hidden');
      this.modal.classList.remove('UMC-widget_class-hidden');
      this.widget.widget.classList.add('UMC-widget_modal-open');
    } else {
      document.body.style.overflow = "hidden";
      this.modal.classList.remove("UMC-widget_class-hidden");
      setTimeout(() => {
        this.content.classList.remove("UMC-widget__modal-body_hidden");
      }, 100);
    }
  }

  _hideModal() {
    if (this.widget.modalMode) {
      this.widget.form.classList.remove('UMC-widget_class-hidden');
      this.modal.classList.add('UMC-widget_class-hidden');
      this.widget.widget.classList.remove('UMC-widget_modal-open');
      this._exitModalCallback();
    } else {
      this.content.classList.add("UMC-widget__modal-body_hidden");
      setTimeout(() => {
        this.modal.classList.add("UMC-widget_class-hidden");
        document.body.style.overflow = "auto";
        this._exitModalCallback();
      }, 100);
    }
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
    this._changeScreen('inputs');
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
    let inputs = this.widget.widget.querySelectorAll(".UMC-widget__input-wrapper");
    let openInputBtns = this.widget.widget.querySelectorAll(".UMC-widget__open-input");
    inputs.forEach((item) => {
      this.fields.push(new Input(item, this.widget));
    });
    
    openInputBtns.forEach((item) => {
      item.addEventListener("click", () => {
        let input = this.widget.widget.querySelector(
          ` .UMC-widget__input[data-name="${item.dataset.name}"]`
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
		this.node = item.querySelector(' .UMC-widget__success-text');
    this.str = 'Вы записались на прием к врачу <span class="UMC-widget__success-highlight">#DOCTOR#<span> на <span class="UMC-widget__success-highlight">#DATE#<span> в <span class="UMC-widget__success-highlight">#TIME#<span>';
	}

  getResultString(str = this.str, info) {
    for (let key in info) {
      str = str.replace('#' + key + '#', info[key]);
    }
    return str;
  }

	setData() {
		const state = this.widget.state.getField('dateTime');
		const doctorId = this.widget.state.getField('doctor_id');
		const date = new Date(state);
    const user = this.widget.doctors.find(item => item.id === doctorId);
    
    const outInfo = {
      DATE: ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear(),
      TIME: ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2),
      DOCTOR: user.name
    }		

		this.node.innerHTML = this.getResultString(this.widget.options.text.submit, outInfo);
	}

  setWaitData() {
    this.node.innerHTML = this.widget.options.text.waitlist;
  }
}

class Input {
  constructor(wrapper, widget) {
    this.wrapper = wrapper;
    this.widget = widget;
    this.input = wrapper.querySelector(" .UMC-widget__input");
    
    this.name = this.input.dataset.name;
		this.error = false;
    this.required = this.widget.state.isRequired(this.name);
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
        this.widget.state.setField(this.name, this.mask.unmaskedValue);
      } else {
        this.widget.state.setField(this.name, e.target.value.trim());
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

window.UMCWidget = UMCWidget;