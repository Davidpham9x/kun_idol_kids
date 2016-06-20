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
        modalSubmitVideo: null,

        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            this.initModalSubmitVideo();
            this.initSliderWinner();
            this.initToggleMenu();
            this.initToggleSubMenu();
            /*kunIdolKids.Global.initModal( '#modal--signup' );*/
            /*kunIdolKids.Global.initModalVideo( '#modal--video-detail-2', 'type-2', 'yzRAwrqpxXQ' );*/
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
                enableEscapeKey: false,
                callbacks: {
                    open: function () {
                        if( id === '#modal--edit-profile' ) {
                            kunIdolKids.Global.initSliderSong();
                        }
                    }
                }
            });

            $( id ).find('.btn-close').off('click').on('click', function () {
                $.magnificPopup.close();
            });
        },

        initModalVideo: function ( id, type, idVideo ) {
            $.magnificPopup.open({
                items: {
                    src: id,
                    type: 'inline'
                },
                closeOnBgClick: false,
                enableEscapeKey: false,
                callbacks: {
                    beforeOpen: function () {
                        $( id ).addClass( type );
                    },
                    open: function () {
                        if ( type == 'type-1' ) {
                            $( id ).parents('.mfp-content').css('vertical-align', 'bottom');
                        }
                        var contentVideo = $('<iframe src="//www.youtube.com/embed/'+idVideo+'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
                            contentVideo.clone().appendTo( $( id ).find('.embed-container') );
                    },
                    close: function () {
                        $( id ).find('.embed-container').html('');
                    }
                }
            });

            $( id ).find('.btn-close').off('click').on('click', function () {
                $.magnificPopup.close();
            });
        },

        initModalSubmitVideo: function () {
            kunIdolKids.Global.modalSubmitVideo = $('[data-remodal-id=modal]').remodal({
                hashTracking: false
            });

            $('[data-remodal-id=modal]').find('.btn-close').off('click').on('click', function () {
                kunIdolKids.Global.modalSubmitVideo.close();
            });
        },

        initSliderSong: function () {
            $('.wrap-list-song > ul').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            });
        },

        initSliderWinner: function () {
            $('.wrap-list-song.type-winner > ul').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        },

        initToggleMenu: function () {
            var aTag = $('.toogle-menu'),
                menuContent = $('.main-nav');
            aTag.off('click').on('click', function (e) {
                e.preventDefault();

                if ( menuContent.is(':hidden') ) {
                    menuContent.slideDown();
                } else {
                    menuContent.slideUp();
                }
            });
        },

        initToggleSubMenu: function () {
            var aTag = $('.show-sub-menu'),
                menuContent = $('.sub-menu');
            aTag.off('click').on('click', function (e) {
                e.preventDefault();

                if ( menuContent.is(':hidden') ) {
                    menuContent.slideDown();
                    aTag.find('a').addClass('active');
                } else {
                    menuContent.slideUp();
                    aTag.find('a').removeClass('active');
                }
            });
        }
    };
})(jQuery);

$(document).ready(function() {
    kunIdolKids.Global.init();
});
