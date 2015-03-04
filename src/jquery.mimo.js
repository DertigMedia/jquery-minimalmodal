/*
 * jQuery minimal modal plugin
 * 
 * authored by Dertig Media (https://www.30.nl)
 * v. 0.8 - 2015
 *
 * see https://minimalmodal.30.nl for examples
 * We used the awesome jQuery Boilterplate, http://jqueryboilerplate.com/
 *
 */

;(function($) {

	var pluginName = "minimodal",
		dataKey = "plugin_" + pluginName,
		defaults = {
			
			// default options
			opacity: 0.3,				
			top: 100,
			width: 520,

			// selectors
			close: ".mimo_close",			
			background: "#mimo_bg",
			onAfterOpen: function () {}
		},
		windowWidth;
		
	//------------------------------[ private methods ]------------------------------

	// see
	// http://stackoverflow.com/questions/1086404/string-to-object-in-js
	var stringToObject = function (string) {

		if (typeof string !== 'string') {
			return;
		}

		var properties = string.split(';'),
			obj = {};

		for (var i = 0; i < properties.length; i++) {
			var property = properties[i],
				tup = property.split(':');
				
			if (!tup)
				continue;

			tup[0] = $.trim(tup[0]);			
			tup[1] = $.trim(tup[1]);

			if (tup[0] === "" || tup[1] === "")
				continue;

			obj[tup[0]] = tup[1];
		}

		return obj;

	};

	//------------------------------[ constructor ]------------------------------

	function Minimodal(element, options) {
		
		var attributes = stringToObject($(element).data('mimo'));		
		this.options = $.extend({}, defaults, attributes, options);		
		this.options.close = "." + this.options.close.replace(/["'\.]/g, "");	
		this.options.top = Number(this.options.top);

		if (!this.options.modal) {
			throw "Cannot start minimodal without modal attribute in options";
		}
		
		this.element = element;		

		this.$modal = $("#" + this.options.modal.replace("#", ""));		

		this.init();

	}

	//------------------------------[ prototype ]------------------------------

	$.extend(Minimodal.prototype, {

		init: function () {

			var self = this;

			this.onClick = function (event) {
				self.openModal();
				$(self.options.close + ", "  + self.options.background).on("click", self.onClickClose);
				event.preventDefault();
				
			};

			this.onClickClose = function (event) {
				self.closeModal();
				$(self.options.close + ", "  + self.options.background).off("click", self.onClickClose);
				event.preventDefault();
				
			};

			$(this.element).on("click", this.onClick);

			$closeButton = this.$modal.find(this.options.close);
			// create close button if one does not exist already.
			if (!$closeButton.length) {
			 	$("<div class=" + defaults.close.replace(/\./, "") + ">&#x2715;</div>")
			 		.prependTo(this.$modal);
			 	this.options.close = defaults.close;
			}
			
		},

		destroy: function () {

			$(this.element).off("click", this.onClick);
			
		},

		/*
		*
		*	functions for opening, closing, centering modal
		*
		*/

		openModal: function () {

			// create a background div if one does not exist yet
			if (!$(this.options.background).length) {
				$("body").append($("<div></div>").attr("id", this.options.background.replace(/#/g, "")));
				
			}

			$(this.options.background)
				.css({ backgroundColor: this.options.color })
				.fadeTo(250, this.options.opacity);

			this.$modal				
				.css({ maxWidth: Number(this.options.width) })
				.fadeTo(250, 1);
			
			this.centerModal();				

			if (typeof this.options.onAfterOpen === 'function')	{
				this.options.onAfterOpen();
			}											
			
		},

		closeModal: function () {

			$(this.options.background).hide();
			this.$modal.hide();
			$(this.options.background).css({ backgroundColor: "" });
			
		},

		centerModal: function () {			
			
			// force a redraw of the modal 
			// this fixes a lot of window resize issues on several devices
			this.$modal.css({ left: 0 });

			var width = this.$modal.outerWidth(true),
				height = this.$modal.outerHeight(true),
				clientWidth = $(window).outerWidth(true),
				clientHeight = $(window).outerHeight(true),
				left = (clientWidth - width) / 2 | 0,					
				top = (clientHeight - height) / 2 | 0;

			// bounds checking
			left = (left < 0) ? 0 : left;
			top = (top < 0) ? 0 : (top > this.options.top) ? top = this.options.top : top;	

			top += $(window).scrollTop();

			this.$modal.css({
				left: Number(left),
				top: Number(top)
			});

		}

	});

	//------------------------------[ plugin wrapper ]------------------------------

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations

	$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
					if ( $.data( this, dataKey ) ) {
						$.data( this, dataKey ).destroy();
					}
					$.data( this, dataKey, new Minimodal( this, options ) );
			});
	};

	//------------------------------[ global event handlers ]------------------------------

	// store windowWidth to check if resize events are actual resizes, not scroll events
	// see http://stackoverflow.com/questions/17328742/
	windowWidth = $(window).width();	

	$(window).on("resize", function (event) {	
		if ($(window).width() == windowWidth) {
			return;
		}

		windowWidth = $(window).width();
			
		$(defaults.selector).each(function () { 	
			$.data( this, dataKey ).centerModal();				
		});
		
	});
			
	$(document).on("keydown", function(event) {				
			
		if (event.keyCode === 27) {
			$(defaults.selector).each(function () { $.data( this, dataKey ).closeModal(); });
		}
		
	});

	//------------------------------[ global plugin init on document.ready ]------------------------------

	$(function () {
		$("*[data-mimo]").each(function () { $(this).minimodal(); });
	});

})(jQuery);