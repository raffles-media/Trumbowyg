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


    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }

    function colorToHex(rgb) {
        if (rgb.search('rgb') === -1) {
            return rgb.replace('#', '');
        } else if (rgb === 'rgba(0, 0, 0, 0)') {
            return 'transparent';
        } else {
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
            return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }

    function colorTagHandler(element, trumbowyg) {
        var tags = [];

        if(!element.style){
            return tags;
        }

        // background color
        if (element.style.backgroundColor !== '') {
            var backColor = colorToHex(element.style.backgroundColor);
            if (trumbowyg.o.plugins.colors.colorList.indexOf(backColor) >= 0) {
                tags.push('backColor' + backColor);
            } else {
                tags.push('backColorFree');
            }
        }

        // text color
        var foreColor;
        if (element.style.color !== '') {
            foreColor = colorToHex(element.style.color);
        } else if (element.hasAttribute('color')) {
            foreColor = colorToHex(element.getAttribute('color'));
        }
        if (foreColor) {
            if (trumbowyg.o.plugins.colors.colorList.indexOf(foreColor) >= 0) {
                tags.push('foreColor' + foreColor);
            } else {
                tags.push('foreColorFree');
            }
        }

        return tags;
    }

    var defaultOptions = {
        colorList: ['ffffff', '000000', '6d6d6d', '9631b1', '4598f4', '42c64f', 'dd2764', 'f69601', '38439f', 'ba2f2c', '5a8102']
    };

    // Add all colors in two dropdowns
    $.extend(true, $.trumbowyg, {
        plugins: {
            color: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.colors = trumbowyg.o.plugins.colors || defaultOptions;
                    var foreColorBtnDef = {
                            dropdown: buildDropdown('foreColor', trumbowyg)
                        },
                        backColorBtnDef = {
                            dropdown: buildDropdown('backColor', trumbowyg)
                        };

                    trumbowyg.addBtnDef('foreColor', foreColorBtnDef);
                    trumbowyg.addBtnDef('backColor', backColorBtnDef);
                },
                tagHandler: colorTagHandler
            }
        }
    });

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.colors.colorList, function (i, color) {
            var btn = fn + color,
                btnDef = {
                    fn: fn,
                    forceCss: true,
                    param: '#' + color,
                    style: 'background-color: #' + color + ';'
                };
            trumbowyg.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        // add free color btn
        var freeColorButtonName = fn + 'Free',
            freeColorBtnDef = {
                fn: function () {
                    trumbowyg.openModalInsert(trumbowyg.lang[fn],
                        {
                            color: {
                                label: fn,
                                value: '#FFFFFF'
                            }
                        },
                        // callback
                        function (values) {
                            trumbowyg.execCmd(fn, values.color);
                            return true;
                        }
                    );
                },
                text: '#',
                // style adjust for displaying the text
                style: 'text-indent: 0;line-height: 20px;padding: 0 5px;'
            };
        trumbowyg.addBtnDef(freeColorButtonName, freeColorBtnDef);
        dropdown.push(freeColorButtonName);

        return dropdown;
    }
})(jQuery);
