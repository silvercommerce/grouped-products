(function(document, window) {
	/**
	 * Better cross browser support for XHR, thanks to this post:
	 * https://stackoverflow.com/questions/3470895/small-ajax-javascript-library
	 * for the idea
	 */
    function create_xhr()
    {
		var xhr;
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				alert(e.message);
				xhr = null;
			}
		} else {
			xhr = new XMLHttpRequest();
		}

		return xhr;
	}

	/**
	 * Create a xhr request to retrieve field data and update select field
	 * 
	 * @param {input} price_field the current product field
	 */
    function xhr_request(price_field)
    {
        var classname = price_field.dataset.productpriceclassname;
        var url = price_field.dataset.url;
        var xhr = create_xhr();

        if (typeof classname === 'undefined' && typeof url === 'undefined') {
            return;
        }

		// Handle json response
		xhr.onreadystatechange = function() {
			var price_elements = document.getElementsByClassName(classname);
			var x;

			for (x = 0; x < price_elements.length; x++) {
				var cur_price = price_elements[x];

				if (xhr.readyState === 1) {
					cur_price.style.opacity = 0.5;
				}
	
				if (xhr.readyState === 4) {
					cur_price.style.opacity = 1;
					cur_price.innerHTML = xhr.response;
				}
			}
		}
		xhr.open('GET', url, true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send();
    }

    var price_fields = document.querySelectorAll('[data-productpriceclassname]');
    var i;

    for (i = 0; i < price_fields.length; i++) {
        var curr_price = price_fields[i];
        curr_price.onchange = function() {
            xhr_request(this);
        }
    }
}(document, window));