<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
    die();
}
$arResult = [];
$arResult["DAYS"] = [];

$date = new \DateTime();
$month = $date->format('m');
$year = $date->format('Y');
$day = $date->format('d');

$start = new \DateTime("$year-$month-01");

while(intval($start->format('m')) == intval($month)) {
    $arResult["DAYS"][] = [
        'day' => $start->format('d'),
        'dayOfWeek' => $start->format('w'),
        'free' => intval($start->format('d')) >= intval($day),
    ];
    $start->modify('+1 day');
}

$dayOfWeek = $arResult["DAYS"][0]["dayOfWeek"];
if ($dayOfWeek != 1) {
    $emptyDays = [];
    for($i = $dayOfWeek; $i > 1; $i--) {
        $emptyDays[] = ['empty' => true];
    }
    $arResult["DAYS"] = array_merge($emptyDays, $arResult["DAYS"]);
}

$arResult["TIME"] = [];

$date->setTime(9, 0);
while(count($arResult["TIME"]) < 6) {
    $curItem = ["start" => $date->format('h:i')];
    $date->modify('+1 hour');
    $curItem["end"] = $date->format('h:i');
    $arResult["TIME"][] = $curItem;
}

?>

<section class="UMC-widget">
	<p class="UMC-widget__date">Сегодня 11 июля</p>
	<div class="UMC-widget__form" id="UMC-widget__form">
	<div class="UMC-widget__service-wrapper UMC-widget__servicegroups-wrapper UMC-widget__block">
		<div class="UMC-widget__service-header UMC-widget__section-header">Группа услуг:</div>
		<div class="UMC-widget__service shadow-box shadow-box_loading">
		<p class="UMC-widget__service-item">Группа услуг 1</p>
		<p class="UMC-widget__service-item UMC-widget__service-item_selected">Группа услуг 2</p>
		<p class="UMC-widget__service-item">Группа услуг 3</p>
		<p class="UMC-widget__service-item">Группа услуг 4</p>
		<p class="UMC-widget__service-item">Группа услуг 5</p>
		<p class="UMC-widget__service-item">Группа услуг 6</p>
		</div>
	</div>
	<div class="UMC-widget__service-wrapper UMC-widget__services-wrapper UMC-widget__block">
		<div class="UMC-widget__service-header UMC-widget__section-header">
		<p>Услуга:</p>
		<p class="UMC-widget__service-header-price"></p>
		</div>
		<div class="UMC-widget__service shadow-box shadow-box_hidden">
		<p class="UMC-widget__service-item">Услуга 1</p>
		<p class="UMC-widget__service-item">Услуга 2</p>
		<p class="UMC-widget__service-item UMC-widget__service-item_selected">Услуга 3</p>
		<p class="UMC-widget__service-item">Услуга 4</p>
		<p class="UMC-widget__service-item">Услуга 5</p>
		<p class="UMC-widget__service-item">Услуга 6</p>
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
			<? foreach($arResult["DAYS"] as $value): ?>
				<? if ($value["empty"]): ?>
					<p class="UMC-widget__calendar-item UMC-widget__calendar-item_empty">1</p>
				<? elseif($value['free']): ?>
					<p class="UMC-widget__calendar-item"><?=$value["day"]?></p>
				<? else: ?>
					<p class="UMC-widget__calendar-item UMC-widget__calendar-item_red"><?=$value["day"]?></p>
				<? endif; ?>
			<? endforeach; ?>
		</div>
		<div class="UMC-widget__calendar-des">
		<div class="UMC-widget__calendar-des-item">
			<p class="UMC-widget__calendar-item UMC-widget__calendar-item_red"></p>
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
		<p class="UMC-widget__time-header UMC-widget__section-header">Время записи на: 11 июля</p>
		<div class="UMC-widget__time-wrapper">
		<div class="UMC-widget__time shadow-box shadow-box_hidden">
			<? foreach($arResult["TIME"] as $value): ?>
				<p class="UMC-widget__time-item UMC-widget__time-item_free">
					<span class="UMC-widget__time-time"><?=$value["start"]?></span>
					<span class="UMC-widget__time-space"></span>
					<span class="UMC-widget__time-time"><?=$value["end"]?></span>
					<span class="UMC-widget__time-sign">
						<span class="UMC-widget__time-sign-icon">+</span>
					</span>
				</p>
			<? endforeach; ?>
		</div>
		</div>
	</div>       
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
			</div>
			<div class="UMC-widget__button-area">
			<div class="UMC-widget__button" id="UMC-widget__btn-sign">
				Записаться
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
				<p class="UMC-widget__success-text"></p>
			</div>
		</div>
		<div class="UMC-widget__error-wrapper UMC-widget_class-hidden UMC-widget__modal-screen" data-name="error">
			<div class="UMC-widget__success-area">
				<p class="UMC-widget__success-text">Произошла ошибка! Попробуйте записаться еще раз или перезагрузите страницу</p>
			</div>
		</div>
		</div>
	</div>
	</div>
	<div class="UMC-widget__medic-id UMC-widget_class-hidden" data-medic="<?=$arResult["ID"]?>"></div>
</section>
<script>
	window.UMCWidget.API_URL = "/local/firstbit/ajax.php";
	window.UMCWidget.id = "<?=$arResult["ID"]?>";
</script>