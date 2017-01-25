
var Bissell = Bissell || {};

var Bissell = {

    setting: {
        firstName: "FirstName",
        slider: false
    },

    init: function () {
        s = this.setting;
        this.homeCarousel();
        this.tab();
        // this.featuredProducts();
        this.ReplaceMobileTitle();
        this.scrollHref();


    },

    isElement: function (ele) {
        if (ele.length > 0) {
            return true;
        }
        return false;
    },
    isMobile: function () {
        return matchMedia('only screen and (max-width: 767px)').matches;
    },
    isDesktop: function () {
        return matchMedia('only screen and (min-width: 768px)').matches;
    },

    slider: function () {
        $('.overview-product-slide').flexslider({
            animation: "slide",
            //controlNav: false,
            startAt: 0,
            animationLoop: true,
            slideshow: true,
            animationSpeed: 700,

            pauseOnHover: true,
            itemMargin: 0,
            prevText: "",
            nextText: "",
            start: function () {
                if (!Bissell.setting.slider) {
                    Bissell.maxProductBottom();
                    Bissell.setting.slider = true;
                }
                if (Bissell.isDesktop()) {
                    Bissell.sliderAutoHeight($("overview-product-slide li"));
                }
            }
        });
    },


    homeCarousel: function () {
        if ($('.home').length) {
            $('.hslider').flexslider({
                animation: "fade",
                controlNav: true,
                startAt: 0,
                animationLoop: true,
                slideshow: true,
                animationSpeed: 700,
                // pauseOnHover: true,
                itemMargin: 0,
                start: function () {
                    Bissell.maxProductBottom();
                    if (Bissell.isDesktop()) {
                        Bissell.sliderAutoHeight($("overview-product-slide li"));
                    }
                }
            });

        };

        // Slider onclick stop and pause on hover.
        var onclickSlider = false;
        $('.flex-control-nav a').on('click', function () {
            $('.hslider').flexslider('pause');
            onclickSlider = true;
        });

        $('.hslider').mouseover(function (event) {
            $('.hslider').flexslider('pause');
        });

        $('.hslider').mouseleave(function (event) {
            if (!onclickSlider) {
                $('.hslider').flexslider('play');
            }
        });


        $(window).load(function () {
            if (Bissell.isMobile()) {
                $('.product-slider').flexslider({
                    animation: "slide",
                    controlNav: true,
                    directionNav: false,
                    prevText: "",
                    nextText: ""
                });
            };
            if (Bissell.isDesktop()) {
                Bissell.sliderAutoHeight($(".featured-products-slider li"));
            }
            if ($('.parts').length) {
                $('.product-slider .slides li').each(function () {
                    $(this).width(188)
                })
            }
        })
    },

    tab: function () {
        var isTab = $('.tabs');
        var TabContent = $(".tab_content");


        if (isTab) {

            TabContent.hide();
            var defaultTab = window.location.search.split('tab='); //window.location.hash.split('#');

            var tab = defaultTab[1];

            if (tab) {
                // For Product Comparison
                var comp = getQueryVariable("tab");
                var sliderActive = false;
                //var lowerTab = comp.toLowerCase();

                activeTab(comp);

                if (comp == "compare") {

                    isCompareTab();
                } else {
                    isOverview();
                }

                if (comp == 'closer') {
                    Bissell.closerTab();
                }

                if ($('#' + comp + '').find('main-carousel')) {
                    Bissell.buildCarousel();
                };

                /* How to video canada */
                if ($("ul.tabs li[rel='" + comp + "']").length > 0) {
                    $("ul.tabs li[rel='" + comp + "']").addClass('active');
                }

            } else {
                $('.tabs li a:first').addClass('active');
                $('.tab-container .tab_content:first').show();
                var tabName = $('.tab-container .tab_content:first').attr('id');
                if (tabName == 'overview') {
                    isOverview();
                };
                if ($('#' + tabName + '').find('main-carousel')) {
                    Bissell.buildCarousel();
                };
            };
            $("ul.tabs li a[rel]").click(function (e) {
                e.preventDefault();
                var tabRel = $(this).attr("rel");
                if (tabRel == "parts-supplies") {
                    return;
                }

                if (Bissell.isDesktop()) {
                    $('article.product-page-PI').css('min-height', '');
                    $('.aside-product').show();
                    $(this).addClass("active");
                    TabContent.hide();
                } else {
                    TabContent.hide();
                }
                activeTab(tabRel);

                if (tabRel == 'overview') {
                    isOverview();
                    if (!sliderActive) {
                        sliderActive = true;
                        LoadPIPDPYMALs();
                    }

                };

                if (tabRel == 'closer') {
                    Bissell.closerTab();
                }

                if (tabRel == 'compare') {
                    isCompareTab();
                }
                if ($('#' + tabRel + '').find('main-carousel')) {
                    Bissell.buildCarousel();
                };
            });
        };


        function isCompareTab() {
            compareSlider();
            mobileEvent();
            //$('.aside-product').hide();
            //$('#compare').addClass("full-width");
            //$('.full-width').css('min-height', '');
        }

        function isOverview() {
            if (isLoadYMALs) {

                var recommendationSource = $("#hiddenFieldRecommendationSource").val();

                if (recommendationSource != "" && recommendationSource == "Custom")
                    LoadYMALs();
            }
        }

        function activeTab(getTab) {
            getTab = getTab.toLowerCase();
            if (Bissell.isDesktop()) {
                $("ul.tabs li a").removeClass("active");
                $("#" + getTab).fadeIn();
                $('li a[rel="' + getTab + '"]').addClass('active');
            } else {
                $("ul.tabs li a").removeClass("active");
                $("#" + getTab).slideToggle();
                $('li a[rel="' + getTab + '"]').addClass('active');
            }

        }
    },

    closerTab: function () {
        initYoutubeLinks();

        function initSlider() {
            $('.closerTabVideoBoxWrap').each(function () {
                $this = $(this);
                if ($this.find('.video-slider ul li').length > 1) {
                    if ($this.hasClass('open')) {
                        if (!$this.find('.video-slider').hasClass('init')) {
                            $this.find('.video-slider').addClass('flexslider init');
                            $this.find('.video-slider').flexslider({
                                animation: "slide",
                                itemMargin: 20,
                                prevText: "",
                                nextText: "",
                                pauseOnHover: true,
                                slideshow: false
                            });
                        }
                    }
                }
            })
        }

        initSlider();
        $('.video-fancybox').fancybox();
        $('.closerTabVideoBox').hide();
        $('.closerTabVideoBoxWrap').each(function () {
            if ($(this).hasClass('open')) {
                $(this).find('.closerTabVideoBox').show();
            }
        })


        var imgSrc = $('.closerTabVideoBoxWrap button img');
        var arrowRight = imgSrc.data('src');
        var arrowDown = imgSrc.attr('src');

        $('.closerTabVideoBoxWrap .collapseTitle').each(function () {

            $(this).click(function (e) {
                $this = $(this);
                e.preventDefault();
                var container = $this.parents('.closerTabVideoBoxWrap').find('.closerTabVideoBox');
                var topWrap = $this.parents('.closerTabVideoBoxWrap');
                var isOpen = topWrap.hasClass('open');
                if (isOpen) {
                    $this.find('img').attr('src', arrowRight);
                    topWrap.removeClass('open');
                    container.hide();

                } else {
                    $this.find('img').attr('src', arrowDown);
                    topWrap.addClass('open');
                    container.show();
                    initSlider();
                }

            });
        });
    },

    buildCarousel: function () {
        if ((($('.slides li').length) * ($('.slides li').outerWidth())) > ($('.gallery').outerWidth())) {
            $('.gallery').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: false,
                move: 3,
                startAt: 0,
                itemWidth: 64,
                itemMargin: 12,
                asNavFor: '.fullsize-gallery',
                prevText: "",
                nextText: ""
            });
        } else {
            $('.gallery').addClass('no-scroll');
        };
        $('.fullsize-gallery').flexslider({
            animation: "slide",
            controlNav: false,
            startAt: 0,
            animationLoop: true,
            slideshow: false,
            itemWidth: 250,
            itemMargin: 0,
            sync: ".gallery",
            prevText: "",
            nextText: ""
        });


    },



    maxProductBottom: function () {
        if (Bissell.isDesktop()) {
            var max = Math.max.apply(Math, $(".product-bottom-box .box").map(function () {
                return $(this).height();
            }));
            $(".product-bottom-box .box").height(max + 25);
        }
    },

    sliderAutoHeight: function (liContainer) {
        var max = Math.max.apply(Math, liContainer.map(function () {
            return $(this).height();
        }));
        liContainer.height(max);
    },

    equalSidebarHeight: function () {

        var rightSection = $('.main-container > article');

        if ($('.article-rt-wrap').length) {
            rightChildCount = $('.article-rt-wrap > *').length;
            if (rightChildCount == 1) {
                rightSection = $('.main-container > .article-rt-wrap > article')
            } else {
                rightSection = $('.main-container > .article-rt-wrap');
            }
        }


        var tHeight = Math.max($('.main-container > aside').outerHeight(), rightSection.outerHeight());

        if (Bissell.isDesktop()) {

            $('.main-container > aside').css("min-height", tHeight);
            rightSection.css("min-height", tHeight);
        }
    },

    featuredProducts: function () {
        $(window).load(function () {
            if (Bissell.isMobile()) {
                $('.featured-products-slider-').flexslider({
                    animation: "slide",
                    controlNav: false,
                    startAt: 0,
                    animationLoop: true,
                    slideshow: false,
                    itemWidth: 200,
                    itemMargin: 0
                });
            }
        });
    },

    ReplaceMobileTitle: function () {
        if (Bissell.isMobile()) {
            var tt = $('.mobileTitle').attr('data-mobile');
            $('.mobileTitle').html(tt);
        }
    },

    scrollHref: function () {

        if ($("#myTable").length) {
            $("#myTable").tablesorter();
        }
    }
};

var homePageModal = {
    init: function () {


        homePageModal.validation();
        $('.promoClose,.overlayerMobal').click(function (e) {
            e.preventDefault();
            homePageModal.hide();
        });

        $('.textbox').keyup(function (e) {
            if (e.keyCode == 13) {
                $(".newsLetterModalWraper .signUpButton").click();
            }
        });
    },
    hide: function () {
        $('.newsLetterModalWraper').removeClass('show');
    },
    thankyou: function () {
        $('.newsLetterModalWraper').addClass('thankYou');
        setTimeout(function () {
            homePageModal.hide();
        }, 3000);
    },
    loading: function () {
        $('.signUpButton').hide();
        $('.loader').show();
    },
    error: function () {
        $('.newsLetterModalWraper .error').show();
        homePageModal.signIn();

    },
    errorHide: function () {
        $('.newsLetterModalWraper .error').hide();
    },
    signIn: function () {
        $('.signUpButton').show();
        $('.loader').hide();
    },
    validation: function () {
        function ValidateEmail(email) {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return expr.test(email);
        };
        $(".newsLetterModalWraper .signUpButton").click(function (e) {
            homePageModal.errorHide();
            homePageModal.loading();
            e.preventDefault();
            if (!ValidateEmail($(".newsLetterModalWraper .textbox").val())) {
                homePageModal.error();
                return false;
            }
            else {
                manageNewsletterModal($(".newsLetterModalWraper .textbox").val());
            }
        })
    }
}

$(document).ready(function () {
    if ($('.shopping-cart span').text() == 0) {
        $('.cart').removeClass('eempty');
        $('.cart').addClass('empty');
    }
    else {
        $('.cart').removeClass('empty');
        $('.cart').addClass('eempty');
    }
});


$(function () {

    flexImage();
    flexItemCheck();
    headerFunctions();
    nestedMenus();
    accordianToggle();
    createModals();
    launchYMAN();
    launchModal();
    seachModal();
    addFancybox();
    partsToggle();
    openClose();
    hideFeatures();
    hideVideoFeatures();
    hideFinders();
    setAddress();
    scrolToItems();
    moveBazaarVoice();
    popup();
    toolTips();
    flexRightColumn();
    partsSupply();
    priceMobilePlaceholder();
    Bissell.init();
    tabsJump();
    NewsPage();
    tableWidth();
    petPage();
    scrollThis();
    rewardFaq();
    joinpage();
    howToVideo();
    editPassword();
    datePicker();
    homePageModal.init();
    IsAutoSearchEnabled();
    textSubString();
    newsLetterBox();
    msds();
    searchPageURL();
});

function newsLetterBox() {
    $('.newsLetterModalWraper').addClass('show');
    jQuery.fn.center = function () {
        this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
        this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));

        var userAgents = window.navigator.userAgent.toLowerCase(),
       iPad = /ipad/.test(userAgents);

        if (iPad) {
            if (Math.abs(window.orientation) === 0) {
                this.css("left", 254);
            } else {
                this.css("left", 268);
            }
        }
        // alert("WinW: "+$(window).width() + 
        //     " WinH: "+$(window).height() + 
        //     " BoxH: "+this.outerHeight() + 
        //     " BoxW: "+ this.outerWidth() + 
        //     " TotalH: " + (($(window).height() / 2) - (this.outerHeight() / 2)) + 
        //     " TotalW: " + (($(window).width() / 2) - (this.outerWidth() / 2)) ); 

    }
    $('.newsletterModal').center();

};


function textSubString() {



    // Configure/customize these variables.
    var showChar = 160;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more";
    var lesstext = "Show less";


    $('.substring').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

}


/* Global Functions */

/* Main Nav */

var cartopen = false;
var timeout;
var shoppingCartClick = false;
var isLoadYMALs;
var checkPopup = false;

var isSlider = $('.enableSlider');


function navHover() {
    var $menu = $(".dropdown-menu");
    $menu.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu
    });

    function activateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("." + submenuId);
        $submenu.addClass('open');
        $row.find(" > a").addClass("active");
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("." + submenuId);
        $submenu.removeClass('open');
        $row.find(" > a").removeClass("active");
    }
    $('.main-nav').mouseleave(function () {
        $('.main-nav ul').removeClass('open');
        $('.main-nav a').removeClass('active');
        $('.main-nav .sub-content').removeClass('open');
    });
};

$('.main-nav').mouseenter(function () {
    if (Bissell.isDesktop()) {
        navHover();
    };
});

/* Ends Main Nav */

/* Loading Overlay */
function loading($class, $message) {
    $('<div class="loading">' + $message + '</div>').appendTo('.' + $class + '');
}

function killLoader($class) {
    $('.' + $class + ' .loading').remove();
}

/* Ends Loading Overlay */

/* For clearing text from form field */
/* For clearing text from form field from defaultValue, pattern was giving validation error "Please match the requested format." */
function clearMeDefault(formfield, color) {
    if (formfield.value == formfield.defaultValue) {
        formfield.value = "";
        $(formfield).css('color', '' + color + '');
    }
}

/* Old input still use clearMe function */
function clearMe(formfield) {
    if (formfield.value == formfield.defaultValue) {
        formfield.value = "";
    }
}

/* For returning default value to form field */
function returnMe(formfield, color) {
    if (formfield.value == "") {
        formfield.value = formfield.defaultValue;
        $(formfield).css('color', '' + color + '');
    }
}

function validateEmail(email) {
    // http://stackoverflow.com/a/46181/11236
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Sifter Ticket:  https://hi.sifterapp.com/issues/12818
$(".submitEmailSubscriptionFooter,.submitEmailSubscriptionHeader").click(function (e) {
    e.preventDefault();
    if ($(this).siblings("input[type='email']").val() !== $(this).siblings("input[type='email']").prop("defaultValue")) {
        var isValid = false;
        // No Match
        if (!validateEmail($(this).siblings("input[type='email']").val())) {
            isValid = false;
        }
        else {
            // Match found           
            isValid = true;
        }
        if (isValid)
            window.location.href = $(this).attr('rel') + $(this).siblings("input[type='email']").val();
    }

});

function EmailSubscriptionClick(id) {
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if (id == "submitEmailSubscriptionFooter") {
                $('.submitEmailSubscriptionFooter').click();
                return false;
            }
            else {
                $('.submitEmailSubscriptionHeader').click();
                return false;
            }
        }
    });
}

$("input[value='Sign Up']").click(function (e) {
    e.preventDefault();
    if ($(this).siblings("input[type='email']").val() !== $(this).siblings("input[type='email']").prop("defaultValue")) {
        var isValid = false;
        // No Match
        if (!validateEmail($(this).siblings("input[type='email']").val())) {
            isValid = false;
        }
        else {
            // Match found           
            isValid = true;
        }
        if (isValid)
            window.location.href = $(this).attr('rel') + $(this).siblings("input[type='email']").val();
    }

});

function flexImage() {
    if ($('.content-header').find('.image-container')) {
        totalHeight = 0;
        $.each($('.content-header .image-container'), function () {
            totalHeight += $(this).outerHeight();
        });
        $('.content-header').css('min-height', totalHeight);
    };
};

function flexItemCheck() {
    var $flexItem = $('article .content-header .flex-item');
    if ($($flexItem).has('img').length > 0) {
        $($flexItem).parent('.content-header').addClass('withFlex clearfix');
    };

}

function flexRightColumn() {
    var $flexItem = $('article.page-optional-right aside');
    if ($($flexItem).children().length) {
        var $flexArticle = $('article.page-optional-right');
        $flexArticle.removeClass('single-column');
        $flexArticle.addClass('aside');
    };
}



function moveBazaarVoice() {
    if ($('#BVRRSummaryContainer') && Bissell.isMobile()) {
        $('#BVRRSummaryContainer').appendTo('.bazzarvoice-container');
    };
}

/* Ends Global Functions */
//var rightSection = $('.main-container > article');
//$(window).load(function () {
//    Bissell.equalSidebarHeight();
//});
//
//$(window).resize(function () {
//    if (Bissell.isMobile()) {
//        $('.main-container > aside').css("min-height", "");
//        rightSection.css("min-height", ""); 
//    }
//});
//
//$(window).load(function () {
//
//    var tHeight = Math.max($('article.aside section').outerHeight(), $('article.aside aside').outerHeight());;
//
//    if (!$(".product-page-PI").length) {
//        if (Bissell.isDesktop()) {
//
//            $('article.aside section').css("min-height", tHeight);
//            $('article.aside aside').css("min-height", (tHeight - 30));
//        }
//    }
//});
//
//$(window).load(function () {
//
//    var tHeight = Math.max($('.full-width.aside article').outerHeight(), $('.full-width.aside aside').outerHeight());;
//
//    if (!$(".product-page-PI").length) {
//        if (Bissell.isDesktop()) {
//
//            $('.full-width.aside article').css("min-height", tHeight);
//            $('.full-width.aside aside').css("min-height", (tHeight - $('article .prod-detail-header .additional-info').outerHeight()));
//        }
//    }
//});

//$(window).load(function () {
//
//    var tHeight = Math.max($('.full-width.aside.search article').outerHeight(), $('.full-width.aside.search aside').outerHeight());;
//
//    if (Bissell.isDesktop()) {
//        $('.full-width.aside.search article').css("min-height", tHeight);
//        $('.full-width.aside.search aside').css("min-height", tHeight);
//    }
//});
/* Ends Matching Heights */

/* Header Functions */
function headerFunctions() {
    if (Bissell.isDesktop()) {
        navHover();
    };

    var mobileNavInitialized = false;
    function mobileMenu() {
        if (mobileNavInitialized) return;

        $("header .nav-btn").click(function () {
            $("header .nav").toggleClass("open");
            $("header .nav-btn").toggleClass("open");
            $(".top-nav").css("top", (($('.main-nav').outerHeight()) + ($('.main-nav').offset().top)));
            //close search bar if it's open
            $("header .search").removeClass("open");
        });
        $("header .search-btn, header .search-cancel a").click(function () {
            $("header .search").toggleClass("open");
            //also close mobile menu if it's open
            $('.nav, .nav-btn').removeClass("open");
        });
        $("header .main-nav ul > li > a").click(function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('selected')) {
                $("header .main-nav ul > li").removeClass('selected').parent().removeClass('selected');
            } else {
                $(this).parent().addClass('selected').parent().addClass('selected');
            }

            if ($(this).siblings().size() > 0) {
                $(this).siblings('ul').toggleClass("open");
            } else {
                window.location.href = $(this).attr("href");
            };

        });
//        3269 -- The menu should not expand past the second level. Clicks to this item should do the default and take you to the category landing page.
//        $("header .main-nav .has-secondary-menu").click(function (e) {
//            e.preventDefault();
//            $(this).parents('.sub-menu-col').toggleClass('has-secondary-menu').parents('.has-sub-menu').toggleClass('has-secondary-menu')
//        });

        mobileNavInitialized = true;
    }

    if (Bissell.isMobile()) {
        mobileMenu();
    };

    $(window).resize(function (event) {
        if (Bissell.isMobile()) {
            mobileMenu();
        } else {
            $(".top-nav").css("top", "");
        }
    });



    $("header .view-cart").click(function (e) {
        e.preventDefault();
        closeAccountPanel();
        shoppingCartClick = true;
        clearTimeout(timeout);

        var $show = $("body").data("minicart");
        if (!$show == false) {
            if (!$("header .mini-cart").hasClass('open')) {
                $("header .mini-cart").fadeIn("200", function () {
                    $(this).addClass("open");
                });
            } else {
                $("header .mini-cart").fadeOut("200", function () {
                    $(this).removeClass("open");
                });
            }
        };
    });
    $("body").delegate(".mini-cart .header .button", "click", function () {
        CloseMiniCart();

        shoppingCartClick = false;

    });
    $("header .my-account").click(function (e) {
        e.preventDefault();
        CloseMiniCart();
        showAccountPanel();
    });
    $("header .account-panel .close").click(function () {
        $("header .account-panel").fadeOut('200');
    });
    $(".country-select .current").click(function (e) {
        e.preventDefault();
        $(".country-select ul").toggleClass("open");
    });
    $('.browse-by-type li, .browse-by-need li').hover(function () {
        var imageSelector = $(this).find('.image-container');
        imageSelector.css('background-image', imageSelector.data('default'));
    });
    $('.sub-content-detail li').hover(function () {

        var li = $(this);
        var imageContainer = $(this).closest('.sub-menu-col').find('li .img-container');
        var bgImage = 'none';

        if (li.attr('data-image')) {
            bgImage = li.data('image');
        }

        imageContainer.attr("src", bgImage);
    });


    /* NEW MENU FUNCTIONALITY */
    $("header .search-desktop, header .search-cancel a").click(function (e) {
        if (Bissell.isDesktop()) {
            e.preventDefault();
            $("header .search-desktop").toggleClass("selected");
            $("header .search-form").toggleClass("open");
        };
    });

};

$(".mini-cart").mouseenter(function () {
    if (!shoppingCartClick) {
        clearTimeout(timeout);
    }

});

$(".mini-cart").mouseleave(function () {
    if (!shoppingCartClick) {
        timeout = setTimeout('CloseMiniCart()', 5000);
    }
});


function OpenMiniCart() {
    if (!$("header .mini-cart").hasClass('open')) {
        $("header .mini-cart").fadeIn("200", function () {
            $(this).addClass("open");
        });
        timeout = setTimeout('CloseMiniCart()', 5000);
    }
};

function CloseMiniCart() {
    $("header .mini-cart").fadeOut("200", function () {
        $(this).removeClass("open").css("top", "");
        cartopen = false;
        shoppingCartClick = false;
    });
};

function mobileMiniCartPosition() {
    if ($(window).width() < 768) {
        var el = $("header .mini-cart");
        $(el).css('top', $(window).scrollTop() + 60);
    }
};

function UpdateCartNavigationCount($num) {
    $('a.shopping-cart').find('span').remove();
    $('div.cart-btn').find('span.item-count').remove();
    $('.js-cart-qty').empty();

    if ($num) {
        // $('a.shopping-cart').prepend('<span>(' + $num + ')<span>');
        $('a.shopping-cart').text(' ' + $num + ' item(s)');
        $('li.cart').removeClass('empty');
        $('div.cart-btn').append('<span class="item-count">' + $num + '</span>');
        
        if ($num === 1) {
            $('.js-cart-qty').append('View Cart - 1 item');
        } else {
            $('.js-cart-qty').append('View Cart - ' + $num + ' items');
        }
        
    } else {
        $('a.shopping-cart').text(' 0 item(s)');
        $('li.cart').addClass('empty');
        $('.js-cart-qty').append('View Cart - 0 items');
    }

    /*
    if ($('.shopping-cart span').text() == 0) {
        $('.cart').removeClass('eempty');
        $('.cart').addClass('empty');
    }
    else {
        $('.cart').removeClass('empty');
        $('.cart').addClass('eempty');
    }
    */

};

function showAccountPanel() {
    if (Bissell.isMobile()) {
        $("header .account-panel").css('top', ($('header .main-nav').height() + $('header .top-nav').height() + 103));
    };
    $("header .account-panel").fadeToggle('200');
};

function closeAccountPanel() {
    $("header .account-panel").fadeOut('200');
};
/* Ends Header Functions */

/* Aside Scripts */
function nestedMenus() {
    $('.main-menu li ul li').click(function (e) {
        if ($(this).children('ul').length) {
            e.preventDefault();
            $(this).toggleClass('open');
        } else {
            window.location.href = $(this).find('a').attr("href");
        }
    });

    /* Category Functionality */
    $('.category-title, .categories > .toggle').click(function () {
        $(this).parent('.type').toggleClass('open');
    });

    if (Bissell.isDesktop()) {
        $('.categories.type').addClass('open');
    }

    if (Bissell.isMobile()) {

        $('.category-title').click(function () {
            // $(this).parent(".categories").toggleClass('open');
            // Sifter: 14439, 14437, 14358
            $(this).parent(".categories").not('.type').toggleClass('open');
        });

        $('.categories ul > li > a.categories-parent').click(function (e) {
            e.preventDefault();
        });
    }

    $('.navUpdate .toggle').click(function () {
        $(this).parent('li').toggleClass('open');
    });

    if ($('.searchParent').length) {
        $('.searchParent').on('click', '.toggle', function () {
            $(this).parent('li').toggleClass('open');
        });
    } else {
        $('.toggle').click(function () {
            $(this).parent('li').toggleClass('open');
        });
    }

    $('article.search .categories li a').click(function (e) {

        if ($(this).parent('li').children('ul').length) {
            e.preventDefault();
            $(this).parent('li').toggleClass('open');
        } else {
            window.location.href = $(this).attr("href");
        };
    });

    /* Filter Functionalituy */
    $('.filter h4, .filter > .toggle').click(function () {
        if (Bissell.isMobile()) {
            $(this).parent('.filter').toggleClass('open');
        }
    });
    if ($('.searchParent').length) {
        $('.searchParent').on('click', '.filter li div', function () {
            $(this).parent('li').toggleClass('open');
        });
    } else {
        $('.filter li div').click(function () {
            $(this).parent('li').toggleClass('open');
        });
    }

    $('.filter').not('.search').find('li ul li').click(function (e) {
        e.preventDefault();
        window.location.href = ($(this).data('value'));
    });
}
/* Ends Aside Scripts */

/* Accordian Toggle */
function accordianToggle() {
    var $openText = $('#accordian-open').text();;
    var $closeText = $('#accordian-close').text();;
    $('.accordion li').addClass('close');
    $('.accordion li').find('.title').after('<button type="button">' + $openText + '</button>');
    $('.accordion div.cta button').click(function () {
        $(this).closest('li.item').toggleClass('close');
        if ($(this).closest('li.item').hasClass('close')) {
            $(this).html('' + $openText + '');
        } else {
            $(this).html('' + $closeText + '');
        }
    });
};

/* Modals */
function createModals() {
    if ('.modal') {
        $('.modal').fancybox({
            helpers: {
                title: null
            }
        });
        /* Above code will remove title from all Modal */
        $('.modal').click(function (e) {
            e.preventDefault();
        });
    };
};

function launchModal() {
    if ($('#on-load-modal').length) {
        $.fancybox.open('#on-load-modal');
    };
};

function launchYMAN() {
    if ($('#yman').length) {
        $.fancybox.open('#yman');
        $(".fancybox-skin").addClass("yman-fancybox");
        $('.yman-items .item').addClass('hide');
        $('.yman-items .item:first').removeClass('hide');
    };

    $('.item-nav a').click(function (e) {
        e.preventDefault();
        var $current = $(this).closest('.yman-items .item');
        var $direction = $(this).attr('class');
        $current.addClass('hide');
        if ($direction == 'next') {
            $current.next().removeClass('hide');
        } else {
            $current.prev().removeClass('hide');
        };
    });
    $('.add-none').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('last')) {
            var $current = $(this).closest('.yman-items .item');
            $current.addClass('hide');
            $current.next().removeClass('hide');
        } else {
            $.fancybox.close('#yman');
        };
    });
};

/* Search Page View Products Modal */
function seachModal() {
    $('.seach-modal').click(function (e) {
        e.preventDefault();
        var list = $(this).closest('li').find('.associated-products').clone();
        replaceModalContent(list);
        callProductList();
    });
}

function replaceModalContent(list) {
    $('#view-products .product-list').html('');
    $('#view-products .product-list').html(list);
}

function callProductList() {
    $.fancybox.open('#view-products');
}
/* Ends Search Page View Products Modal */

function addFancybox() {
    $('.no-touch a.image').fancybox({
        "hideOnContentClick": false,
        "titleShow": true,
        "minWidth": 500,
        "minHeight": 500,
        "width": 500,
        "height": 500,
        "wrapCSS": 'image-gallery',
        "nextEffect": 'none',
        "prevEffect": 'none'
    });

    $('.touch a.image').fancybox({
        "hideOnContentClick": false,
        "titleShow": true,
        "minWidth": 250,
        "minHeight": 250,
        "wrapCSS": 'image-gallery',
        "nextEffect": 'none',
        "prevEffect": 'none'
    });
}
/* Ends Modals */

function duplicateEmail() {
    if ($('#duplicate-email').length) {
        $.fancybox.open('#duplicate-email');
    };
}

/* Open-Close */
function openClose() {
    var $openAll = $('#open-all').text();
    var $closeAll = $('#close-all').text();
    var $openText = $('#section-open').text();;
    var $closeText = $('#section-close').text();;
    $('article .reveal-btn').html('' + $closeAll + '');
    $('.section-title').each(function () {
        $(this).find('button').html('' + $closeText + '');
    });
    $('article .reveal-btn').click(function () {
        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed');
            $(this).html('' + $closeAll + '');
            $('.product-specs li').removeClass('close');
            $('.product-specs li').find('button').html('' + $closeText + '');
        } else {
            $(this).addClass('closed');
            $(this).html('' + $openAll + '');
            $('.product-specs li').addClass('close');
            $('.product-specs li').find('button').html('' + $openText + '');
        }
    });
    $('.section-title').click(function () {
        $(this).parent('li').toggleClass('close');
        if ($(this).parent('li').hasClass('close')) {
            $(this).find('button').html('' + $openText + '');
        } else {
            $(this).find('button').html('' + $closeText + '');
        }
    });
};
/* Ends Open-Close */

/* Hide Features */
function hideFeatures() {
    var $hideText = $('#hide-features').text();
    var $showText = $('#show-features').text();
    $('article .prod-listing .details .models ul').each(function () {
        if (($(this).find('li').length) > 3) {
            $(this).find('li:gt(2)').toggleClass('hide');
            $(this).after('<span class="feature-filter">' + $showText + '</span>');
        };
    });
    $('.feature-filter').click(function () {
        $(this).toggleClass('less');
        $(this).siblings('ul').find('li:gt(2)').toggleClass('hide');
        if ($(this).hasClass('less')) {
            $(this).html($hideText);
        } else {
            $(this).html($showText);
        };
    });
};

function hideVideoFeatures() {
    if ($('.showMoreVideo').length) {
        var $hideText = $('#hide-video-features').text();
        var $showText = $('#show-video-features').text();
        $('.showMoreVideo').each(function () {
            if (($(this).find('li').length) > 3) {
                $(this).find('li:gt(2)').toggleClass('hide');
                $(this).after('... <span class="feature-filter">' + $showText + '</span>');
            };
        });
        $('.feature-filter').click(function () {
            $(this).toggleClass('less');
            $(this).siblings('ul').find('li:gt(2)').toggleClass('hide');
            if ($(this).hasClass('less')) {
                $(this).html($hideText);
            } else {
                $(this).html($showText);
            };
        });
    }
};
/* Ends Hide Features */



/* Ends Carousels */

/* Parts and Supplies Section Toggle */
function partsToggle() {
    if (Bissell.isDesktop()) {
        $('.parts-supplies').addClass('open');
    };
    $('.parts-supplies .section-title').click(function () {
        $(this).parents('div.parts-supplies').toggleClass('open');

        if (Bissell.isMobile()) {
            $('.parts-supplies').addClass('flexslider');
            if ($('.overview-product-slide').length) {
                $('.overview-product-slide').flexslider({
                    animation: "slide",
                    controlNav: false,
                    startAt: 0,
                    animationLoop: true,
                    slideshow: false
                });
            }
        }
    });


    $('.parts-quickLinks a').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 500);
        var thisHash = $(this).attr('href');
        $(thisHash).addClass('open');
        return false;
    });

};
/* Ends Parts and Supplies Section Toggle */

// Address Form 
function bindForm() {
    $('input, select', $('.shipping-info .form')).each(function () {
        $(this).attr('readonly', 'readonly');
        // While working on 9061 -- We noticed that -- Shipping Info
        // section Drop down, was changable we tried to change it to following value
        // But it was not working -- And causing values lost after postback
        //$(this).attr('disabled', true);
    });
    $('input, select', $('.billing-info .form')).change(function () {
        $('[data-shipping="' + $(this).attr('data-billing') + '"]').val($(this).val());
        //To Fix Tab index issue
        // http://stackoverflow.com/questions/17384464/jquery-focus-not-working-in-chrome                
        // $(this).focus();
        // #9061 - Triggering validation
        $('[data-shipping="' + $(this).attr('data-billing') + '"]').trigger("change");
        // To set focus for billing
        // $(this).trigger("change");
    });


};

function setAddress() {
    if ($('#samebilling').is(':checked')) {
        bindForm();
    };
    $('#samebilling').click(function () {
        if ($(this).is(':checked')) {
            $('input, select', $('.form')).each(function () {
                $('[data-shipping="' + $(this).attr('data-shipping') + '"]').val($('[data-billing="' + $(this).attr('data-shipping') + '"]').val());
            });
            bindForm();
        } else {
            $('input, select', $('.form')).each(function () {
                $(this).removeAttr('readonly');

                $('[data-billing="' + $(this).attr('data-shipping') + '"]').unbind();
                $('[data-shipping="' + $(this).attr('data-shipping') + '"]').val('');
            });
        };
    });
    $('.use-original').click(function (e) {
        e.preventDefault();
        $('span', $(this).closest('.original')).each(function () {
            var target = $(this).closest('.form').find('.' + $(this).attr('class') + '')
            target.val($(this).text());
            if (target.hasClass('changed-text')) {
                target.removeClass('changed-text');
            };
        });
        $(this).closest('.form').removeClass('correction');
    });
};
// Ends Address Form 
$('.use-original').click(function (e) {
    e.preventDefault();
    $('span', $(this).closest('.original')).each(function () {
        var target = $(this).closest('.form').find('.' + $(this).attr('class') + '')
        target.val($(this).text());
        if (target.hasClass('changed-text')) {
            target.removeClass('changed-text');
        };
    });
    $(this).closest('.form').removeClass('correction');
});

// Ends Address Form 


if ($('.cart-message')) {
    $('.cart-message .close').click(function () {
        $('.cart-message').slideToggle('200');
    });
};

function scrolToItems() {
    $('#scrollToBox li a').click(function (e) {
        e.preventDefault();
        var $name = $(this).attr('name');
        var $localtion = $('#scrollToItems li[name=' + $name + '');
        $('html, body').animate({
            scrollTop: ($($localtion).offset().top - 40)
        }, 500);
    });
};

/* Order Cookie */
function orderCookie() {
    var $cookie = readCookie('orderCookie');
    if ($cookie) {
        return true;
    };
    return false;
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
/* Ends Order Cookie */

//@TODO a lot of this can probably be removed, or will need to be modified, for the rebuilt find retailers feature.
/* Find Retailer */
function hideFinders() {
    if ($('.retail')) {
        $('.retail').each(function () {
            $(this).addClass('closed');
            $(this).siblings().hide();
        });
        $('.retail').click(function (e) {
            e.preventDefault();
            $(this).siblings().slideToggle('100');
            $(this).toggleClass('closed');
        });
    };
}

$('.find-modal').click(function (e) {
    e.preventDefault();
    $("#find-retailer .retailer.online ul").empty();
    var $title = $(this).children('.title').data('prod-title');
    var $sku = $(this).children('.sku').data('prod-sku');
    var $imageSrc = $(this).children('.image').data('prod-image');
    var $prodLink = $(this).children('.link').data('prod-link');
    var $price = $(this).children('.price').data('prod-price');
    var $cartLink = $(this).children('.cart-link').data('prod-cart-link');

    $('#find-retailer .image-container img').attr('src', '' + $imageSrc + '');
    $('#find-retailer .image-container a').attr('href', '' + $prodLink + '');
    $('#find-retailer h3').text($title);
    $('#find-retailer #sku').text($sku);
    $('#find-retailer .price').text($price);

    if ($cartLink != "") {
        $('#find-retailer .button a').show();
        $('#find-retailer .button a').attr('href', '' + $cartLink + '');
    } else {
        $('#find-retailer .button a').hide();
    }
    $('#input-sku').val($sku);

    $(".map.retailerMap").hide();
    $("#location-list").empty();

    var $links = $(this).children('.online-retailer');
    var $linkCount = $links.length;
    if ($linkCount > 0) {
        for (var i = 0; i < $linkCount; i++) {
            var $oLink = $links.eq(i).data('etailer-link');
            var $oImg = $links.eq(i).data('etailer-img');
            var $oEtailer = $links.eq(i).data('etailer-title');
            $("#find-retailer .retailer.online ul").append('<li><a href="' + $oLink + '" target="_blank" title="' + $oEtailer + '"><img src="' + $oImg + '" alt=" "></a></li>');
        };
    } else {
        $("#find-retailer .retailer.online").hide();
    }

    if ($("#txtZipCode") && $("#txtZipCode").val() != undefined) {

        if ($("#hiddenFieldIsOmniture")) {
            var isOmniture = $("#hiddenFieldIsOmniture").val();

            var retailerZip = $("#txtZipCode").val();

            if (retailerZip != '') {
                var retailerSource = $("#hiddenFieldRetailerSource").val();

                if (retailerSource != undefined && retailerSource != '') {
                    if (isOmniture != undefined && isOmniture == "true") {
                        omnitureClientEvent('findRetailers', this, 'event11,event13:' + randomString() + ',event14', {
                            eVar13: 'retailer:' + retailerZip,
                            products: ";" + $sku,
                            prop12: retailerSource + ":retailer search",
                            eVar14: retailerSource + ":retailer search"
                        });
                    }
                    ga('send', 'event', 'Find a Retailer/Etailer', 'Product Detail Retailer', retailerZip);
                }
            }

        }
        $("#zip").val($("#txtZipCode").val());
        $(".search-radius-ddl").val($(".search-radius-ddlInside").val());

        _findRetailers();
    }

    $.fancybox.open('#find-retailer');
});
/* Ends Find Retailer */

$('#SearchText').keypress(function (e) {
    if (e.which == 13) {
        $('#SiteSearchPageUrlAnchor').click();
    }
});

/* Popup */

function popup() {
    $('a.popup').click(function (e) {
        e.preventDefault();
        return openWindow(this.href, 'popup');
    });
}
/* Popup */

function toolTips() {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.toolTips').each(function (index, el) {
            $(this).addClass('mgTop');
        });

    };

    $('.modalInline').hover(function () {
        $(this).parents('p').next('.toolTips').show();
    }, function () {
        $(this).parents('p').next('.toolTips').hide();
    });
}

// To fix #7399 - Client side validation
function ValidateInputField(sender, args) {
    var isValid = true;

    if (args.Value.length > 0) {
        if (!args.Value.trim())
            isValid = false;
    } else
        isValid = false;

    if (isValid) {
        var regExp = sender.attributes["RegExpToValidate"];
        if (regExp !== undefined && regExp !== "") {
            if (!args.Value.match(regExp.value)) {
                isValid = false;
                var invalidInputMessage = sender.attributes["InvalidInputMessage"];
                sender.innerHTML = invalidInputMessage.value;

                $("#" + sender.id).parent().addClass("alert");
                $("#" + sender.id).addClass("error-message");
            } else {
                isValid = true;

                $("#" + sender.id).parent().removeClass("alert");
                $("#" + sender.id).removeClass("error-message");
            }
        } else {
            isValid = true;
            $("#" + sender.id).parent().removeClass("alert");
            $("#" + sender.id).removeClass("error-message");
        }
    } else {
        $("#" + sender.id).parent().addClass("alert");
        $("#" + sender.id).addClass("error-message");
    }

    args.IsValid = isValid;
}

// To fix #7399 - Client side validation
function ValidateDdlInputField(src, args) {
    var ddlControl = document.getElementById(src.controltovalidate);

    if (ddlControl.selectedIndex == 0) {
        $("#" + src.id).parent().addClass("alert");
        $("#" + src.id).addClass("error-message");

        args.IsValid = false;
    } else {
        $("#" + src.id).parent().removeClass("alert");
        $("#" + src.id).removeClass("error-message");

        args.IsValid = true;
    }
}

function priceMobilePlaceholder() {
    if (Bissell.isMobile()) {
        if ($('.additional-info')) {
            var h1Text = $('.prod-detail-header h1').html();
            var h1TextWrap = '<div class="product-header">' + h1Text + '</div>';
            $('.aside-product > .box .additional-info .price-center-wrap').prepend(h1TextWrap);
            //$('.aside-product > .box .additional-info .bvRatingSummary').prepend($('.addToHeader'));
            $('.prod-detail-header').prepend($('.aside-product > .box'));
            $('.prod-detail-header h1').hide();

        }
    }

    if (Bissell.isMobile()) {
        // $("[rel='compare']").hide();
    }
}


function tabsJump() {
    $("body").on("click", ".jumpTab", function (e) {
        e.preventDefault();
        $('article.product-page-PI').css('min-height', '');
        $('.aside-product').show();
        $("ul.tabs li a").removeClass("active");
        var activeTab = $(this).attr("rel").toLowerCase();


        $('ul.tabs li a[rel=' + activeTab + ']').addClass('active');

        $(".tab_content").hide();
        $("#" + activeTab).addClass('active').fadeIn();

        if (activeTab == "compare" && Bissell.isMobile()) {
            compareSlider();
        }

        if (activeTab == 'closer') {
            Bissell.closerTab();
        }

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);


    });
}





function scrollThis() {
    if ($('.scrollThis').length) {
        $('.scrollThis').click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 1000);
        });
    }
}


function partsSupply() {
    var getIDLink;
    $('.parts-quickLinks a').hide();

    if (Bissell.isMobile()) {
        $('.mobileHide').hide();
    }

    $('.parts-supplies').each(function () {
        $(this).addClass('inViewTab');
        getIDLink = $(this).attr("id");
        $('.' + getIDLink).addClass("inView").show();
    });


    $('.parts-quickLinks a').not('.inView').remove();
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function productRegistration() {
    if (Bissell.isMobile()) {

        $(".parts-supplies .overview-product-slide").addClass("flexslider");
        if ($(".parts-supplies .overview-product-slide").length) {
            $('.mobileHide').remove();
            $('.parts-supplies .overview-product-slide').flexslider({
                animation: "slide",
                controlNav: true,
                startAt: 0,
                animationLoop: true,
                slideshow: false,
                itemWidth: 200,
                itemMargin: 0,
                prevText: "",
                nextText: ""

            });
        }
    }
}

$(window).load(function () {
    productRegistration();
});



function log() {
    var arg = Array.prototype.slice.call(arguments);

    if (console && console.log) {
        console.log.apply(console, arg);
    } else {
        for (var i = 0; i < arg.length; i++) alert(arg[i]);
    }
}


$(function () {
    $('#subFancyBox').fancybox({});
    productImageGallery();
});

function productImageGallery() {
    var widthandheight = Bissell.isMobile() ? 250 : 500;

    // if this is on the product detail page, add thumbnail images to each image-show anchor
    if ($('.part-detail').length) {
        var imageLinks = $(".image-show");
        imageLinks.each(function () {
            var anchor = $(this);
            var imageSrc = anchor.data('thumbsrc');
            var imageAlt = anchor.data('alt');
            var anchorSrc = Bissell.isMobile() ? anchor.data('smallsrc') : anchor.data('largesrc');

            anchor.attr('href', anchorSrc);
            anchor.append("<img src='" + imageSrc + "' alt='" + imageAlt + "' />");
        });
    }

    $(".image-show").fancybox({
        'minWidth': widthandheight,
        'minHeight': widthandheight,
        'width': widthandheight,
        'height': widthandheight,
        'wrapCSS': 'image-gallery',
        'nextClick': 'true',
        //'nextEffect': 'none',
        //'prevEffect': 'none',
        'nextEffect': 'fade',
        'nextSpeed': 250,
        'nextEasing': 'linear',
        'nextMethod': 'changeIn',
        'prevEffect': 'fade',
        'prevSpeed': 250,
        'prevEasing': 'linear',
        'prevMethod': 'changeOut'
    });

    $('.open-album').click(function (e) {

        // update href of anchors
        var imageLinks = $(".image-show");
        imageLinks.each(function () {
            var anchor = $(this);
            var src = Bissell.isMobile() ? anchor.data('smallsrc') : anchor.data('largesrc');
            anchor.attr('href', src);
        });

        var el, id = $(this).data('open-id');
        if (id) {
            el = $('.image-show[rel=' + id + ']:eq(0)');
            e.preventDefault();
            el.click();
        }

    });
}


(function () {
    if (Bissell.isMobile()) {
        $('#wReviewMobile a').addClass("aReview");

        $('.view-offers').hide();
        if ($('.promo').length) {
            $('.view-offers').show();
        }
    }
    $('.view-offers').click(function () {
        $('article .promo').toggleClass('show');
    });
})()

function compareSlider() {


    if (Bissell.isMobile()) {

        $('.part-search-results').addClass('video-slider compareslider').removeClass('part-search-results');

        $('.compareslider').addClass('flexslider');

        $('.compareslider').flexslider({
            animation: "slide",
            itemMargin: 20,
            prevText: "",
            nextText: "",
            //controlNav:false,
            start: function () {
                var index = $('.compareslider .flex-control-nav li:has(.flex-active)').index('.compareslider .flex-control-nav li') + 1;
                var total = $('.compareslider .flex-control-nav li').length;
                $('.count').html(index + " / " + total)

            },
            after: function (slider) {
                var index = $('.compareslider .flex-control-nav li:has(.flex-active)').index('.compareslider .flex-control-nav li') + 1;
                var total = $('.compareslider .flex-control-nav li').length;
                $('.count').html(index + " / " + total);

            }


        });

    } else {
        // if($('article .product-slider ul.slides').length > 0){
        //    var getWidth = $('article .product-slider ul.slides').width();
        //    var getLength = $('article .product-slider ul.slides li').length;
        //    var addWidth = getWidth/getLength - 40;

        //     $('article .product-slider ul.slides li').each(function(){
        //         $(this).width(addWidth);
        //     })
        // }
    }
}



function initYoutubeLinks() {
    //var bIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    $('.YoutubeVideoLink').click(function (event) {
        event.preventDefault();


        var elLink = $(this);
        var url = elLink.attr("href");

        if (url) {
            var w = elLink.width();
            var h = elLink.height();
            elLink.html("<iframe src='" + url + "' width='" + w + "' height='" + h + "' frameborder='0' allowfullscreen></iframe>");
            elLink.attr("href", "");
            elLink.removeAttr("href");
        }



    });
}

function NewsPage() {

    if ($('.isFeatured').length) {
        if (Bissell.isDesktop()) {
            $('.featured-products').css('border', '0px')
            $('.featured-products').css('border', '0px');
            $('.featured-products .featured-products-slider .slides li').css('width', '229px');
        }
    }


    if (Bissell.isMobile()) {
        $('body').addClass('BissellMobile');

        if ($('.isNewsPage').length) {
            var newpatten = true;
            $('.main-container > .article-rt-wrap').addClass('rtNewsroomMobile');
            $('.main-container > aside').addClass('NewsroomMobile');
            if (newpatten) {
                $('article .newsPage').append($('.h2TitleNews'));
            }
        }

        if ($('.isNewsPage').length) {
            var newpatten = true;
            $('.main-container > .article-rt-wrap').addClass('rtNewsroomMobile');
            $('.main-container > aside').addClass('NewsroomMobile');
            if (newpatten) {
                $('article .newsPage').append($('.h2TitleNews'));
            }
        }



        if ($('.pageWrap').length) {
            $('.NewsroomMobile .content-header').hide()
        }
    }
}


function tableWidth() {
    if (Bissell.isMobile()) {
        if ($('.items2 th.item').length) {
            $('.items2').attr('width', '525px');
        }
        if ($('.items3 th.item').length) {
            $('.items3').attr('width', '800px');
        }
    }
}

function petPage() {
    $('.largeSlider').flexslider({
        animation: "fade"
    });
}


function rewardFaq() {
    $('.accordian-reward .accordian-reward-head a').click(function (e) {
        $(this).parents('li').toggleClass('open');
        var txt = $(this).parents('li').hasClass('open') ? 'Close' : 'Expand';
        $(this).text(txt);

        e.preventDefault();
    });
}


function checkoutModel(status) {
    if (status == "open") {
        $('.modalCheckout').before("<div class='modelBG'></div>");
        $('.modalCheckout').removeClass('hide').show();
        checkPopup = true;
        $('.modelBG').click(function (e) {
            e.preventDefault();
            checkoutModel('close');
        });

    } else {
        if (checkPopup) {
            $(".modelBG").remove();
            $('.modalCheckout').addClass('hide').hide();
            checkPopup = false;
            $("#SelectedShelterTitle").hide();
            $("#SelectedShelterName").text("");
            $("#divShelterName").hide();
            $("#modalContinue").hide();
            $("#updShelter").hide();
        }
    }

    return false;
}



function joinpage() {
    $('.joinPetDD').change(function () {
        if ($('.joinPetDD :selected').val() == "other" || $('.joinPetDD :selected').val() == "Other") {
            $('.otherShow').show();
        } else {
            $('.otherShow').hide();
        }
    })
}


function CheckDropDown() {
    var result = true;
    $('.stainDropDown').each(function () {
        if (!$(this).hasClass('selected')) {
            $('.stainError').html($(this).attr('data-error'));
            result = false;
            return false;
        };
    })

    if (!result)
        checkoutModel('open');
    return result;
}



function shelterValidation() {
    $('.shelterSelectState').change(function (e) {
        if ($(this).val() == "") {
            $(this).removeClass('selected');
        } else {
            $(this).addClass('selected');
        }
    });

    $('.choosePromot').change(function (e) {
        if ($(this).val() == "Other") {
            $('.divShelterHeardFromOther').show();

        } else {
            $('.divShelterHeardFromOther').hide();
        }
    })

    if ($('.chooseState').val() != "" && $('.chooseShelter').val() != "" && $('.choosePromot').val() != "") {
        setTimeout(
            function () {
                checkoutModel('close')
            }
            , 3000);
    }




    //console.log("Close");

}


function downloadRebateForm() {
    var formLink = $('#rebateForm').attr("href");
    if (formLink != "") {
        $('#rebateForm').attr("target", "_blank");
        window.open($('#rebateForm').attr("href"));
        return true;
    }
    else {
        return false;
    }
}


function mobileEvent() {

    $('.tableWraper table').on("swipeleft", swipeleftHandler);
    $('.tableWraper table').on("swiperight", swipeRightHandler);
    //$('.tableWraper table').width($(document).width() * 2);

    var tableWidth = $('.tableWraper table').width();
    var divTable = tableWidth / 3;
    var scrollIt = divTable;
    var count = 1;

    function swipeleftHandler(event) {
        if (scrollIt < tableWidth) {
            var leftPos = $('.tableWraper').scrollLeft();
            $('.tableWraper').animate({ scrollLeft: leftPos + divTable }, 800);
            scrollIt = scrollIt + divTable;
            count++;
            if (count == 3) {
                scrollIt = tableWidth;
            }
        }

    }

    function swipeRightHandler(event) {

        if (scrollIt > 0) {
            var leftPos = $('.tableWraper').scrollLeft();
            $('.tableWraper').animate({ scrollLeft: leftPos - divTable }, 800);
            scrollIt = scrollIt - divTable;
            count--;
            if (count == 0) {
                scrollIt = divTable;
            }
        }
    }


}

function howToVideo() {
    if ($('.VideoSearch-Categories').length) {
        $('.VideoSearch-Categories').change(function (e) {
            if (!$(this).val() == "") {
                $('.VideoSearch-SubCategories').removeClass('hide');
            } else {
                $('.VideoSearch-SubCategories').addClass('hide');
            }
        })
    }

}





function manageNewsletterModal(email) {
    var handlerUrl = "/BHISites/Handlers/NewsLetterModalHandler.ashx";

    $.ajax({
        url: handlerUrl + "?email=" + email,
        contentType: "application/json",
        type: "GET",
        complete: function (event, xhr) {

            if (event.responseJSON != undefined || event.responseJSON.length > 0) {
                if (event.responseJSON.SubscriptionStatus != undefined) {
                    switch (event.responseJSON.SubscriptionStatus) {
                        case 0:
                            {
                                homePageModal.thankyou();

                                if (event.responseJSON.OmnitureFunctionCall.length)
                                    eval(event.responseJSON.OmnitureFunctionCall);
                                break;
                            }
                        case 2:
                            {
                                $('.newsLetterModalWraper .error').text(event.responseJSON.AlreadySubscribedMessage + "");
                                homePageModal.error();
                                break;
                            }
                        case 1:
                            {
                                $('.newsLetterModalWraper .error').text(event.responseJSON.ErrorMessage + "");
                                homePageModal.error();
                                break;
                            }
                    }
                }

            }
        }
    });
}

function datePicker() {

    $('.input-date').datepicker({
        maxDate: 0
    });

    $(".SearchTextHeader,#txtSearchBissell").autocomplete({
        source: ['Bissell', 'First', 'Second', 'Third', 'Forth']
    });

}



$(function () {

    var searchUrl = '/search?s=';

    var hiddenFieldSearchPageUrlField = $("#hiddenFieldSearchPageUrl");
    if (hiddenFieldSearchPageUrlField.length) {

        var hiddenFieldSearchPageUrl = hiddenFieldSearchPageUrlField.val();

        if (hiddenFieldSearchPageUrl !== null && hiddenFieldSearchPageUrl !== '') {
            searchUrl = hiddenFieldSearchPageUrl;
        }

    }

    $("body").delegate("div.search-form input.SearchTextHeader", "keydown", function (e) {

        searchAutocompleteSuggestions($(this), searchUrl);

    });
});

function IsAutoSearchEnabled() {

    var result = false;

    var hiddenFieldIsAutoSearchEnabled = $("#hiddenFieldIsAutoSearchEnabled").val();

    if (hiddenFieldIsAutoSearchEnabled == null || hiddenFieldIsAutoSearchEnabled == "" || hiddenFieldIsAutoSearchEnabled != "true") {
        return result;
    }

    var hiddenFieldSearchPageUrl = $("#hiddenFieldSearchPageUrl").val();

    if (hiddenFieldSearchPageUrl == null || hiddenFieldSearchPageUrl == "") {
        return result;
    }

    result = true;

    return result;
}

function searchAutocompleteSuggestions(txtboxObj, sURL) {
    $(txtboxObj).autocomplete({
        source: function (request, response) {
            var param = { term: $(txtboxObj).val() };
            $.ajax({
                url: "/webservices/Search.asmx/GetSearchSuggestions",
                data: JSON.stringify(param),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { return data; },
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            value: item
                        }
                    }))
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // Removed alert. Fixed Sifter Ticket: https://hi.sifterapp.com/issues/14908
                    console.log(textStatus);
                }
            });
        },
        select: function (event, ui) {
            this.value = ui.item.value;
            if (ui.item.link && ui.item.link.length > 0) {
                window.location.href = ui.item.link;
            } else if (sURL) {
                sURL += encodeURI(this.value);
                window.location.href = sURL;
            }
            return false;
        },
        minLength: 2,
        delay: 250
    });
}


function msds() {
    var userAgent = window.navigator.userAgent.toLowerCase(),
    ios = /iphone|ipod|ipad/.test(userAgent);
    var getPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    if (ios && $('.msds').length) {
        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=960')
    }
    if (ios && getPage === "specials") {
        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=960')
    }
}


function searchPageURL() {
    if ($('.support-filter').length > 0) {
        if (Bissell.isDesktop()) {
            $('.support-filter li').addClass("open");
        }
    }
}

function editPassword() {
    $('.profile-page-pwd').on('click', 'a', function (e) {
        $(this).parents('.profile-page-pwd').hide().siblings('.new-password').show();
    });
}

function SavePetsContinueClick() {
    window.loading('register-product', 'Please wait'); this.disabled = 'true';
    return true;
}

function ProductRegistrationContinueClick() {
    window.loading('step1', 'Please wait'); this.disabled = 'true';
    return true;
}

function ProductRegistrationSubmitClick() {
    window.loading('register-product', 'Please wait'); this.disabled = 'true';
    return true;
}

function EmailUsSubmitFormClick() {
    window.loading('email-customer-care-form', 'Please wait'); this.disabled = 'true';
    return true;
}

function PDPSlider() {
    // The slider being synced must be initialized first
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 50,
        itemMargin: 20,
        asNavFor: '#slider',
        useCSS: true,
        touch: true,
//            minItems: 7,
//            MaxItems: 7,
        customDirectionNav: $(".carousel-direction__wrapper a"),
    });

    $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel",
        useCSS: true,
        video: true,
        touch: true, 
        keyboard: true,
        directionNav: true //required for keyboard navigation. hidden with css.
    });
}
//
//$(window).load(function() {
//    ProductDetailPageSlider();
//});

//Pause all videos when slider slides
//Commented out because performance impact on slide animation is too great.
//Can call in line 166 of jquery.flexslider.js

//function stopYTvideo() {
//    //jquery version 
//    $('.video-player').each(function(){
//        var el_src = $(this).attr("src");
//        $(this).attr("src",el_src);
//    });

//    //less jquery version
//    var els = document.getElementsByClassName("video-player");
//    Array.prototype.forEach.call(els, function(el) {
//        var el_src = $(el).attr("src");
//        $(el).attr("src",el_src);
//    });
//}

function Select2Load() {
    //Select2 replaces vanilla select drop downs
    $.when(
        $.getScript( "/_Design/js/vendor/select2-4.0.3.min.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){
        $('.prod-detail__find-retailer select').select2({
            minimumResultsForSearch: Infinity
        });
    });
}

function PDPAccordion() {
    //Fancier slide toggling by using a visibility utility class instead of display:none so screen readers can still see content
    
    //hide all but the 'main information' pane on load
//    $('.prod-detail__specs__pane').not(':first').removeClass('open').find('.prod-detail__specs__pane__content').toggleClass('visually-hidden');
    
    //@TODO remove hack
    //this opens the first accordion pane on load. Ideally, the markup would be different so we wouldn't have to hack it with js.
    var $firstPanel = $('.prod-detail__specs__pane').first();
    $firstPanel.addClass('open').find('.prod-detail__specs__pane__content').removeClass('visually-hidden');
    $firstPanel.find('.hide-button').hide();
    $firstPanel.find('.prod-detail__specs__pane__header').css('cursor', 'auto');

    
    //Tabbing through and pressing enter counts as a click
    $('.prod-detail__specs__pane__header').keypress(function(event){
        if(event.keyCode==13){
            $(this).trigger("click");
        }
    });
    
    //Click event
    $('.prod-detail__specs__pane__header').not(':first').click(function() {
        //add .open to parent
        $(this).parent().toggleClass('open');
        
        if ($(this).parent().hasClass('open')) {
            //accessibly open
            $(this).next('.prod-detail__specs__pane__content').hide().removeClass('visually-hidden').slideDown('fast');
        } else {
            //accessibly close
            $(this).next('.prod-detail__specs__pane__content').slideUp('fast', function() {
                $(this).addClass('visually-hidden').show();
            })
        }  
    }); 
}

function PDPStickyCartBar() {
    function checkPosition() {
        if ($(this).scrollTop() > 800) {
            $('.prod-detail__sticky-add').fadeIn();
        } else {
            $('.prod-detail__sticky-add').fadeOut();
        }
    }; 
    
    $(window).scroll(checkPosition);
    
    $('.prod-detail__sticky-add').find('.close-button').click(function(){
        $(this).parent().fadeOut();
        $( window ).off( "scroll", checkPosition );
    });

}

function PDPVideos() {
    $('.fancybox').fancybox({
        padding   : 0,
        maxWidth  : '100%',
        maxHeight : '100%',
        width   : 640,
        height    : 385,
        autoSize  : true,
        closeClick  : true,
        openEffect  : 'elastic',
        closeEffect : 'elastic'
    });
    
    $('.prod-detail__videos__categories').on('change', function() {
        if (this.value === 'all') {
            $('.prod-detail__video').fadeIn();
        } else {
            $('.prod-detail__video').not('.js-pdp-' + this.value).hide();
            $('.js-pdp-' + this.value).fadeIn();
        }
    })
}

function PDPCompare() {
    //this builds the url for the compare page from checked product items on the product detail page
    $('.js-pdp-compare').click(function (event) {
        //get base href
        var href = $(this).attr('href');

        //get skus for all checked items
        var skus = $(this).parent().find('input:checked').map(function () {
            return this.dataset.sku
        }).get()
        
        //don't go to compare unless more than one product is clicked
        if (typeof skus == "undefined" || skus == null || skus.length <= 1) {
            event.preventDefault();
            return;
        }
        
        //append skus to href
        $(this).attr('href', href + skus);
    })
}

//Load product detail page functions
$(window).load(function() {
    if ($('.prod-detail').length) {
        Select2Load();
        PDPAccordion();
        PDPSlider();
        PDPStickyCartBar();
        PDPVideos();
        PDPCompare();
    }
});

function blogLayoutFiltering() {
    $.when(

        //Isotope code (use this for filtering of articles)
        $.getScript("https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"),

        //ImagesLoaded code which will force images to load before Masonry activates. Required to avoid layout issues.
        $.getScript("https://npmcdn.com/imagesloaded@4.1/imagesloaded.pkgd.min.js"),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })

    ).done(function () {
        //set up the isotope grid
        var $grid = $('.blog__grid').isotope({
            itemSelector: ".blog__item",
            masonry: {
                columnWidth: ".grid-sizer",
                gutter: 5
            }
        });

        //once images are loaded we can actually start the plugin:
        $grid.imagesLoaded().progress(function () {
            //remove the right margin gutter since Masonry will provide this now
            $('.blog__item').css("margin-right", 0);

            //initialize isotope
            $grid.isotope('layout');

            //set up isotope filters - tags
            var qsTag = getQueryVariable("tag");
            if (qsTag) {
                var filterVal = '.js-blog--' + qsTag.split(' ')[0].toLowerCase();
                $grid.isotope({ filter: filterVal });
            }

            //reset filters when tag close button is clicked
            $('.js-close').on('click', function () {
                $('.blog__tags').hide();
                $grid.isotope({ filter: '*' });
            });

            //set up isotope filters - categories
            $('.blog__category-filters').on('click', 'a', function (event) {
                //prevent following link
                event.preventDefault();

                //hide blog tag div if present
                if ($('.blog__tags'))
                    $('.blog__tags').hide();

                //remove underline from any category buttons and add to the one just clicked
                $(this).siblings().removeClass('active');
                $(this).addClass('active');

                //run the filter
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });

        });
    });
}

$(window).load(function () {
    if ($('.blog').length) {
        blogLayoutFiltering();
    }
});