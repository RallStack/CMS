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
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function () {
    // TODO: This is some kind of easy fix, maybe we can improve this
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
    $(window).smartresize(function () {
        setContentHeight();
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODMxZmZmOTM1MzU1NWQ1ZTRiOGYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2N1c3RvbS5qcyJdLCJuYW1lcyI6WyJDVVJSRU5UX1VSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwiJEJPRFkiLCIkIiwiJE1FTlVfVE9HR0xFIiwiJFNJREVCQVJfTUVOVSIsIiRTSURFQkFSX0ZPT1RFUiIsIiRMRUZUX0NPTCIsIiRSSUdIVF9DT0wiLCIkTkFWX01FTlUiLCIkRk9PVEVSIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNldENvbnRlbnRIZWlnaHQiLCJjc3MiLCJoZWlnaHQiLCJib2R5SGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJmb290ZXJIZWlnaHQiLCJoYXNDbGFzcyIsImxlZnRDb2xIZWlnaHQiLCJlcSIsImNvbnRlbnRIZWlnaHQiLCJmaW5kIiwib24iLCJldiIsIiRsaSIsInBhcmVudCIsImlzIiwicmVtb3ZlQ2xhc3MiLCJzbGlkZVVwIiwiYWRkQ2xhc3MiLCJzbGlkZURvd24iLCJoaWRlIiwic2hvdyIsInRvZ2dsZUNsYXNzIiwiZWFjaCIsImRhdGFUYWJsZSIsImZuRHJhdyIsImZpbHRlciIsInBhcmVudHMiLCJzbWFydHJlc2l6ZSIsImZuIiwibUN1c3RvbVNjcm9sbGJhciIsImF1dG9IaWRlU2Nyb2xsYmFyIiwidGhlbWUiLCJtb3VzZVdoZWVsIiwicHJldmVudERlZmF1bHQiLCIkQk9YX1BBTkVMIiwiY2xvc2VzdCIsIiRJQ09OIiwiJEJPWF9DT05URU5UIiwiYXR0ciIsInNsaWRlVG9nZ2xlIiwicmVtb3ZlQXR0ciIsImNsaWNrIiwicmVtb3ZlIiwidG9vbHRpcCIsImNvbnRhaW5lciIsInByb2dyZXNzYmFyIiwiZWxlbXMiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaHRtbCIsInN3aXRjaGVyeSIsIlN3aXRjaGVyeSIsImNvbG9yIiwiaUNoZWNrIiwiY2hlY2tib3hDbGFzcyIsInJhZGlvQ2xhc3MiLCJjaGVja1N0YXRlIiwiY291bnRDaGVja2VkIiwiY2hlY2tDb3VudCIsImxlbmd0aCIsIm5leHQiLCIkZXhwYW5kIiwidGV4dCIsIk5Qcm9ncmVzcyIsInN0YXJ0IiwiZG9uZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxJQUFJQSxjQUFjQyxPQUFPQyxRQUFQLENBQWdCQyxJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsRUFBbUNBLEtBQW5DLENBQXlDLEdBQXpDLEVBQThDLENBQTlDLENBQWxCO0FBQUEsSUFDSUMsUUFBUUMsRUFBRSxNQUFGLENBRFo7QUFBQSxJQUVJQyxlQUFlRCxFQUFFLGNBQUYsQ0FGbkI7QUFBQSxJQUdJRSxnQkFBZ0JGLEVBQUUsZUFBRixDQUhwQjtBQUFBLElBSUlHLGtCQUFrQkgsRUFBRSxpQkFBRixDQUp0QjtBQUFBLElBS0lJLFlBQVlKLEVBQUUsV0FBRixDQUxoQjtBQUFBLElBTUlLLGFBQWFMLEVBQUUsWUFBRixDQU5qQjtBQUFBLElBT0lNLFlBQVlOLEVBQUUsV0FBRixDQVBoQjtBQUFBLElBUUlPLFVBQVVQLEVBQUUsUUFBRixDQVJkOztBQVVB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QWI7QUFDSDtBQUNKLEtBVEQ7QUFVSCxDQVhEOztBQWFBO0FBQ0EsSUFBSSxPQUFPQyxTQUFQLElBQW9CLFdBQXhCLEVBQXFDO0FBQ2pDOUUsTUFBRVEsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDMUJxRSxrQkFBVUMsS0FBVjtBQUNILEtBRkQ7O0FBSUEvRSxNQUFFTCxNQUFGLEVBQVUwQixFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCeUQsa0JBQVVFLElBQVY7QUFDSCxLQUZEO0FBR0gsQyIsImZpbGUiOiJqcy9jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9qcy9jdXN0b20uanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODMxZmZmOTM1MzU1NWQ1ZTRiOGYiLCIvKipcbiAqIFRvIGNoYW5nZSB0aGlzIGxpY2Vuc2UgaGVhZGVyLCBjaG9vc2UgTGljZW5zZSBIZWFkZXJzIGluIFByb2plY3QgUHJvcGVydGllcy5cbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIGZpbGUsIGNob29zZSBUb29scyB8IFRlbXBsYXRlc1xuICogYW5kIG9wZW4gdGhlIHRlbXBsYXRlIGluIHRoZSBlZGl0b3IuXG4gKi9cblxudmFyIENVUlJFTlRfVVJMID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXS5zcGxpdCgnPycpWzBdLFxuICAgICRCT0RZID0gJCgnYm9keScpLFxuICAgICRNRU5VX1RPR0dMRSA9ICQoJyNtZW51X3RvZ2dsZScpLFxuICAgICRTSURFQkFSX01FTlUgPSAkKCcjc2lkZWJhci1tZW51JyksXG4gICAgJFNJREVCQVJfRk9PVEVSID0gJCgnLnNpZGViYXItZm9vdGVyJyksXG4gICAgJExFRlRfQ09MID0gJCgnLmxlZnRfY29sJyksXG4gICAgJFJJR0hUX0NPTCA9ICQoJy5yaWdodF9jb2wnKSxcbiAgICAkTkFWX01FTlUgPSAkKCcubmF2X21lbnUnKSxcbiAgICAkRk9PVEVSID0gJCgnZm9vdGVyJyk7XG5cbi8vIFNpZGViYXJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgc29tZSBraW5kIG9mIGVhc3kgZml4LCBtYXliZSB3ZSBjYW4gaW1wcm92ZSB0aGlzXG4gICAgdmFyIHNldENvbnRlbnRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJlc2V0IGhlaWdodFxuICAgICAgICAkUklHSFRfQ09MLmNzcygnbWluLWhlaWdodCcsICQod2luZG93KS5oZWlnaHQoKSk7XG5cbiAgICAgICAgdmFyIGJvZHlIZWlnaHQgPSAkQk9EWS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgZm9vdGVySGVpZ2h0ID0gJEJPRFkuaGFzQ2xhc3MoJ2Zvb3Rlcl9maXhlZCcpID8gLTEwIDogJEZPT1RFUi5oZWlnaHQoKSxcbiAgICAgICAgICAgIGxlZnRDb2xIZWlnaHQgPSAkTEVGVF9DT0wuZXEoMSkuaGVpZ2h0KCkgKyAkU0lERUJBUl9GT09URVIuaGVpZ2h0KCksXG4gICAgICAgICAgICBjb250ZW50SGVpZ2h0ID0gYm9keUhlaWdodCA8IGxlZnRDb2xIZWlnaHQgPyBsZWZ0Q29sSGVpZ2h0IDogYm9keUhlaWdodDtcblxuICAgICAgICAvLyBub3JtYWxpemUgY29udGVudFxuICAgICAgICBjb250ZW50SGVpZ2h0IC09ICROQVZfTUVOVS5oZWlnaHQoKSArIGZvb3RlckhlaWdodDtcblxuICAgICAgICAkUklHSFRfQ09MLmNzcygnbWluLWhlaWdodCcsIGNvbnRlbnRIZWlnaHQpO1xuICAgIH07XG5cbiAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgICB2YXIgJGxpID0gJCh0aGlzKS5wYXJlbnQoKTtcblxuICAgICAgICBpZiAoJGxpLmlzKCcuYWN0aXZlJykpIHtcbiAgICAgICAgICAgICRsaS5yZW1vdmVDbGFzcygnYWN0aXZlIGFjdGl2ZS1zbScpO1xuICAgICAgICAgICAgJCgndWw6Zmlyc3QnLCAkbGkpLnNsaWRlVXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGNsb3NpbmcgbWVudSBpZiB3ZSBhcmUgb24gY2hpbGQgbWVudVxuICAgICAgICAgICAgaWYgKCEkbGkucGFyZW50KCkuaXMoJy5jaGlsZF9tZW51JykpIHtcbiAgICAgICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBhY3RpdmUtc20nKTtcbiAgICAgICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpIHVsJykuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkbGkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAkKCd1bDpmaXJzdCcsICRsaSkuc2xpZGVEb3duKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB0b2dnbGUgc21hbGwgb3IgbGFyZ2UgbWVudVxuICAgICRNRU5VX1RPR0dMRS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRCT0RZLmhhc0NsYXNzKCduYXYtbWQnKSkge1xuICAgICAgICAgICAgJFNJREVCQVJfTUVOVS5maW5kKCdsaS5hY3RpdmUgdWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpLmFjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUtc20nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpLmFjdGl2ZS1zbSB1bCcpLnNob3coKTtcbiAgICAgICAgICAgICRTSURFQkFSX01FTlUuZmluZCgnbGkuYWN0aXZlLXNtJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtc20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRCT0RZLnRvZ2dsZUNsYXNzKCduYXYtbWQgbmF2LXNtJyk7XG5cbiAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xuXG4gICAgICAgICQoJy5kYXRhVGFibGUnKS5lYWNoICggZnVuY3Rpb24gKCkgeyAkKHRoaXMpLmRhdGFUYWJsZSgpLmZuRHJhdygpOyB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGFjdGl2ZSBtZW51XG4gICAgJFNJREVCQVJfTUVOVS5maW5kKCdhW2hyZWY9XCInICsgQ1VSUkVOVF9VUkwgKyAnXCJdJykucGFyZW50KCdsaScpLmFkZENsYXNzKCdjdXJyZW50LXBhZ2UnKTtcblxuICAgICRTSURFQkFSX01FTlUuZmluZCgnYScpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhyZWYgPT0gQ1VSUkVOVF9VUkw7XG4gICAgfSkucGFyZW50KCdsaScpLmFkZENsYXNzKCdjdXJyZW50LXBhZ2UnKS5wYXJlbnRzKCd1bCcpLnNsaWRlRG93bihmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xuICAgIH0pLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgIC8vIHJlY29tcHV0ZSBjb250ZW50IHdoZW4gcmVzaXppbmdcbiAgICAkKHdpbmRvdykuc21hcnRyZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgc2V0Q29udGVudEhlaWdodCgpO1xuXG4gICAgLy8gZml4ZWQgc2lkZWJhclxuICAgIGlmICgkLmZuLm1DdXN0b21TY3JvbGxiYXIpIHtcbiAgICAgICAgJCgnLm1lbnVfZml4ZWQnKS5tQ3VzdG9tU2Nyb2xsYmFyKHtcbiAgICAgICAgICAgIGF1dG9IaWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgICAgICAgdGhlbWU6ICdtaW5pbWFsJyxcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6eyBwcmV2ZW50RGVmYXVsdDogdHJ1ZSB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuLy8gL1NpZGViYXJcblxuLy8gUGFuZWwgdG9vbGJveFxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmNvbGxhcHNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRCT1hfUEFORUwgPSAkKHRoaXMpLmNsb3Nlc3QoJy54X3BhbmVsJyksXG4gICAgICAgICAgICAkSUNPTiA9ICQodGhpcykuZmluZCgnaScpLFxuICAgICAgICAgICAgJEJPWF9DT05URU5UID0gJEJPWF9QQU5FTC5maW5kKCcueF9jb250ZW50Jyk7XG5cbiAgICAgICAgLy8gZml4IGZvciBzb21lIGRpdiB3aXRoIGhhcmRjb2RlZCBmaXggY2xhc3NcbiAgICAgICAgaWYgKCRCT1hfUEFORUwuYXR0cignc3R5bGUnKSkge1xuICAgICAgICAgICAgJEJPWF9DT05URU5ULnNsaWRlVG9nZ2xlKDIwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkQk9YX1BBTkVMLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRCT1hfQ09OVEVOVC5zbGlkZVRvZ2dsZSgyMDApO1xuICAgICAgICAgICAgJEJPWF9QQU5FTC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICAgIH1cblxuICAgICAgICAkSUNPTi50b2dnbGVDbGFzcygnZmEtY2hldnJvbi11cCBmYS1jaGV2cm9uLWRvd24nKTtcbiAgICB9KTtcblxuICAgICQoJy5jbG9zZS1saW5rJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJEJPWF9QQU5FTCA9ICQodGhpcykuY2xvc2VzdCgnLnhfcGFuZWwnKTtcblxuICAgICAgICAkQk9YX1BBTkVMLnJlbW92ZSgpO1xuICAgIH0pO1xufSk7XG4vLyAvUGFuZWwgdG9vbGJveFxuXG4vLyBUb29sdGlwXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgICAgIGNvbnRhaW5lcjogJ2JvZHknXG4gICAgfSk7XG59KTtcbi8vIC9Ub29sdGlwXG5cbi8vIFByb2dyZXNzYmFyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZiAoJChcIi5wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyXCIpWzBdKSB7XG4gICAgICAgICQoJy5wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyJykucHJvZ3Jlc3NiYXIoKTtcbiAgICB9XG59KTtcbi8vIC9Qcm9ncmVzc2JhclxuXG4vLyBTd2l0Y2hlcnlcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKFwiLmpzLXN3aXRjaFwiKVswXSkge1xuICAgICAgICB2YXIgZWxlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc3dpdGNoJykpO1xuICAgICAgICBlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICB2YXIgc3dpdGNoZXJ5ID0gbmV3IFN3aXRjaGVyeShodG1sLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMjZCOTlBJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuLy8gL1N3aXRjaGVyeVxuXG4vLyBpQ2hlY2tcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKFwiaW5wdXQuZmxhdFwiKVswXSkge1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdpbnB1dC5mbGF0JykuaUNoZWNrKHtcbiAgICAgICAgICAgICAgICBjaGVja2JveENsYXNzOiAnaWNoZWNrYm94X2ZsYXQtZ3JlZW4nLFxuICAgICAgICAgICAgICAgIHJhZGlvQ2xhc3M6ICdpcmFkaW9fZmxhdC1ncmVlbidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbi8vIC9pQ2hlY2tcblxuLy8gVGFibGVcbiQoJ3RhYmxlIGlucHV0Jykub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjaGVja1N0YXRlID0gJyc7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICBjb3VudENoZWNrZWQoKTtcbn0pO1xuJCgndGFibGUgaW5wdXQnKS5vbignaWZVbmNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY2hlY2tTdGF0ZSA9ICcnO1xuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgY291bnRDaGVja2VkKCk7XG59KTtcblxudmFyIGNoZWNrU3RhdGUgPSAnJztcblxuJCgnLmJ1bGtfYWN0aW9uIGlucHV0Jykub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjaGVja1N0YXRlID0gJyc7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICBjb3VudENoZWNrZWQoKTtcbn0pO1xuJCgnLmJ1bGtfYWN0aW9uIGlucHV0Jykub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xuICAgIGNoZWNrU3RhdGUgPSAnJztcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgIGNvdW50Q2hlY2tlZCgpO1xufSk7XG4kKCcuYnVsa19hY3Rpb24gaW5wdXQjY2hlY2stYWxsJykub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjaGVja1N0YXRlID0gJ2FsbCc7XG4gICAgY291bnRDaGVja2VkKCk7XG59KTtcbiQoJy5idWxrX2FjdGlvbiBpbnB1dCNjaGVjay1hbGwnKS5vbignaWZVbmNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY2hlY2tTdGF0ZSA9ICdub25lJztcbiAgICBjb3VudENoZWNrZWQoKTtcbn0pO1xuXG5mdW5jdGlvbiBjb3VudENoZWNrZWQoKSB7XG4gICAgaWYgKGNoZWNrU3RhdGUgPT09ICdhbGwnKSB7XG4gICAgICAgICQoXCIuYnVsa19hY3Rpb24gaW5wdXRbbmFtZT0ndGFibGVfcmVjb3JkcyddXCIpLmlDaGVjaygnY2hlY2snKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrU3RhdGUgPT09ICdub25lJykge1xuICAgICAgICAkKFwiLmJ1bGtfYWN0aW9uIGlucHV0W25hbWU9J3RhYmxlX3JlY29yZHMnXVwiKS5pQ2hlY2soJ3VuY2hlY2snKTtcbiAgICB9XG5cbiAgICB2YXIgY2hlY2tDb3VudCA9ICQoXCIuYnVsa19hY3Rpb24gaW5wdXRbbmFtZT0ndGFibGVfcmVjb3JkcyddOmNoZWNrZWRcIikubGVuZ3RoO1xuXG4gICAgaWYgKGNoZWNrQ291bnQpIHtcbiAgICAgICAgJCgnLmNvbHVtbi10aXRsZScpLmhpZGUoKTtcbiAgICAgICAgJCgnLmJ1bGstYWN0aW9ucycpLnNob3coKTtcbiAgICAgICAgJCgnLmFjdGlvbi1jbnQnKS5odG1sKGNoZWNrQ291bnQgKyAnIFJlY29yZHMgU2VsZWN0ZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuY29sdW1uLXRpdGxlJykuc2hvdygpO1xuICAgICAgICAkKCcuYnVsay1hY3Rpb25zJykuaGlkZSgpO1xuICAgIH1cbn1cblxuLy8gQWNjb3JkaW9uXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKFwiLmV4cGFuZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgJGV4cGFuZCA9ICQodGhpcykuZmluZChcIj46Zmlyc3QtY2hpbGRcIik7XG5cbiAgICAgICAgaWYgKCRleHBhbmQudGV4dCgpID09IFwiK1wiKSB7XG4gICAgICAgICAgICAkZXhwYW5kLnRleHQoXCItXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGV4cGFuZC50ZXh0KFwiK1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbi8vIE5Qcm9ncmVzc1xuaWYgKHR5cGVvZiBOUHJvZ3Jlc3MgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIE5Qcm9ncmVzcy5zdGFydCgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIE5Qcm9ncmVzcy5kb25lKCk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvY3VzdG9tLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==