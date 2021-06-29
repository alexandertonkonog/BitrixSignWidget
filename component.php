<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
/** @var CBitrixComponent $this */
/** @var array $arParams */
/** @var array $arResult */
/** @var string $componentPath */
/** @var string $componentName */
/** @var string $componentTemplate */
/** @global CDatabase $DB */
/** @global CUser $USER */
/** @global CMain $APPLICATION */

use Bitrix\Main\Context,
	Bitrix\Main\Type\DateTime,
	Bitrix\Main\Loader,
	Bitrix\Iblock;

date_default_timezone_set('Europe/Moscow');

if(!isset($arParams["CACHE_TIME"]))
	$arParams["CACHE_TIME"] = 36000000;

$arParams["IBLOCK_TYPE"] = trim($arParams["IBLOCK_TYPE"]);
if($arParams["IBLOCK_TYPE"] == '')
	$arParams["IBLOCK_TYPE"] = "news";

$arParams["USE_PERMISSIONS"] = $arParams["USE_PERMISSIONS"]=="Y";
if(!is_array($arParams["GROUP_PERMISSIONS"]))
	$arParams["GROUP_PERMISSIONS"] = array(1);

$bUSER_HAVE_ACCESS = !$arParams["USE_PERMISSIONS"];
if($arParams["USE_PERMISSIONS"] && isset($USER) && is_object($USER))
{
	$arUserGroupArray = $USER->GetUserGroupArray();
	foreach($arParams["GROUP_PERMISSIONS"] as $PERM)
	{
		if(in_array($PERM, $arUserGroupArray))
		{
			$bUSER_HAVE_ACCESS = true;
			break;
		}
	}
}
if(!$bUSER_HAVE_ACCESS)
{
	ShowError(GetMessage("T_NEWS_DETAIL_PERM_DEN"));
	return 0;
}

if($this->startResultCache(false, array(($arParams["CACHE_GROUPS"]==="N"? false: $USER->GetGroups()),$bUSER_HAVE_ACCESS, $arNavigation, $pagerParameters)))
{

	if(!Loader::includeModule("iblock"))
	{
		$this->abortResultCache();
		ShowError(GetMessage("IBLOCK_MODULE_NOT_INSTALLED"));
		return;
	}
	if ($arParams["ELEMENT_ID"]) {

		$props = CIBlockElement::GetProperty($arParams["IBLOCK_ID"], $arParams["ELEMENT_ID"], array("sort" => "asc"), array('CODE' => 'MEDIC_ID'));
		$prop = $props->Fetch();
		if ($prop) {
			$arResult["ID"] = $prop["VALUE"];
		} else {
			ShowError(GetMessage("IBLOCK_MODULE_NOT_EXTERNAL_ID"));
		}

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
	} else {
		ShowError(GetMessage("IBLOCK_MODULE_NOT_ELEMENT_ID"));		
	}
	$this->includeComponentTemplate();
}

