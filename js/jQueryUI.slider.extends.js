/**
 * 扩展jquery Ui的滑块功能
 * by raojunjun
 */
(function($) {

    var extensionMethods = {
        pips: function(settings) {
            options = {

                first: "number", // "pip" , false
                last: "number", // "pip" , false
                rest: "pip", // "number" , false
                initValues: []
            };
            $.extend(options, settings);
            
            this.element.addClass('ui-slider-pips').find('.ui-slider-pip').remove();
            var pips = this.options.max - this.options.min;
            var val = "";
            for (i = 0; i <= pips; i++) {

                if (options.initValues.length < (i + 1)) {
                    break;
                } else {
                    val = options.initValues[i];
                }
                var s = $('<span class="ui-slider-pip"><span class="ui-slider-line"></span><span class="ui-slider-number">' + val + '</span></span>');

                if (0 == i) {
                    s.addClass('ui-slider-pip-first');
                    if ("number" == options.first) {
                        s.addClass('ui-slider-pip-number');
                    }
                    if (false == options.first) {
                        s.addClass('ui-slider-pip-hide');
                    }
                } else if (pips == i) {
                    s.addClass('ui-slider-pip-last');
                    if ("number" == options.last) {
                        s.addClass('ui-slider-pip-number');
                    }
                    if (false == options.last) {
                        s.addClass('ui-slider-pip-hide');
                    }
                } else {
                    if ("number" == options.rest) {
                        s.addClass('ui-slider-pip-number');
                    }
                    if (false == options.rest) {
                        s.addClass('ui-slider-pip-hide');
                    }
                }

                if (this.options.orientation == "horizontal")
                    s.css({
                        left: '' + (100 / pips) * i + '%'
                    });
                else
                    s.css({
                        top: '' + (100 / pips) * i + '%'
                    });
                this.element.append(s);
            }

        }
    };
    $.extend(true, $['ui']['slider'].prototype, extensionMethods);
})(jQuery);