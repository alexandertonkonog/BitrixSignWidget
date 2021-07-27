const UMCWidgetInit = require('./index');
const options = {
    entities: ['2f8be2a2-a656-11e9-4199-34e12d3559cb'],  // идентификаторы врачей или услуг (смешивать нельзя), заполняются всегда, если массив пустой, будут высланы все (не рекомендуется)
    groups: false, // идентификаторы групп услуг или специализаций
    type: 'doctor', // doctor || service // чьи идентификаторы закреплены в entities
    root: 'container', // идентификатор контейнера для виджета
    backCall: true, // наличие кнопки для обратного звонка
    sms: true, // наличие подтверждения по смс
    text: 'Вы записались на прием к врачу <span class="UMC-widget__success-highlight">#DOCTOR#<span> на <span class="UMC-widget__success-highlight">#DATE#<span> в <span class="UMC-widget__success-highlight">#TIME#<span>',
    //текст оповещения о записи
}
UMCWidgetInit(options);
const item = window.umcwidget;

describe('item:state', () => {
    test('Method getField must return a string value', () => {
        expect(item.state.getField)
    })
})