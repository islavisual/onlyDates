# onlyDates
OnlyDates is a jQuery plugin which functions as input mask to date type fields.

This plugin is cross browser, multi-language, you can integrate it with others jQuery plugins and provides the necessary skills to use on mobile devices.

In addition, this plugin allow to use with the placeholder functionality without configure anything, if its supported, to show the error messages.

Install
-------
```html
<script src="js/onlyDates.js"></script>
```

```javascript
// To use with default parameters
$('.checkOnlyDates').onlyDates();
// To use with custom parameters
$('.checkOnlyDates').onlyDates({format:'d/m/y', addClassIfError:'required', invalidDateMessage:'Invalid Date', requiredMessage:'Required Field'});
```

Default messages
----------------
invalidDateMessage: Message to show when date is invalid.
requiredMessage: Message to show when the field is empty.
format: This parameter provide the input mask. By default is 'd/m/y'.
addClassIfError: This parameter indicates the class that is must add when is produced a error. By default is 'error'.

