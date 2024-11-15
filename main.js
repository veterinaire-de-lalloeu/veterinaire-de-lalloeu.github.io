function scrollToTop() {
	let bannerHeight = $('.banner').outerHeight();
	if (window.pageYOffset>bannerHeight) {
		document.body.scrollTop = bannerHeight; // For Safari
		document.documentElement.scrollTop = bannerHeight; // For Chrome, Firefox, IE and Opera
	}
}

$(document).ready(function(){
	$('#page-home').css('display', 'block').addClass('page-current');
	
	if (!$.browser.mobile) {
		$('.menu-item.dropdown').hover(
			function(){
				$('.submenu').hide();
				$('.menu-open').removeClass('menu-open');
				$(this).find('.submenu').css('display','none').addClass('menu-open').slideDown('fast');
			},
			function(){
				$(this).find('.submenu').removeClass('menu-open');
			}
		);
	}
	
	$('.navbar .menu a').click(function(){
		let menuID = this.id.substr(5);
		switch(menuID) {
			case 'cabinet':
			case 'aide':
				if ($('#'+this.id+' ~ .submenu').hasClass('menu-open')) $('#'+this.id+' ~ .submenu').removeClass('menu-open');
				else {
					$('.submenu').hide();
					$('.menu-open').removeClass('menu-open');
					$('#'+this.id+' ~ .submenu').addClass('menu-open').slideDown('fast');
				}
			break;
			default:
				$('.submenu').hide();
				$('.menu-open').removeClass('menu-open');
				$('.page-current').fadeOut('fast',function() {
					$('.page-current').css('display', 'none').removeClass('page-current');
					$('#page-'+menuID).css('display', 'block').addClass('page-current');
					scrollToTop();
				});
			break;
		}
		return false;
	});
	
	$('.link').click(function() {
		let menuID = this.id.substr(5);
		$('.page-current').fadeOut('fast',function() {
			$('.page-current').css('display', 'none').removeClass('page-current');
			$('#page-'+menuID).css('display', 'block').addClass('page-current');
			scrollToTop();
		});
		return false;
	});
	
	
	const $carousel = $('.carousel');
    const $items = $('.carousel-item');
    const totalItems = $items.length;
    let currentIndex = 0;

    // Function to update carousel position
    function updateCarousel() {
        const offset = -currentIndex * 100;
        $carousel.css('transform', `translateX(${offset}%)`);
    }

    // Carousel navigation
    $('.next-btn').click(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    $('.prev-btn').click(function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Modal functionality
    const $modal = $('#imageModal');
    const $modalImage = $('#modalImage');

    // Show modal on image click
    $('.carousel-item img').click(function() {
        const src = $(this).attr('src');
        $modalImage.attr('src', src);
	$modal.css('display','flex');
        $modal.fadeIn();
    });

    // Close modal
    $('.close').click(function() {
        $modal.fadeOut();
    });

    // Close modal on outside click
    $modal.click(function(e) {
        if (e.target === $modal[0]) {
            $modal.fadeOut();
        }
    });
});
