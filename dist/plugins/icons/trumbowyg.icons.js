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
        if (trumbowyg.o.iconSet) {
            return "'" + trumbowyg.o.iconSet[icon].light + "'";
        }
        return "";
    }

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];
        var icons = trumbowyg.o.iconSet;
        var activeIcon = trumbowyg.o.icon;
        $.each(icons, function (i, val) {
            var trumbo = trumbowyg;
            var btn = fn + i,
                btnDef = {
                    fn: function() {
                        trumbo.$c.trigger('icon-changed', i);
                    },
                    param: '#' + i,
                    forceCss: true,
                    style: 'background-size: cover; background-image: url(' + iconURL(i, trumbo) + ');',
                    class: (activeIcon === i) ? 'active' : ''
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
