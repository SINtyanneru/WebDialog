let ok_text = "おｋ";
let cancel_text = "やめた";
let yes_text = "はい";
let no_text = "いいえ";
let default_css_enable = true;

type DialogBase = {
	bg: HTMLDivElement,
	parent: HTMLDivElement,
	display: HTMLDivElement,
	button_field: HTMLDivElement
};

/**
 * ダイアログの土台を生成します。
 */
function show_base(): DialogBase {
	let bg = document.createElement("DIV") as HTMLDivElement;
	bg.className = "DIALOG_BG";

	let parent = document.createElement("DIV") as HTMLDivElement;
	parent.className = "DIALOG_PARENT";

	let display = document.createElement("DIV") as HTMLDivElement;
	display.className = "DIALOG_DISPLAY";
	parent.append(display);

	let button_field = document.createElement("DIV") as HTMLDivElement;
	button_field.className = "DIALOG_BUTTONFIELD";
	parent.append(button_field);

	if (default_css_enable) {
		bg.style.position = "fixed";
		bg.style.top = "0px";
		bg.style.left = "0px";
		bg.style.width = "100vw";
		bg.style.height = "100vh";
		bg.style.backgroundColor = "#000000AA";

		parent.style.position = "fixed";
		parent.style.top = "50%";
		parent.style.left = "50%";
		parent.style.transform = "translate(-50%, -50%)";
		parent.style.backgroundColor = "#FFFFFFAA";
		parent.style.padding = "10px";
		parent.style.borderRadius = "5px";
		parent.style.minWidth = "200px";
		parent.style.minHeight = "100px";
		parent.style.display = "flex";
		parent.style.flexDirection = "column";

		button_field.style.backgroundColor = "#FFFFFF";
		button_field.style.borderRadius = "0px 0px 5px 5px";
		button_field.style.height = "24px";

		display.style.backgroundColor = "#FFFFFF";
		display.style.borderRadius = "5px 5px 0px 0px";
		display.style.flexGrow = "1";
	}

	document.body.append(bg);
	document.body.append(parent);

	return {
		bg: bg,
		parent: parent,
		display: display,
		button_field: button_field
	};
}

/**
 * ダイアログのデフォルトCSSを殺します
 */
export function dialog_disable_default_css() {
	default_css_enable = false;
}

/**
 * OKの文字を変えます
 */
export function dialog_change_ok(text: string) {
	ok_text = text;
}

/**
 * YESの文字を変えます
 */
export function dialog_change_yes(text: string) {
	yes_text = text;
}

/**
 * NOの文字を変えます
 */
export function dialog_change_no(text: string) {
	no_text = text;
}

/**
 * CANCELの文字を変えます
 */
export function dialog_change_cancel(text: string) {
	cancel_text = text;
}


/**
 * ダイアログを出します
 */
export function show_dialog(text: string) {
	let base = show_base();
	base.parent.dataset["type"] = "DIALOG";
	base.display.innerText = text;

	let ok_button = document.createElement("BUTTON") as HTMLButtonElement;
	ok_button.className = "DIALOG_BUTTON_OK";
	ok_button.innerText = ok_text;
	base.button_field.append(ok_button);

	ok_button.onclick = function() {
		base.bg.remove();
		base.parent.remove();
	}
}

/**
 * 入力ダイアログ
 */
export function show_input(text: string, placeholder: string): Promise<string|null> {
	let base = show_base();
	base.parent.dataset["type"] = "INPUT";

	let text_el = document.createElement("DIV") as HTMLDivElement;
	text_el.className = "DIALOG_TEXT";
	text_el.innerText = text;
	base.display.append(text);

	let input = document.createElement("INPUT") as HTMLInputElement;
	input.className = "DIALOG_INPUT";
	input.placeholder = placeholder;
	base.display.append(input);

	let ok_button = document.createElement("BUTTON") as HTMLButtonElement;
	ok_button.className = "DIALOG_BUTTON_OK";
	ok_button.innerText = ok_text;
	base.button_field.append(ok_button);

	let cancel_button = document.createElement("BUTTON") as HTMLButtonElement;
	cancel_button.className = "DIALOG_BUTTON_CANCEL";
	cancel_button.innerText = cancel_text;
	base.button_field.append(cancel_button);

	input.focus();

	function close() {
		base.bg.remove();
		base.parent.remove();
	}

	return new Promise((resolve, reject) => {
		input.onkeydown = function(e) {
			if (e.key == "Enter") {
				ok_button.click();
			}
		}

		ok_button.onclick = function() {
			if (input.value == "") return;

			close();

			resolve(input.value);
		}

		cancel_button.onclick = function() {
			close();
			resolve(null);
		}
	});
}

/**
 * Yes No
 */
export function show_yes_no(text: string): Promise<boolean> {
	let base = show_base();
	base.parent.dataset["type"] = "INPUT";
	base.display.innerText = text;

	let yes_button = document.createElement("BUTTON") as HTMLButtonElement;
	yes_button.className = "DIALOG_BUTTON_OK";
	yes_button.innerText = yes_text;
	base.button_field.append(yes_button);

	let no_button = document.createElement("BUTTON") as HTMLButtonElement;
	no_button.className = "DIALOG_BUTTON_CANCEL";
	no_button.innerText = no_text;
	base.button_field.append(no_button);

	function close() {
		base.bg.remove();
		base.parent.remove();
	}

	return new Promise((resolve, reject) => {
		yes_button.onclick = function() {
			close();
			resolve(true);
		}

		no_button.onclick = function() {
			close();
			resolve(false);
		}
	});
}

/**
 * Yes No Cancel
 */
export function show_yes_no_cancel(text: string): Promise<boolean|null> {
	let base = show_base();
	base.parent.dataset["type"] = "INPUT";
	base.display.innerText = text;

	let yes_button = document.createElement("BUTTON") as HTMLButtonElement;
	yes_button.className = "DIALOG_BUTTON_OK";
	yes_button.innerText = yes_text;
	base.button_field.append(yes_button);

	let no_button = document.createElement("BUTTON") as HTMLButtonElement;
	no_button.className = "DIALOG_BUTTON_CANCEL";
	no_button.innerText = no_text;
	base.button_field.append(no_button);

	let cancel_button = document.createElement("BUTTON") as HTMLButtonElement;
	cancel_button.className = "DIALOG_BUTTON_CANCEL";
	cancel_button.innerText = cancel_text;
	base.button_field.append(cancel_button);

	function close() {
		base.bg.remove();
		base.parent.remove();
	}

	return new Promise((resolve, reject) => {
		yes_button.onclick = function() {
			close();
			resolve(true);
		}

		no_button.onclick = function() {
			close();
			resolve(false);
		}

		cancel_button.onclick = function() {
			close();
			resolve(null);
		}
	});
}

