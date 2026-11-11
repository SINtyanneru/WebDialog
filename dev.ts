//開発サーバー
//demo/index.html を配信する。TypeScriptの変換とHMRはBunが面倒を見る。
import index from "./demo/index.html";

const server = Bun.serve({
	routes: {
		"/": index
	},
	development: true
});

console.log("開発サーバー起動: http://localhost:" + server.port);
