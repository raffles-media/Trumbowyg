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

    /*var defaultOptions = {
        colorList: ['ffffff', '000000', 'eeece1', '1f497d', '4f81bd', 'c0504d', '9bbb59', '8064a2', '4bacc6', 'f79646', 'ffff00', 'f2f2f2', '7f7f7f', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada', 'fff2ca', 'd8d8d8', '595959', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5', 'ffe694', 'bfbfbf', '3f3f3f', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', 'b7dde8', 'fac08f', 'f2c314', 'a5a5a5', '262626', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '92cddc', 'e36c09', 'c09100', '7f7f7f', '0c0c0c', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '31859b', '974806', '7f6000']
    };*/

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


    function iconURL(icon) {
        return 'https://dev.convertize.io/plugins/free-text/images/Icon_' + Number(icon) + '.svg';
    }

    function buildDropdown(fn, trumbowyg) {
        var dropdown = [];
        var icons = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11];
        $.each(icons, function (i, val) {
            var trumbo = trumbowyg;
            var btn = fn + val,
                btnDef = {
                    fn: function() {
                        trumbo.$c.trigger('icon-changed', i);
                    },
                    forceCss: true,
                    style: 'background-image: url(' + iconURL(i) + ');'
                };
            trumbowyg.addBtnDef(btn, btnDef);
            dropdown.push(btn);
        });

        var removeColorButtonName = fn + 'Remove',
            removeColorBtnDef = {
                fn: 'removeFormat',
                param: fn,
                style: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQIW2NkQAAfEJMRmwBYhoGBYQtMBYoAADziAp0jtJTgAAAAAElFTkSuQmCC);'
            };
        trumbowyg.addBtnDef(removeColorButtonName, removeColorBtnDef);
        dropdown.push(removeColorButtonName);

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
