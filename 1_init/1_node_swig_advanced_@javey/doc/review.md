## 问题

1. jQuery选择器

    ```javascript
    // example
    $('.a .b');
    // suggestion
    $('.a').find('.b');

    // example
    $('#eip_eipOrderBill a:eq(0)');
    // suggestion
    $('#eip').find('a').eq(0);
    ```

    基准测试

    ```javascript
    var time = new Date().getTime();
    for (var i = 0; i < 1000000; ++i) { $('.c-main').find('.c-table'); }
    console.log((new Date().getTime() - time) / 1000)

    var time = new Date().getTime();
    for (var i = 0; i < 1000000; ++i) { $('.c-main .c-table'); }
    console.log((new Date().getTime() - time) / 1000)
    ```
    chrome `7.211s VS 13.343s`, 但ie8上,结果相反， 由于ie8存在`querySelectorAll`，对于`querySelectorAll`能选择的表达式（仅限于，复杂的就不行了），ie8下性能比较高

2. 缓存jQuery缓存结果

    另一个存在的问题是，代码中大量存在重复选择的情况。

    ```javascript
    // example
    $("input[name=flow]").val(min);
    $("input[name=flow]").focus();

    // suggestion
    var $input = $('input[name=flow]');
    $input.val(min);
    $input.focus();

    // best
    $('input[name=flow]').val(min).focus();
    ```
    无论什么时候，使用缓存和链式调用都是好习惯

3. 过长的函数体

4. 存在多次初始化组件的情况

    ```javascript
    // example
    $('.add, .trash').button().button('disable');

    ...

    activeBtn('.add');
    // 激活按钮
    function activeBtn(btn){
        $btnWrap.find(btn).button().button('enable');
    }

    // suggestion
    var $add = $('.add').button(),
        $trash = $('.trash').button();

    ...

    activeBtn($add);
    // 激活按钮
    $add.button('enable');
    ```
    `jQuery widget`为单例模式，针对同一个dom，多次初始化，只会创建一次，但每次都会执行`_init()`方法。组件初始化一次即可。

5. _.partial

    ```javascript
    // example
    deleteBackup: function(data) {
        return _.partial(ksc.api, '/console/snapshot/delete/', 'post', null)(data);
    }

    // suggestion
    deleteBackup: _.partial(ksc.api, '/console/snapshot/delete/', 'post', null)
    ```
    该函数返回一个函数，如果不是要对传入的变量进行处理，不要多次包装，每次函数调用都是一次开销。

6. jst模板

    发现有些模板大同小异，其实完全没必要新建一堆jst模板，模板是动态的，完全可以根据传入不同的参数，做定制化。

    `eip/detach.jst` & `eip/delete/jst`

7. 代码规范

    目前代码风格都比较随意

    参见[javascript代码规范](https://www.evernote.com/shard/s52/sh/51afaf28-5859-4d91-be2f-96c56c042529/adda1d298ed33777)

8. 异步执行

    异步执行是没有顺序，后执行的异步不一定比前面执行的异步先完成。例如：两个ajax请求，并不能保证完成的顺序就是调用的顺序。如果这两个请求同时操作一个资源，也会导致结果不一定就是后者。
    对于ajax请求，可以调用`abort()`方法取消ajax


## 建议

1. 如果存在大段的模板，建议创建单独的模板文件，然后`require`进来；而对于两三行的小模板，感觉没有创建单独文件的必要了，因为一次http请求仅仅获取一个几个字节的文件，得不偿失。

## 参考

1. table和button状态的联动，建议使用`Interaction`类。具体参见`kvm/list`
2. 对于公共方法，可以参阅`core/utils.js`，避免重复工作。
3. `ksc.showDialog` 对于`options`中的`buttons`，如果只是按钮的回调函数不同，可以不用传入一堆冗长的`options.buttons`

## 注意事项

1. `velocity`页面中定义宏`macro`时，加上命名空间，避免冲突。全局使用的组件宏，就没必要了。





