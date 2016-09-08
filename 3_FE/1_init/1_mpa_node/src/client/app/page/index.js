/**
 * @fileOverview
 * @author bian17888 16/7/18 08:31
 */

require(['main'], function() {
  require(['jquery', 'domready', 'underscore', 'module/utils', 'module/template'], function($, domready, _, utils, template) {

    domready(function() {

      initSineWave();
      initHighcharts();
      initCarousel();
      addComment();

    });


    //////////////////////////////////////////////////

    /**
     * @func initSineWave
     * @desc 顶部日报标签模块 - 通过canvas绘制
     */
    function initSineWave() {
      //todo : sine waves
    }


    /**
     * @func initHighcharts
     * @desc 初始化图表
     */
    function initHighcharts() {
      var defaultOptions = {
        chart: {
          type: 'column'
        },
        series: [{
          name: 'xx',
          data: []
        }],
        title: {
          text: ''
        },
        xAxis: {
          categories: []
        }
      };
      var data = $('.highcharts').data('highcharts');

      _.each(data, function(val, key) {
        var options = _.clone(defaultOptions);
        var data = val.data;

        options.series[0].data = _.pluck(data, 'value');
        options.series[0].name = val.test;
        options.title.text = val.subTitle;
        options.xAxis.categories = _.pluck(data, 'company');

        $('#hc' + (key + 1)).highcharts(options);
      })
    }


    /**
     * @func initCarousel
     * @desc 初始化"竞争日报", 轮播模块
     */
    function initCarousel() {
      $('.carousel').carousel({
        interval: false
      })
    }


    /**
     * @func addComment
     * @desc 添加评论
     */
    function addComment() {

      var $form = $('.comment-form'),
        $btnBar = $('.comment-form .btn-bar');

      $form.find('textarea').focus(function() {
        $(this).closest('.comment-form').find('.btn-bar').removeClass('hide');
      });
      $btnBar.find('.btn-default').click(function() {
        $(this).closest('.btn-bar').addClass('hide');
      });

      // 表单验证 : jquery validate 写法
      // 此处不能用 $('.comment-form').validate()
      _.each($form, function(element, index) {
        var ele = '#comment_form' + (index + 1);
        $(ele).validate({
          rules: {
            content: {
              required: true
            }
          },
          messages: {
            content: {
              required: '内容不能为空'
            }
          },
          submitHandler: function(form) {
            var articleId = $(form).closest('.item').data('articleid');
            var params = {
              type: 'POST',
              url: '/article/' + articleId + '/comment',
              data: $(form).serialize() + '&articleId=' + articleId
            };
            var commentContent = $(form).find('textarea').val();

            // 生成用于_.template().compiled()的数据对象
            var compiledObj = {
              content: commentContent,
              img: utils.getCookies()['jingpin-all_avatar_url'],
              nickNameCn: utils.getCookies()['jingpin-all_nickNameCn'],
              time : ''
            };
            var dom = _.template(template.commentItem)(compiledObj);

            utils.gbAjax(params, function(data) {
              $(form).closest('.m-comment').find('.comments').prepend(dom);
              $(form).find('textarea').val('');
              utils.logger.success('添加成功');
            });

          }
        });
      });
    }


  });
});



