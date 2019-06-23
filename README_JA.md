# yaml-scraper [![Build Status](https://travis-ci.org/segurvita/yaml-scraper.svg?branch=master)](https://travis-ci.org/segurvita/yaml-scraper)
<div style="text-align:right">Language: <a href="README.md">English</a> | <i>日本語</i></div>
yamlファイルを軽量化するnpmモジュールを作りました。指定した要素を削除または空白にします。 `scraper` というのは削り取るというニュアンスの言葉です。



# 目的

Amazon API GatewayにSwaggerファイルをインポートしたところ、容量制限のエラーが発生しました。このエラーを回避することが目的です。



# 使用方法

本ライブラリの仕様にはNode.jsが必要です。

Node.jsがインストール済みであれば、以下のコマンドでインストールできます。

```bash
npm install yaml-scraper
```

サンプルコードは以下の通りです。

```javascript
// ライブラリを追加
const fs = require('fs');
const scraper = require('yaml-scraper');

// YAMLファイルを読み込み
const input = fs.readFileSync('./sample.yaml', 'utf8');

// exampleを削除し、descriptionを空にし、deprecatedの親を削除する
const output = scraper(input)
  .delete('example')
  .empty('description')
  .deleteParent('deprecated')
  .toString();

// 結果を表示
console.log(output);
```



# API

### scraper(input)

`input` をYAML形式として解析します。 最初にこの関数を呼んでから、以下のメソッドチェーンを繋いでください。

### delete(target)

keyが `target` の項目を削除します。メソッドチェーンに使えます。

### empty(target)

keyが `target` のvalueを `''` に置換します。メソッドチェーンに使えます。

### deleteParent(target)

子にkeyが `target` の項目を持つ要素を削除します。メソッドチェーンに使えます。

### toString()

現在の加工データをもとにYAML形式の文字列を生成し、返却します。



# 開発環境構築

本プロジェクトを編集した場合、リポジトリから本プロジェクトをクローンし、以下のコマンドで開発環境を構築できます。

```bash
# 必要なパッケージの導入
npm install

# テスト実行
npm test
```

