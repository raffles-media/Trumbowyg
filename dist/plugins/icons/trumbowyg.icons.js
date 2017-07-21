/* ===========================================================
 * trumbowyg.colors.js v1.2
 * Colors picker plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            cs: {
                foreColor: 'Barva textu',
                backColor: 'Barva pozadí'
            },
            en: {
                foreColor: 'Text color',
                backColor: 'Background color'
            },
            fr: {
                foreColor: 'Couleur du texte',
                backColor: 'Couleur de fond'
            },
            sk: {
                foreColor: 'Farba textu',
                backColor: 'Farba pozadia'
            },
            zh_cn: {
                foreColor: '文字颜色',
                backColor: '背景颜色'
            }
        }
    });
    // jshint camelcase:true

    // Add all colors in two dropdowns
    $.extend(true, $.trumbowyg, {



        plugins: {
            icons: {
                init: function (trumbowyg) {
                    //trumbowyg.o.plugins.colors = trumbowyg.o.plugins.colors || defaultOptions;
                    var buttonDef = {
                        dropdown: buildDropdown('icons', trumbowyg)
                    }

                    trumbowyg.addBtnDef('icons', buttonDef);
                }
            }
        }
    });

    function iconURL(icon, trumbowyg) {
        return "'" + trumbowyg.o.iconSet[icon].light + "'";
        //return 'https://dev.convertize.io/plugins/free-text/images/Icon_' + Number(icon) + '.svg';
    }

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];
        var icons = [0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
        $.each(icons, function (i, val) {
            var trumbo = trumbowyg;
            var btn = fn + val,
                btnDef = {
                    fn: function() {

                        trumbo.$c.trigger('icon-changed', val);
                    },
                    param: '#' + val,
                    forceCss: true,
                    style: 'background-size: cover; background-image: url(' + iconURL(val, trumbowyg) + '); height: 40px; width: 40px; float: left; border: 1px solid black;'
                };
            trumbowyg.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        return dropdown;
    }
})(jQuery);
