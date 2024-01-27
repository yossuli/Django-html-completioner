# vscode 拡張機能の開発の練習

vscode 拡張機能開発の練習のためのリポジトリです。

## 1.1.0

### djangoHTML と views.py を結びつける

djangoHTML ファイルを開いたときに views.py を検索し、ファイルの中に開いた djangoHTML ファイルが書かれているかをポップアップで表示<br/>
書かれていない場合、メッセージから views.py を開くことができる

### テスト

```
.
└── djangoApp
     ├── templates
     │   └── djangoApp
     │       ├── index.html
     │       ├── index2.html
     │       ├── index3.html
     │       └── index4.html
     └── views.py
```

```py
def index(request):
    if a:
        if b:
            return render(request,'djangoApp/index3.html')
        context={'test2_1':'value','test2_2':'value'}
        return render(request,'djangoApp/index2.html',context)
    context={'test1':'value'}
    return render(request,'djangoApp/index.html',context)
```

上記の`test-workspace`において`index.html, index2.html, index3.html, index4.html`に対して`vscode/test-cli`、`sinon.js`を用い、正しいメッセージが表示されているか、正しく`views.py`を開くかを確認<br/>

### 問題点

windows で動作しない可能性

## 1.0.0

### djangoHTML への補完機能

views.py を抽象構文木解析して render 関数の第三引数の定義を検索<br/>
該当する辞書オブジェクトのキーのリストを取得<br/>
djangoHTML ファイル編集時の予測変換にキーのリストを追加

### テスト

```
.
└── djangoApp
     ├── templates
     │   └── djangoApp
     │       ├── index.html
     │       ├── index2.html
     │       └── index3.html
     └── views.py
```

```py
def index(request):
    if a:
        if b:
            return render(request,'djangoApp/index3.html')
        context={'test2_1':'value','test2_2':'value'}
        return render(request,'djangoApp/index2.html',context)
    context={'test1':'value'}
    return render(request,'djangoApp/index.html',context)
```

上記の`test-workspace`において`index.html, index2.html, index3.html`に対して`vscode/test-cli`を用い、`completionItem`にそれぞれの`render`関数の第三引数に渡されている辞書オブジェクトのキーがすべて渡されていることを確認

### 整備性

抽象構文木の`type`を定義しているファイルを除き以下のルールに合格

```json
{
  "complexity": ["error", 5],
  "max-depth": ["error", 3],
  "max-nested-callbacks": ["error", 3],
  "max-lines": ["error", 100]
}
```
