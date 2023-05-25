

$(document).ready(function () {
    var screenWidth = $(window).width();
    var scrollTop = 0;
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var progressBar = $('#progress-bar');

    $("#alertModal").modal("show");

    //up to top arrow color
    function arrow_color() {
        setTimeout(function () {
            $("#uptotop").css("color", "black");
        }, 2000);
    }

    $(document).scroll(function () {

        // progress bar animation
        scrollTop = $(window).scrollTop();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent * 100);
        progressBar.css('width', scrollPercentRounded + '%');
        if (scrollPercentRounded > 100) {
            progressBar.css('width', '100%');

        }

        //content hide/show 
        var scroll = $(window).scrollTop();
        $('.content_hide').each(function () {
            if (scroll >= $(this).offset().top - $(window).height() && scroll > 0) {
                $(this).addClass("show");

                if ($('#about_me').hasClass("show")) {
                    $('#html_progress').removeClass("html_progress_rev");
                    $('#html_progress').addClass("html_progress");

                    $('#css_progress').removeClass("css_progress_rev");
                    $('#css_progress').addClass("css_progress");

                    $('#bootstrap_progress').removeClass("bootstrap_progress_rev");
                    $('#bootstrap_progress').addClass("bootstrap_progress");

                    $('#jquery_progress').removeClass("jquery_progress_rev");
                    $('#jquery_progress').addClass("jquery_progress");

                    $('#php_progress').removeClass("php_progress_rev");
                    $('#php_progress').addClass("php_progress");

                    $('#mysql_progress').removeClass("mysql_progress_rev");
                    $('#mysql_progress').addClass("mysql_progress");

                    $('#laravel_progress').removeClass("laravel_progress_rev");
                    $('#laravel_progress').addClass("laravel_progress");

                    $('#java_progress').removeClass("java_progress_rev");
                    $('#java_progress').addClass("java_progress");
                }

                //up to top arrow show/hide
                if ($("#contact").hasClass("show")) {
                    setTimeout(function () {
                        $("#up_to_top_btn").css("animation", "totop 1s ease-in-out normal forwards");
                    }, 1000);
                }
            } else {
                $(this).removeClass("show");
                if ($('#about_me').hasClass("show") == false) {
                    $('#html_progress').removeClass("html_progress");
                    $('#html_progress').addClass("html_progress_rev");

                    $('#css_progress').removeClass("css_progress");
                    $('#css_progress').addClass("css_progress_rev");

                    $('#bootstrap_progress').removeClass("bootstrap_progress");
                    $('#bootstrap_progress').addClass("bootstrap_progress_rev");

                    $('#jquery_progress').removeClass("jquery_progress");
                    $('#jquery_progress').addClass("jquery_progress_rev");

                    $('#php_progress').removeClass("php_progress");
                    $('#php_progress').addClass("php_progress_rev");

                    $('#mysql_progress').removeClass("mysql_progress");
                    $('#mysql_progress').addClass("mysql_progress_rev");

                    $('#laravel_progress').removeClass("laravel_progress_rev");
                    $('#laravel_progress').addClass("laravel_progress");

                    $('#java_progress').removeClass("java_progress_rev");
                    $('#java_progress').addClass("java_progress");
                }
            }
        });
    });

    $('#bgOverlayParent').hide();

    //navbar auto collapse in max width < 992
    $('.nav-link').click(function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
        if (screenWidth < 992) {
            $('#navbar_btn').click();
        }
    });

    //mode switch click
    $('#mode_switch').click(function () {
        $(this).prop('disabled', true);
        $('#bgOverlayParent').fadeIn();
        $('section').toggleClass('blur');

        $(this).toggleClass("light_mode");
        $(this).toggleClass("dark_mode");

        if ($(this).hasClass("light_mode")) {
            $("#mode_text").css("color", "lightsalmon");
            $("#mode_text").html("Light mode");
            $('#mode_switch i').toggleClass("fa-sun");
            $('#mode_switch i').toggleClass("fa-moon");
            $('#sun').addClass("light_icon");
            $('#moon').removeClass("dark_icon");
            $('#bgOverlayChild').css('animation', 'light_animation 2s ease-in-out forwards normal');
        }
        else {
            $("#mode_text").css("color", "cyan");
            $("#mode_text").html("Dark mode");
            $('#mode_switch i').toggleClass("fa-sun");
            $('#mode_switch i').toggleClass("fa-moon");
            $('#sun').removeClass("light_icon");
            $('#moon').addClass("dark_icon");
            $('#bgOverlayChild').css('animation', 'dark_animation 2s ease-in-out forwards normal');
        }

        setTimeout(function () {
            $('section').toggleClass('blur');
            $('#bgOverlayParent').fadeOut();
            $('#mode_switch').prop('disabled', false);
        }, 2500);

        //light mode options
        if ($(this).hasClass("light_mode")) {
            console.log('light');
            $("body").css("background-color", "whitesmoke");
            $("body h1, body h2,body h3, body h4, body h5").css("color", "black");
            $("#mode_text").css("color", "lightsalmon");
            $("#whoami h1").css("color", "darkgoldenrod");
            $(".project_div a").toggleClass("text-dark");
            $("#contact_card_child").toggleClass("bg-dark");
            $("#contact_card_child i").css("color", "black");
            $("#footer h1").css("color", "darkgoldenrod");
            $("#uptotop").css("color", "black");
            $("#up_to_top_btn").hover(function () {
                $("#uptotop").css("color", "lightsalmon");
                arrow_color();
            }
            );
        }
        //dark mode options
        else {
            console.log('dark');
            $("body").css("background-color", "black");
            $("body h1, body h2,body h3, body h4, body h5").css("color", "silver");
            $("#mode_text").css("color", "cyan");
            $("#whoami h1").css("color", "cyan");
            $(".project_div a").toggleClass("text-dark");
            $(".project_div a").css("color", "silver");
            $("#contact_card_child").toggleClass("bg-dark");
            $("#contact_card_child i").css("color", "silver");
            $("#footer h1").css("color", "darkgoldenrod");
            $("#uptotop").css("color", "black");
            $("#up_to_top_btn").hover(function () {
                $("#uptotop").css("color", "cyan");
                arrow_color();
            }
            );
        }

    });

    //up to top button hover and click
    $("#up_to_top_btn").hover(function () {
        $("#uptotop").css("color", "lightsalmon");
        arrow_color();
    });

    $("#up_to_top_btn").click(function () {
        $("html, body").scrollTop(0, 500);
    });

});
