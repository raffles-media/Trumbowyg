/* ===========================================================
 * trumbowyg.icons.js v1.0
 * Icons Dropdown plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 */

(function ($) {
    'use strict';
    // jshint camelcase:true

    $.extend(true, $.trumbowyg, {
        plugins: {
            icons: {
                init: function (trumbowyg) {
                    var buttonDef = {
                        dropdown: buildDropdown('icons', trumbowyg)
                    };

                    trumbowyg.addBtnDef('icons', buttonDef);
                }
            }
        }
    });

    function iconURL(icon, trumbowyg) {
        return "'" + trumbowyg.o.iconSet[icon].light + "'";
    }

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];
        var icons = [0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
        var activeIcon = trumbowyg.o.icon;
        $.each(icons, function (i, val) {
            var trumbo = trumbowyg;
            var btn = fn + val,
                btnDef = {
                    fn: function() {
                        trumbo.$c.trigger('icon-changed', val);
                    },
                    param: '#' + val,
                    forceCss: true,
                    style: 'background-size: cover; background-image: url(' + iconURL(val, trumbo) + ');',
                    class: (activeIcon == val) ? 'active' : ''
                };
            trumbo.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        trumbowyg.$c.on('icon-changed', function(jquery, icon) {
            var activeButton = '.trumbowyg-icons' + icon + '-dropdown-button';
            $('.trumbowyg-dropdown-icons button').removeClass('active');
            $('.trumbowyg-dropdown-icons ' + activeButton).addClass('active');
        });

        return dropdown;
    }
})(jQuery);
