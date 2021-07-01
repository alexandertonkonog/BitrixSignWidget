<?php 
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
   error_reporting(0);
   
   $data = array(
      'code' => 'firstbitwidget',
      'fields' => array(
         'NAME' => 'Виджет для записи на прием к врачу',
         'DESCRIPTION' => 'Виджет для записи на прием к врачу',
         'SECTIONS' => 'other',
         'PREVIEW' => 'http://sun9-9.userapi.com/c852228/v852228057/a7ab6/3ZPv8gGmY-4.jpg',
         'CONTENT' => '<section class="UMC-widget">
         <div class="UMC-widget__form" id="UMC-widget__form">
           
           <img
             class="UMC-widget__medic-img"
             src="https://charite.me/local/firstbit/images/user.png"
             alt=""
           />
           <div class="UMC-widget__medic">
             <p class="UMC-widget__medic-name">Иван Иванов</p>
             <p class="UMC-widget__medic-des"></p>
             <p class="UMC-widget__medic-des_bold"></p>
           </div>
           
           <div class="UMC-widget__list-area UMC-widget_class-hidden">
             <p class="UMC-widget__list-title">Услуга: <span></span></p>
             <ul class="UMC-widget__list-list"></ul>
           </div>
           <div class="UMC-widget__preloader-wrapper">
             <img class="UMC-widget__preloader" src="https://charite.me/local/firstbit/images/load.gif" alt="" />
           </div>
           <div class="UMC-widget__calendar-area UMC-widget_class-hidden">
             <div class="UMC-widget__calendar-container">
               <div class="UMC-widget__calendar-wrapper">
                 <div class="UMC-widget__calendar"></div>
                 <div class="UMC-widget__calendar-toggle">
                   <img src="https://charite.me/local/firstbit/images/arrow.png" alt="">
                 </div>
               </div>
               <div class="UMC-widget__time-area"></div>
             </div>
           </div>
           <p class="UMC-widget__text-first UMC-widget_class-hidden">Чтобы выбрать дату и время приема, выберите услугу</p>
           <div class="UMC-widget__error-area"></div>
         </div>
         <div class="UMC-widget__modal UMC-widget_class-hidden">
           <div class="UMC-widget__modal-body">
             <div class="UMC-widget__modal-header">
               <h3 class="UMC-widget__modal-title">Введите личные данные</h3>
               <div class="UMC-widget__modal-exit">&times;</div>
             </div>
             <div class="UMC-widget__modal-content">
               <div class="UMC-widget__inputs-wrapper  UMC-widget__modal-screen" data-name="inputs">
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
                 <p class="UMC-widget__open-input" data-name="address">Адрес</p>
                 <p class="UMC-widget__open-input" data-name="comment">
                   Комментарий
                 </p>
                 <div class="UMC-widget__button-area">
                   <div class="UMC-widget__button" id="UMC-widget__btn-sign">
                     записаться на прием
                   </div>
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
               <div class="UMC-widget__success-wrapper UMC-widget_class-hidden UMC-widget__modal-screen" data-name="success">
                 <div class="UMC-widget__success-area">
                     <img class="UMC-widget__success-icon" src="https://charite.me/local/firstbit/images/success.png" alt="" />
                     <p class="UMC-widget__success-text"></p>
                 </div>
               </div>
               <div class="UMC-widget__error-wrapper UMC-widget_class-hidden UMC-widget__modal-screen" data-name="error">
                 <div class="UMC-widget__success-area">
                     <img class="UMC-widget__success-icon" src="https://charite.me/local/firstbit/images/error.png" alt="" />
                     <p class="UMC-widget__success-text">Произошла ошибка! Попробуйте записаться еще раз или перезагрузите страницу</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="UMC-widget__medic-id UMC-widget_class-hidden" data-medic=""></div>
       </section>'
      ),
      'manifest' => array(
         'assets' => array(
            'css' => array(
              'https://charite.me/local/firstbit/index.css'
            ),
            'js' => array(
              'https://unpkg.com/imask@6.0.7/dist/imask.js',
              'https://charite.me/local/firstbit/index.js'
            )
         ),
         'nodes' =>
            array(
               '.UMC-widget__medic-name' =>
                  array(
                     'name' => 'Имя врача',
                     'type' => 'text',
                  ),
               '.UMC-widget__medic-des' =>
                  array(
                     'name' => 'Описание врача',
                     'type' => 'text',
                  ),
               '.UMC-widget__medic-des_bold' =>
                  array(
                     'name' => 'Описание врача (жирный шрифт)',
                     'type' => 'text',
                  ),
               '.UMC-widget__medic-img' => array(
                  'name' => 'Изображение врача',
                  'type' => 'img',
                  'dimensions' => array('width' => 150, 'height' => 200),
               ),
               '.UMC-widget__private-link' =>
                  array(
                     'name' => 'Ссылка на страницу Пользовательского соглашения',
                     'type' => 'link',
                  ),
               '.UMC-widget__medic-id' =>
                  array(
                     'name' => 'Ручной ввод идентификатора врача (обязательно выбрать соответствующий пункт в выпадающем списке выбора врача)',
                     'type' => 'text',
                  ),
            ),
         'attrs' =>
            array(
            '.UMC-widget__medic-id' =>
               array(
                  'name' => 'Выбор врача',
                  'type' => 'dropdown',
                  'attribute' => 'data-medic',
                  'items' => array(
                      array("name" => "Ввести идентификатор вручную", "value" => ""),
                      array("name" => "Яганина Елена Михайловна", "value" => "545c133f-1293-11ea-baf1-d8cb8a9cbe49"),array("name" => "Процедурный кабинет", "value" => "b99fb2b5-aeda-11e9-bad9-d8cb8a9cbe49"),array("name" => "Панасюк Дина Леонидовна", "value" => "f5410d4a-ad61-11e9-bad9-d8cb8a9cbe49"),array("name" => "Долгушева Диана Владиславовна", "value" => "46036bba-bab4-11e9-badb-d8cb8a9cbe49"),array("name" => "Кучерявинко Валерия Петровна", "value" => "2f8be29a-a656-11e9-4199-34e12d3559cb"),array("name" => "Данилевская Екатерина Сергеевна", "value" => "095cb891-bcdc-11e9-badb-d8cb8a9cbe49"),array("name" => "Богатырева Людмила Генриховна", "value" => "f8e9c1a8-bcc7-11e9-badb-d8cb8a9cbe49"),array("name" => "Загороднюк Галина Николевна", "value" => "657fa33f-102e-11ea-baf0-d8cb8a9cbe49"),array("name" => "Пысин Николай Михайлович", "value" => "284fe8e1-f993-11e9-baea-d8cb8a9cbe49"),array("name" => "Прейна Вера Николаевна", "value" => "2f8be2a2-a656-11e9-4199-34e12d3559cb"),array("name" => "Татинец Кристина Васильевна", "value" => "2f8be29b-a656-11e9-4199-34e12d3559cb"),array("name" => "Сторонние консультанты", "value" => "be398fd3-102d-11ea-baf0-d8cb8a9cbe49"),array("name" => "Евневич Геннадий Витальевич", "value" => "a351de8f-32b8-11ea-bb00-d8cb8a9cbe49"),array("name" => "Ефременко Алла Игоревна", "value" => "7dc7a1b6-db21-11ea-92cd-d8cb8a9cbe49"),array("name" => "Шаленко Марина Валериевна", "value" => "2f8be299-a656-11e9-4199-34e12d3559cb"),array("name" => "Писаренко Инна Витальевна", "value" => "2f8be29e-a656-11e9-4199-34e12d3559cb"),array("name" => "Сережникова Елена Владимировна", "value" => "49689005-32be-11ea-bb00-d8cb8a9cbe49"),array("name" => "Вагнер Татьяна Анатольевна", "value" => "6e259952-32be-11ea-bb00-d8cb8a9cbe49"),array("name" => "Евневич Надежда Владимировна", "value" => "2f8be2a4-a656-11e9-4199-34e12d3559cb"),array("name" => "Андрияненко Галина Анатольевна", "value" => "b4e61b1d-ffa7-11e9-baea-d8cb8a9cbe49"),array("name" => "Рашитова Алена Валерьевна", "value" => "8a93ad75-b908-11e9-badb-d8cb8a9cbe49"),array("name" => "Низовцева Наталья Владимировна", "value" => "6ef1e2e9-6d15-11ea-bb13-dc77325d63fb"),array("name" => "Занова Марина Валерьевна", "value" => "eed7c079-a94b-11ea-92c8-d8cb8a9cbe49"),array("name" => "Зюба Ольга Алексеевна", "value" => "f4b151dc-5177-11ea-bb07-d8cb8a9cbe49"),array("name" => "Землянская Людмила Анатольевна", "value" => "fc403ffa-9b68-11ea-92c8-d8cb8a9cbe49"),array("name" => "Чередниченко Татьяна Александровна", "value" => "89851fb1-32bd-11ea-bb00-d8cb8a9cbe49"),array("name" => "Игитханян Алина Гамлетовна", "value" => "2d8e4265-83a1-11ea-92c6-d8cb8a9cbe49"),array("name" => "Илющенко Елена Александровна", "value" => "1b2b827f-a4e7-11ea-92c8-d8cb8a9cbe49"),array("name" => "Гриценко Дмитрий Валерьевич", "value" => "5e8acbb0-5d5f-11ea-bb0c-d8cb8a9cbe49"),array("name" => "Незнанова Снежана Александровна", "value" => "0acf4dc0-d551-11ea-92cd-d8cb8a9cbe49"),array("name" => "Сердюкова Оксана Сергеевна", "value" => "2ad466c8-9c38-11ea-92c8-d8cb8a9cbe49"),array("name" => "Поддубский Павел Анатольевич", "value" => "9b6b09a5-d558-11ea-92cd-d8cb8a9cbe49"),array("name" => "Савинская Людмила Петровна", "value" => "ef352d1e-892a-11ea-92c7-d8cb8a9cbe49"),array("name" => "Юскаева Светлана Леонидовна", "value" => "445e152c-ca5b-11ea-92cc-d8cb8a9cbe49"),array("name" => "Кияшко Михаил Борисович", "value" => "9c89476c-d332-11ea-92cd-d8cb8a9cbe49"),array("name" => "Айрапетов Вазген Альбертович", "value" => "12fcf7be-ccfb-11ea-92cc-d8cb8a9cbe49"),array("name" => "Филатова Наталья Александровна", "value" => "3f33e4f5-35fd-11eb-92d4-d8cb8a9cbe49"),array("name" => "Останин Сергей Григорьевич", "value" => "132e364d-f725-11ea-92cf-d8cb8a9cbe49"),array("name" => "Еричева Юлия Дмитриевна", "value" => "adfcf5a3-ccfa-11ea-92cc-d8cb8a9cbe49"),array("name" => "Артамонова Наталья Владимировна", "value" => "233c4c40-dc7c-11ea-92ce-d8cb8a9cbe49"),array("name" => "Путилина Елена Валерьевна", "value" => "994751c4-c595-11ea-92cb-d8cb8a9cbe49"),array("name" => "Харахордина Анна Николаевна", "value" => "b48d0aca-bab3-11e9-badb-d8cb8a9cbe49"),array("name" => "Пихорова Кристина Сергеевна", "value" => "56caf898-b78e-11ea-92c8-d8cb8a9cbe49"),array("name" => "Трунова Ксения Сергеевна", "value" => "401da8f7-f350-11ea-92cf-d8cb8a9cbe49"),array("name" => "Нестеренко Валентина Николаевна", "value" => "4b24f11e-3082-11eb-92d4-d8cb8a9cbe49"),array("name" => "Айрапетова Наринэ Альбертовна", "value" => "1e98213d-0ee7-11eb-92cf-d8cb8a9cbe49"),array("name" => "Иванова Ирина Николаевна", "value" => "65e6d13e-2e2a-11eb-92d4-d8cb8a9cbe49"),array("name" => "Троицкая Валерия Анатольевна", "value" => "bae0d0f4-07d6-11eb-92cf-d8cb8a9cbe49"),array("name" => "Физиокабинет", "value" => "94004a49-0ed7-11eb-92cf-d8cb8a9cbe49"),array("name" => "Аленина Татьяна Владимировна", "value" => "157c9937-f351-11ea-92cf-d8cb8a9cbe49"),array("name" => "Исинова Елена Вячеславовна", "value" => "b1492993-2e2a-11eb-92d4-d8cb8a9cbe49"),array("name" => "Лупанова Виктория Викторовна", "value" => "37a24bd6-0ed8-11eb-92cf-d8cb8a9cbe49"),array("name" => "Медведева Татьяна Валерьевна", "value" => "03573187-2e2a-11eb-92d4-d8cb8a9cbe49"),array("name" => "Паркина Елена Александровна", "value" => "eb148bb3-e37e-11ea-92ce-d8cb8a9cbe49"),array("name" => "Крупин Алексей Павлович", "value" => "71660779-2e28-11eb-92d4-d8cb8a9cbe49"),array("name" => "Милякова Валентина Иосифовна", "value" => "0c66e096-3084-11eb-92d4-d8cb8a9cbe49"),array("name" => "Архипова Светлана Владимировна", "value" => "9d0f0aab-bcd5-11e9-badb-d8cb8a9cbe49"),array("name" => "Березняк Юлия Сергеевна", "value" => "994ee258-ba84-11e9-badb-d8cb8a9cbe49"),array("name" => "Суртаева Алина Васильевна", "value" => "d606085e-49aa-11eb-92d7-d8cb8a9cbe49"),array("name" => "Борецкая Ольга Алексеевна", "value" => "2f8be2a0-a656-11e9-4199-34e12d3559cb"),array("name" => "Багишев Дмитрий Николаевич", "value" => "f715932a-444c-11eb-92d5-d8cb8a9cbe49"),array("name" => "Александров Андрей Владимирович", "value" => "28669990-0310-11eb-92cf-d8cb8a9cbe49"),array("name" => "Хабибулин Борис Галькович", "value" => "e82b6464-f676-11ea-92cf-d8cb8a9cbe49"),
                    )
                  ),
            ),
      ),
   );
   echo json_encode($data);
?>