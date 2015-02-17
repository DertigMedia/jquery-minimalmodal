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
			opacity: 0.4,			
			top: 100,
			width: 520,

			// selectors,			
			selector: ".mimo_open",
			close: ".mimo_close",
			modal: ".mimo_modal",
			background: "#mimo_bg"
        };

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

		this.$modal = $("#" + $(element).attr("href").replace("#", ""));
		
		var attributes = stringToObject(this.$modal.data('mimo'));
		
		this.options = $.extend({}, defaults, attributes, options);
		this.options.close = "." + this.options.close.replace(/["'\.]/g, "");		
		this.element = element;

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
			 	$("<div class=" + defaults.close.replace(/\./, "") + ">&#10799;</div>")
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
				.css({ backgroundColor: this.options["background-color"] })
				.fadeTo(250, this.options.opacity);

			this.$modal				
				.css({ maxWidth: Number(this.options.width) })
				.fadeTo(250, 1);
			
			this.centerModal();																
			
		},

		closeModal: function () {

			$(this.options.background + ", " + this.options.modal).hide();
			$(this.options.background).css({ backgroundColor: "" });
			
		},

		centerModal: function () {			

			var width = this.$modal.outerWidth(true),
				height = this.$modal.outerHeight(true),
				clientWidth = $(window).width(),
				clientHeight = $(window).height(),
				left = (clientWidth - width) / 2,					
				top = (clientHeight - height) / 2;

			// prevent weird resize effects
			if (width < this.options.width) {
				left = 0;
			} 

			// bounds checking
			left = (left < 0) ? 0 : left;
			top = (top < 0) ? 0 : (top > this.options.top) ? top = this.options.top : top;	

			top += $(window).scrollTop();

			this.$modal.css({
				left: left,
				top: top
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

	$(window).on("resize", function () {	
		// setTimeout 0 for older versions of safari 
		setTimeout(function () { 
			$(defaults.selector).each(function () { 			
				$.data( this, dataKey ).centerModal();
			});
		}, 0);
	});
			
	$(document).on("keydown", function(event) {				
			
		if (event.keyCode === 27) {
			$(defaults.selector).each(function () { $.data( this, dataKey ).closeModal(); });
		}
		
	});

	//------------------------------[ global plugin init on document.ready ]------------------------------

	$(defaults.selector).each(function () { $(this).minimodal(); });


})(jQuery);