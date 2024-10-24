$(document).ready(function(){
	$('a').click(function() {
		if (this.href.indexOf('#')<0) $('#page-content').html('contenu distant: '+this.href); // $('#page-content').load(this.href);
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
});