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

	  var $drpTrigger = $(".btn-filter")

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


		function resetdrpTrigger(){
			$drpTrigger.html('Filter Unassigned Drivers').removeClass('filter__assigned')
		}

		$drpTrigger.on('show.daterangepicker', function(ev, picker) {
			var $drpContainer = $(picker.container)
			if ($drpContainer.find('.filter-header').length === 0) {
				$drpContainer.prepend('<header class="filter-header">View Available Drivers Between</header>')
			}
		});

		$drpTrigger.on('apply.daterangepicker', function(ev, picker) {
			var filterStartDate = picker.startDate,
					filterEndDate = picker.endDate,
					availString = 'Availability ' + filterStartDate.format('MM/DD/YY') + '-' + filterEndDate.format('MM/DD/YY')

			console.log(filterStartDate, filterEndDate)

			$drpTrigger.html(availString).addClass('filter__assigned').append('<span class="close">X</span>')
			$drpTrigger.find('.close').on('click', function(e){
				e.stopPropagation()
				resetdrpTrigger()
			})
		});

		$drpTrigger.on('cancel.daterangepicker', function(ev, picker) {
			resetdrpTrigger()
		});

	});



});
