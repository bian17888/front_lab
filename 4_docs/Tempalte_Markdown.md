# 标题1
@(示例笔记本)[马克飞象|帮助|Markdown]
文字内容 **文字加粗** *斜体*  `Tip`
- **无序项目列表** ：文字内容
- **无序项目列表** ：文字内容 

> 引文（用>符号开始） [下载文字](https://chrome.google.com/webstore/detail/%E9%A9%AC%E5%85%8B%E9%A3%9E%E8%B1%A1/kidnkfckhbdkfgbicccmdggmpgogehop/)

-------------------

#### 代码块
<pre><code>这是一个代码区块。</code></pre>

#### 代码块（sh）
```sh
$ npm i -g gulp
```

#### 代码块（马克飞象）
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```
-------------------

#### LaTex 公式
$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

-------------------

#### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |

-------------------

#### 插入图片
[文章链接](http://wowubuntu.com/markdown/index.html#img)

-------------------

