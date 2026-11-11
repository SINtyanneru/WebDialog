/**
 * ダイアログのデフォルトCSSを殺します
 */
export declare function dialog_disable_default_css(): void;
/**
 * OKの文字を変えます
 */
export declare function dialog_change_ok(text: string): void;
/**
 * YESの文字を変えます
 */
export declare function dialog_change_yes(text: string): void;
/**
 * NOの文字を変えます
 */
export declare function dialog_change_no(text: string): void;
/**
 * CANCELの文字を変えます
 */
export declare function dialog_change_cancel(text: string): void;
/**
 * ダイアログを出します
 */
export declare function show_dialog(text: string): void;
/**
 * 入力ダイアログ
 */
export declare function show_input(text: string, placeholder: string): Promise<string | null>;
/**
 * Yes No
 */
export declare function show_yes_no(text: string): Promise<boolean>;
/**
 * Yes No Cancel
 */
export declare function show_yes_no_cancel(text: string): Promise<boolean | null>;
