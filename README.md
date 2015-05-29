# onlyDates 1.03
OnlyDates is a jQuery plugin which functions as input mask to date type fields.

This plugin is cross browser, multi-language, you can integrate it with others jQuery plugins and provides the necessary skills to use on mobile devices.

In addition, this plugin allow to use with the placeholder functionality without configure anything, if its supported, to show the error messages.

Install
-------
```html
<script src="js/onlyDates.js"></script>
```

How to use
----------
```javascript
// To use with default parameters
$('.checkOnlyDates').onlyDates();
// To use with custom parameters
$('.checkOnlyDates').onlyDates({format:'d/m/y', addClassIfError:'required', invalidDateMessage:'Invalid Date', requiredMessage:'Required Field', autocomplete:'default'});
// To use with autocomplete capability and other format
$('.checkOnlyDates').onlyDates({format:'y-m-d', autocomplete:'on'});
```

Default messages
----------------
<b>invalidDateMessage</b>: Message to show when date is invalid.

<b>requiredMessage</b>: Message to show when the field is empty.

<b>format</b>: This parameter provide the input mask. By default is 'd/m/y'.

<b>addClassIfError</b>: This parameter indicates the class that is must add when is produced a error. By default is 'error'.

<b>autocomplete</b>: This parameter enables / disables the autocomplete capability into date field. Your posible values are 'on and 'off'. By default, this has not any effect about input field.

Para más información sobre diseño y desarrollo web visita <a target="_blank"  href="http://www.islavisual.com/articulos/desarrollo_web/">islavisual.com</a>.

