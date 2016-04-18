### Project-set

---

#### ▼ Grunt

ターミナル上でpackage.jsonが置いてあるフォルダに移動し、下記のコマンドを実行する

```
$ npm install -g grunt-cli
$ npm install
```

作業前にタスクランナーを起動させる。

```
$ grunt
```
---

### ▼ ディレクトリ構成

####v1.x系

作業ディレクトリ、開発ディレクトリ、出力ディレクトリが全て同じの分かりやすいやつ。展開前のSassなどは納品時に手作業で抜く必要がある。

* ファイル監視
* ローカルサーバー立ち上げ
* Sass展開

```
project-name_v1.x
  |     
  +-index.html
  +-assets
  |   +-images
  |   +-sass
  |   +-scripts
  |
  +-node_modules
  +-Gruntfile.js
  +-package.json
  +-README.md
```

####v2.x系

作業ディレクトリ、開発ディレクトリ（出力ディレクトリ）になったバージョン。Includeも入ってる。便利。

* ファイル監視
* ローカルサーバー立ち上げ
* Sass展開
* Includeでの共通ファイル作成
* 作業ディレクトリ、開発ディレクトリを別に。

```
project-name_v1.x
  |     
  +-src
  |   +-index.html
  |   +-assets
  |       +-images
  |       +-includes
  |       +-sass
  |       +-scripts
  |
  |
  +-dev
  |   +-index.html
  |   +-assets
  |       +-images
  |       +-styles
  |       +-scripts
  |
  +-node_modules
  +-Gruntfile.js
  +-package.json
  +-README.md
```


**■src**

作業ディレクトリはここです。v1.x系は全てがルートディレクトリがそうです。

* assets/includes

	共通パーツを使えます。

	xxxx.html 形式で保存し、呼び出したいhtmlファイル内で
	
	`@include xxxx.html` と記述する。

**■dev**

開発ディレクトリはここです。v1.x系は全てが開発ディレクトリです。

**■grunt関連**

* node_modules

	nodeのライブラリ関係が配置されます。

	※npm installコマンドで自動生成されるフォルダです。

* Gruntfile.js

	gruntコマンド関係の定義ファイルです。コマンドを作成したり、カスタマイズしない限りは触りません。

* package.json

	必要なライブラリの定義ファイルです。触りません。

* README.md

	このファイルです。

---