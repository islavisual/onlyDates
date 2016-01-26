// onlyDates Copyright 2015 Islavisual. Licensed under MIT (https://github.com/islavisual/onlyDates/blob/master/LICENSE). 
// Author: Pablo E. Fernández (islavisual@gmail.com). 
// Last update: 26/01/2016
jQuery.fn.onlyDates   = function(options){
        var opt = $.extend({
            invalidDateMessage:'Invalid date',
            requiredMessage:'Required field',
            format:'d/m/y',
            addClassIfError:'error',
            autocomplete:'default',
            placeholder:('placeholder' in document.createElement("input"))
        }, options );

        var sep     = opt.format.replace(/[A-Za-z]/g, "")[0];
        var nav     = navigator.userAgent.toLowerCase();

        if('ontouchstart' in document.documentElement){
            $(this).removeClass('checkOnlyDates').attr("type", 'date');
            return false;
        }

        if(opt.autocomplete != "default") $(this).attr("autocomplete", opt.autocomplete);
        
        var forwardSlash = 111, dash = 55;
        if(navigator.userAgent.indexOf('Mac OS') != -1){ forwardSlash = 191; dash = 189 }

        return this.each(function() {
            // If the format isn't supported show message
            if(opt.format != 'd'+sep+'m'+sep+'y' && opt.format != 'm'+sep+'d'+sep+'y' && opt.format != 'y'+sep+'m'+sep+'d'){
                alert('Error: The provided format is wrong.\n\nSupported Formats:\n    · d/m/y or d-m-y\n    · m/d/y or m-d-y\n    · y/m/d or y-m-d');
            } else {
                $(this).focusin(function(e){
                    // If date has message and placeholder not supported
                    if(!opt.placeholder){
                        if($(e.target).val() == opt.invalidDateMessage) $(e.target).val('');
                        else if($(e.target).val() == opt.requiredMessage+" ("+opt.format+")") $(e.target).val('');
                    }
                });
                // Blur event
                $(this).focusout(function(e){
                    var target = $(e.target), date = target.val().split(sep);
                    var msg = opt.requiredMessage+" ("+opt.format+")";

                    // If field is empty
                    if($.trim(target.val()) == '' && opt.placeholder){
                        target.attr('placeholder', msg).addClass(opt.addClassIfError);
                        return false;
                    } else if($.trim(target.val()) == ''){
                        target.val('').attr('title', msg).val(msg).addClass(opt.addClassIfError);
                        return false;
                    }

                    // If field has a valid date
                    var arr = opt.format.split(sep), day =  parseInt(date[arr.indexOf('d')], 10), month =  parseInt(date[arr.indexOf('m')], 10), year =  parseInt(date[arr.indexOf('y')], 10);
                    if(new Date(year, month - 1, day).toDateString() == 'Invalid Date'){
                        // Added message and parameter addClassIfError
                        var msg = opt.invalidDateMessage;
                        if(opt.placeholder){
                            target.val('').attr('placeholder', msg).addClass(opt.addClassIfError);
                        } else {
                            target.val('').attr('title', msg).val(msg).addClass(opt.addClassIfError);
                        }
                    } else {
                        // Remove the class and message
                        if(opt.placeholder){
                            target.removeAttr('placeholder').removeClass(opt.addClassIfError);
                        } else {
                            target.removeAttr('title').removeClass(opt.addClassIfError);
                        }
                    }
                });
                // Keydown event
                $(this).keydown(function(e) {
                    // If key is delete, supr or tab
                    if(e.ctrlKey || e.which == 8  || e.which == 46 || e.which == 9) return true;

                    // Declare main vars
                    var key = e.which || 0, val  = $(e.target).val(), gst = getSelectionText(e), position = gst[1], newVal = 0;

                    $(e.target).val($(e.target).val().replace(sep+sep, sep));

                    // If key pressed is Numpad recalcule key for extract the character
                    if((key >= 96 && key <= 105) && !isSep(key, e)) key = key - 48;
                    var char = String.fromCharCode(key);

                    // If the key is a separator readjust
                    if(e.which == forwardSlash || (e.which == dash && e.shiftKey)){ char  = "/"; key = forwardSlash; if(char != sep) return false; }
                    if((e.which == 109 || e.which == 173)){ char  = "-"; key = 109; if(char != sep) return false; }

                    //If browser is IE9 or lower and ctrlKey|shiftKey pressed, return false
                    if((e.ctrlKey || e.shiftKey) && (nav.indexOf('msie') != -1 && parseInt(nav.split('msie')[1]) < 9)) return false;

                    // If length is upper than 10 return false
                    if(val.length > 10){ return false};

                    // If value begin by 'sep' return false;
                    if(val == '' && isSep(key, e)){ return false; }

                    // Doesn't allow double separator
                    if(val != '' && val.substr(val.length-1, 1) == sep && isSep(key, e)) { return false; }
                    if(val != '' && val.substr(val.length-1, 1) == sep && isSep(key, e)) { return false; }

                    // If there is more than 2 'sep' signs
                    if(val.split(sep).length == 3 && isSep(key, e)) return false;

                    // If there is selected text update the val property
                    if(gst[0] != ''){
                        if(gst[1] == 0){ val = ''; position = 0; }
                        else {
                            val = val.substring(0, gst[1])+val.substring(gst[2]);
                        }
                    }

                    // If key pressed is number or separator recover the value entered
                    if(parseInt(char)>0 || char == '0' || char == sep){
                        var p1 = position!=0?val.substr(0,position):val.substr(0,1);
                        var p2 = val.substr(position);

                        if(position == 0) val = char+val;
                        else val = p1+char+p2;
                    }

                    // If key pressed is up cursor subtract 1 by 1
                    if(key == 38 || key == 40){
                        var found = false;
                        var p = position-1;
                        while(p >= 0 && !found){
                            if(val.substr(p, 1) == sep) { found = true; }
                            else p--;
                        }
                        var range = [];
                        if(p == -1) range = [0, val.indexOf(sep)];
                        else        range = [p+1, val.indexOf(sep, p+1)!=-1?val.indexOf(sep, p+1):val.length];

                        // If 'range[1]' has '-1' like value is because 'val' not contain 'sep'
                        if(range[1] == -1) range[1] = val.length;

                        if(key == 38){
                            newVal = parseInt(val.substring(range[0], range[1]))+1;
                        } else {
                            newVal = parseInt(val.substring(range[0], range[1]))-1;
                        }
                        if(newVal < 10) newVal = '0'+newVal;

                        // If all tests are approved, the new value will be assigned later
                        newVal = val.substring(0, range[0])+newVal+val.substring(range[1]);
                        val = newVal;
                    }
                    // If key pressed is down cursor add 1 by 1
                    var oPattern, sPattern, tPattern, fPattern,lPattern;
                    var p1  = opt.format.indexOf(sep), p2 = opt.format.indexOf(sep, p1+1);
                    var d1  = opt.format.substring(0,p1), d2 = opt.format.substring(p1+1, p2), d3 =  opt.format.substring(p2+1);

                    if(opt.format == 'd'+sep+'m'+sep+'y' || opt.format == 'm'+sep+'d'+sep+'y'){
                        oPattern = /^(\d{1,2})$/;
                        sPattern = /^(\d{1,2})(\/|-)$/;
                        tPattern = /^(\d{1,2})(\/|-)(\d{1,2})$/;
                        fPattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)$/;
                        lPattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{1,4})$/;
                    } else if(opt.format == 'y'+sep+'m'+sep+'d'){
                        oPattern = /^(\d{1,4})$/;
                        sPattern = /^(\d{1,4})(\/|-)$/;
                        tPattern = /^(\d{1,4})(\/|-)(\d{1,2})$/;
                        fPattern = /^(\d{1,4})(\/|-)(\d{1,2})(\/|-)$/;
                        lPattern = /^(\d{1,4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
                    }

                    var oMatch = val.match(oPattern); // is dd
                    var sMatch = val.match(sPattern); // is dd/
                    var tMatch = val.match(tPattern); // is dd/mm
                    var fMatch = val.match(fPattern); // is dd/mm/
                    var lMatch = val.match(lPattern); // is dd/mm/yyyy

                    if (val != '' && oMatch == null && sMatch == null && tMatch == null && fMatch == null && lMatch == null){ return false; }

                    var day = 0, month = 0, year = 0, aux = val.split(sep);

                    if(opt.format == 'd'+sep+'m'+sep+'y'){
                        if(aux.length == 1){      day = aux[0] }
                        else if(aux.length == 2){ day = aux[0]; month = aux[1]; }
                        else if(aux.length == 3){ day = aux[0]; month = aux[1]; year = aux[2]; }
                    } else if(opt.format == 'm'+sep+'d'+sep+'y'){
                        if(aux.length == 1){      day = aux[1] }
                        else if(aux.length == 2){ day = aux[1]; month = aux[0]; }
                        else if(aux.length == 3){ day = aux[1]; month = aux[0]; year = aux[2]; }
                    } else if(opt.format == 'y'+sep+'m'+sep+'d'){
                        if(aux.length == 1){      day = aux[2] }
                        else if(aux.length == 2){ day = aux[2]; month = aux[1]; }
                        else if(aux.length == 3){ day = aux[2]; month = aux[1]; year = aux[0]; }
                    }

                    if((day.length==2 && day == '00') || (month.length==2 && month == '00')) return false;

                    if(day != 0 && (day < 1 || day > 31)){ return false; }
                    if(month != 0 && (month < 1 || month > 12)){ return false; }
                    if(day != 0 && month != 0 && (month==4 || month==6 || month==9 || month==11) && day == 31) return false;
                    if(month != 0 && month == 2){
                        if(year == 0  || year.length != 4){
                            if (day > 29) return false;
                        } else {
                            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                            if (day > 29 || (day == 29 && !isleap)) return false;
                        }
                    }

                    // If 'newVal' parameter is set, reallocate the value and repositioned the cursor
                    if(newVal != 0){ $(e.target).val(newVal).get(0).selectionStart = position; $(e.target).get(0).selectionEnd = position; }

                   return ( key == 8 || key == 9 || key == 13 || key == 46 || ((sep == '-' || sep == '/') && isSep(key, e)) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key >= 112 && key <= 123));
                });
            }
        });

        function isSep(key, e){ var res = false, code = -1, sepKeysCode = new Array(forwardSlash,109); code = jQuery.inArray( key, sepKeysCode ); if(code != -1) res = true; return res; }
        function getSelectionText(e) {
            if (window.getSelection) {
                try {
                    var ta = $(e.target).get(0);
                    return [ta.value.substring(ta.selectionStart, ta.selectionEnd), ta.selectionStart, ta.selectionEnd];
                } catch (exception) {
                    if('console' in window) console.log('Cant get selection text');
                }
            }
            // For IE
            if (document.selection && document.selection.type != "Control") {
                return document.selection.createRange().text;
            }
        }
    }
