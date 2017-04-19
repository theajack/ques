function get10Nums(M,SD) {
	var sigma = Math.sqrt( Math.log( (SD/M) * (SD/M) + 1 ) );
	var mu = Math.log(M) - sigma * sigma/ 2;

	console.log("sigma=" + sigma);
	console.log("mu=" + mu);


	var A = [];
	while(A.length < 10) {
		var radom = getNumberInNormalDistribution(mu,sigma);
		if (radom > mu + 1.8*sigma || radom < mu-1.8 * sigma) {
			continue;
		}
		if (A.indexOf(radom) == -1) {
			A.push(radom);
		}
	}
	console.log("A=");
	console.log(A);
	var arr = [];
	for (var i = 0; i < 10; i++) {
		arr[i] = Math.exp(A[i]);
	}
	return arr.sort();
}

function getNumberInNormalDistribution(mean,std_dev) {
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution(){
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
       		u = Math.random()*2-1.0;
        	v = Math.random()*2-1.0;
        	w = u*u+v*v;
    } while(w==0.0||w>=1.0)
    c = Math.sqrt((-2*Math.log(w))/w);
    return u*c;
}

function getMin(a1,a2,a3,a4) {
	var min = a1;
	min = a2 < min ? a2 : min;
	min = a3 < min ? a3 : min;
	min = a4 < min ? a4 : min;
	return min;
}
function getMax(a1,a2,a3,a4) {
	var max = a1;
	max = a2 > max ? a2 : max;
	max = a3 > max ? a3 : max;
	max = a4 > max ? a4 : max;
	return max;
}

function compare(x, y) {
    if (x < y) {
        return 1;
    } else if (x > y) {
        return -1;
    } else {
        return 0;
    }
}

function getRadom2() {
	var radom1 = Math.floor(Math.random()*3) + 4;
	var radom2 = Math.floor(Math.random()*3) + 7;
	var radom3 = Math.floor(Math.random()*6) + 4;
	while(radom3 == radom1 || radom3 == radom2) {
		radom3 = Math.floor(Math.random()*6) + 4;
	}
	return [radom1, radom2, radom3];
}

function getRadom() {
	var radom1 = Math.floor(Math.random()*4);
	var radom2 = Math.floor(Math.random()*4);
	while(radom2 == radom1) {
		radom2 = Math.floor(Math.random()*4);
	}
	return [radom1,radom2];
}

function Car(Tup,Tlow,oil_cost, park_cost, road_cost) {
	this.RP_mean = Math.ceil( (Tup+Tlow)/2 );
	this.a = Math.log(Tup/Tlow)/3.3;
	this.u = Math.log(this.RP_mean) - this.a*this.a/2;
	this.RP_SD = Math.sqrt((Math.exp(this.a*this.a)-1) * Math.exp(2 * this.u + this.a * this.a));
	this.RP_cost = Math.ceil( oil_cost + park_cost + road_cost );

	this.getSenario1 = function() {
		var car_meantime_RP = this.RP_mean;
		var car_cost1 = this.RP_cost + 5; 
		var car_cost2 = this.RP_cost + 15; 
		var car_cost3 = this.RP_cost + 30; 
		var car_cost4 = this.RP_cost + 40; 
		var car_reliability_RP = this.RP_SD;


		var metro_meantime1 = car_meantime_RP * 0.8;
		var metro_meantime2 = car_meantime_RP * 1.1;
		var metro_meantime3 = car_meantime_RP * 1.4;

		var metro_cost1 = 0;
		var metro_cost2 = 0;
		var metro_cost3 = 0;

		if (metro_meantime1 <= 25) {
			metro_cost1 = 3;
		} else if (metro_meantime1 > 25 && metro_meantime1 < 35) {
			metro_cost1 = 4;
		} else if (metro_meantime1 >= 35 && metro_meantime1 < 45) {
			metro_cost1 = 5;
		} else {
			metro_cost1 = 6;
		}

		if (metro_meantime2 <= 25) {
			metro_cost2 = 3;
		} else if (metro_meantime2 > 25 && metro_meantime2 < 35) {
			metro_cost2 = 4;
		} else if (metro_meantime2 >= 35 && metro_meantime2 < 45) {
			metro_cost2 = 5;
		} else {
			metro_cost2 = 6;
		}
		if (metro_meantime3 <= 25) {
			metro_cost3 = 3;
		} else if (metro_meantime3 > 25 && metro_meantime3 < 35) {
			metro_cost2 = 4;
		} else if (metro_meantime3 >= 35 && metro_meantime3 < 45) {
			metro_cost3 = 5;
		} else {
			metro_cost3 = 6;
		}

		var metro_re1 = 1;
		var metro_re2 = 3;
		var metro_re3 = 5;

		var metro_crowd0 = 0;
		var metro_crowd1 = 1;
		var metro_crowd3 = 3;

		var A = [
			[car_cost1, car_reliability_RP, car_meantime_RP, metro_cost1, metro_re3, metro_meantime1, metro_crowd1],
			[car_cost1, car_reliability_RP, car_meantime_RP, metro_cost3, metro_re1, metro_meantime3, metro_crowd0],
			[car_cost2, car_reliability_RP, car_meantime_RP, metro_cost1, metro_re1, metro_meantime1, metro_crowd3],
			[car_cost2, car_reliability_RP, car_meantime_RP, metro_cost1, metro_re2, metro_meantime1, metro_crowd0],
			[car_cost3, car_reliability_RP, car_meantime_RP, metro_cost2, metro_re2, metro_meantime2, metro_crowd0],
			[car_cost3, car_reliability_RP, car_meantime_RP, metro_cost3, metro_re3, metro_meantime3, metro_crowd3],
			[car_cost4, car_reliability_RP, car_meantime_RP, metro_cost2, metro_re1, metro_meantime2, metro_crowd1],
			[car_cost4, car_reliability_RP, car_meantime_RP, metro_cost2, metro_re2, metro_meantime2, metro_crowd1]
		];

		var B = [0.0618, 0.0788, 0.06,  -0.0618, -0.0788, -0.06, -0.5];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u - 1;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);


		var z = [];
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		var u3 = A[2][A[2].length-1];
		var u4 = A[3][A[3].length-1];
		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];

		if (u1 < u2) {
			z[0] = A[0];
		} else {
			z[0] = A[1]; 
		}

		if (u3 < u4) {
			z[1] = A[2];
		} else {
			z[1] = A[3];
		}

		if (u5 > u6) {
			z[2] = A[4];
		} else {
			z[2] = A[5];
		}

		if (u7 > u8) {
			z[3] = A[6];
		} else {
			z[3] = A[7];
		}

		return z;


	}

	this.getSenario2 = function() {
		var car_meantime_RP = this.RP_mean;
		var car_cost1 = this.RP_cost + 5;
		var car_cost2 = this.RP_cost + 15;
		var car_cost3 = this.RP_cost + 30;
		var car_cost4 = this.RP_cost + 40;
		var car_reliability_RP = this.RP_SD;

		var bus_meantime1 = car_meantime_RP;
		var bus_meantime2 = car_meantime_RP * 1.3;
		var bus_meantime3 = car_meantime_RP * 1.6;

		var bus_cost = 2;
		var bus_re1 = 3;
		var bus_re2 = 7;
		var bus_re3 = 10;

		var bus_crowd0 = 0;
		var bus_crowd1 = 1;
		var bus_crowd3 = 3;

		var bus_crowd2 = 2;

		var A = [
			[car_cost1, car_reliability_RP, car_meantime_RP, bus_cost, bus_re3, bus_meantime1, bus_crowd1],
			[car_cost1, car_reliability_RP, car_meantime_RP, bus_cost, bus_re1, bus_meantime3, bus_crowd0],
			[car_cost2, car_reliability_RP, car_meantime_RP, bus_cost, bus_re2, bus_meantime1, bus_crowd0],
			[car_cost2, car_reliability_RP, car_meantime_RP, bus_cost, bus_re1, bus_meantime1, bus_crowd3],
			[car_cost3, car_reliability_RP, car_meantime_RP, bus_cost, bus_re2, bus_meantime2, bus_crowd0],
			[car_cost3, car_reliability_RP, car_meantime_RP, bus_cost, bus_re3, bus_meantime3, bus_crowd3],
			[car_cost4, car_reliability_RP, car_meantime_RP, bus_cost, bus_re1, bus_meantime2, bus_crowd1],
			[car_cost4, car_reliability_RP, car_meantime_RP, bus_cost, bus_re2, bus_meantime2, bus_crowd1]
		];

		var B = [0.0618, 0.0788, 0.06,  -0.0618, -0.03, -0.06, -0.5];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u - 1.5;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);

		var z = [];
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		var u3 = A[2][A[2].length-1];
		var u4 = A[3][A[3].length-1];
		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];
		if (u1 < u2) {
			z[0] = A[0];
		} else {
			z[0] = A[1];
		}

		if (u3 < u4) {
			z[1] = A[2];
		} else {
			z[1] = A[3];
		}

		if (u5 > u6) {
			z[2] = A[4];
		} else {
			z[2] = A[5];
		}

		if (u7 > u8) {
			z[3] = A[6];
		} else {
			z[3] = A[7];
		}

		return z;

	}

	this.getSenario3 = function() {
		if (this.RP_mean <= 25) {
			var car_meantime1 = 10;
			var car_meantime2 = 20;
			var car_meantime3 = 30;
			var car_reliability1 = 3;
			var car_reliability2 = 6;
			var car_reliability3 = 8;
			var car_cost1 = 5;
			var car_cost2 = 15;
			var car_cost3 = 25;

			var metro_meantime1 = 15;
			var metro_meantime2 = 25;
			var metro_meantime3 = 35;
			var metro_re1 = 2;
			var metro_re2 = 3;
			var metro_re3 = 4;
			var metrocost1 = 3;
			var metrocost2 = 4;
			var metro_crowd0 = 0;
			var metro_crowd1 = 1;
			var metro_crowd3 = 3;

			var bus_meantime1 = 15;
			var bus_meantime2 = 25;
			var bus_meantime3 = 35;
			var bus_re1 = 4;
			var bus_re2 = 7;
			var bus_re3 = 10;
			var bus_cost = 2;
			var bus_crowd0 = 0;
			var bus_crowd1 = 1;
			var bus_crowd3 = 3;


			var A = [
				[car_cost1, car_reliability1, car_meantime3, metrocost1, metro_re3, metro_meantime1, metro_crowd0, bus_cost, bus_re2, bus_meantime3, bus_crowd1],
				[car_cost1, car_reliability3, car_meantime1, metrocost1, metro_re2, metro_meantime2, metro_crowd1, bus_cost, bus_re1, bus_meantime2, bus_crowd1],
				[car_cost1, car_reliability1, car_meantime1, metrocost1, metro_re3, metro_meantime2, metro_crowd1, bus_cost, bus_re1, bus_meantime2, bus_crowd1],
				[car_cost1, car_reliability2, car_meantime2, metrocost2, metro_re3, metro_meantime3, metro_crowd1, bus_cost, bus_re3, bus_meantime1, bus_crowd0],
				[car_cost2, car_reliability2, car_meantime2, metrocost1, metro_re2, metro_meantime2, metro_crowd3, bus_cost, bus_re1, bus_meantime1, bus_crowd0],
				[car_cost2, car_reliability3, car_meantime3, metrocost2, metro_re3, metro_meantime3, metro_crowd0, bus_cost, bus_re1, bus_meantime1, bus_crowd3],
				[car_cost2, car_reliability2, car_meantime3, metrocost1, metro_re1, metro_meantime1, metro_crowd0, bus_cost, bus_re2, bus_meantime2, bus_crowd3],
				[car_cost3, car_reliability1, car_meantime2, metrocost2, metro_re1, metro_meantime3, metro_crowd0, bus_cost, bus_re3, bus_meantime1, bus_crowd3],
				[car_cost3, car_reliability3, car_meantime1, metrocost1, metro_re3, metro_meantime1, metro_crowd3, bus_cost, bus_re3, bus_meantime3, bus_crowd0],
				[car_cost3, car_reliability1, car_meantime1, metrocost1, metro_re2, metro_meantime1, metro_crowd3, bus_cost, bus_re1, bus_meantime3, bus_crowd0]
			];

			var Bmetro = [0.0618,0.0788,0.06,-0.0618,-0.12,-0.06,-0.5,0,0,0,0];
			var Bbus = [0.0618,0.0788,0.06,0,0,0,0,-0.0618,-0.04,-0.06,-0.5];

			for(var i = 0; i < A.length; i++) {
				var umetro = 0;
				var ubus = 0;
				for (var j = 0; j < A[i].length; j++) {
					umetro += A[i][j] * Bmetro[j];
					ubus += A[i][j] * Bbus[j];
				}
				umetro = umetro - 0.6;
				ubus = ubus - 1.5;
				A[i][A[i].length] = umetro;
				A[i][A[i].length] = ubus;
			}
			console.log("P=");
			console.log(A);


			var z = [];
			var radoms = getRadom();

			var radom1 = radoms[0];
			var radom2 = radoms[1];
			if(radom1 < 0 || radom1 > 3 || radom2 < 0 || radom2 > 3) {
				radom1 = 0;
				radom2 = 1;
			}
			z[0] = A[radom1];
			z[1] = A[radom2];


			var radomX =  getRadom2();
			var radom3 = radomX[0];
			var radom4 = radomX[1];
			var radom5 = radomX[2];
			z[2] = A[radom3];
			z[3] = A[radom4];
			z[4] = A[radom5];

			// var u5 = A[4][A[4].length-2];
			// var u6 = A[5][A[5].length-2];
			// var u7 = A[6][A[6].length-2];

			// var arr1 = [u5,u6,u7];
			// arr1.sort(compare)
			// if (u5 == arr1[0]) {
			// 	z[2] = A[4];
			// } else if (u6 == arr1[0]) {
			// 	z[2] = A[5];
			// } else if (u7 == arr1[0]) {
			// 	z[2] = A[6];
			// }

			// var u8 = A[7][A[7].length-1];
			// var u9 = A[8][A[8].length-1];
			// var u10 = A[9][A[9].length-1];
			// var arr2 = [u8,u9,u10];
			// arr2.sort(compare)
			// if (u8 == arr2[0]) {
			// 	z[3] = A[7];
			// } else if (u9 == arr2[0]) {
			// 	z[3] = A[8];
			// } else if (u10 == arr2[0]) {
			// 	z[3] = A[9];
			// }
			return z;


		} else if(this.RP_mean > 25 && this.RP_mean <= 40) {
			var car_meantime1 = 20;
			var car_meantime2 = 30;
			var car_meantime3 = 40;
			var car_reliability1 = 3;
			var car_reliability2 = 6;
			var car_reliability3 = 9;
			var car_cost1 = 10;
			var car_cost2 = 20;
			var car_cost3 = 30;

			var metro_meantime1 = 25;
			var metro_meantime2 = 35;
			var metro_meantime3 = 45;
			var metro_re1 = 2;
			var metro_re2 = 4;
			var metro_re3 = 5;
			var metrocost1 = 3;
			var metrocost2 = 4;
			var metrocost3 = 5;
			var metro_crowd0 = 0;
			var metro_crowd1 = 1;
			var metro_crowd3 = 3;

			var bus_meantime1 = 25;
			var bus_meantime2 = 35;
			var bus_meantime3 = 45;
			var bus_re1 = 4;
			var bus_re2 = 7;
			var bus_re3 = 10;
			var bus_cost = 2;
			var bus_crowd0 = 0;
			var bus_crowd1 = 1;
			var bus_crowd3 = 3;

			var A = [
				[car_cost1, car_reliability1, car_meantime2, metrocost2, metro_re2, metro_meantime2, metro_crowd3, bus_cost, bus_re3, bus_meantime1, bus_crowd0],
				[car_cost1, car_reliability2, car_meantime3, metrocost2, metro_re2, metro_meantime2, metro_crowd1, bus_cost, bus_re1, bus_meantime1, bus_crowd0],
				[car_cost1, car_reliability3, car_meantime1, metrocost2, metro_re1, metro_meantime2, metro_crowd1, bus_cost, bus_re2, bus_meantime3, bus_crowd1],
				[car_cost1, car_reliability1, car_meantime1, metrocost3, metro_re2, metro_meantime3, metro_crowd1, bus_cost, bus_re1, bus_meantime2, bus_crowd1],
				[car_cost2, car_reliability2, car_meantime3, metrocost1, metro_re3, metro_meantime1, metro_crowd0, bus_cost, bus_re2, bus_meantime2, bus_crowd3],
				[car_cost2, car_reliability3, car_meantime2, metrocost3, metro_re3, metro_meantime3, metro_crowd0, bus_cost, bus_re3, bus_meantime1, bus_crowd3],
				[car_cost2, car_reliability2, car_meantime3, metrocost1, metro_re1, metro_meantime1, metro_crowd0, bus_cost, bus_re2, bus_meantime2, bus_crowd1],
				[car_cost3, car_reliability3, car_meantime1, metrocost1, metro_re3, metro_meantime1, metro_crowd3, bus_cost, bus_re1, bus_meantime3, bus_crowd0],
				[car_cost3, car_reliability1, car_meantime2, metrocost3, metro_re1, metro_meantime3, metro_crowd0, bus_cost, bus_re1, bus_meantime1, bus_crowd3],
				[car_cost3, car_reliability1, car_meantime1, metrocost1, metro_re1, metro_meantime1, metro_crowd3, bus_cost, bus_re3, bus_meantime3, bus_crowd0]
			];

			var Bmetro = [0.0618,0.0788,0.06,-0.0618,-0.12,-0.06,-0.5,0,0,0,0];
			var Bbus = [0.0618,0.0788,0.06,0,0,0,0,-0.0618,-0.04,-0.06,-0.5];

			for(var i = 0; i < A.length; i++) {
				var umetro = 0;
				var ubus = 0;
				for (var j = 0; j < A[i].length; j++) {
					umetro += A[i][j] * Bmetro[j];
					ubus += A[i][j] * Bbus[j];
				}
				umetro = umetro - 0.6;
				ubus = ubus - 1.5;
				A[i][A[i].length] = umetro;
				A[i][A[i].length] = ubus;
			}
			console.log("P=");
			console.log(A);


			var z = [];

			var radoms = getRadom();

			var radom1 = radoms[0];
			var radom2 = radoms[1];
			if(radom1 < 0 || radom1 > 3 || radom2 < 0 || radom2 > 3) {
				radom1 = 0;
				radom2 = 1;
			}

			
			z[0] = A[radom1];
			z[1] = A[radom2];

			var radomX =  getRadom2();
			var radom3 = radomX[0];
			var radom4 = radomX[1];
			var radom5 = radomX[2];
			z[2] = A[radom3];
			z[3] = A[radom4];
			z[4] = A[radom5];

			// var u5 = A[4][A[4].length-2];
			// var u6 = A[5][A[5].length-2];
			// var u7 = A[6][A[6].length-2];

			// var arr1 = [u5,u6,u7];
			// arr1.sort(compare)
			// if (u5 == arr1[0]) {
			// 	z[2] = A[4];
			// } else if (u6 == arr1[0]) {
			// 	z[2] = A[5];
			// } else if (u7 == arr1[0]) {
			// 	z[2] = A[6];
			// }

			// var u8 = A[7][A[7].length-1];
			// var u9 = A[8][A[8].length-1];
			// var u10 = A[9][A[9].length-1];
			// var arr2 = [u8,u9,u10];
			// arr2.sort(compare)
			// if (u8 == arr2[0]) {
			// 	z[3] = A[7];
			// } else if (u9 == arr2[0]) {
			// 	z[3] = A[8];
			// } else if (u10 == arr2[0]) {
			// 	z[3] = A[9];
			// }
			return z;
		} else {
			var car_meantime1 = 30;
			var car_meantime2 = 40;
			var car_meantime3 = 50;
			var car_reliability1 = 3;
			var car_reliability2 = 6;
			var car_reliability3 = 9;
			var car_cost1 = 15;
			var car_cost2 = 25;
			var car_cost3 = 35;

			var metro_meantime1 = 35;
			var metro_meantime2 = 45;
			var metro_meantime3 = 55;
			var metro_re1 = 2;
			var metro_re2 = 4;
			var metro_re3 = 7;
			var metrocost1 = 4;
			var metrocost2 = 5;
			var metrocost3 = 6;
			var metro_crowd0 = 0;
			var metro_crowd1 = 1;
			var metro_crowd3 = 3;

			var bus_meantime1 = 40;
			var bus_meantime2 = 50;
			var bus_meantime3 = 60;
			var bus_re1 = 4;
			var bus_re2 = 8;
			var bus_re3 = 12;
			var bus_cost = 2;
			var bus_crowd0 = 0;
			var bus_crowd1 = 1;
			var bus_crowd3 = 3;

			var A = [
				[car_cost1, car_reliability1, car_meantime2, metrocost3, metro_re2, metro_meantime3, metro_crowd1, bus_cost, bus_re3, bus_meantime1, bus_crowd0 ],
				[car_cost1, car_reliability1, car_meantime1, metrocost2, metro_re2, metro_meantime2, metro_crowd1, bus_cost, bus_re2, bus_meantime2, bus_crowd1 ],
				[car_cost1, car_reliability3, car_meantime1, metrocost3, metro_re1, metro_meantime3, metro_crowd0, bus_cost, bus_re2, bus_meantime2, bus_crowd3 ],
				[car_cost1, car_reliability3, car_meantime3, metrocost3, metro_re3, metro_meantime3, metro_crowd0, bus_cost, bus_re1, bus_meantime1, bus_crowd3 ],
				[car_cost2, car_reliability2, car_meantime2, metrocost1, metro_re1, metro_meantime1, metro_crowd3, bus_cost, bus_re1, bus_meantime1, bus_crowd0 ],
				[car_cost2, car_reliability2, car_meantime3, metrocost1, metro_re2, metro_meantime1, metro_crowd0, bus_cost, bus_re2, bus_meantime2, bus_crowd3 ],
				[car_cost2, car_reliability2, car_meantime3, metrocost2, metro_re1, metro_meantime2, metro_crowd0, bus_cost, bus_re3, bus_meantime1, bus_crowd1 ],
				[car_cost3, car_reliability1, car_meantime2, metrocost1, metro_re1, metro_meantime1, metro_crowd3, bus_cost, bus_re1, bus_meantime3, bus_crowd0 ],
				[car_cost3, car_reliability3, car_meantime1, metrocost1, metro_re3, metro_meantime1, metro_crowd3, bus_cost, bus_re3, bus_meantime3, bus_crowd0 ],
				[car_cost3, car_reliability1, car_meantime1, metrocost2, metro_re3, metro_meantime2, metro_crowd1, bus_cost, bus_re1, bus_meantime3, bus_crowd1 ]
			];

			var Bmetro = [0.0618,0.0788,0.06,-0.0618,-0.12,-0.06,-0.5,0,0,0,0];
			var Bbus = [0.0618,0.0788,0.06,0,0,0,0,-0.0618,-0.04,-0.06,-0.5];

			for(var i = 0; i < A.length; i++) {
				var umetro = 0;
				var ubus = 0;
				for (var j = 0; j < A[i].length; j++) {
					umetro += A[i][j] * Bmetro[j];
					ubus += A[i][j] * Bbus[j];
				}
				umetro = umetro - 0.6;
				ubus = ubus - 1.5;
				A[i][A[i].length] = umetro;
				A[i][A[i].length] = ubus;
			}
			console.log("P=");
			console.log(A);


			var z = [];

			var radoms = getRadom();

			var radom1 = radoms[0];
			var radom2 = radoms[1];
			if(radom1 < 0 || radom1 > 3 || radom2 < 0 || radom2 > 3) {
				radom1 = 0;
				radom2 = 1;
			}

			
			z[0] = A[radom1];
			z[1] = A[radom2];

			var radomX =  getRadom2();
			var radom3 = radomX[0];
			var radom4 = radomX[1];
			var radom5 = radomX[2];
			z[2] = A[radom3];
			z[3] = A[radom4];
			z[4] = A[radom5];

			// var u5 = A[4][A[4].length-2];
			// var u6 = A[5][A[5].length-2];
			// var u7 = A[6][A[6].length-2];

			// var arr1 = [u5,u6,u7];
			// arr1.sort(compare)
			// if (u5 == arr1[0]) {
			// 	z[2] = A[4];
			// } else if (u6 == arr1[0]) {
			// 	z[2] = A[5];
			// } else if (u7 == arr1[0]) {
			// 	z[2] = A[6];
			// }

			// var u8 = A[7][A[7].length-1];
			// var u9 = A[8][A[8].length-1];
			// var u10 = A[9][A[9].length-1];
			// var arr2 = [u8,u9,u10];
			// arr2.sort(compare)
			// if (u8 == arr2[0]) {
			// 	z[3] = A[7];
			// } else if (u9 == arr2[0]) {
			// 	z[3] = A[8];
			// } else if (u10 == arr2[0]) {
			// 	z[3] = A[9];
			// }
			return z;
		}
	}

	this.getSenario4 = function (Updistance,downDistance) {
		var RP_distance = Math.ceil( (Updistance + downDistance)/2 );
		var RP_time = this.RP_mean;
		var Cost_RP1 = this.RP_cost + 5;
		var Cost_RP2 = this.RP_cost + 10;
		var Cost_RP3 = this.RP_cost + 20;
		var Cost_RP4 = this.RP_cost + 30;
		var RP_reliability = this.RP_SD;


		var distance1 = RP_distance * 1.2; 
		var distance2 = RP_distance * 1.4; 
		var Time1 = RP_time;
		var Time2 = RP_time * 1.2;
		var Time3 = RP_time * 1.4;
		var Cost1 = Math.ceil(0.7 * distance1);
		var Cost2 = Math.ceil(0.7 * distance1);
		var Reliability1 = RP_reliability * 0.7;
		var Reliability2 = RP_reliability;
		var Reliability3 = RP_reliability * 1.3;

		var A = [
			[Cost_RP1, RP_reliability, RP_time, Cost1, Reliability1, Time2],
			[Cost_RP1, RP_reliability, RP_time, Cost2, Reliability1, Time3],
			[Cost_RP2, RP_reliability, RP_time, Cost1, Reliability1, Time1],
			[Cost_RP2, RP_reliability, RP_time, Cost2, Reliability3, Time3],
			[Cost_RP3, RP_reliability, RP_time, Cost1, Reliability3, Time2],
			[Cost_RP3, RP_reliability, RP_time, Cost1, Reliability2, Time1],
			[Cost_RP4, RP_reliability, RP_time, Cost1, Reliability2, Time2],
			[Cost_RP4, RP_reliability, RP_time, Cost1, Reliability2, Time1]
		];

		var B = [0.0618, 0.0788, 0.06, -0.0618, -0.0788, -0.06];

		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		var u3 = A[2][A[2].length-1];
		var u4 = A[3][A[3].length-1];
		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];

		var z = [];
		if (u1 < u2) {
			z[0] = A[0];
		} else {
			z[0] = A[1];
		}

		if (u3 < u4) {
			z[1] = A[2];
		} else {
			z[1] = A[3]; 
		}

		if (u5 > u6) {
			z[2] = A[4];
		} else {
			z[2] = A[5]; 
		}
		if (u7 > u8) {
			z[3] = A[6];
		} else {
			z[3] = A[7]; 
		}
		return z;
	}

}



function Bus(Tup,Tlow,crowd) {
	this.RP_mean = Math.ceil( (Tup+Tlow)/2 );
	this.a = Math.log(Tup/Tlow)/3.3;
	this.u = Math.log(this.RP_mean) - this.a*this.a/2;
	this.RP_SD = Math.sqrt((Math.exp(this.a*this.a)-1) * Math.exp(2*this.u+this.a*this.a));
	this.RP_crowd = crowd;

	this.getSenario1 = function() {
		var bus_time = this.RP_mean;
		var bus_cost = 2;
		var bus_re = this.RP_SD;
		var bus_crowd = this.RP_crowd;

		var metro_time1 = 0.8 * bus_time;
		var metro_time2 = bus_time;
		var metro_time3 = 1.2 * bus_time;

		var metro_cost1 = 0;
		var metro_cost2 = 0;
		var metro_cost3 = 0;

		if(metro_time1 < 25) {
			metro_cost1 = 3;
		} else if(metro_time1 >= 25 && metro_time1 <= 35) {
			metro_cost1 = 4;
		} else if(metro_time1 > 35 && metro_time1 <= 45) {
			metro_cost1 = 5;
		} else {
			metro_cost1 = 6;
		}

		if(metro_time2 < 25) {
			metro_cost2 = 3;
		} else if(metro_time2 >= 25 && metro_time2 <= 35) {
			metro_cost2 = 4;
		} else if(metro_time2 > 35 && metro_time2 <= 45) {
			metro_cost2 = 5;
		} else {
			metro_cost2 = 6;
		}

		if(metro_time3 < 25) {
			metro_cost3 = 3;
		} else if(metro_time3 >= 25 && metro_time3 <= 35) {
			metro_cost3 = 4;
		} else if(metro_time3 > 35 && metro_time3 <= 45) {
			metro_cost3 = 5;
		} else {
			metro_cost3 = 6;
		}

		var metro_re1 = 1;
		var metro_re2 = 3;
		var metro_re3 = 5;

		var metro_crowd0 = 0;
		var metro_crowd1 = 1;
		var metro_crowd3 = 3;

		var A = [
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost3, metro_re3,metro_time3,metro_crowd0],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost3, metro_re1,metro_time3,metro_crowd3],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost2, metro_re2,metro_time2,metro_crowd1],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost2, metro_re2,metro_time2,metro_crowd0],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost2, metro_re1,metro_time2,metro_crowd0],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost1, metro_re1,metro_time1,metro_crowd1],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost1, metro_re2,metro_time1,metro_crowd1],
			[bus_cost, bus_re, bus_time, bus_crowd, metro_cost1, metro_re3,metro_time1,metro_crowd3]
		
		];

		var B = [0.0618, 0.0788, 0.06, 0.5, -0.0618, -0.0788, -0.06, -0.5];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u + 0.5;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);

		var z = [];
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		if (u1 < u2) {
			z[0] = A[0];
		} else {
			z[0] = A[1];
		}


		var u3 = A[2][A[2].length-1];
		var u4 = A[3][A[3].length-1];
		if (u3 < u4) {
			z[1] = A[2];
		} else {
			z[1] = A[3];
		}

		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];
		var arr = [u5,u6,u7,u8];
		arr.sort(compare)
		if (u4 == arr[0]) {
			z[2] = A[3];
		} else if (u5 == arr[0]) {
			z[2] = A[4];
		}else if (u6 == arr[0]) {
			z[2] = A[5];
		} else if (u7 == arr[0]) {
			z[2] = A[6];
		} else if (u8 == arr[0]) {
			z[2] = A[7];
		}

		if (u4 == arr[2]) {
			z[3] = A[3];
		} else if (u5 == arr[2]) {
			z[3] = A[4];
		}else if (u6 == arr[2]) {
			z[3] = A[5];
		} else if (u7 == arr[2]) {
			z[3] = A[6];
		} else if (u8 == arr[2]) {
			z[3] = A[7];
		}

		return z;
	}

	this.getSenario2 = function() {
		var bus_time = this.RP_mean;
		var bus_cost = 2;
		var bus_re = this.RP_SD;
		var bus_crowd= this.RP_crowd;

		// var bus_time1 = 0.7 * bus_time;
		// var bus_time2 = 0.85 * bus_time;
		// var bus_time3 = bus_time;

		var car_time1 = Math.ceil(0.7 * bus_time);
		var car_time2 = Math.ceil(0.85 * bus_time);
		var car_time3 = Math.ceil(bus_time);


		var car_cost1 = 5;
		var car_cost2 = 10;
		var car_cost3 = 15;

		var car_re1 = this.RP_SD * 0.7;
		var car_re2 = this.RP_SD * 0.85;
		var car_re3 = this.RP_SD;

		var A = [
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost3, car_re1, car_time3],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost3, car_re3, car_time1],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost2, car_re1, car_time1],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost2, car_re2, car_time2],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost2, car_re2, car_time1],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost1, car_re3, car_time3],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost1, car_re2, car_time2],
			[bus_cost, bus_re, bus_time, bus_crowd, car_cost1, car_re1, car_time2]
		];

		var B = [0.0618, 0.0788, 0.06, 0.5, -0.0618, -0.0788, -0.06];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u + 0.5;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);

		var z = [];
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		var u3 = A[2][A[2].length-1];
		var u4 = A[3][A[3].length-1];
		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];

		if (u1 < u2) {
			z[0] = A[0];
		} else {
			z[0] = A[1];
		}

		var arr1 = [u3,u4,u5];
		arr1.sort(compare)
		if (u3 == arr1[2]) {
			z[1] = A[2];
		} else if (u4 == arr1[2]) {
			z[1] = A[3];
		} else if (u5 == arr1[2]) {
			z[1] = A[4];
		}

		var arr2 = [u5,u6,u7,u8];
		arr2.sort(compare)

		if (u5 == arr2[1]) {
			z[2] = A[4];
		} else if (u6 == arr2[1]) {
			z[2] = A[5];
		} else if (u7 == arr2[1]) {
			z[2] = A[6];
		} else if (u8 == arr2[1]) {
			z[2] = A[7];
		}
		if (u5 == arr2[0]) {
			z[3] = A[4];
		} else if (u6 == arr2[0]) {
			z[3] = A[5];
		} else if (u7 == arr2[0]) {
			z[3] = A[6];
		} else if (u8 == arr2[0]) {
			z[3] = A[7];
		}


		

		return z;

	}

}

function Metro(Tup,Tlow,crowd,cost) {
	this.RP_mean = Math.ceil( (Tup+Tlow)/2 );
	this.RP_SD = Math.sqrt((Tup-Tlow)*(Tup-Tlow)/12);
	this.RP_crowd = crowd;
	this.RP_cost = Math.ceil( cost );


	this.getSenario1 = function() {
		//原选择
		var metro_time = this.RP_mean;

		var metro_cost1 = this.RP_cost + 2;
		var metro_cost2 = this.RP_cost + 6;
		var metro_cost3 = this.RP_cost + 10;

		var metro_re = this.RP_SD;

		var metro_crowd = this.RP_crowd;


		//选择1公交车
		var bus_time1 = metro_time * 0.8;
		var bus_time2 = metro_time * 1;
		var bus_time3 = metro_time * 1.2;

		var bus_cost = 2;

		var bus_re1 = 3;
		var bus_re2 = 7;
		var bus_re3 = 10;

		var bus_crowd0 = 0;
		var bus_crowd1 = 1;
		var bus_crowd3 = 3;

		var A = [
			[metro_cost1, metro_re, metro_time, metro_crowd, bus_cost, bus_re1, bus_time2, bus_crowd3],
			[metro_cost1, metro_re, metro_time, metro_crowd, bus_cost, bus_re3, bus_time3, bus_crowd1],
			[metro_cost1, metro_re, metro_time, metro_crowd, bus_cost, bus_re2, bus_time1, bus_crowd1],
			[metro_cost2, metro_re, metro_time, metro_crowd, bus_cost, bus_re2, bus_time2, bus_crowd0],
			[metro_cost2, metro_re, metro_time, metro_crowd, bus_cost, bus_re2, bus_time1, bus_crowd0],
			[metro_cost2, metro_re, metro_time, metro_crowd, bus_cost, bus_re1, bus_time2, bus_crowd0],
			[metro_cost3, metro_re, metro_time, metro_crowd, bus_cost, bus_re3, bus_time1, bus_crowd3],
			[metro_cost3, metro_re, metro_time, metro_crowd, bus_cost, bus_re1, bus_time3, bus_crowd1]
		];

		var B = [0.0618, 0.0788, 0.06, 0.5, -0.0618, -0.0788, -0.06, -0.5];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u - 0.7;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);

		var z = [];
		var u1 = A[0][A[0].length-1];
		var u2 = A[1][A[1].length-1];
		var u3 = A[2][A[2].length-1];
		if (u1 <= u2 && u1 <= u3) {
			z[0] = A[0];
		} else if(u2 <= u1 && u2 <= u3) {
			z[0] = A[1]
		} else if(u3 <= u1 && u3 <= u2) {
			z[0] = A[2];
		}


		var u4 = A[3][A[3].length-1];
		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		if (u4 <= u5 && u4 <= u6) {
			z[1] = A[4];
			z[2] = A[5];
		} else if(u5 <= u4 && u5 <= u6) {
			z[1] = A[3];
			z[2] = A[5];
		} else if(u6 <= u4 && u6 <= u5) {
			z[1] = A[3];
			z[2] = A[4];
		}

		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];
		if(u7 > u8) {
			z[3] = A[6];
		} else {
			z[3] = A[7];
		}
		return z;

	}

	this.getSenario2 = function() {
		var metro_time = this.RP_mean;
		var metro_cost1 = this.RP_cost;
		var metro_cost2 = this.RP_cost + 5;
		var metro_re = this.RP_SD;
		var metro_crowd = this.RP_crowd;

		// var RPcar = Math.ceil( (carUp + carDown) / 2 );

		// var RPmetro = metro_time;

		var car_time1 = 0.8 * metro_time;
		var car_time2 = metro_time;
		var car_time3 = 1.2 * metro_time;

		var car_cost1 = 5;
		var car_cost2 = 10;
		var car_cost3 = 15;

		var car_re1 = 3;
		var car_re2 = 5;
		var car_re3 = 8;

		var A = [
			[metro_cost1, metro_re, metro_time, metro_crowd, car_cost2, car_re1, car_time3],
			[metro_cost1, metro_re, metro_time, metro_crowd, car_cost2, car_re2, car_time2],
			[metro_cost1, metro_re, metro_time, metro_crowd, car_cost2, car_re1, car_time1],
			[metro_cost1, metro_re, metro_time, metro_crowd, car_cost3, car_re3, car_time1],
			[metro_cost2, metro_re, metro_time, metro_crowd, car_cost1, car_re2, car_time2],
			[metro_cost2, metro_re, metro_time, metro_crowd, car_cost1, car_re3, car_time3],
			[metro_cost2, metro_re, metro_time, metro_crowd, car_cost2, car_re2, car_time1],
			[metro_cost2, metro_re, metro_time, metro_crowd, car_cost1, car_re1, car_time2]
		];

		var B = [0.0618, 0.0788, 0.06, 0.5, -0.0618, -0.0788, -0.06];
		for(var i = 0; i < A.length; i++) {
			var u = 0;
			for (var j = 0; j < A[i].length; j++) {
				u += A[i][j] * B[j];
			}
			u = u + 0.5;
			A[i][A[i].length] = u;
		}
		console.log("P=");
		console.log(A);


		var z = [];

		var radoms = getRadom();

		var radom1 = radoms[0];
		var radom2 = radoms[1];
		if(radom1 < 0 || radom1 > 3 || radom2 < 0 || radom2 > 3) {
			radom1 = 0;
			radom2 = 1;
		}
		
		z[0] = A[radom1];
		z[1] = A[radom2];


		var u5 = A[4][A[4].length-1];
		var u6 = A[5][A[5].length-1];
		var u7 = A[6][A[6].length-1];
		var u8 = A[7][A[7].length-1];

		var arr = [u5,u6,u7,u8];
		arr.sort(compare)
		if (u5 == arr[3]) {
			z[2] = A[4];
		} else if (u6 == arr[3]) {
			z[2] = A[5];
		} else if (u7 == arr[3]) {
			z[2] = A[6];
		} else if (u8 == arr[3]) {
			z[2] = A[7];
		}



		if (u5 == arr[0]) {
			z[3] = A[4];
		} else if (u6 == arr[0]) {
			z[3] = A[5];
		} else if (u7 == arr[0]) {
			z[3] = A[6];
		} else if (u8 == arr[0]) {
			z[3] = A[7];
		}

		
		return z;
	}

}