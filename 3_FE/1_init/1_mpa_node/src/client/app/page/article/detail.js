/**
 * @fileOverview
 * @author bian17888 16/7/18 08:31
 */

require(['main'], function() {
  require(['jquery', 'domready', 'underscore', 'moment', 'module/utils', 'module/template'], function($, domready, _, moment, utils, template) {

    var $form = $('#comment_form'),
      $textarea = $form.find('textarea'),
      $mComment = $('.m-comment');
    var articleId = $mComment.data('articleid');

    domready(function() {
      addComments();
      $mComment
        .on('click', '#btn_plwz', focusComments)
        .on('click', '#btn_thumb', {api: '/thumb'}, toogleThumbAndFavor)
        .on('click', '#btn_favor', {api: '/favorite'}, toogleThumbAndFavor)
    });

    //////////////////////////////////////////////////

    /**
     * @func addComments
     * @desc 添加评论
     */
    function addComments() {

      // 表单验证 : jquery validate 写法
      $form.validate({
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
          var $em = $('#btn_plwz').find('em');

          var num = Number($em.text());
          var params = {
            type: 'POST',
            url: '/article/' + articleId + '/comment',
            data: $(form).serialize() + '&articleId=' + articleId
          };
          var commentContent = $textarea.val();

          // 生成用于_.template().compiled()的数据对象
          var compiledObj = {
            content: commentContent,
            img: utils.getCookies()['jingpin-all_avatar_url'],
            nickNameCn: utils.getCookies()['jingpin-all_nickNameCn'],
            time : moment().format('YYYY-MM-DD HH:mm:ss')
          };
          var dom = _.template(template.commentItem)(compiledObj);

          utils.gbAjax(params, function(data) {
            num++;
            $mComment.find('.comments').prepend(dom);
            $textarea.val('');
            $em.text(num);
            utils.logger.success('添加成功');
          });
        }
      });

    }


    /**
     * @func focusComments
     * @desc 点击"评论文章"按钮, 聚焦到输入内容对话框
     */
    function focusComments() {
      $textarea.focus();
    }


    /**
     * @func toogleThumbAndFavor
     * @desc 点赞与收藏
     */
    function toogleThumbAndFavor(event) {
      var $this = $(this),
        $em = $this.find('em');

      var flag = String($this.data('flag')),
        num = Number($em.text()),
        params = {
          type: 'POST',
          url: '/article/' + articleId + event.data.api,
          data: '&articleId=' + articleId
        }

      // 未点赞状态
      if (flag === '0') {
        utils.gbAjax(params, function(data) {
          num++;
          $em.text(num);
          $this.data('flag', '1');
          $this.removeClass('btn-default').addClass('btn-info');
        });
      } else {
        params.type = 'DELETE';
        utils.gbAjax(params, function(data) {
          num--;
          $em.text(num);
          $this.data('flag', '0');
          $this.removeClass('btn-info').addClass('btn-default');
        });
      }
    }


  });
});



