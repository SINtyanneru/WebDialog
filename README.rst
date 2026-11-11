WebDialog
=========

Webで使えるダイアログライブラリです。
ブラウザのDOMだけで動く、依存なしの小さなライブラリです。

インストール
------------

利用側のプロジェクトで実行します。

.. code-block:: shell

   bun add webdialog

使い方
------

.. code-block:: typescript

   import { alertDialog, confirmDialog, showDialog } from "webdialog";

   //OKだけのダイアログ
   await alertDialog("保存しました");

   //確認ダイアログ（OKならtrue）
   const ok = await confirmDialog("本当に削除しますか？", "確認");
   if (ok) {
       //削除処理
   }

   //ボタンを自由に決めるダイアログ（押されたボタンのvalueが返る）
   const value = await showDialog({
       title: "選択",
       message: "どちらにしますか？",
       buttons: [
           { label: "A案", value: "a" },
           { label: "B案", value: "b" }
       ]
   });

API
---

``showDialog(options)``
   ダイアログを表示し、押されたボタンの ``value`` を返す ``Promise<string | null>`` を返します。
   Escキーやオーバーレイのクリックで閉じた場合は ``null`` が返ります。

   - ``message`` （必須）: 本文
   - ``title``: タイトル（省略可）
   - ``buttons``: ボタンの配列 ``{ label, value }`` （省略時はOKボタンだけ）
   - ``closeOnOverlayClick``: オーバーレイのクリックで閉じるか（省略時は ``true`` ）

``alertDialog(message, title?)``
   OKだけのダイアログを表示する ``Promise<void>`` を返します。

``confirmDialog(message, title?)``
   OK／キャンセルの確認ダイアログを表示し、OKなら ``true`` を返す ``Promise<boolean>`` を返します。

開発
----

.. code-block:: shell

   bun install
   bun run build

ビルドすると ``dist/`` に ``index.js`` と ``index.d.ts`` が生成されます。
