import { show_dialog, show_input, show_yes_no } from "../src/index.ts";

window.addEventListener("load", function() {
	document.getElementById("SHOW_DIALOG_BTN")!.addEventListener("click", function() {
		show_dialog("a");
	});

	document.getElementById("SHOW_INPUT_BTN")!.addEventListener("click", async function() {
		const name = await show_input("名前は？", "名前");
		if (name == null) {
			show_dialog("キャンセルしました");
			return;
		}

		show_dialog("貴様の名前は" + name);
	});

	document.getElementById("SHOW_YN_BTN")!.addEventListener("click", function() {
		show_yes_no("死にますか？");
	});
});