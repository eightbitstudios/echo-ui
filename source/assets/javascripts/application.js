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

	  	if (!$(this).is('.btn-date-picker, .btn-single-dp, .btn-filter-dropdown')) {
	  		resetDropdownButton();
	  		resetSdpTrigger();

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

	  function resetFilterBtns() {
	  	$('.filter-bar').find('.close').remove()
	  	$('.filter__assigned').removeClass('filter__assigned');
	  }

	  // Single Date Picker JS

	  var $sdpTrigger = $('.btn-single-dp')

	  if ($sdpTrigger.hasClass('filter__assigned')) {
	    resetSdpTrigger
	  }

		$sdpTrigger.daterangepicker({
			singleDatePicker: true,
			buttonClasses: "btn",
			applyClass: "btn-default",
			cancelClass: "btn-link btn-alt",
			autoApply: false,
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

		function resetSdpTrigger() {
			$sdpTrigger.html('APPT. Date').removeClass('filter__assigned');
			$sdpTrigger.removeClass('active');
			$sdpTrigger.blur();
		}

		$sdpTrigger.on('show.daterangepicker', function(ev, picker) {
			$sdpTrigger.addClass('active');
			var $sdpContainer = $(picker.container)
			$sdpContainer.addClass('single-datepicker');
			$('label[for=daterangepicker_start]').remove();
			if ($sdpTrigger.find('input[type=checkbox]').length === 0) {
				$('.single-datepicker').append(
					'<div class="checkboxes">' +
						'<div class="checkbox control">' +
							'<label class="checkbox-inline">' +
							  '<input type="checkbox" id="pickups" name="pickups" value="pickups">' +
							  '<span class="control-indicator"/>' +
							  'Pickups' +
							'</label>' +
						'</div>' +
						'<div class="checkbox control">' +
							'<label class="checkbox-inline">' +
							  '<input type="checkbox" id="deliveries" name="deliveries" value="deliveries">' +
							  '<span class="control-indicator"/>' +
							  'Deliveries' +
							'</label>' +
						'</div>' +
					'</div>'
				);
			}
		});

		$sdpTrigger.on('apply.daterangepicker', function(ev, picker) {
			var filterStartDate = picker.startDate,
					availString = 'Appt Date: ' + filterStartDate.format('MM/DD/YY')

			resetDropdownButton();
			resetFilterBtns();

			$sdpTrigger.html(availString).addClass('filter__assigned').append('<span class="close">X</span>');
			$sdpTrigger.removeClass('active');

			$sdpTrigger.find('.close').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				resetSdpTrigger();
			})
		});

		$sdpTrigger.on('cancel.daterangepicker', function(ev, picker) {
			$('input[name=daterangepicker_start], input[name=daterangepicker_end]').val('');
			resetSdpTrigger();
		});

		$sdpTrigger.on('blur.daterangepicker', function(ev, picker) {
			$sdpTrigger.removeClass('active');
		});



		// Date Range Picker JS

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

		// Dropdown Filter JS

		var $dropdownButton = $('.btn-filter-dropdown'),
				$dropdown = $('.dropdown-filter')

		$dropdownButton.on('click', function(e) {
			e.stopPropagation()
			var left = $(this).position().left,
			    top = $(this).position().top,
			    height = $(this).height(),
			    formTop = top + height + 25
			$dropdown.css({top: formTop + 'px', left: left + 'px'}).toggle();
			$dropdown.find('.cancelBtn').unbind('click').on('click', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				resetDropdownFilter($dropdown, ev.target);
			})
			$dropdown.find('.applyBtn').unbind('click').on('click', function(evt){
				evt.preventDefault();
				evt.stopPropagation();
				applyDropdownFilter($dropdown, evt.target)
			})
		});

		$(document).on('click', function (e) {
	    if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
        resetDropdownFilter($dropdown);
	    }
		});

		function resetDropdownFilter() {
			$dropdown.find('input').val('');
			$dropdown.hide();
			$dropdown.find('input[type=checkbox]').prop('checked', false);
		}

		function resetDropdownButton() {
			$btnFilter.blur()
			$('.close').remove();
			$('.btn-filter-dropdown').html('Stop Location').removeClass('filter__assigned');
		}

		function applyDropdownFilter() {
			var location = $dropdown.find('input#location').val();
			if (location == '') {
				location = 'Stop Location'
			}

			resetSdpTrigger();
			resetFilterBtns();

			$dropdownButton.html(location).addClass('filter__assigned').append('<span class="close">X</span>')
			$dropdownButton.find('.close').on('click', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				resetDropdownButton();
			})
			$dropdown.toggle()
		}

	});



});
