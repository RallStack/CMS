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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmQ1ODMzZjMyY2Y5NjE3NTRhZjEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2N1c3RvbS5qcyJdLCJuYW1lcyI6WyJDVVJSRU5UX1VSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwiJEJPRFkiLCIkIiwiJE1FTlVfVE9HR0xFIiwiJFNJREVCQVJfTUVOVSIsIiRTSURFQkFSX0ZPT1RFUiIsIiRMRUZUX0NPTCIsIiRSSUdIVF9DT0wiLCIkTkFWX01FTlUiLCIkRk9PVEVSIiwiZG9jdW1lbnQiLCJyZWFkeSIsInRvb2x0aXAiLCJzZXRDb250ZW50SGVpZ2h0IiwiY3NzIiwiaGVpZ2h0IiwiYm9keUhlaWdodCIsIm91dGVySGVpZ2h0IiwiZm9vdGVySGVpZ2h0IiwiaGFzQ2xhc3MiLCJsZWZ0Q29sSGVpZ2h0IiwiZXEiLCJjb250ZW50SGVpZ2h0IiwiZmluZCIsIm9uIiwiZXYiLCIkbGkiLCJwYXJlbnQiLCJpcyIsInJlbW92ZUNsYXNzIiwic2xpZGVVcCIsImFkZENsYXNzIiwic2xpZGVEb3duIiwiaGlkZSIsInNob3ciLCJ0b2dnbGVDbGFzcyIsImVhY2giLCJkYXRhVGFibGUiLCJmbkRyYXciLCJmaWx0ZXIiLCJwYXJlbnRzIiwiZm4iLCJtQ3VzdG9tU2Nyb2xsYmFyIiwiYXV0b0hpZGVTY3JvbGxiYXIiLCJ0aGVtZSIsIm1vdXNlV2hlZWwiLCJwcmV2ZW50RGVmYXVsdCIsIiRCT1hfUEFORUwiLCJjbG9zZXN0IiwiJElDT04iLCIkQk9YX0NPTlRFTlQiLCJhdHRyIiwic2xpZGVUb2dnbGUiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJyZW1vdmUiLCJjb250YWluZXIiLCJwcm9ncmVzc2JhciIsImVsZW1zIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImh0bWwiLCJzd2l0Y2hlcnkiLCJTd2l0Y2hlcnkiLCJjb2xvciIsImlDaGVjayIsImNoZWNrYm94Q2xhc3MiLCJyYWRpb0NsYXNzIiwiY2hlY2tTdGF0ZSIsImNvdW50Q2hlY2tlZCIsImNoZWNrQ291bnQiLCJsZW5ndGgiLCJuZXh0IiwiJGV4cGFuZCIsInRleHQiLCJOUHJvZ3Jlc3MiLCJzdGFydCIsImRvbmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsSUFBSUEsY0FBY0MsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJDLEtBQXJCLENBQTJCLEdBQTNCLEVBQWdDLENBQWhDLEVBQW1DQSxLQUFuQyxDQUF5QyxHQUF6QyxFQUE4QyxDQUE5QyxDQUFsQjtBQUFBLElBQ0lDLFFBQVFDLEVBQUUsTUFBRixDQURaO0FBQUEsSUFFSUMsZUFBZUQsRUFBRSxjQUFGLENBRm5CO0FBQUEsSUFHSUUsZ0JBQWdCRixFQUFFLGVBQUYsQ0FIcEI7QUFBQSxJQUlJRyxrQkFBa0JILEVBQUUsaUJBQUYsQ0FKdEI7QUFBQSxJQUtJSSxZQUFZSixFQUFFLFdBQUYsQ0FMaEI7QUFBQSxJQU1JSyxhQUFhTCxFQUFFLFlBQUYsQ0FOakI7QUFBQSxJQU9JTSxZQUFZTixFQUFFLFdBQUYsQ0FQaEI7QUFBQSxJQVFJTyxVQUFVUCxFQUFFLFFBQUYsQ0FSZDs7QUFVQTtBQUNBQSxFQUFFUSxR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LEtBVEQ7QUFVSCxDQVhEOztBQWFBO0FBQ0EsSUFBSSxPQUFPQyxTQUFQLElBQW9CLFdBQXhCLEVBQXFDO0FBQ2pDN0UsTUFBRVEsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7QUFDMUJvRSxrQkFBVUMsS0FBVjtBQUNILEtBRkQ7O0FBSUE5RSxNQUFFTCxNQUFGLEVBQVUyQixFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCdUQsa0JBQVVFLElBQVY7QUFDSCxLQUZEO0FBR0gsQyIsImZpbGUiOiJqcy9jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9qcy9jdXN0b20uanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmQ1ODMzZjMyY2Y5NjE3NTRhZjEiLCIvKipcclxuICogVG8gY2hhbmdlIHRoaXMgbGljZW5zZSBoZWFkZXIsIGNob29zZSBMaWNlbnNlIEhlYWRlcnMgaW4gUHJvamVjdCBQcm9wZXJ0aWVzLlxyXG4gKiBUbyBjaGFuZ2UgdGhpcyB0ZW1wbGF0ZSBmaWxlLCBjaG9vc2UgVG9vbHMgfCBUZW1wbGF0ZXNcclxuICogYW5kIG9wZW4gdGhlIHRlbXBsYXRlIGluIHRoZSBlZGl0b3IuXHJcbiAqL1xyXG5cclxudmFyIENVUlJFTlRfVVJMID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXS5zcGxpdCgnPycpWzBdLFxyXG4gICAgJEJPRFkgPSAkKCdib2R5JyksXHJcbiAgICAkTUVOVV9UT0dHTEUgPSAkKCcjbWVudV90b2dnbGUnKSxcclxuICAgICRTSURFQkFSX01FTlUgPSAkKCcjc2lkZWJhci1tZW51JyksXHJcbiAgICAkU0lERUJBUl9GT09URVIgPSAkKCcuc2lkZWJhci1mb290ZXInKSxcclxuICAgICRMRUZUX0NPTCA9ICQoJy5sZWZ0X2NvbCcpLFxyXG4gICAgJFJJR0hUX0NPTCA9ICQoJy5yaWdodF9jb2wnKSxcclxuICAgICROQVZfTUVOVSA9ICQoJy5uYXZfbWVudScpLFxyXG4gICAgJEZPT1RFUiA9ICQoJ2Zvb3RlcicpO1xyXG5cclxuLy8gU2lkZWJhclxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIFRPRE86IFRoaXMgaXMgc29tZSBraW5kIG9mIGVhc3kgZml4LCBtYXliZSB3ZSBjYW4gaW1wcm92ZSB0aGlzXHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKVxyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc2V0Q29udGVudEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyByZXNldCBoZWlnaHRcclxuICAgICAgICAkUklHSFRfQ09MLmNzcygnbWluLWhlaWdodCcsICQod2luZG93KS5oZWlnaHQoKSk7XHJcblxyXG4gICAgICAgIHZhciBib2R5SGVpZ2h0ID0gJEJPRFkub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgZm9vdGVySGVpZ2h0ID0gJEJPRFkuaGFzQ2xhc3MoJ2Zvb3Rlcl9maXhlZCcpID8gLTEwIDogJEZPT1RFUi5oZWlnaHQoKSxcclxuICAgICAgICAgICAgbGVmdENvbEhlaWdodCA9ICRMRUZUX0NPTC5lcSgxKS5oZWlnaHQoKSArICRTSURFQkFSX0ZPT1RFUi5oZWlnaHQoKSxcclxuICAgICAgICAgICAgY29udGVudEhlaWdodCA9IGJvZHlIZWlnaHQgPCBsZWZ0Q29sSGVpZ2h0ID8gbGVmdENvbEhlaWdodCA6IGJvZHlIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBjb250ZW50XHJcbiAgICAgICAgY29udGVudEhlaWdodCAtPSAkTkFWX01FTlUuaGVpZ2h0KCkgKyBmb290ZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgICRSSUdIVF9DT0wuY3NzKCdtaW4taGVpZ2h0JywgY29udGVudEhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgICRTSURFQkFSX01FTlUuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgdmFyICRsaSA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgIGlmICgkbGkuaXMoJy5hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkbGkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBhY3RpdmUtc20nKTtcclxuICAgICAgICAgICAgJCgndWw6Zmlyc3QnLCAkbGkpLnNsaWRlVXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRDb250ZW50SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2xvc2luZyBtZW51IGlmIHdlIGFyZSBvbiBjaGlsZCBtZW51XHJcbiAgICAgICAgICAgIGlmICghJGxpLnBhcmVudCgpLmlzKCcuY2hpbGRfbWVudScpKSB7XHJcbiAgICAgICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBhY3RpdmUtc20nKTtcclxuICAgICAgICAgICAgICAgICRTSURFQkFSX01FTlUuZmluZCgnbGkgdWwnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRsaS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkKCd1bDpmaXJzdCcsICRsaSkuc2xpZGVEb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0b2dnbGUgc21hbGwgb3IgbGFyZ2UgbWVudVxyXG4gICAgJE1FTlVfVE9HR0xFLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkQk9EWS5oYXNDbGFzcygnbmF2LW1kJykpIHtcclxuICAgICAgICAgICAgJFNJREVCQVJfTUVOVS5maW5kKCdsaS5hY3RpdmUgdWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICRTSURFQkFSX01FTlUuZmluZCgnbGkuYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZS1zbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2xpLmFjdGl2ZS1zbSB1bCcpLnNob3coKTtcclxuICAgICAgICAgICAgJFNJREVCQVJfTUVOVS5maW5kKCdsaS5hY3RpdmUtc20nKS5hZGRDbGFzcygnYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1zbScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJEJPRFkudG9nZ2xlQ2xhc3MoJ25hdi1tZCBuYXYtc20nKTtcclxuXHJcbiAgICAgICAgc2V0Q29udGVudEhlaWdodCgpO1xyXG5cclxuICAgICAgICAkKCcuZGF0YVRhYmxlJykuZWFjaCAoIGZ1bmN0aW9uICgpIHsgJCh0aGlzKS5kYXRhVGFibGUoKS5mbkRyYXcoKTsgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjaGVjayBhY3RpdmUgbWVudVxyXG4gICAgJFNJREVCQVJfTUVOVS5maW5kKCdhW2hyZWY9XCInICsgQ1VSUkVOVF9VUkwgKyAnXCJdJykucGFyZW50KCdsaScpLmFkZENsYXNzKCdjdXJyZW50LXBhZ2UnKTtcclxuXHJcbiAgICAkU0lERUJBUl9NRU5VLmZpbmQoJ2EnKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhyZWYgPT0gQ1VSUkVOVF9VUkw7XHJcbiAgICB9KS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2N1cnJlbnQtcGFnZScpLnBhcmVudHMoJ3VsJykuc2xpZGVEb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuICAgIH0pLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyByZWNvbXB1dGUgY29udGVudCB3aGVuIHJlc2l6aW5nXHJcblxyXG5cclxuICAgIHNldENvbnRlbnRIZWlnaHQoKTtcclxuXHJcbiAgICAvLyBmaXhlZCBzaWRlYmFyXHJcbiAgICBpZiAoJC5mbi5tQ3VzdG9tU2Nyb2xsYmFyKSB7XHJcbiAgICAgICAgJCgnLm1lbnVfZml4ZWQnKS5tQ3VzdG9tU2Nyb2xsYmFyKHtcclxuICAgICAgICAgICAgYXV0b0hpZGVTY3JvbGxiYXI6IHRydWUsXHJcbiAgICAgICAgICAgIHRoZW1lOiAnbWluaW1hbCcsXHJcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6eyBwcmV2ZW50RGVmYXVsdDogdHJ1ZSB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAvU2lkZWJhclxyXG5cclxuLy8gUGFuZWwgdG9vbGJveFxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICQoJy5jb2xsYXBzZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICRCT1hfUEFORUwgPSAkKHRoaXMpLmNsb3Nlc3QoJy54X3BhbmVsJyksXHJcbiAgICAgICAgICAgICRJQ09OID0gJCh0aGlzKS5maW5kKCdpJyksXHJcbiAgICAgICAgICAgICRCT1hfQ09OVEVOVCA9ICRCT1hfUEFORUwuZmluZCgnLnhfY29udGVudCcpO1xyXG5cclxuICAgICAgICAvLyBmaXggZm9yIHNvbWUgZGl2IHdpdGggaGFyZGNvZGVkIGZpeCBjbGFzc1xyXG4gICAgICAgIGlmICgkQk9YX1BBTkVMLmF0dHIoJ3N0eWxlJykpIHtcclxuICAgICAgICAgICAgJEJPWF9DT05URU5ULnNsaWRlVG9nZ2xlKDIwMCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICRCT1hfUEFORUwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJEJPWF9DT05URU5ULnNsaWRlVG9nZ2xlKDIwMCk7XHJcbiAgICAgICAgICAgICRCT1hfUEFORUwuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJElDT04udG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tdXAgZmEtY2hldnJvbi1kb3duJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuY2xvc2UtbGluaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJEJPWF9QQU5FTCA9ICQodGhpcykuY2xvc2VzdCgnLnhfcGFuZWwnKTtcclxuXHJcbiAgICAgICAgJEJPWF9QQU5FTC5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG59KTtcclxuLy8gL1BhbmVsIHRvb2xib3hcclxuXHJcbi8vIFRvb2x0aXBcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XHJcbiAgICAgICAgY29udGFpbmVyOiAnYm9keSdcclxuICAgIH0pO1xyXG59KTtcclxuLy8gL1Rvb2x0aXBcclxuXHJcbi8vIFByb2dyZXNzYmFyXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIucHJvZ3Jlc3MgLnByb2dyZXNzLWJhclwiKVswXSkge1xyXG4gICAgICAgICQoJy5wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyJykucHJvZ3Jlc3NiYXIoKTtcclxuICAgIH1cclxufSk7XHJcbi8vIC9Qcm9ncmVzc2JhclxyXG5cclxuLy8gU3dpdGNoZXJ5XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIuanMtc3dpdGNoXCIpWzBdKSB7XHJcbiAgICAgICAgdmFyIGVsZW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXN3aXRjaCcpKTtcclxuICAgICAgICBlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2l0Y2hlcnkgPSBuZXcgU3dpdGNoZXJ5KGh0bWwsIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzI2Qjk5QSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAvU3dpdGNoZXJ5XHJcblxyXG4vLyBpQ2hlY2tcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJChcImlucHV0LmZsYXRcIilbMF0pIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0LmZsYXQnKS5pQ2hlY2soe1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3hDbGFzczogJ2ljaGVja2JveF9mbGF0LWdyZWVuJyxcclxuICAgICAgICAgICAgICAgIHJhZGlvQ2xhc3M6ICdpcmFkaW9fZmxhdC1ncmVlbidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyAvaUNoZWNrXHJcblxyXG4vLyBUYWJsZVxyXG4kKCd0YWJsZSBpbnB1dCcpLm9uKCdpZkNoZWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGVja1N0YXRlID0gJyc7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgY291bnRDaGVja2VkKCk7XHJcbn0pO1xyXG4kKCd0YWJsZSBpbnB1dCcpLm9uKCdpZlVuY2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNoZWNrU3RhdGUgPSAnJztcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICBjb3VudENoZWNrZWQoKTtcclxufSk7XHJcblxyXG52YXIgY2hlY2tTdGF0ZSA9ICcnO1xyXG5cclxuJCgnLmJ1bGtfYWN0aW9uIGlucHV0Jykub24oJ2lmQ2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNoZWNrU3RhdGUgPSAnJztcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICBjb3VudENoZWNrZWQoKTtcclxufSk7XHJcbiQoJy5idWxrX2FjdGlvbiBpbnB1dCcpLm9uKCdpZlVuY2hlY2tlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNoZWNrU3RhdGUgPSAnJztcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICBjb3VudENoZWNrZWQoKTtcclxufSk7XHJcbiQoJy5idWxrX2FjdGlvbiBpbnB1dCNjaGVjay1hbGwnKS5vbignaWZDaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tTdGF0ZSA9ICdhbGwnO1xyXG4gICAgY291bnRDaGVja2VkKCk7XHJcbn0pO1xyXG4kKCcuYnVsa19hY3Rpb24gaW5wdXQjY2hlY2stYWxsJykub24oJ2lmVW5jaGVja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2hlY2tTdGF0ZSA9ICdub25lJztcclxuICAgIGNvdW50Q2hlY2tlZCgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNvdW50Q2hlY2tlZCgpIHtcclxuICAgIGlmIChjaGVja1N0YXRlID09PSAnYWxsJykge1xyXG4gICAgICAgICQoXCIuYnVsa19hY3Rpb24gaW5wdXRbbmFtZT0ndGFibGVfcmVjb3JkcyddXCIpLmlDaGVjaygnY2hlY2snKTtcclxuICAgIH1cclxuICAgIGlmIChjaGVja1N0YXRlID09PSAnbm9uZScpIHtcclxuICAgICAgICAkKFwiLmJ1bGtfYWN0aW9uIGlucHV0W25hbWU9J3RhYmxlX3JlY29yZHMnXVwiKS5pQ2hlY2soJ3VuY2hlY2snKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2hlY2tDb3VudCA9ICQoXCIuYnVsa19hY3Rpb24gaW5wdXRbbmFtZT0ndGFibGVfcmVjb3JkcyddOmNoZWNrZWRcIikubGVuZ3RoO1xyXG5cclxuICAgIGlmIChjaGVja0NvdW50KSB7XHJcbiAgICAgICAgJCgnLmNvbHVtbi10aXRsZScpLmhpZGUoKTtcclxuICAgICAgICAkKCcuYnVsay1hY3Rpb25zJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5hY3Rpb24tY250JykuaHRtbChjaGVja0NvdW50ICsgJyBSZWNvcmRzIFNlbGVjdGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5jb2x1bW4tdGl0bGUnKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLmJ1bGstYWN0aW9ucycpLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQWNjb3JkaW9uXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJChcIi5leHBhbmRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgICAgICAkZXhwYW5kID0gJCh0aGlzKS5maW5kKFwiPjpmaXJzdC1jaGlsZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCRleHBhbmQudGV4dCgpID09IFwiK1wiKSB7XHJcbiAgICAgICAgICAgICRleHBhbmQudGV4dChcIi1cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGV4cGFuZC50ZXh0KFwiK1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBOUHJvZ3Jlc3NcclxuaWYgKHR5cGVvZiBOUHJvZ3Jlc3MgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBOUHJvZ3Jlc3Muc3RhcnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE5Qcm9ncmVzcy5kb25lKCk7XHJcbiAgICB9KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9jdXN0b20uanMiXSwic291cmNlUm9vdCI6IiJ9