
window.addEventListener('DOMContentLoaded', function() {

    //mobiMenu({
    //    btn:'.navbar-toggle',
    //    navbar:'.navbar-collapse',
    //    nav:'.page-scroll',
    //    classTransition:'collapsing',
    //    classDefault:'collapse',
    //    classActive: 'in',
    //    attr: 'aria-expanded'
    //
    //});
    //
    //scrollPage({
    //    elem: '#mainNav',
    //    activeClass: 'active',
    //    linkClass: '.page-scroll',
    //    offset: 600
    //});
    //
    //
    //window.addEventListener('scroll', function () {
    //    navTopFixed({
    //        elem: '#mainNav',
    //        classAdd: 'affix',
    //        classRemove: 'affix-top',
    //        activeClass: 'active',
    //        linkClass: '.page-scroll',
    //        offset: 600
    //    });
    //});
    //
    //runGame({
    //    section: '#playDemo',
    //    attr: 'data-time-run',
    //    overlay: '.play-demo__overlay',
    //    dataAttr: 'data-evet',
    //    dataEvent: 'close',
    //    btn: '.play-demo-screen__btn',
    //    demoScreen:'.play-demo-screen',
    //    dataIframeSrc: 'data-iframe-src'
    //});
    //
    //anchorPlayDemo({
    //    className: '.anchor-box',
    //    attr: 'data-event',
    //    attrValue: 'scroll'
    //});
    //
    //popapDemo ({
    //    main: '.main',
    //    dataAttr: 'data-click',
    //    dataValue: 'open',
    //    parent: '.game-item',
    //    link: '.game-hover__link',
    //    src: 'data-src',
    //    additionally:{
    //        section: '.game-description-hide',
    //        title: 'h3',
    //        text: 'p'
    //    },
    //    title: 'data-title',
    //    text: 'data-text',
    //    popap: '.game-item-popap',
    //    time: 'data-time',
    //    demo: '.game-item-overlay-demo',
    //    dataIframe: 'data-iframe'
    //});
    //
    //filter ({
    //    section: '.filters',
    //    Search: {
    //        field: '.filters-summary__search',
    //        SearchClass: '.game-name',
    //        parent: '.filters-inner'
    //    }
    //})

    scrollToAnchor({
        section: '.nav',
        anchorType: 'A',
        anchorAttr: 'href',
        activClass:'active'
    });

});


function scrollToAnchor(setings) {

    block = document.querySelector(setings.section);
    //console.log(block);
    if (!block) return;

    block.addEventListener('click', scrolEventAnchor);


    function scrolEventAnchor (e) {

        var target =  e && e.target || e.srcElement;

        scrolEvent(e);


        function scrolEvent(e) {


            var target =  e && e.target || e.srcElement;

            if(target.tagName != 'A' && target.getAttribute('href') == null) return;

            if(document.querySelector(target.getAttribute('href'))) e.preventDefault();

            console.log(document.querySelector(target.getAttribute('href')));
            var anchorElement =  elementYPos(target.getAttribute('href')), // stopY
                topScroll = curentYPos (), //startY
              distance = anchorElement > topScroll ? anchorElement - topScroll : topScroll - anchorElement;

            if (distance < 100) {
                scrollTo (0, topScroll);
                return;ы
            }

            var speed = Math.round(distance/100);

            if (speed >= 20) speed = 20;

            var step = Math.round(distance / 35),
              leapY = anchorElement > topScroll ? topScroll + step : topScroll - step,
              timer = 0;

            if (anchorElement > topScroll) {
                for (var i = topScroll; i < anchorElement; i+=step) {
                    setTimeout('window.scrollTo(0, '+ leapY +')',  timer * speed);
                    leapY += step;
                    if (leapY > anchorElement) leapY = anchorElement;
                    timer++;
                }
                return
            }
            for (var i = topScroll; i > anchorElement; i-=step) {
                setTimeout('window.scrollTo(0, '+ leapY +')',  timer * speed);
                leapY -= step;
                if (leapY < anchorElement) leapY = anchorElement;
                timer++;
            }
        }

        //var targetparent = target.parentElement,
        //  li = block.querySelectorAll('li');
        //
        //for (var t = 0; t < li.length; t++) {
        //    li[t].removeAttribute('class');
        //}

        //targetparent.setAttribute('class',  setings.activClass )
    }
}



function curentYPos () {
    if (self.pageYOffset) return  self.pageYOffset;

    if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;

    if (document) return document.body.scrollTop;

    return 0;
}

function elementYPos (elem) {

    var element = document.querySelector(elem),
      positionY = element.offsetTop,
      node = element;

    //while (node.offsetParent && node.offsetParent != document.body) {
    //
    //    positionY +=node.offsetParent;
    //
    //}
    return positionY
}

// (function () {
//
//     var char = 'Xflklkjg';
//     var int = char.charCodeAt(char);
//     console.log(int);
//
//
//     // console.log(parseFloat(b));
// })()

//function preloader(parent) {
//    var popap = parent.querySelector('.popap-iframe'),
//        iframe = popap.querySelector('iframe');
//
//    iframe.addEventListener('load', schow);
//
//    function schow() {
//        popap.classList.add('active');
//        iframe.removeEventListener('load', schow)
//    }
//}
//
//function popapDemo (setings) {
//    var main = document.querySelector(setings.main);
//
//    if (!main) return;
//
//    main.addEventListener('click', popapDemoEvent);
//
//    function popapDemoEvent(e) {
//        var target =  e && e.target || e.srcElement,
//            targetAttr = target.getAttribute(setings.dataAttr),
//            targetAttr2 = target.getAttribute('data-evet'),
//            popap;
//
//        if (target.tagName == 'A' && targetAttr == setings.dataValue) {
//            e.preventDefault();
//            var targetSrc = target.getAttribute(setings.src),
//                patern,
//                gameItem = document.querySelectorAll(setings.parent),
//                targetTime = +target.getAttribute(setings.time),
//                parent;
//            for (var i = 0; i < gameItem.length; i++) {
//                var link = gameItem[i].querySelector(setings.link);
//
//
//                if(link == target) {
//                    parent = gameItem[i];
//                }
//            }
//            var additionally = parent.querySelector(setings.additionally.section);
//
//
//            if (additionally) {
//                var additionallyChildren = additionally.children,
//                    additionallyBlock = setings.additionally,
//                    title = additionally.querySelector(additionallyBlock.title).cloneNode(true),
//                    text = additionally.querySelectorAll(additionallyBlock.text),
//                    firstText = [], lastText = [], result = {};
//
//                for(var q = 0; q < text.length; q++) {
//                    var clone = text[q].cloneNode(true);
//                    if (q === 0) {
//                        firstText.push(clone);
//                    }
//                    else {
//                        lastText.push(clone);
//                    }
//                }
//                result = {
//                    title: title,
//                    firstText: firstText,
//                    lastText: lastText,
//                    src: targetSrc
//                };
//                patern = paternIframe2(result);
//            } else {
//                patern = paternIframe(targetSrc)
//            }
//
//            popap = parent.querySelector(setings.popap);
//
//            popap.innerHTML = patern;
//
//            var iframeOverlay = parent.querySelector('.game-item-overlay');
//            console.log(iframeOverlay);
//            iframeOverlay.classList.add('active');
//
//            preloader(iframeOverlay);
//
//            // document.body.style.cssText +='overflow: hidden;';
//
//            // runGameStart(parent.querySelector(setings.demo),targetTime);
//        };
//
//        if (targetAttr2 == 'close') {
//
//            if( target.tagName == 'DIV') {
//                hidePopup(target)
//            } else {
//                var pat = target.parentElement.parentElement;
//                hidePopup(pat)
//            }
//
//            function hidePopup(elem) {
//                elem.classList.add('close');
//                elem.classList.remove('active');
//
//                elem.addEventListener('animationend', clos);
//                function clos() {
//                    elem.classList.remove('close');
//                    elem.removeEventListener('animationend', clos);
//                    if (elem.getAttribute(setings.dataIframe)) {
//
//                        elem.querySelector(setings.popap).innerHTML= '';
//                    }
//                }
//                // clearTimeout(window.set);
//            }
//        }
//    }
//}
//
//function paternIframe(src) {
//    return  '<span class="popap-close" data-evet="close"></span><div class="popap-row"><a href="https://goldencavecasino.com/en/e-lobby/slot-aristocrat/" class="btn btn-outline btn-xl btn-xl_bg1" target="_blank">Play REAL GAME</a></div>'+
//            '<div class="popap-iframe">' +
//                '<div class="preloader">' +
//                    '<div class="loader"></div>' +
//                '</div>' +
//                '<iframe class="popap-iframe-item" src="'+ src +'"> </iframe>' +
//                '</div>'+
//            '<div class="popap-row"><a href="https://goldencavecasino.com/en/register/" class="btn btn-outline btn-xl btn-xl_bg2" target="_blank">Register to play real games!</a></div>'
//}
//
//function paternIframe2(arr) {
//    var first = paternText(arr.firstText),
//        last = paternText(arr.lastText);
//    return  '<span class="popap-close" data-evet="close"></span>' +
//            '<div class="popap-head">' +
//                '<h3>'+ arr.title.innerHTML +'</h3>' +
//                    first +
//            '</div>'+
//            '<div class="popap-row">' +
//                '<a href="https://goldencavecasino.com/en/e-lobby/slot-aristocrat/" class="btn btn-outline btn-xl btn-xl_bg1" target="_blank">Play REAL GAME</a>' +
//            '</div>'+
//            '<div class="popap-iframe">' +
//                '<div class="preloader"><div class="loader"></div></div>' +
//                '<iframe class="popap-iframe-item" src="'+ arr.src +'"> </iframe>' +
//            '</div>'+
//            '<div class="popap-row">' +
//                '<a href="https://goldencavecasino.com/en/register/" class="btn btn-outline btn-xl btn-xl_bg2" target="_blank">Register to play real games!</a>' +
//            '</div>' +
//            '<div class="popap-footer">' +
//                last +
//            '</div>'
//}
//
//function paternText(text) {
//    var result = ' ';
//
//    for(var i = 0 ; i < text.length; i++) {
//        result += '<p>'+text[i].innerHTML + '</p>'
//    }
//
//    return result
//}
//
//function anchorPlayDemo(setings) {
//    var box = document.querySelector(setings.className);
//
//    if (!box) return;
//
//    box.addEventListener('click', scrolEvent)
//}
//
//
//
//function navTopFixed (setings) {
//    var nav = document.querySelector(setings.elem);
//
//        if (!nav) return;
//
//    var navHeight = nav.clientHeight,
//        topScroll = curentYPos();
//
//    if (topScroll > navHeight) {
//        nav.classList.remove(setings.classRemove);
//        nav.classList.add(setings.classAdd);
//    } else {
//        nav.classList.add(setings.classRemove);
//        nav.classList.remove(setings.classAdd);
//    }
//
//
//}
//
//function scrollPage(setings) {
//    var nav = document.querySelector(setings.elem);
//
//    if(!nav) return;
//
//    var link = nav.querySelectorAll(setings.linkClass),
//        activeLink = null,
//        topWheel = 0;
//        HTML = document.documentElement;
//
//    window.addEventListener('scroll',scrollPageEvent);
//
//
//    if (HTML.addEventListener) {
//        if ('onwheel' in document) {
//            // IE9+, FF17+, Ch31+
//            HTML.addEventListener("wheel", onWheel);
//        } else if ('onmousewheel' in document) {
//            // устаревший вариант события
//            HTML.addEventListener("mousewheel", onWheel);
//        } else {
//            // Firefox < 17
//            HTML.addEventListener("MozMousePixelScroll", onWheel);
//        }
//    } else { // IE8-
//        HTML.attachEvent("onmousewheel", onWheel);
//    }
//
//    function onWheel(e) {
//        e = e || window.event;
//
//        var delta = e.deltaY,
//            topScrollWheel = curentYPos();
//
//        topWheel = delta;
//
//        if (delta < 0) {
//
//            var activCls = nav.querySelector('.'+ setings.activeClass);
//            if (activCls) {
//                var activlinkAttr = activCls.querySelector(setings.linkClass).getAttribute('href'),
//                    elementOffsetTop = elementYPos(activlinkAttr);
//
//                if (topScrollWheel < elementOffsetTop) {
//                    var prevElementSibling = activCls.previousElementSibling;
//
//                    if (prevElementSibling === null) return;
//
//                    activCls.removeAttribute('class');
//                    prevElementSibling.setAttribute('class', setings.activeClass);
//
//                }
//            }
//        }
//    }
//
//
//    function scrollPageEvent() {
//
//        var topScroll = curentYPos();
//        for (var i = 0; i < link.length; i++){
//
//            if(link[i].getAttribute('href').indexOf('#') === -1) continue;
//            var linkAttr = link[i].getAttribute('href'),
//                linkparent= link[i].parentElement,
//                elemOffsetTop = elementYPos(linkAttr),
//                topScrollOffset = topScroll + setings.offset;
//
//            if (topScroll < elemOffsetTop && topScrollOffset > elemOffsetTop) {
//                activeLink = linkparent;
//            }
//        }
//
//        if (activeLink !== null && topWheel > 0) {
//            for (var w = 0; w < link.length; w++){
//                var  lp= link[w].parentElement;
//                lp.classList.remove(setings.activeClass);
//
//                if (topScroll < elemOffsetTop && topScrollOffset > elemOffsetTop) {
//                    activeLink = linkparent;
//                }
//            }
//
//            activeLink.classList.add(setings.activeClass);
//        }
//
//        if (topScroll < (setings.offset / 3)) {
//            for (var q = 0; q < link.length; q++) {
//                var parentLink = link[q].parentElement;
//                parentLink.classList.remove(setings.activeClass);
//            }
//        }
//    }
//}
//
//function mobiMenu(setings) {
//    var btn = document.querySelector(setings.btn),
//        navBar = document.querySelector(setings.navbar);
//
//    if (!btn) return;
//
//    btn.setAttribute(setings.attr, 'false');
//
//    btn.addEventListener('click', mobiMenuEvent);
//
//    function mobiMenuEvent (e) {
//        var target = e && e.target || e.srcElement;
//
//        if (target.tagName != 'BUTTON' && target.getAttribute('type') != 'button') return;
//
//        var targetAttr =  target.getAttribute(setings.attr);
//
//        if (targetAttr == 'false') {
//            navBar.classList.remove(setings.classDefault);
//            navBar.classList.add(setings.classTransition);
//            var navOpen = navBar.querySelectorAll(setings.nav),
//                navHeight = navOpen[0].clientHeight * navOpen.length,
//                paddBottom = parseInt(getComputedStyle(navOpen[0]).paddingBottom);
//            navBar.style.cssText += 'height: '+ (navHeight + paddBottom) +'px;';
//            btn.setAttribute(setings.attr, 'true');
//        } else {
//            navBar.style.cssText += 'height: 0;';
//            navBar.addEventListener("transitionend", transitionNav)
//        }
//
//        function transitionNav() {
//            navBar.classList.add(setings.classDefault);
//            navBar.classList.remove(setings.classTransition);
//            btn.setAttribute(setings.attr, 'false');
//            navBar.removeEventListener("transitionend", transitionNav)
//        }
//    }
//}
//
//function runGameStart(item,numd) {
//
//    var date = new Date(),
//        detailedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numd, date.getSeconds());
//
//// console.log('start', date);
//
//    var dateValue = date ? date.valueOf(): NaN,
//        detailedDateValue = detailedDate ? detailedDate.valueOf(): NaN,
//        numb = detailedDateValue - dateValue;
//
//    set = setTimeout(timeoutRun, numb);
//
//    function timeoutRun() {
//        // var date = new Date();
//        // console.log('end', date);
//        item.classList.add('active')
//    }
//}
//
//function runGame(setings) {
//    var section = document.querySelector(setings.section);
//
//    if(!section) return;
//
//
//    var sectionAttr= +section.getAttribute(setings.attr),
//        overlay = section.querySelector(setings.overlay),
//        btn = section.querySelector(setings.demoScreen);
//
//    btn.addEventListener('click', playGame);
//
//    overlay.addEventListener('click', runGameClick);
//
//    function playGame(e) {
//        e.preventDefault();
//        var iframeBox = section.querySelector('.play-demo-iframe'),
//            iframeSrc = section.getAttribute(setings.dataIframeSrc),
//            patern = paternIframe(iframeSrc);
//
//
//
//        iframeBox.insertAdjacentHTML('beforeEnd', patern);
//
//        section.querySelector(setings.demoScreen).style.cssText +="display:none;";
//
//        preloader(section);
//
//        runGameStart(overlay, sectionAttr);
//    }
//
//
//
//    function runGameClick(e) {
//        var target = e && e.target || e.srcElement,
//            targetAttr = target.getAttribute(setings.dataAttr);
//
//        if (targetAttr !== setings.dataEvent) return;
//
//        overlay.classList.add('close');
//        overlay.classList.remove('active');
//
//        overlay.addEventListener('animationend', anim);
//
//        function anim() {
//            overlay.classList.remove('close');
//            overlay.removeEventListener('animationend', anim);
//        }
//
//    }
//}