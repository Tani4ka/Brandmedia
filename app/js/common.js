
$(function() {
    initSlickCarousel();
    initFitVids();

    // slick init
    function initSlickCarousel() {
        jQuery('.slick').slick({
            slidesToScroll: 1,
            rows: 0,
            arrows: false,
            //prevArrow: $('.prev'),
            //nextArrow: $('.next'),
            dots: true,
            dotsClass: 'slick-dots'
        });
    }

    // handle flexible video size
    function initFitVids() {
        jQuery('.ishome').fitVids();
    }



    /**** Common scripts ****/
    /* SVG Fallback */

    //if(!Modernizr.svg) {
    //    $("img[src*='svg']").attr("src", function() {
    //        return $(this).attr("src").replace(".svg", ".png");
    //    });
    //};

    /* picturefill */

   // picturefill({
   //     reevaluate: true,
   //     elements: [ document.getElementById("picture-bg") ]
   // });


    /* Retina cover plugin*/

    //$('.bg-stretch').retinaCover();


    /* Preloader Tanya */

    //$(window).on('load', function () {
    //    $('.preloader').delay(1000).fadeOut('slow');
    //});


    /* Preloader */

    //var hellopreloader = document.getElementById("hellopreloader_preload");
    //function fadeOutnojquery(el){
    //    el.style.opacity = 1;
    //    var interhellopreloader = setInterval(function(){
    //        el.style.opacity = el.style.opacity - 0.05;
    //        if (el.style.opacity <=0.05){
    //            clearInterval(interhellopreloader);
    //            hellopreloader.style.display = "none";}
    //    },16);
    //}
    //window.onload = function(){
    //    setTimeout(function(){
    //        fadeOutnojquery(hellopreloader);
    //    },1000);
    //};


    /* E-mail Ajax Send example */

    ////Documentation & Example: https://github.com/agragregra/uniMail
    //$(".callback").submit(function() { //Change
    //    var th = $(this);
    //    $.ajax({
    //        //type: "POST",
    //        //url: "mail.php", //Change
    //        //data: th.serialize()     // need hostname with imail
    //
    //    }).done(function() {
    //        $('.success').addClass('visible');
    //        setTimeout(function() {
    //            th.trigger("reset");
    //            $('.success').removeClass('visible');
    //            $.magnificPopup.close();
    //        }, 3000);
    //    });
    //    //}).done(function() {
    //    //    $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn(); // alert("Thank you!");
    //    //    setTimeout(function() {
    //    //        $(th).find('.success').removeClass('active').fadeOut();// Done Functions
    //    //        th.trigger("reset");
    //    //    }, 3000);
    //    //});
    //    return false;
    //});


    /* Chrome Smooth Scroll */
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {};


    /* Prevent Drag for a, img */

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });


    /* Scroll page to top */

    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });
    $('.top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    /* No touch device :hover */
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        console.log('this is a touch device');
        document.body.classList.add('touch');
    } else {
        console.log('this is not a touch device');
        document.body.classList.add('no-touch');
    }


    /* disable hover while scrolling */

    //var body = document.body,
    //  timer;
    //window.addEventListener('scroll', function() {
    //    clearTimeout(timer);
    //    if(!body.classList.contains('disable-hover')) {
    //        body.classList.add('disable-hover')
    //    }
    //    timer = setTimeout(function(){
    //        body.classList.remove('disable-hover')
    //    },500);
    //}, false);


                        /***** Aditional scripts *****/
    /* Equalheight without plugin */

    //(function ($) {
    //    $.fn.equalHeights = function () {
    //        var $items = $(this);
    //        function equalize() {
    //            $items.height('initial');
    //            var maxH = $items.eq(0).height();
    //            $items.each(function () {
    //                maxH = ($(this).height() > maxH) ? $(this).height() : maxH;
    //            });
    //            $items.height(maxH);
    //        }
    //        equalize();
    //        $(window).bind('resize', function () {
    //            equalize();
    //        });
    //    };
    //})(jQuery);
    //
    //// call equalHeights
    //$('.services__header').equalHeights();
    //$('.services__text').equalHeights();


    /* Fixed sidebar block */

    //$(function(){
    //    var topPos = $('#floating').offset().top; //расстояние от АйДи флоатинг до начала документа
    //    $(window).scroll(function() { //при скроллинге:
    //        var top = $(document).scrollTop(),//скролинг документа
    //            pip = $('footer').offset().top,//расстояние от футера до начала документа
    //            height = $('#floating').outerHeight();//высота черного блока
    //        console.log(topPos)//вывод в консоль любого значения
    //
    //        if (top > topPos && top < pip - height) {//проскролено больше расстояния от АйДи флоатинг до начала документа
    //            //и проскролено меньше чем расстояние от футера минус высота черного блоока
    //            $('#floating').addClass('fixed').fadeIn(300); //добавляем черному блоку класс фиксед и плавное проявление
    //        }
    //        else if (top > pip - height) {$('#floating').fadeOut(100);//скрытие черного блока при достижении футера
    //        }
    //        else {$('#floating').removeClass('fixed');}//убираем класс фиксед
    //    });
    //});


    /* Popup show hide */

    //$(document).ready(function(){
    //    PopUpHide();
    //});
    //function PopUpShow(){
    //    $("#popup1").show();
    //}
    //function PopUpHide(){
    //    $("#popup1").hide();
    //}


    /* Humburgers */

    //var $humburger = $(".hamburger");
    //var API = $menu.data( "mmenu" );
    //
    //$humburger.on( "click", function() {
    //    API.open();
    //});
    //
    //API.bind( "open:finish", function() {
    //    setTimeout(function() {
    //        $humburger.addClass( "is-active" );
    //    }, 100);
    //});
    //API.bind( "close:finish", function() {
    //    setTimeout(function() {
    //        $humburger.removeClass( "is-active" );
    //    }, 100);
    //});


    /* Owl-carousel (если карусель заружена, сделать блоки одинаковой высоты) */

    //$('.carousel-services').on('initialized.owl.carousel', function () {
    //    setTimeout(function () {
    //        carouselService()
    //    }, 100);
    //});

    //Owl-carousel

    //$('.carousel-services').owlCarousel({
    //    loop: true,
    //    nav: true,
    //    smartSpeed: 700,
    //    navText: ['<i class="fa fa-angle-double-left">', '<i class="fa fa-angle-double-right">'],
    //    responsiveClass: true,
    //    dots: false,
    //    responsive: {
    //        0: {
    //            items: 1
    //        },
    //        800: {
    //            items: 2
    //        },
    //        1100: {
    //            items: 3
    //        }
    //    }
    //});


    /* Blocks the same height for video */

    function videoWrapHeight() {
        $('.slick-track').each(function () {
            var ths = $(this),
                thsh = ths.find('.slick__item').outerHeight();
                thsh1 = ths.find('.slick__list').outerWidth();
            $('.video__overlay').css('height', thsh);
            $('.video__overlay').css('width', thsh1);
        });

    }videoWrapHeight();
    window.onresize = function () {
        videoWrapHeight();
    };

    /* Custom arrows in slick for video */

    $('.controls__prev').click(function(){
        $('.slick').slick('slickPrev');
    })
    $('.controls__next').click(function(){
        $('.slick').slick('slickNext');
    })


    /* iframe controls */
    function videoControls() {
        var slickCurrent = $(".slick-current").find(".iframe")[0];
        var player = new Vimeo.Player(slickCurrent);
        player.play();
        //slickCurrent.src += "?autoplay=1";
        $(".video__overlay").fadeOut('slow');
        $(".controls").fadeOut('slow');

        player.on('ended', function() {
            $(".controls").fadeIn('slow');
        });
        //player.on('ended', function() {
        //    console.log('Ended');
        //    $(".controls_wrap").fadeIn('slow');
        //});
    };

    function videoEnded() {
        $('.slick__item').each(function () {
            var ths = $(this);
            var iframeCurrent = ths.find(".iframe")[0];
            var player = new Vimeo.Player(iframeCurrent);

            player.on('ended', function() {
                $(".controls").fadeIn('slow');
            });
        });
    };

    $(".controls__btn").click(function() {
        videoControls();
        videoEnded();
    });


    /* Blocks the same height */

    //function carouselService() {
    //    var mh = 23;
    //    $('.services').each(function () {
    //        var ths = $(this),
    //            thsh = ths.find('.services__header').outerHeight();
    //        //console.log(thsh);
    //        if(thsh > mh) {
    //            mh = thsh;
    //        };
    //    });
    //
    //    $('.services__header').height(mh);
    //    //console.log($('.services__header').outerHeight());
    //}carouselService();


    /* Add last/first span for cms */

    //$('.carousel-services__composition .carousel-services__header').each(function () {
    //    var ths = $(this);
    //    ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>')); // выделяет последнее слово в span
    //});


    //$('section .h2').each(function () {
    //    var ths = $(this);
    //    ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));  // выделяет первое слово в span
    //});


    //$('.start .heading__header').each(function () {
    //    var ths = $(this);
    //    ths.html(ths.html().replace(/(\w+\'\w+\s+\w+\!)$/, '<span>$1</span>')); // выделяет 2 последнее слово в span
    //});

    // Add two last words in span
    //$('.skills .heading_wrap .h2').each(function(){
    //    var $this = $(this), text=$this.text().trim(), words = text.split(/\s+/);
    //    var lastWords = words.splice(-2);
    //    var join = lastWords.join(' ');
    //    words.push('<span class="h2_orange">' + join + '</span>');
    //    $this.html(words.join(' '));
    //});

    /* Selectize */
    //$('select').selectize();


    /* Resize Window (in the end) */

    //function onResize() {
    //    $('.carousel-services__content').equalHeights();  // for owl-carousel,
    //}onResize();
    //window.onresize = function () {
    //    onResize()
    //};


    /* Superfish */

    //$('.top-line .sf-menu').superfish({
    //    cssArrows: false,
    //    hoverClass: 'no-class',
    //    delay: 200
    //});


    /* Owl-carousel */

    //var owl = $('.slider');
    //owl.owlCarousel({
    //    loop: true,
    //    items: 1,
    //    itemClass: 'slide-wrap',
    //    nav: true,
    //    navText:'',  // if we have additional owl-nav, default owl-nav will be empty.
    //    dots: true,
    //    smartSpeed: 700
    //});
    //
    //// nav for additional owl-nav
    //$('.owl-nav__prev').click(function(){
    //    owl.trigger('prev.owl.carousel');
    //});
    //$('.owl-nav__next').click(function(){
    //    owl.trigger('next.owl.carousel');
    //});

    //<section class="s-slider">
    //    <div class="container">
    //        <div class="owl-nav">
    //            <div class="owl-nav__prew"><i class="fa fa-angle-left"></i></div>
    //            <div class="owl-nav__next"><i class="fa fa-angle-right"></i></div>
    //        </div>
    //    </div>
    //    <div class="slider">
    //        <div class="slide"></div>
    //        <div class="slide"></div>
    //        <div class="slide"></div>
    //    </div>
    //</section>

    /* Menu active link */

    $('.menu__item').click(function(){
        $('.menu__item').removeClass("menu__item_active");
        $(this).addClass("menu__item_active");
    });


    /* Mmenu */

    $(".mobile-mnu").after("<div id='my-menu'>");
    $(".menu").clone().appendTo("#my-menu");
    //$("#my-menu").find("*").attr("style", "");
    //$("#my-menu").find(".menu__link_home").html("Home");
    $("#my-menu").find("ul").removeClass("menu");


    $("#my-menu").mmenu({
        "slidingSubmenus": false,
        "extensions": [
            "theme-black",
            "effect-menu-slide",
            "pagedim-black",
            //"border-none",
            "fx-listitems-slide",
            "shadow-panels",
            "position-right"
        ],
        "autoHeight": true,
        navbar: {
            title: 'Menu'
        }
    });


    /* Submenu centered */

    $(".menu .submenu").each(function(){
        var $this = $(this),
          currentWidth = $this.outerWidth(),
          parentWidth = $this.closest('li').outerWidth(),
          leftPos = (parentWidth / 2) - (currentWidth / 2);

        $(this).css('left', leftPos);
    });

    /* Gamburger for menu */

    // https://codepen.io/agragregra/pen/bEbbmZ
    $(".mobile-mnu").click(function() {
        var mmApi = $("#my-menu").data( "mmenu" );
        mmApi.open();
        var thiss = $(this).find(".toggle-mnu");
        thiss.addClass("on");
        return false;
    });
    $(".mm-page__blocker").click(function() {
        $('.toggle-mnu').removeClass("on");
    });




    /* Magnific-popup */

    //$('.popup-with-move-anim').magnificPopup({
    //    type: 'inline',
    //    fixedContentPos: false,
    //    fixedBgPos: true,
    //    overflowY: 'auto',
    //    closeBtnInside: true,
    //    preloader: false,
    //    midClick: true,
    //    removalDelay: 300,
    //    mainClass: 'my-mfp-slide-bottom'
    //});


    /* What form did the application come from (for magnific-popup) */

    //$('a[href="#callback"]').click(function() {      // возьмет из кнопки зачение data-form и вставит в input[type=hidden] value с этим значением, чтобы знать с какой фрмы пришла заявка
    //    $('#callback .formname').val($(this).data('form'));
    //});



    /* FontFaceObserver initialization fonts (в 2 раза быстрее загружается шрифт)*/

    //var helvetica = new FontFaceObserver('HelveticaNeueLTStd-Roman');
    //helvetica.load().then(function() {
    //    document.documentElement.className += " fontFaceObserver";
    //    console.log('fontFaceObserver is available');
    //}, function () {
    //    console.log('fontFaceObserver is not available');
    //});

    var helveticaNeueLTStd = new FontFaceObserver('HelveticaNeueLTStd-Roman');
    var helveticaNeueBold = new FontFaceObserver('HelveticaNeue-Bold');
    var helveticaNeueLTStdBd = new FontFaceObserver('HelveticaNeueLTStd-Bd');
    var helveticaNeueLTStdMd = new FontFaceObserver('HelveticaNeueLTStd-Md');
    var myriadProBlackIt = new FontFaceObserver('MyriadPro-BlackIt');
    var myriadProBlackSmCnIt = new FontFaceObserver('MyriadProBlackSmCnIt');
    var myriadProRegular = new FontFaceObserver('MyriadProRegular');
    var myriadProSemiBold = new FontFaceObserver('MyriadProSemiBold');
    var nevisBold = new FontFaceObserver('NevisBold');


    Promise.all([helveticaNeueLTStd.load(),
        helveticaNeueBold.load(),
        helveticaNeueLTStdBd.load(),
        helveticaNeueLTStdMd.load(),
        myriadProBlackIt.load(),
        myriadProBlackSmCnIt.load(),
        myriadProRegular.load(),
        myriadProSemiBold.load(),
        nevisBold.load()]).then(function () {
        document.documentElement.className += " fontFaceObserver";
        console.log('Fonts have loaded');
    });

    //var primary = new FontFaceObserver('Primary');
    //var secondary = new FontFaceObserver('Secondary');
    //
    //primary.load().then(function () {
    //    console.log('Загружен основной шрифт')
    //
    //    secondary.load().then(function () {
    //        console.log('Загружен второстепенный шрифт')
    //    });
    //});


    /* tabs */

    $('.js-tab').easytabs();

});




















