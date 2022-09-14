var accordion_init = function() {
    var accordion = $(".accordion"),
            items = accordion.children(),
            active_class = "active";
    items.each(function() {
        var container = $(this),
                toggle = $(this).attr("data-toggle"),
                trigger = $(this).find('a'),
                content = $(this).find('div');
        if (toggle == "true") {
            trigger.on("click", function() {
                container.siblings().removeClass(active_class);
                container.addClass(active_class);
            });
        } else {
            trigger.on("click", function() {
                container.toggleClass(active_class);
            });
        }
    });
};
accordion_init();

window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
    
    }
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {

    }
});

$(document).ready(function() {

});

var form = $(".form-wrap").find("form");
window.addEventListener('message', event => {
    if(event.target == form && event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        var field_value = $(".form-wrap").data("value");
        var input = $('input[name="property_internal_value"]');
        input.val(field_value).change();
    }
});

$('.module').on( 'click', 'li', function() {
    var link = $(this).find("a"),
            target = link.attr('data-target');
    $(this).addClass("active").siblings().removeClass("active");
    $(target).addClass("active").siblings().removeClass("active");
});

var equal_height_blocks = function() {
    var equalize = $(".equal-height"),
            max_height = 0;
    if (equalize.length > 0) {
        equalize.each(function() {
            var blocks = $(this).find(".scope__block");
            blocks.each(function() {
                var height = $(this).outerHeight();
                if (height > max_height) {
                    max_height = height;
                }
            });
            blocks.each(function() {
                $(this).css("height", max_height);
            });
        });
    }
};
equal_height_blocks();

var animation_init = function(object) {
    var distance = object.data("distance"),
            duration = object.data("duration"),
            origin = object.data("origin"),
            scale = object.data("scale"),
            opacity = object.data("opacity"),
            delay = object.data("delay");
    ScrollReveal().reveal(object, {
        delay: delay,
        distance: distance,
        duration: duration,
        origin: origin,
        scale: scale,
        opacity: opacity,
        viewFactor : 0,
        mobile: true,
        reset: false,
        useDelay: 'onload',
        afterReveal: function(el) {
            ScrollReveal().clean(object);
        }
    });
};

var staggered_animation_init = function(object) {
    function multiply(a, b) {
        return a * b;
    }
    var block = object.children();
    var distance = object.data("distance"),
            duration = object.data("duration"),
            origin = object.data("origin"),
            scale = object.data("scale"),
            opacity = object.data("opacity"),
            delay = object.data("delay");
    if (delay < 1) {
        delay = 250;
    }
    block.each(function() {
        var index = $(this).index(),
                block_delay = multiply(delay, index);
        ScrollReveal().reveal(object, {
            delay: block_delay,
            distance: distance,
            duration: duration,
            origin: origin,
            scale: scale,
            opacity: opacity,
            mobile: true,
            reset: false,
            viewFactor : 0,
            reset: true,
            useDelay: 'onload',
            afterReveal: function(el) {
                ScrollReveal().clean(object);
            }
        });
    }); 
};

var scope = $(".dnd-module");
if (scope.length > 0 ) {
    $.each(scope, function(i) {
        var scope = $(this),
                objects = scope.find(".animate");
        if (objects.length > 0) {
            $.each(objects, function(i) {
                var object = $(this);
                if (object.is(".stagger-animation")) {
                    staggered_animation_init(object);
                } else {
                    animation_init(object);
                }
            });
        }
    });

}

var modal_init = function() {
    var section = $(".module"),
            button = section.find("a.open");
    button.on("click", function() {
        var target = $(this).data("target");
        $(target).addClass("active");
    });
};

modal_init();

$(document).click(function() {
    var container = $(".module module__modal"),
            open_button = $(".open"),
            close_button = $(".close");
    if (!container.is(event.target) && !container.has(event.target).length && !open_button.is(event.target)) {
        container.removeClass("active");
    }
    if (close_button.is(event.target)) {
        container.removeClass("active");
    }
});

var header = $(".header"),
        mobile_menu = $(".mobile-menu"),
        open = $(".mobile-menu-trigger.mobile-open"),
        close = $(".mobile-menu-trigger.mobile-close");
if ( window.self != window.top ) { $("body").addClass("editor-mode"); }
open.click(function() {
    header.addClass("mobile-menu--active"); 
});
close.click(function() {
    header.removeClass("mobile-menu--active"); 
});
$(document).mouseup(function(e){
    if (header.is(".mobile-menu--active") && !mobile_menu.is(e.target) && mobile_menu.has(e.target).length === 0) { header.removeClass("mobile-menu--active"); }
});
header.mouseover(function() {
    header.addClass("scrolled");
});
header.mouseout(function() {
    if(!header.is(".scrolled")) {
        header.removeClass("scrolled");
    }
});
var handle_scroll = function() {
    if ($(window).scrollTop() > 0 && !header.is(".scrolled")) {
        header.addClass("scrolled");
    } else if ($(window).scrollTop() === 0) {
        header.removeClass("scrolled");
    }
};
handle_scroll();
$(window).on("scroll", function() {
    handle_scroll()
});

if ( window.self !== window.top ) {
    // PAGE EDITOR ACTIVE
}

var infinite_scroll_init = function() {
    var scroll_top = $(window).scrollTop(),
            container = $("#container"),
            scroll_bottom = scroll_top + $(window).height(),
            list_height = container.innerHeight(),
            scroll_height = container.offset().top,
            threshold = 200,
            page_trigger = scroll_height + list_height + threshold,
            triggered = false;
    if (scroll_bottom > page_trigger) {
        // trigger show next
    }
};

$(window).on("scroll", function(){
    infinite_scroll_init(); 
});

var autoplay_tabs_init = function() {
    var wrap = ".module.autoplay";
    var timing = $(wrap).data("timing");
    var items = $(wrap + " ul > li");
    setInterval(function(){
        var cur = $(wrap + " ul > .active").index();
        var nxt = (cur + 1) % items.length;
        items.eq(cur).removeClass("active");
        items.eq(nxt).addClass("active");
    }, timing);
};
autoplay_tabs_init();

var video_pop_init = function(video) {
    if (video.is(".video--iframe")) {
        video.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    } else if (video.is(".video--inline")) {
        video.magnificPopup({
            disableOn: 700,
            type: 'inline',
            src: '#video-popup',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    } else if (video.is(".block__video")) {
        video.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    } else if (video.is(".block__video--wistia")) {
        video.magnificPopup({
            type: 'iframe',
            disableOn: 700,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
            iframe: {
                patterns: {
                    wistia: {
                        index: 'wistia.com',
                        id: function(url) {        
                            var m = url.match(/^.+wistia.com\/(medias)\/([^_]+)[^#]*(#medias=([^_&]+))?/);
                            if (m !== null) {
                                if(m[4] !== undefined) {
                                    return m[4];
                                }
                                return m[2];
                            }
                            return null;
                        },
                        src: '//fast.wistia.net/embed/iframe/%id%?autoPlay=1&muted=0&volume=1' // https://wistia.com/doc/embed-options#options_list
                    }
                }
            }
        });
    }
};
var videos =  $(".popup-video");
if (videos.length > 0) {
    $.each(videos, function(i) {
        video_pop_init($(this));
    });
}

$.getScript("https://cdn.jsdelivr.net/npm/countup@1.8.2/dist/countUp.min.js", function() {
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    $(".counter").each(function() {
        var el= $(this),
                val = el.data("stat"),
                id = el.attr("id"),
                decimals = (val % 1 != 0) ? 2 : 0,
                counter = new CountUp(id, 0, val, decimals, 2.5);
        $(window).scroll(function() {
            if (el.isInViewport() && !counter.error && !el.is(".counted")) {
                counter.start();
                el.addClass("counted");
            }
        });
    });
});

get_IP = function() {
    var IP = $(".custom-calculator").data("ip");
    $.get("https://ipinfo.io", function(response) {
        $("input[name*='country']").val(response.country).change();
        $("input[name*='state']").val(response.region).change();
    }, "jsonp");
};

get_IP();
