'use strict';
var kunIdolKids = window.kunIdolKids || {}; //global namespace for YOUR kunIdolKids, Please change kunIdolKids to your kunIdolKids name

var isMobile = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

(function($) {
    kunIdolKids.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            /*this.initModal( '#modal--about-us' );*/
        },

        initFormElements: function() {
            $('input, textarea').placeholder();

            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {

                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
        },

        initModal: function ( id ) {
            $.magnificPopup.open({
                items: {
                    src: id,
                    type: 'inline'
                },
                closeOnBgClick: false,
                enableEscapeKey: false
            });

            $( id ).find('.btn-close').off('click').on('click', function () {
                $.magnificPopup.close();
            });
        }
    };
})(jQuery);

$(document).ready(function() {
    kunIdolKids.Global.init();
});
