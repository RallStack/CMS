/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/custom.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/custom.js":
/*!*****************************!*\
  !*** ./assets/js/custom.js ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_ADD_MENU = $('#sidebar-add-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function () {
    // TODO: This is some kind of easy fix, maybe we can improve this

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    var setContentHeight = function setContentHeight() {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function (ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each(function () {
            $(this).dataTable().fnDraw();
        });
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing

    $SIDEBAR_ADD_MENU.find('a').on('click', function (ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_ADD_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_ADD_MENU.find('li ul').slideUp();
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_ADD_MENU.find('li.active ul').hide();
            $SIDEBAR_ADD_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_ADD_MENU.find('li.active-sm ul').show();
            $SIDEBAR_ADD_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each(function () {
            $(this).dataTable().fnDraw();
        });
    });

    // check active menu
    $SIDEBAR_ADD_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_ADD_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel: { preventDefault: true }
        });
    }
});
// /Sidebar

// Panel toolbox
$(document).ready(function () {
    $('.collapse-link').on('click', function () {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
$(document).ready(function () {
    if ($(".progress .progress-bar")[0]) {
        $('.progress .progress-bar').progressbar();
    }
});
// /Progressbar

// Switchery
$(document).ready(function () {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery

// iCheck
$(document).ready(function () {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

// Accordion
$(document).ready(function () {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).on('load', function () {
        NProgress.done();
    });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODRlYzI3MGUyZWRmYWRmNzRkZmIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2N1c3RvbS5qcyJdLCJuYW1lcyI6WyJDVVJSRU5UX1VSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwiJEJPRFkiLCIkIiwiJE1FTlVfVE9HR0xFIiwiJFNJREVCQVJfTUVOVSIsIiRTSURFQkFSX0FERF9NRU5VIiwiJFNJREVCQVJfRk9PVEVSIiwiJExFRlRfQ09MIiwiJFJJR0hUX0NPTCIsIiROQVZfTUVOVSIsIiRGT09URVIiLCJkb2N1bWVudCIsInJlYWR5IiwidG9vbHRpcCIsInNldENvbnRlbnRIZWlnaHQiLCJjc3MiLCJoZWlnaHQiLCJib2R5SGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJmb290ZXJIZWlnaHQiLCJoYXNDbGFzcyIsImxlZnRDb2xIZWlnaHQiLCJlcSIsImNvbnRlbnRIZWlnaHQiLCJmaW5kIiwib24iLCJldiIsIiRsaSIsInBhcmVudCIsImlzIiwicmVtb3ZlQ2xhc3MiLCJzbGlkZVVwIiwiYWRkQ2xhc3MiLCJzbGlkZURvd24iLCJoaWRlIiwic2hvdyIsInRvZ2dsZUNsYXNzIiwiZWFjaCIsImRhdGFUYWJsZSIsImZuRHJhdyIsImZpbHRlciIsInBhcmVudHMiLCJmbiIsIm1DdXN0b21TY3JvbGxiYXIiLCJhdXRvSGlkZVNjcm9sbGJhciIsInRoZW1lIiwibW91c2VXaGVlbCIsInByZXZlbnREZWZhdWx0IiwiJEJPWF9QQU5FTCIsImNsb3Nlc3QiLCIkSUNPTiIsIiRCT1hfQ09OVEVOVCIsImF0dHIiLCJzbGlkZVRvZ2dsZSIsInJlbW92ZUF0dHIiLCJjbGljayIsInJlbW92ZSIsImNvbnRhaW5lciIsInByb2dyZXNzYmFyIiwiZWxlbXMiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaHRtbCIsInN3aXRjaGVyeSIsIlN3aXRjaGVyeSIsImNvbG9yIiwiaUNoZWNrIiwiY2hlY2tib3hDbGFzcyIsInJhZGlvQ2xhc3MiLCJjaGVja1N0YXRlIiwiY291bnRDaGVja2VkIiwiY2hlY2tDb3VudCIsImxlbmd0aCIsIm5leHQiLCIkZXhwYW5kIiwidGV4dCIsIk5Qcm9ncmVzcyIsInN0YXJ0IiwiZG9uZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxJQUFJQSxjQUFjQyxPQUFPQyxRQUFQLENBQWdCQyxJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsRUFBbUNBLEtBQW5DLENBQXlDLEdBQXpDLEVBQThDLENBQTlDLENBQWxCO0FBQUEsSUFDSUMsUUFBUUMsRUFBRSxNQUFGLENBRFo7QUFBQSxJQUVJQyxlQUFlRCxFQUFFLGNBQUYsQ0FGbkI7QUFBQSxJQUdJRSxnQkFBZ0JGLEVBQUUsZUFBRixDQUhwQjtBQUFBLElBSUlHLG9CQUFvQkgsRUFBRSxtQkFBRixDQUp4QjtBQUFBLElBS0lJLGtCQUFrQkosRUFBRSxpQkFBRixDQUx0QjtBQUFBLElBTUlLLFlBQVlMLEVBQUUsV0FBRixDQU5oQjtBQUFBLElBT0lNLGFBQWFOLEVBQUUsWUFBRixDQVBqQjtBQUFBLElBUUlPLFlBQVlQLEVBQUUsV0FBRixD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IFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvY3VzdG9tLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg0ZWMyNzBlMmVkZmFkZjc0ZGZiIiwiLyoqXHJcbiAqIFRvIGNoYW5nZSB0aGlzIGxpY2Vuc2UgaGVhZGVyLCBjaG9vc2UgTGljZW5zZSBIZWFkZXJzIGluIFByb2plY3QgUHJvcGVydGllcy5cclxuICogVG8gY2hhbmdlIHRoaXMgdGVtcGxhdGUgZmlsZSwgY2hvb3NlIFRvb2xzIHwgVGVtcGxhdGVzXHJcbiAqIGFuZCBvcGVuIHRoZSB0ZW1wbGF0ZSBpbiB0aGUgZWRpdG9yLlxyXG4gKi9cclxuXHJcbnZhciBDVVJSRU5UX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0uc3BsaXQoJz8nKVswXSxcclxuICAgICRCT0RZID0gJCgnYm9keScpLFxyXG4gICAgJE1FTlVfVE9HR0xFID0gJCgnI21lbnVfdG9nZ2xlJyksXHJcbiAgICAkU0lERUJBUl9NRU5VID0gJCgnI3NpZGViYXItbWVudScpLFxyXG4gICAgJFNJREVCQVJfQUREX01FTlUgPSAkKCcjc2lkZWJhci1hZGQtbWVudScpLFxyXG4gICAgJFNJREVCQVJfRk9PVEVSID0gJCgnLnNpZGViYXItZm9vdGVyJyksXHJcbiAgICAkTEVGVF9DT0wgPSAkKCcubGVmdF9jb2wnKSxcclxuICAgICRSSUdIVF9DT0wgPSAkKCcucmlnaHRfY29sJyksXHJcbiAgICAkTkFWX01FTlUgPSAkKCcubmF2X21lbnUnKSxcclxuICAgICRGT09URVIgPSAkKCdmb290ZXInKTtcclxuXHJcbi8vIFNpZGViYXJcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBUT0RPOiBUaGlzIGlzIHNvbWUga2luZCBvZiBlYXN5IGZpeCwgbWF5YmUgd2UgY2FuIGltcHJvdmUgdGhpc1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHNldENvbnRlbnRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgaGVpZ2h0XHJcbiAgICAgICAgJFJJR0hUX0NPTC5jc3MoJ21pbi1oZWlnaHQnLCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG5cclxuICAgICAgICB2YXIgYm9keUhlaWdodCA9ICRCT0RZLm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGZvb3RlckhlaWdodCA9ICRCT0RZLmhhc0NsYXNzKCdmb290ZXJfZml4ZWQnKSA/IC0xMCA6ICRGT09URVIuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGxlZnRDb2xIZWlnaHQgPSAkTEVGVF9DT0wuZXEoMSkuaGVpZ2h0KCkgKyAkU0lERUJBUl9GT09URVIuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQgPSBib2R5SGVpZ2h0IDwgbGVmdENvbEhlaWdodCA/IGxlZnRDb2xIZWlnaHQgOiBib2R5SGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgY29udGVudFxyXG4gICAgICAgIGNvbnRlbnRIZWlnaHQgLT0gJE5BVl9NRU5VLmhlaWdodCgpICsgZm9vdGVySGVpZ2h0O1xyXG5cclxuICAgICAgICAkUklHSFRfQ09MLmNzcygnbWluLWhlaWdodCcsIGNvbnRlbnRIZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgIHZhciAkbGkgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICBpZiAoJGxpLmlzKCcuYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJGxpLnJlbW92ZUNsYXNzKCdhY3RpdmUgYWN0aXZlLXNtJyk7XHJcbiAgICAgICAgICAgICQoJ3VsOmZpcnN0JywgJGxpKS5zbGlkZVVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsb3NpbmcgbWVudSBpZiB3ZSBhcmUgb24gY2hpbGQgbWVudVxyXG4gICAgICAgICAgICBpZiAoISRsaS5wYXJlbnQoKS5pcygnLmNoaWxkX21lbnUnKSkge1xyXG4gICAgICAgICAgICAgICAgJFNJREVCQVJfTUVOVS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUgYWN0aXZlLXNtJyk7XHJcbiAgICAgICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpIHVsJykuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkbGkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJCgndWw6Zmlyc3QnLCAkbGkpLnNsaWRlRG93bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdG9nZ2xlIHNtYWxsIG9yIGxhcmdlIG1lbnVcclxuICAgICRNRU5VX1RPR0dMRS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJEJPRFkuaGFzQ2xhc3MoJ25hdi1tZCcpKSB7XHJcbiAgICAgICAgICAgICRTSURFQkFSX01FTlUuZmluZCgnbGkuYWN0aXZlIHVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpLmFjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUtc20nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJFNJREVCQVJfTUVOVS5maW5kKCdsaS5hY3RpdmUtc20gdWwnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICRTSURFQkFSX01FTlUuZmluZCgnbGkuYWN0aXZlLXNtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtc20nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRCT0RZLnRvZ2dsZUNsYXNzKCduYXYtbWQgbmF2LXNtJyk7XHJcblxyXG4gICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgJCgnLmRhdGFUYWJsZScpLmVhY2ggKCBmdW5jdGlvbiAoKSB7ICQodGhpcykuZGF0YVRhYmxlKCkuZm5EcmF3KCk7IH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2hlY2sgYWN0aXZlIG1lbnVcclxuICAgICRTSURFQkFSX01FTlUuZmluZCgnYVtocmVmPVwiJyArIENVUlJFTlRfVVJMICsgJ1wiXScpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnY3VycmVudC1wYWdlJyk7XHJcblxyXG4gICAgJFNJREVCQVJfTUVOVS5maW5kKCdhJykuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ocmVmID09IENVUlJFTlRfVVJMO1xyXG4gICAgfSkucGFyZW50KCdsaScpLmFkZENsYXNzKCdjdXJyZW50LXBhZ2UnKS5wYXJlbnRzKCd1bCcpLnNsaWRlRG93bihmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRDb250ZW50SGVpZ2h0KCk7XHJcbiAgICB9KS5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgLy8gcmVjb21wdXRlIGNvbnRlbnQgd2hlbiByZXNpemluZ1xyXG5cclxuICAgICRTSURFQkFSX0FERF9NRU5VLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgIHZhciAkbGkgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICBpZiAoJGxpLmlzKCcuYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJGxpLnJlbW92ZUNsYXNzKCdhY3RpdmUgYWN0aXZlLXNtJyk7XHJcbiAgICAgICAgICAgICQoJ3VsOmZpcnN0JywgJGxpKS5zbGlkZVVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsb3NpbmcgbWVudSBpZiB3ZSBhcmUgb24gY2hpbGQgbWVudVxyXG4gICAgICAgICAgICBpZiAoISRsaS5wYXJlbnQoKS5pcygnLmNoaWxkX21lbnUnKSkge1xyXG4gICAgICAgICAgICAgICAgJFNJREVCQVJfQUREX01FTlUuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlIGFjdGl2ZS1zbScpO1xyXG4gICAgICAgICAgICAgICAgJFNJREVCQVJfQUREX01FTlUuZmluZCgnbGkgdWwnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRsaS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkKCd1bDpmaXJzdCcsICRsaSkuc2xpZGVEb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0b2dnbGUgc21hbGwgb3IgbGFyZ2UgbWVudVxyXG4gICAgJE1FTlVfVE9HR0xFLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkQk9EWS5oYXNDbGFzcygnbmF2LW1kJykpIHtcclxuICAgICAgICAgICAgJFNJREVCQVJfQUREX01FTlUuZmluZCgnbGkuYWN0aXZlIHVsJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkU0lERUJBUl9BRERfTUVOVS5maW5kKCdsaS5hY3RpdmUnKS5hZGRDbGFzcygnYWN0aXZlLXNtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRTSURFQkFSX0FERF9NRU5VLmZpbmQoJ2xpLmFjdGl2ZS1zbSB1bCcpLnNob3coKTtcclxuICAgICAgICAgICAgJFNJREVCQVJfQUREX01FTlUuZmluZCgnbGkuYWN0aXZlLXNtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtc20nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRCT0RZLnRvZ2dsZUNsYXNzKCduYXYtbWQgbmF2LXNtJyk7XHJcblxyXG4gICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgJCgnLmRhdGFUYWJsZScpLmVhY2ggKCBmdW5jdGlvbiAoKSB7ICQodGhpcykuZGF0YVRhYmxlKCkuZm5EcmF3KCk7IH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2hlY2sgYWN0aXZlIG1lbnVcclxuICAgICRTSURFQkFSX0FERF9NRU5VLmZpbmQoJ2FbaHJlZj1cIicgKyBDVVJSRU5UX1VSTCArICdcIl0nKS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2N1cnJlbnQtcGFnZScpO1xyXG5cclxuICAgICRTSURFQkFSX0FERF9NRU5VLmZpbmQoJ2EnKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhyZWYgPT0gQ1VSUkVOVF9VUkw7XHJcbiAgICB9KS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2N1cnJlbnQtcGFnZScpLnBhcmVudHMoJ3VsJykuc2xpZGVEb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuICAgIH0pLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyByZWNvbXB1dGUgY29udGVudCB3aGVuIHJlc2l6aW5nXHJcblxyXG4gICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG5cclxuICAgIC8vIGZpeGVkIHNpZGViYXJcclxuICAgIGlmICgkLmZuLm1DdXN0b21TY3JvbGxiYXIpIHtcclxuICAgICAgICAkKCcubWVudV9maXhlZCcpLm1DdXN0b21TY3JvbGxiYXIoe1xyXG4gICAgICAgICAgICBhdXRvSGlkZVNjcm9sbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGhlbWU6ICdtaW5pbWFsJyxcclxuICAgICAgICAgICAgbW91c2VXaGVlbDp7IHByZXZlbnREZWZhdWx0OiB0cnVlIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbi8vIC9TaWRlYmFyXHJcblxyXG4vLyBQYW5lbCB0b29sYm94XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNvbGxhcHNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJEJPWF9QQU5FTCA9ICQodGhpcykuY2xvc2VzdCgnLnhfcGFuZWwnKSxcclxuICAgICAgICAgICAgJElDT04gPSAkKHRoaXMpLmZpbmQoJ2knKSxcclxuICAgICAgICAgICAgJEJPWF9DT05URU5UID0gJEJPWF9QQU5FTC5maW5kKCcueF9jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIC8vIGZpeCBmb3Igc29tZSBkaXYgd2l0aCBoYXJkY29kZWQgZml4IGNsYXNzXHJcbiAgICAgICAgaWYgKCRCT1hfUEFORUwuYXR0cignc3R5bGUnKSkge1xyXG4gICAgICAgICAgICAkQk9YX0NPTlRFTlQuc2xpZGVUb2dnbGUoMjAwLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJEJPWF9QQU5FTC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkQk9YX0NPTlRFTlQuc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgICAgICAgICAgJEJPWF9QQU5FTC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkSUNPTi50b2dnbGVDbGFzcygnZmEtY2hldnJvbi11cCBmYS1jaGV2cm9uLWRvd24nKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5jbG9zZS1saW5rJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkQk9YX1BBTkVMID0gJCh0aGlzKS5jbG9zZXN0KCcueF9wYW5lbCcpO1xyXG5cclxuICAgICAgICAkQk9YX1BBTkVMLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyAvUGFuZWwgdG9vbGJveFxyXG5cclxuLy8gVG9vbHRpcFxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcclxuICAgICAgICBjb250YWluZXI6ICdib2R5J1xyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyAvVG9vbHRpcFxyXG5cclxuLy8gUHJvZ3Jlc3NiYXJcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJChcIi5wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyXCIpWzBdKSB7XHJcbiAgICAgICAgJCgnLnByb2dyZXNzIC5wcm9ncmVzcy1iYXInKS5wcm9ncmVzc2JhcigpO1xyXG4gICAgfVxyXG59KTtcclxuLy8gL1Byb2dyZXNzYmFyXHJcblxyXG4vLyBTd2l0Y2hlcnlcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJChcIi5qcy1zd2l0Y2hcIilbMF0pIHtcclxuICAgICAgICB2YXIgZWxlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc3dpdGNoJykpO1xyXG4gICAgICAgIGVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXRjaGVyeSA9IG5ldyBTd2l0Y2hlcnkoaHRtbCwge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMjZCOTlBJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbi8vIC9Td2l0Y2hlcnlcclxuXHJcbi8vIGlDaGVja1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIGlmICgkKFwiaW5wdXQuZmxhdFwiKVswXSkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXQuZmxhdCcpLmlDaGVjayh7XHJcbiAgICAgICAgICAgICAgICBjaGVja2JveENsYXNzOiAnaWNoZWNrYm94X2ZsYXQtZ3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgcmFkaW9DbGFzczogJ2lyYWRpb19mbGF0LWdyZWVuJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbi8vIC9pQ2hlY2tcclxuXHJcbi8vIFRhYmxlXHJcbiQoJ3RhYmxlIGlucHV0Jykub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNoZWNrU3RhdGUgPSAnJztcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICBjb3VudENoZWNrZWQoKTtcclxufSk7XHJcbiQoJ3RhYmxlIGlucHV0Jykub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tTdGF0ZSA9ICcnO1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgIGNvdW50Q2hlY2tlZCgpO1xyXG59KTtcclxuXHJcbnZhciBjaGVja1N0YXRlID0gJyc7XHJcblxyXG4kKCcuYnVsa19hY3Rpb24gaW5wdXQnKS5vbignaWZDaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tTdGF0ZSA9ICcnO1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgIGNvdW50Q2hlY2tlZCgpO1xyXG59KTtcclxuJCgnLmJ1bGtfYWN0aW9uIGlucHV0Jykub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tTdGF0ZSA9ICcnO1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgIGNvdW50Q2hlY2tlZCgpO1xyXG59KTtcclxuJCgnLmJ1bGtfYWN0aW9uIGlucHV0I2NoZWNrLWFsbCcpLm9uKCdpZkNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGVja1N0YXRlID0gJ2FsbCc7XHJcbiAgICBjb3VudENoZWNrZWQoKTtcclxufSk7XHJcbiQoJy5idWxrX2FjdGlvbiBpbnB1dCNjaGVjay1hbGwnKS5vbignaWZVbmNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGVja1N0YXRlID0gJ25vbmUnO1xyXG4gICAgY291bnRDaGVja2VkKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY291bnRDaGVja2VkKCkge1xyXG4gICAgaWYgKGNoZWNrU3RhdGUgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgJChcIi5idWxrX2FjdGlvbiBpbnB1dFtuYW1lPSd0YWJsZV9yZWNvcmRzJ11cIikuaUNoZWNrKCdjaGVjaycpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoZWNrU3RhdGUgPT09ICdub25lJykge1xyXG4gICAgICAgICQoXCIuYnVsa19hY3Rpb24gaW5wdXRbbmFtZT0ndGFibGVfcmVjb3JkcyddXCIpLmlDaGVjaygndW5jaGVjaycpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjaGVja0NvdW50ID0gJChcIi5idWxrX2FjdGlvbiBpbnB1dFtuYW1lPSd0YWJsZV9yZWNvcmRzJ106Y2hlY2tlZFwiKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGNoZWNrQ291bnQpIHtcclxuICAgICAgICAkKCcuY29sdW1uLXRpdGxlJykuaGlkZSgpO1xyXG4gICAgICAgICQoJy5idWxrLWFjdGlvbnMnKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLmFjdGlvbi1jbnQnKS5odG1sKGNoZWNrQ291bnQgKyAnIFJlY29yZHMgU2VsZWN0ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLmNvbHVtbi10aXRsZScpLnNob3coKTtcclxuICAgICAgICAkKCcuYnVsay1hY3Rpb25zJykuaGlkZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBBY2NvcmRpb25cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKFwiLmV4cGFuZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgyMDApO1xyXG4gICAgICAgICRleHBhbmQgPSAkKHRoaXMpLmZpbmQoXCI+OmZpcnN0LWNoaWxkXCIpO1xyXG5cclxuICAgICAgICBpZiAoJGV4cGFuZC50ZXh0KCkgPT0gXCIrXCIpIHtcclxuICAgICAgICAgICAgJGV4cGFuZC50ZXh0KFwiLVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZXhwYW5kLnRleHQoXCIrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIE5Qcm9ncmVzc1xyXG5pZiAodHlwZW9mIE5Qcm9ncmVzcyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIE5Qcm9ncmVzcy5zdGFydCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgTlByb2dyZXNzLmRvbmUoKTtcclxuICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2N1c3RvbS5qcyJdLCJzb3VyY2VSb290IjoiIn0=