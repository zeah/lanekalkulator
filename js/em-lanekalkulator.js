(function() {

	var loc = location.origin;

	if (loc.indexOf('localhost') != -1) loc += '/wordpress';

	var style = document.createElement('style');
	style.innerHTML = '.em-lanekalkulator:after { background-image: url(\''+loc+'/wp-content/plugins/emlanekalkulator/img/128-29.jpg\')}';
	document.head.appendChild(style);

	var container = document.querySelector('.em-lanekalkulator');

	if (!container) return;

	// var M; //monthly mortgage payment
	// var P = 3000000; //principle / initial amount borrowed
	// var I = 2.8 / 100 / 12; //monthly interest rate
	// var N = 25 * 12; //number of payments months

	// var data = {
	// 	lan: 500000,
	// 	rente: 5,
	// 	alder: 2
	// }


	var l = 250000;
	var r = 15;
	var a = 5;

	var newdiv = function(o) {
		var div = document.createElement('div');
		if (o.class) div.classList.add(o.class);

		return div;
	}

	var newspan = function(o) {
		var span = document.createElement('span');
		if (o.class) span.classList.add(o.class);
		if (o.text) span.appendChild(document.createTextNode(o.text));

		return span;
	}

	var newinput = function(o) {
		var input = document.createElement('input');
		if (o.class) input.classList.add(o.class);
		
		if (o.value) input.value = o.value;
		// if (o.value && o.type != 'range') input.setAttribute('value', o.value);
		
		if (o.min) input.setAttribute('min', o.min);
		if (o.max) input.setAttribute('max', o.max);
		if (o.step) input.setAttribute('step', o.step);
		if (o.type) input.setAttribute('type', o.type);

		return input;
	}

	var newh4 = function(o) {
		var h4 = document.createElement('h4');
		if (o.class) h4.classList.add(o.class);
		if (o.text) h4.appendChild(document.createTextNode(o.text));
	
		return h4;
	}


	function monthlyPayment(p, n, i) {
		// console.log(p+' '+n+' '+i);
	 	// return Math.floor(p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
	 	return Math.floor(p / ((1-Math.pow(1+i, -n))/i))
	}

	function writeMP() {
		info_text.innerHTML = monthlyPayment(l, a*12, r/100/12)+' kr';
	}

	var container_title = newspan({class: 'em-kalk-container-title', text: 'Lånekalkulator'});

	container.appendChild(container_title);

	var input_container = document.createElement('div');




	// lånebeløp
	var belop = newdiv({class: 'em-kalk-input-container'});
	belop.appendChild(newh4({class: 'em-kalk-title', text: 'Beløp'}))
	
	var ic_belop = newdiv({class: 'em-kalk-ic'});

	var input_belop = newinput({class: 'em-kalk-input', value: l, type: 'number', step: 5000})
	input_belop.addEventListener('input', function(e) {
		range_belop.value = e.target.value;
		l = e.target.value;
		writeMP();
	});
	ic_belop.appendChild(input_belop);
	// input_belop.setAttribute('disabled', '');

	ic_belop.appendChild(newspan({class: 'em-kalk-span', text: ' kr'}));

	belop.appendChild(ic_belop);

	var range_belop = newinput({class: 'em-kalk-range', type: 'range', min: 5000, max: 500000, step: 5000});
	// var range_belop = newinput({class: 'em-kalk-range', value: l, type: 'range', min: 5000, max: 500000, step: 5000});
	range_belop.value = l; // edge fix
	belop.appendChild(range_belop);

	range_belop.addEventListener('input', function(e) {
		input_belop.value = e.target.value;
		l = e.target.value;
		writeMP();
	});




	// betalingstid
	var alder = newdiv({class: 'em-kalk-input-container'});
	alder.appendChild(newh4({class: 'em-kalk-title', text: 'Nedbetalingstid'}))
	
	var ic_alder = newdiv({class: 'em-kalk-ic'});

	var input_alder = newinput({class: 'em-kalk-input', value: a, type: 'number', min: 1, max: 15, step: 1})
	input_alder.addEventListener('input', function(e) {
		range_alder.value = e.target.value;
		a = e.target.value;
		writeMP();
	});
	ic_alder.appendChild(input_alder);
	// input_alder.setAttribute('disabled', '');

	ic_alder.appendChild(newspan({class: 'em-kalk-span', text: ' år'}));

	alder.appendChild(ic_alder);

	var range_alder = newinput({class: 'em-kalk-range', type: 'range', min: 1, max: 15, step: 1});
	range_alder.value = a; // edge fix
	alder.appendChild(range_alder);

	range_alder.addEventListener('input', function(e) {
		input_alder.value = e.target.value;
		a = e.target.value;
		writeMP();
	});


	// rente 
	var rente = newdiv({class: 'em-kalk-input-container'});
	rente.appendChild(newh4({class: 'em-kalk-title', text: 'Rente'}))
	
	var ic_rente = newdiv({class: 'em-kalk-ic'});

	var input_rente = newinput({class: 'em-kalk-input', value: r, type: 'number', min: 0.1, max: 40, step: 0.01})
	input_rente.addEventListener('input', function(e) {
		range_rente.value = e.target.value;
		r = e.target.value;
		writeMP();
	});

	ic_rente.appendChild(input_rente);

	ic_rente.appendChild(newspan({class: 'em-kalk-span', text: '%'}));

	rente.appendChild(ic_rente);

	var range_rente = newinput({class: 'em-kalk-range',type: 'range', min: 2, max: 30, step: 0.05});
	range_rente.value = r; // edge fix
	rente.appendChild(range_rente);

	range_rente.addEventListener('input', function(e) {
		input_rente.value = e.target.value;
		r = e.target.value;
		writeMP();
	});



	input_container.appendChild(belop);
	input_container.appendChild(alder);
	input_container.appendChild(rente);

	// input_container.appendChild(makeInput('Lånebeløp',  lan));
	// input_container.appendChild(makeInput('Rente',  rente));
	// input_container.appendChild(makeInput('År',  alder));

	container.appendChild(input_container);

	var info_container = document.createElement('div');
	info_container.classList.add('em-kalk-info-container')

	var info_title = document.createElement('h4');
	info_title.classList.add('em-kalk-title');
	info_title.appendChild(document.createTextNode('Månedlig fradrag'));

	info_container.appendChild(info_title);

	// var info_text = document.createElement('span'); 
	var info_text = newspan({class: 'em-kalk-result'});
	// info_text.innerHTML = writeMP(lan, alder, rente)
	// info_text.appendChild(writeMP(lan, alder, rente))

	info_container.appendChild(info_text);
	// info_container.appendChild(document.createTextNode(Math.floor(monthlyPayment(lan, alder*12, rente/100/12))+' kr'));

	container.appendChild(info_container);
	writeMP();

	container.style.opacity = 1;
})();