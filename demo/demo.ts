//デモページ用スクリプト
//ライブラリ本体は ../src/index.ts を直接importするので、保存すれば即反映される
import { alertDialog, confirmDialog, showDialog } from "../src/index.ts";

function getElement(id: string): HTMLElement {
	const el = document.getElementById(id);
	if (el === null) {
		throw new Error("要素がありません: " + id);
	}
	return el;
}

function showResult(text: string): void {
	getElement("result").textContent = text;
}

getElement("btn-alert").addEventListener("click", function () {
	alertDialog("保存しました", "お知らせ").then(function () {
		showResult("alertDialog: 閉じました");
	});
});

getElement("btn-confirm").addEventListener("click", function () {
	confirmDialog("本当に削除しますか？", "確認").then(function (ok) {
		if (ok) {
			showResult("confirmDialog: OKが押されました");
		} else {
			showResult("confirmDialog: キャンセル（またはEsc／オーバーレイで閉じた）");
		}
	});
});

getElement("btn-custom").addEventListener("click", function () {
	showDialog({
		title: "選択",
		message: "どちらにしますか？",
		buttons: [
			{ label: "A案", value: "a" },
			{ label: "B案", value: "b" }
		]
	}).then(function (value) {
		if (value === null) {
			showResult("showDialog: 閉じられました（null）");
		} else {
			showResult("showDialog: \"" + value + "\" が選ばれました");
		}
	});
});
