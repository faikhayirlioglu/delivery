export default function($) {
  $.fn.textInputBox = function (boxClass) {
    if (!boxClass) boxClass = 'input-field';
    $(this).find('.' + boxClass).each(function (index, element) {
      const $box = $(element);
      const $input = $box.find('input, textarea');
      if ($input.attr('required') && !$box.hasClass(`${boxClass}_required`)) {
        $box.addClass(`${boxClass}_required`);
      }
      if ($input.attr('placeholder')) {
        $box.attr('data-placeholder', $input.attr('placeholder'));
      }
      hasValue();
      $input.on('change', hasValue);
      $input.on('focus', function () {
        $box.addClass(`${boxClass}_focus`);
        hasValue();
      }).on('blur', function () {
        $box.removeClass(`${boxClass}_focus`);
        hasValue();
      });

      function hasValue() {
        const hasValueClass = `${boxClass}_has-value`;
        if ($input.val().length > 0) {
          if (!$box.hasClass(hasValueClass)) $box.addClass(hasValueClass);
        } else {
          if ($box.hasClass(hasValueClass)) $box.removeClass(hasValueClass);
        }
      }
    });
  }
};
