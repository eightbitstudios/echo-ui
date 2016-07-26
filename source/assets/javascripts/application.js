// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Place any jQuery/helper plugins in here.
$(window).load(function(){

	if ($('.search-list').length) {

		$('.search-list').mCustomScrollbar({
			theme: 'minimal-dark'
		});

	}

	$(function() {
	  $('.match-height').matchHeight();

	  var $btnFilter = $(".btn-filter")

	  $btnFilter.on('click', function(e) {
	  	e.preventDefault();
	  	width = $(this).width()

	  	if (!$(this).is('.btn-date-picker, .btn-single-dp')) {

	  		if ($(this).hasClass('filter__assigned')) {
	  			resetFilterBtns();
	  			// Helps keep width from transitioning
	  			// so much when text changes
	  			$(this).width(width)
	  			$btnFilter.blur()
	  		} else {
	  			resetFilterBtns();
	  			$(this).addClass('filter__assigned').append('<span class="close">X</span>');
	  		}
	  	}
	  });

	  var $sdpTrigger = $('.btn-single-dp')

	  if ($sdpTrigger.hasClass('filter__assigned')) {
	    resetSdpTrigger
	  }

		$sdpTrigger.daterangepicker({
			singleDatePicker: true,
			buttonClasses: "btn",
			applyClass: "btn-default",
			cancelClass: "btn-link btn-alt",
			locale: {
				format: "MM/DD/YYYY",
				cancelLabel: "Clear",
				fromLabel: "Test",
				daysOfWeek: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
			  ]
			}
		});

		var $drpTrigger = $(".btn-date-picker")

		if ($drpTrigger.hasClass('filter__assigned')) {
		  resetdrpTrigger()
		}

		$drpTrigger.daterangepicker({
			showDropdowns: true,
			parentEl: '.datepicker',
			buttonClasses: "btn",
			applyClass: "btn-default",
			cancelClass: "btn-link btn-alt",
			locale: {
				format: "MM/DD/YYYY",
				cancelLabel: "Clear",
				fromLabel: "Starting",
				toLabel: "Ending",
				daysOfWeek: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
			  ]
			}
		});

		function resetFilterBtns() {
			$('.filter-bar').find('.close').remove()
			$('.filter__assigned').removeClass('filter__assigned');
		}

		function resetSdpTrigger() {
			$sdpTrigger.html('APPT. Date').removeClass('filter__assigned')
		}

		function resetdrpTrigger(){
			$drpTrigger.html('Filter Unassigned Drivers').removeClass('filter__assigned')
		}

		$sdpTrigger.on('show.daterangepicker', function(ev, picker) {
			var $sdpContainer = $(picker.container)
			$sdpContainer.addClass('single-datepicker');
			$('.single-datepicker th[colspan=6]').prop('colspan', 5);
			$('label[for=daterangepicker_start]').remove();
		});

		$sdpTrigger.on('apply.daterangepicker', function(ev, picker) {
			var filterStartDate = picker.startDate,
					availString = 'Appt Date: ' + filterStartDate.format('MM/DD/YY')

			$sdpTrigger.html(availString).addClass('filter__assigned').append('<span class="close">X</span>')
			$drpTrigger.find('.close').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				resetdrpTrigger();
			})
		});

		$sdpTrigger.on('cancel.daterangepicker', function(ev, picker) {
			$('input[name=daterangepicker_start], input[name=daterangepicker_end]').val('');
			resetSdpTrigger();
		});

		$drpTrigger.on('show.daterangepicker', function(ev, picker) {
			var $drpContainer = $(picker.container)
			if ($drpContainer.find('.filter-header').length === 0) {
				$drpContainer.prepend('<header class="filter-header">View Available Drivers Between</header>')
			}
		});

		$drpTrigger.on('apply.daterangepicker', function(ev, picker) {
			var filterStartDate = picker.startDate,
					filterEndDate = picker.endDate,
					availString = 'Availability ' + filterStartDate.format('MM/DD') + '-' + filterEndDate.format('MM/DD')

			console.log(filterStartDate, filterEndDate)

			$drpTrigger.html(availString).addClass('filter__assigned').append('<span class="close">X</span>')
			$drpTrigger.find('.close').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				resetdrpTrigger();
			})
		});

		$drpTrigger.on('cancel.daterangepicker', function(ev, picker) {
			resetdrpTrigger()
		});

	});



});
