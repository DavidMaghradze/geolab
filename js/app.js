$(document).ready(function(){
    // Navigation
    $('.hamburger').click(function(){
        $(this).toggleClass('span-x');
        $('.topnav__navigation').toggleClass('show-navigation');
        $('.topnav__logo').toggleClass('red-logo');
    })

    // Smooth scrolling
	var scrollLink = $('.scroll');

	scrollLink.click(function(e){
        e.preventDefault();
            $('body,html').animate({
                scrollTop: $(this.hash).offset().top
            }, 1000)
        
    });

    $(window).scroll(function(){
        var scrollBarLocation = $(this).scrollTop();
        
        if (scrollBarLocation >= 20) {
            $('.hamburger').addClass('fixed');
        } else {
            $('.hamburger').removeClass('fixed');
        }

		scrollLink.each(function(){
			var sectionOffset = $(this.hash).offset().top - 100

			if (sectionOffset <= scrollBarLocation) {
				$(this).addClass('active');
				$(this).parent().siblings().children().removeClass('active');
			} else {
				$('.scroll').children().removeClass('active');
			}
        })
    });

    // Slider
    $('.slider__item').hide();
    $('.slider-active').show();
    slideCount = $('.slider__item').length;
    current = 1;

    slideNext = function(){
        if(current===slideCount) { current=0 }
        $('.slider__item').hide();
        $('.slider__item:nth-child('+(current+1)+')').fadeIn();
        current++;
    }

    slidePrev = function(){
        if(current===1) { current=slideCount+1 }
        $('.slider__item').hide();
        $('.slider__item:nth-child('+(current-1)+')').fadeIn();
        current--;
    }

    $('.slider__arrow--next').click(slideNext);
    $('.slider__arrow--prev').click(slidePrev);

    // Road Animation fixed
    getProperHeight = function(){
        screenSize = $(window).outerWidth();
        divider = 1366/232;
        roadHeight = screenSize/divider;
        $('.road').css('height',roadHeight);
    }
    getProperHeight();

    $(window).resize(function(){
        getProperHeight();
    })

    // Form Validation
    // inputs = $('.contact__form-fields input');

    // inputs.each().blur(function(){
    //         console.log('da')
    // })

    let valid = false;
    let nameValid = false;
    let emailValid = false;
    let subjectValid = false;

    // Value init
    $name = $('.contact__form-fields input[name="name"]');
    $email = $('.contact__form-fields input[name="email"]');
    $subject = $('.contact__form-fields input[name="subject"]');

    $name.blur(function(){
        nameValidation($name);
    })

    $subject.blur(function(){
        subjectValidation($subject);
    })

    $email.blur(function(){
        emailValidation($email);
    })

    nameValidation = function(input){
        $this = input;
        if($this.val().length<6) {
            $this.removeClass('correct')
            $this.addClass('error')
            $this.next().html('<span>Must be more than 6 Characters</span>');
            nameValid=false;
        } else {
            $this.removeClass('error')
            $this.addClass('correct')
            $this.next().html('');
            nameValid=true;
        }
    }

    emailValidation = function(input){
        $this = input;
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if(!re.test($this.val())){
            $this.removeClass('correct')
            $this.addClass('error')
            $this.next().html('<span>Insert correct email</span>');
            emailValid=false;
        } else {
            $this.removeClass('error')
            $this.addClass('correct')
            $this.next().html('');
            emailValid=true;
        }
    }

    subjectValidation = function(input){
        $this = input;
        if($this.val().length<6) {
            $this.removeClass('correct')
            $this.addClass('error')
            $this.next().html('<span>Must be more than 6 Characters</span>');
            subjectValid=false;
        } else {
            $this.removeClass('error')
            $this.addClass('correct')
            $this.next().html('');
            subjectValid=true;
        }
    }

    $('.contact__form').submit(function(e){
        e.preventDefault();
        inputs = $('.contact__form-fields input');
        if(nameValid && emailValid && subjectValid) {valid=true} else {valid=false}

        if(valid) {
            $('.contact__form-submit').before('<p class="success" style="color:green; marginTop:20px">Information has been sent</p>')
        } else {
            $('.contact__form-submit').before('')
        }

        setTimeout(function(){
            $('.contact__form .success').hide()
        },2000)

        inputs.each(function(index){
            currentInput = $(this);
            console.log(valid)
            if(currentInput.val()===''){
                currentInput.addClass('error');
                currentInput.next().html('<span>Field is Required</span>');
            } else if(!currentInput.hasClass('correct')) {
                currentInput.addClass('error');
                currentInput.next().html('<span>Please Insert Correct Value</span>');
            } else {
                currentInput.removeClass('error');
                currentInput.next().html('');
            }
        })

        // console.log(inputs);
    })
})