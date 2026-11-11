//WebDialog
//ブラウザで使えるダイアログライブラリ。依存なし、DOMだけで動く。

export interface DialogButton {
	label: string;
	value: string;
}

export interface DialogOptions {
	title?: string;
	message: string;
	buttons?: DialogButton[];
	closeOnOverlayClick?: boolean;
}

const STYLE_TEXT = [
	".webdialog-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:10000;}",
	".webdialog-box{background:#ffffff;color:#222222;border-radius:8px;padding:20px 24px;max-width:90vw;width:400px;box-shadow:0 8px 32px rgba(0,0,0,0.3);font-family:sans-serif;}",
	".webdialog-title{font-size:17px;font-weight:bold;margin:0 0 8px 0;}",
	".webdialog-message{font-size:14px;margin:0 0 16px 0;white-space:pre-wrap;word-break:break-word;}",
	".webdialog-buttons{display:flex;justify-content:flex-end;gap:8px;}",
	".webdialog-button{font-size:14px;padding:6px 16px;border:1px solid #bbbbbb;border-radius:6px;background:#f5f5f5;cursor:pointer;}",
	".webdialog-button:hover{background:#e8e8e8;}"
].join("\n");

let styleInjected = false;

function injectStyle(): void {
	if (styleInjected) {
		return;
	}
	styleInjected = true;
	const style = document.createElement("style");
	style.textContent = STYLE_TEXT;
	document.head.appendChild(style);
}

//ダイアログを表示する。押されたボタンのvalueを返す。
//Escキーやオーバーレイのクリックで閉じた場合はnullを返す。
export function showDialog(options: DialogOptions): Promise<string | null> {
	return new Promise(function (resolve) {
		injectStyle();

		const overlay = document.createElement("div");
		overlay.className = "webdialog-overlay";

		const box = document.createElement("div");
		box.className = "webdialog-box";
		box.setAttribute("role", "dialog");
		box.setAttribute("aria-modal", "true");
		overlay.appendChild(box);

		if (options.title !== undefined) {
			const title = document.createElement("p");
			title.className = "webdialog-title";
			title.textContent = options.title;
			box.appendChild(title);
		}

		const message = document.createElement("p");
		message.className = "webdialog-message";
		message.textContent = options.message;
		box.appendChild(message);

		let buttons: DialogButton[];
		if (options.buttons !== undefined) {
			buttons = options.buttons;
		} else {
			buttons = [{ label: "OK", value: "ok" }];
		}

		let closed = false;
		function close(value: string | null): void {
			if (closed) {
				return;
			}
			closed = true;
			document.removeEventListener("keydown", onKeydown);
			overlay.remove();
			resolve(value);
		}
		function onKeydown(event: KeyboardEvent): void {
			if (event.key === "Escape") {
				close(null);
			}
		}

		const row = document.createElement("div");
		row.className = "webdialog-buttons";
		box.appendChild(row);

		let firstButton: HTMLButtonElement | null = null;
		for (let i = 0; i < buttons.length; i++) {
			const def = buttons[i];
			const button = document.createElement("button");
			button.className = "webdialog-button";
			button.textContent = def.label;
			button.addEventListener("click", function () {
				close(def.value);
			});
			row.appendChild(button);
			if (firstButton === null) {
				firstButton = button;
			}
		}

		overlay.addEventListener("click", function (event) {
			if (event.target === overlay) {
				if (options.closeOnOverlayClick !== false) {
					close(null);
				}
			}
		});

		document.body.appendChild(overlay);
		document.addEventListener("keydown", onKeydown);
		if (firstButton !== null) {
			firstButton.focus();
		}
	});
}

//OKだけのダイアログ
export function alertDialog(message: string, title?: string): Promise<void> {
	const options: DialogOptions = {
		message: message,
		buttons: [{ label: "OK", value: "ok" }]
	};
	if (title !== undefined) {
		options.title = title;
	}
	return showDialog(options).then(function () {
		return;
	});
}

//OK／キャンセルの確認ダイアログ。OKならtrue、キャンセルや閉じた場合はfalse
export function confirmDialog(message: string, title?: string): Promise<boolean> {
	const options: DialogOptions = {
		message: message,
		buttons: [
			{ label: "キャンセル", value: "cancel" },
			{ label: "OK", value: "ok" }
		]
	};
	if (title !== undefined) {
		options.title = title;
	}
	return showDialog(options).then(function (value) {
		return value === "ok";
	});
}
