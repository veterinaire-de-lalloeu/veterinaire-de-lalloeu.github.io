$(document).ready(function(){
	let toggleTS = 0;
	
	$('#page-home').css('display', 'block').addClass('page-current');
	
	$('.menu-item.dropdown').hover(
		function(){
			toggleTS = (new Date()).getTime();
			$(this).find('.submenu').addClass('menu-open');
		},
		function(){
			toggleTS = 0;
			$(this).find('.submenu').removeClass('menu-open');
		}
	);
	
	$('.navbar .menu a').click(function(){
		let menuID = this.id.substr(5);
		switch(menuID) {
			case 'cabinet':
			case 'aide':
				if ($('#'+this.id+' ~ .submenu').hasClass('menu-open')) {
					if ((new Date()).getTime()-toggleTS>100) $('#'+this.id+' ~ .submenu').removeClass('menu-open');
					else console.log('double click');
				} else $('#'+this.id+' ~ .submenu').addClass('menu-open');
			break;
			default:
				$('.menu-item.dropdown .submenu.menu-open').removeClass('menu-open');
				$('.page-current').css('display', 'none').removeClass('page-current');
				$('#page-'+menuID).css('display', 'block').addClass('page-current');
			break;
		}
		toggleTS = 0;
		return false;
	});
	
	$('#link-map').click(function() {
		$('.page-current').css('display', 'none').removeClass('page-current');
		$('#page-map').css('display', 'block').addClass('page-current');
	});
});