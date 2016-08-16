

// Place any jQuery/helper plugins in here.
$(window).load(function(){

	$('.modal').modal('show');

	//helper for search box text
	/////////

	$('input.search-form-input').on('change keyup click paste', function() {
		if ($(this).val().length > 0) 
			$(this).next('.search-help-text').css('opacity', '0')
		else
			$(this).next('.search-help-text').css('opacity', '1')
	})

	//load management details panels collapsing script
	///////////

	if ($('#loads-accordion').length) {

		$('.panel')
			.on('show.bs.collapse', function (e) {
		  	$(this)
		  		.find('.panel-heading')
		  		.removeClass('panel-closed')
		  		.addClass('panel-open')
			})
			.on('hide.bs.collapse', function (e) {
		  	$(this)
		  		.find('.panel-heading')
		  		.removeClass('panel-open')
		  		.addClass('panel-closed')
			});
	}


	//Echo Rep search sidebar custom scrollbar
	///////////

	$('.table-modal-scroll').mCustomScrollbar({
		theme: 'minimal-dark'
	});

	if ($('.sidebar-list.search-results').length) {
		
		$('.sidebar-list').mCustomScrollbar({
			theme: 'minimal-dark'
		});

	}


	$(function() {

	//Read more toggle
	///////////

		$('.btn-read-more').on('click', function(e){
			e.preventDefault()

			var $readMoreBtn = $(e.target),
					$readMoreContent = $readMoreBtn.prev('.read-more-content');

			if ($readMoreBtn.hasClass('read-open')) {
				$readMoreBtn.text('Read More').removeClass('read-open')
				$readMoreContent.animate({
					height: '79px'
				}, 300)
			} else {
				$readMoreBtn.text('Show Less').addClass('read-open')
				$readMoreContent.animate({
					height: '100%'
				}, 300)
			}

		})


		//inline editing buttons
		/////////

		$('.btn-inline-edit').on('click', function(e){
			inlineContentEdit(this)
			e.preventDefault()
		})

		function inlineContentEdit(editBtn) {
			var $editBtn = $(editBtn),
					$editParent = $editBtn.parent('.inline-edit-content')

			$editBtn.hide()
			$editParent.next().slideToggle()

			$('.form-inline-editing').find('[type="reset"]').on('click', function(){
				$editBtn.show()
				$(this).closest('.form-inline-editing').hide()
			})

		}

		/////////////
		// Match Height for Driver List table sizing
	  $('.match-height').matchHeight();


	  /////////////
	  // Load Management Filter button toggles
		/////////////
	  var $btnFilter = $(".btn-filter")

	  $btnFilter.on('click', function(e) {
	  	e.preventDefault();
	  	width = $(this).width()

	  	if (!$(this).is('.btn-date-picker, .btn-single-dp, .btn-filter-dropdown')) {
	  		resetDropdownButton();
	  		resetSdpTrigger();

	  		if ($(this).hasClass('filter__assigned')) {
	  			resetFilterBtns();
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
		
		/////////////
	  // Single Date Picker JS
		/////////////
	  
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
			$sdpTrigger.blur();
		}

		$sdpTrigger.on('show.daterangepicker', function(ev, picker) {
			$sdpTrigger.addClass('active');
			$('label[for=daterangepicker_start]').remove();
			
			var $sdpContainer = $(picker.container)
			$sdpContainer.addClass('single-datepicker');

			if ($('.daterangepicker').find('.checkboxes').length === 0) {
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

		$sdpTrigger.on('hide.daterangepicker', function(ev, picker) {
			$sdpTrigger.removeClass('active');
		});


		/////////////
		// Date Range Picker JS
		/////////////

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
				fromLabel: "Unassigned From",
				toLabel: "Until",
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

		/////////////
		// Stop Location Dropdown Filter JS
		/////////////

		var $dropdownButton = $('.btn-filter-dropdown'),
				$dropdown = $('.dropdown-filter')

		$dropdownButton.on('click', function(e) {
			e.stopPropagation()

			if ($dropdownButton.hasClass('btn-active')) {
				$dropdownButton.removeClass('btn-active')
			} else {
				$dropdownButton.addClass('btn-active')
			}
			
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
			$('#location').keypress(function(e){
			  if(e.which == 13){//Enter key pressed
			    $dropdown.find('.applyBtn').click();
			  }
			});
		});

		$(document).on('click', function (e) {
	    if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
        resetDropdownFilter($dropdown);
	    }
		});

		function resetDropdownFilter() {
			$dropdown.find('input').val('');
			$dropdown.hide();

			$sdpTrigger.removeClass('btn-active')
			$dropdownButton.removeClass('btn-active')
			$dropdown.find('input[type=checkbox]').prop('checked', false);
		}

		function resetDropdownButton() {
			$btnFilter.blur()
			$('.close').remove();
			$('.btn-filter-dropdown').html('Stop Location').removeClass('filter__assigned');
			resetDropdownFilter()
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

			$dropdownButton.removeClass('btn-active')
			$sdpTrigger.removeClass('active')
			$dropdown.toggle()
		}

	});



});
