/**
 * @fileOverview
 * @author bian17888 16/7/18 08:31
 */

require(['main'], function() {
  require(['jquery', 'domready', 'module/utils'], function($, domready, utils) {

    domready(function() {

      initDatepicker();
      utils.pagination();

    });

    //////////////////////////////////////////////////

    function initDatepicker() {

      var $form = $('.m-aside .dp form');

      $('.input-group.date').datepicker({
        todayBtn: "linked",
        language: "zh-CN",
        forceParse: false,
        todayHighlight: true
      });

      $form.validate({
        rules: {
          time: {
            required: true
          }
        },
        messages: {
          time: {
            required: ''
          }
        },
        submitHandler: function(form) {
          var time = $('#time').val(),
            path = $(form).data('path'),
            action = path + time;
          $(form).attr('action', action);
          form.submit();
        }
      });
    }

  });
});



