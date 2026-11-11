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
export declare function showDialog(options: DialogOptions): Promise<string | null>;
export declare function alertDialog(message: string, title?: string): Promise<void>;
export declare function confirmDialog(message: string, title?: string): Promise<boolean>;
