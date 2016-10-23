/**
 * helpers.js 1.0
 *
 * @author			Ruel Bermudez
 * @date created	23 Feb 2016
 * @date modified	23 Feb 2016
 */

;(function ($) {
	
	// Encapsulate the custom helper functions
	$.extend(
	{
		// Declare h as namespace for functions
		h : 
		{
			/***
			*
			*	Encodes an ISO-8859-1 string to UTF-8
			*
			***/			
			utf8_encode : function(argString)
			{
				if (argString === null || typeof argString === "undefined") {
					return "";
				}
			
				var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
				var utftext = '', start, end, stringl = 0;
			
				start = end = 0;
				stringl = string.length;
				for (var n = 0; n < stringl; n++) {
					var c1 = string.charCodeAt(n);
					var enc = null;
			
					if (c1 < 128) {
						end++;
					} else if (c1 > 127 && c1 < 2048) {
						enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
					} else {
						enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
					}
					if (enc !== null) {
						if (end > start) {
							utftext += string.slice(start, end);
						}
						utftext += enc;
						start = end = n + 1;
					}
				}
			
				if (end > start) {
					utftext += string.slice(start, stringl);
				}
			
				return utftext;
			},
			
			/***
			*
			*	Convert text into sha1 hash
			*
			***/			
			sha1 : function(str)
			{
				var rotate_left = function (n, s) {
					var t4 = (n << s) | (n >>> (32 - s));
					return t4;
				};
			
				var cvt_hex = function (val) {
					var str = "";
					var i;
					var v;
			
					for (i = 7; i >= 0; i--) {
							v = (val >>> (i * 4)) & 0x0f;
							str += v.toString(16);
					}
					return str;
				};
			
				var blockstart;
				var i, j;
				var W = new Array(80);
				var H0 = 0x67452301;
				var H1 = 0xEFCDAB89;
				var H2 = 0x98BADCFE;
				var H3 = 0x10325476;
				var H4 = 0xC3D2E1F0;
				var A, B, C, D, E;
				var temp;
			
				str = this.utf8_encode(str);
				var str_len = str.length;
			
				var word_array = [];
				for (i = 0; i < str_len - 3; i += 4) {
					j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
					word_array.push(j);
				}
			
				switch (str_len % 4) {
				case 0:
					i = 0x080000000;
					break;
				case 1:
					i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
					break;
				case 2:
					i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
					break;
				case 3:
					i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
					break;
				}
			
				word_array.push(i);
			
				while ((word_array.length % 16) != 14) {
					word_array.push(0);
				}
			
				word_array.push(str_len >>> 29);
				word_array.push((str_len << 3) & 0x0ffffffff);
			
				for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
					for (i = 0; i < 16; i++) {
						W[i] = word_array[blockstart + i];
					}
					for (i = 16; i <= 79; i++) {
						W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
					}
			
			
					A = H0;
					B = H1;
					C = H2;
					D = H3;
					E = H4;
			
					for (i = 0; i <= 19; i++) {
						temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
			
					for (i = 20; i <= 39; i++) {
						temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
			
					for (i = 40; i <= 59; i++) {
						temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
			
					for (i = 60; i <= 79; i++) {
						temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
			
					H0 = (H0 + A) & 0x0ffffffff;
					H1 = (H1 + B) & 0x0ffffffff;
					H2 = (H2 + C) & 0x0ffffffff;
					H3 = (H3 + D) & 0x0ffffffff;
					H4 = (H4 + E) & 0x0ffffffff;
				}
			
				temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
				return temp.toLowerCase();
			},
			
			/***
			*
			*	Validate email
			*
			***/			
			validEmail : function(e)
			{
				var filter	= /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
				
				if (filter.test(e)) return true;
				else return false;
			},
			
			/***
			*
			*	Validate mobile
			*
			***/			
			validMobile : function(e)
			{
				var filter	= /^\d+$/;
				
				if (filter.test(e)) return true;
				else return false;
			},
			
			/***
			*
			*	Get current date-time
			*
			***/			
			getDateTime : function(opt)
			{
				var getDateTime = (new Date().getTime())-(3600000*timeZoneDiff);
				var currentTime = new Date(getDateTime);
				var yy = $.datepicker.formatDate('yy',currentTime);
				var mm = $.datepicker.formatDate('mm',currentTime);
				var dd = $.datepicker.formatDate('dd',currentTime);
				var h = currentTime.getHours();
				var m = currentTime.getMinutes();
				
				h = (h < 10 ? '0' + h : h);
				m = (m < 10 ? '0' + m : m);
				
				var date = yy + '-' + mm + '-' + dd  + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
				
				if (!opt)
				{
					return currentTime;
				}
				else if (opt.format)
				{
					if (opt.format == 'getDate')
					{
						return date;
					}
					else if (opt.format == 'dateLimit')
					{
						var parts;
						
						if (opt.date)
						{
							parts = opt.date.match(/(\d+)/g);
						}
						else
						{
							parts = date.match(/(\d+)/g);
						}
						
						m = parseInt(parts[4]) + (opt.noOffset ? 0 : 1);
						
						return new Date(parts[0], parts[1]-1, parts[2], parts[3], (m < 10 ? '0' + m : m));
					}
				}
			},
			
		} // END of h namespace
	});
		
})(jQuery);