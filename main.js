function scrollToTop() {
	let bannerHeight = $('.banner').outerHeight();
	if (window.pageYOffset>bannerHeight) {
		document.body.scrollTop = bannerHeight; // For Safari
		document.documentElement.scrollTop = bannerHeight; // For Chrome, Firefox, IE and Opera
	}
}

$(document).ready(function(){
	window.addEventListener('popstate', (event) => {
		$('.page-current').css('display', 'none').removeClass('page-current');
		$('#page-'+((typeof event?.state?.page==='undefined')?'home':event.state.page)).css('display', 'block').addClass('page-current');
	});
	var originalMenu = window.location.href.indexOf('?page=');
	originalMenu = originalMenu<0?'home':window.location.href.substr(originalMenu+6);
	if ('home,horaires,urgences,team,services,photos,map,liens,conseils,legal,confidentialite'.indexOf(originalMenu)<0) {
		console.log('page not found');
		originalMenu = '404';
	}
	if (originalMenu==='home') $('#menu-home').css('content-visibility','hidden');
	$('#page-'+originalMenu).css('display', 'block').addClass('page-current');

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
					history.pushState({ page: menuID }, menuID, '?page='+menuID);
					$('.page-current').css('display', 'none').removeClass('page-current');
					$('#page-'+menuID).css('display', 'block').addClass('page-current');
					scrollToTop();
					if (menuID==='home') {
						$('#menu-home').css('content-visibility','hidden');
						$('.submenu #menu-home').css('content-visibility','hidden');
					} else {
						$('#menu-home').css('content-visibility','auto');
						$('.submenu #menu-home').css('content-visibility','auto');
					}
				});
			break;
		}
		return false;
	});
	
	$('.link').click(function() {
		let menuID = this.id.substr(5);
		$('.page-current').fadeOut('fast',function() {
			history.pushState({ page: menuID }, menuID, '?page='+menuID);
			$('.page-current').css('display', 'none').removeClass('page-current');
			$('#page-'+menuID).css('display', 'block').addClass('page-current');
			scrollToTop();
		});
		return false;
	});
	
	$('#page-photos').load('photos.html #container', function() {
		const $carousel = $('.carousel');
		const $items = $('.carousel-item img');
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

		// Touch swipe handling
            let startX = 0;
            let endX = 0;

            $('.carousel').on('touchstart', function(e) {
                startX = e.originalEvent.touches[0].clientX;
            });

            $('.carousel').on('touchmove', function(e) {
                endX = e.originalEvent.touches[0].clientX;
            });

            $('.carousel').on('touchend', function() {
                if (startX - endX > 50 && currentIndex < totalItems - 1) {
                    currentIndex++;
                } else if (endX - startX > 50 && currentIndex > 0) {
                    currentIndex--;
                }
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
	$('#page-team').load('team.html #container');
	$('#page-services').load('services.html #container');
	$('#page-liens').load('liens.html #container');
	$('#page-conseils').load('conseils.html #container',function() {
		/*
		$('#page-conseils a').click(function() {
			if (this.href.indexOf('#')<0) $('#page-content').load(this.href);
			else {
				if ($('#'+this.id+' ~ ul:first').hasClass('menu-current')) $('#'+this.id+' ~ ul').removeClass('menu-current');
				else {
					$('.menu-current').removeClass('menu-current');
					console.log(this.id);
					console.log(this.id.substr(0,this.id.lastIndexOf('-')));
					$('#'+this.id.substr(0,this.id.lastIndexOf('-'))+' ~ ul').addClass('menu-current');
					$('#'+this.id+' ~ ul').addClass('menu-current');
				}
			}
			return false;
		});
		*/
	});
	$('#page-legal').load('legal.html #container');
	$('#page-horaires').load('horaires.html #container');
	$('#page-urgences').load('urgences.html #container');
});
