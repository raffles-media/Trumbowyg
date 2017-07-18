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

    var icons = [1,2,3,4,5,6,7,8,9,10,11];

    // Add all colors in two dropdowns
    $.extend(true, $.trumbowyg, {
        plugins: {
            icons: {
                init: function (trumbowyg) {
                    var buttonDef = {
                            dropdown: buildDropdown(function(item){
                                clickHandler2(item);
                            }, trumbowyg)
                        }
                    trumbowyg.addBtnDef('icons', buttonDef);
                },
                tagHandler: clickHandler
            }
        }
    });

    function clickHandler2(item) {
        console.log("ClickHandler2 " + item);
    }

    function clickHandler(element, trumbowyg) {
        console.log("element " + element);

        //$"trumbowyg.trigger("icon-changed", element);
        return ['icon'];
    }

    function iconURL(icon) {
        return 'https://dev.convertize.io/plugins/free-text/images/Icon_' + Number(icon) + '.svg';
    }


    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];

        $.each(icons, function (i, color) {
            var btn = "ButtonLabel" + i,
                btnDef = {
                    fn: fn,
                    forceCss: true,
                    param: '#' + i,
                    style: 'background-image: url(' + iconURL(i) + ');'
                };
            trumbowyg.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        return dropdown;
    }
})(jQuery);
