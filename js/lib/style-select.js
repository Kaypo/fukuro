/*
 * style-select.js
 *
 * Adds nicer style selector
 *
 * Usage:
 *   $config['additional_javascript'][] = 'js/jquery.min.js';
 *   $config['additional_javascript'][] = 'js/settings.js';
 *   $config['additional_javascript'][] = 'js/style-select.js';
 *
 */

var stylesDiv = $('div.styles');
var stylesSelect = $('<select></select>');

var i = 1;
stylesDiv.children().each(function () {
    var opt = $('<option></option>')
        .html(this.innerHTML.replace(/(^\[|\]$)/g, ''))
        .val(i);
    if ($(this).hasClass('selected'))
        opt.attr('selected', true);
    stylesSelect.append(opt);
    $(this).attr('id', 'style-select-' + i);
    i++;
});

stylesSelect.change(function () {
    $('#style-select-' + $(this).val()).click();
});

stylesDiv.hide();

stylesDiv.after(
    $('<div id="style-select" style="float:left;margin-bottom:10px"></div>')
        .text(_('Style: '))
        .append(stylesSelect)
);
$('#style-select').css({
    float: 'left'
});