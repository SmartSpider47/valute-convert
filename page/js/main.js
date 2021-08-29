
var vlist = [];

var lbutton = "";

SetList();

async function SetList () {
	try {
		let response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
		let content = await response.json();
		var cur = "AMD";
		var json_data = content.Valute;
		vlist = [];

		var choose_1 = "";
		var choose_2 = "";

		for(var i in json_data)
		    vlist.push([i, json_data [i]]);

		for (var i = 0; i < vlist.length; i++) {
			choose_1 += "<option>" + vlist[i][0] + "</option>";
			choose_2 += "<option>" + vlist[i][1].Name + "</option>";
		}

		document.getElementById("id_sel_1").innerHTML = choose_1;
		document.getElementById("id_sel_2").innerHTML = choose_2;
		document.getElementById("id_p_1").innerHTML = vlist[0][1].Name;
		document.getElementById("id_p_2").innerHTML = vlist[0][0];

		var tb = document.getElementById("id_table");

		var html = "";

		html += "<center>";

		html += "<table border=\"0\">";

		var n = parseInt(vlist.length / 5);
		for (var i = 0; i < n; i++) {
			html += "<tr>";

			for (var j = 0; j < 5; j++) {
				html += "<td>";

				var index = 5 * i + j;

				html += "<button class=\"css-btn btn btn-secondary\" title=\"" + vlist[index][1].Name + "\" data-dismiss=\"modal\" onclick=\"Pressed(" + index + ")\">" + vlist[index][0] + "</button>";

				html += "</td>";
			}

			html += "</tr>";
		}

		html += "<tr>";

		for (var i = 5 * n; i < vlist.length; i++) {
			var index = i;
			html += "<td>";

			html += "<button class=\"css-btn btn btn-secondary\" title=\"" + vlist[index][1].Name + "\" data-dismiss=\"modal\" onclick=\"Pressed(" + index + ")\">" + vlist[index][0] + "</button>";

			html += "</td>";
		}

		html += "</tr>";

		html += "</table>";

		html += "</center>";

		//console.log(html);

		tb.innerHTML = html;

		document.getElementById("id_table_2").innerHTML = html;

		document.getElementById("btn_val_1").innerHTML = vlist[0][0];
		document.getElementById("btn_val_1").title = vlist[0][1].Name;

		document.getElementById("btn_val_2").innerHTML = vlist[0][0];
		document.getElementById("btn_val_2").title = vlist[0][1].Name;

	}catch {
		console.log("Error");
	}
}

document.getElementById("btn_val_1").onclick = function () {
	lbutton = "1";
}

document.getElementById("btn_val_2").onclick = function () {
	lbutton = "2";
}

function Pressed (index) {
	//console.log(vlist[index]);
	document.getElementById("btn_val_" + lbutton).innerHTML = vlist[index][0];
	document.getElementById("btn_val_" + lbutton).title = vlist[index][1].Name;
}

function ChangedFirst () {
	var cval = document.getElementById("id_sel_1").value;
	for (var i = 0; i < vlist.length; i++) {
		if (vlist[i][0] == cval) {
			document.getElementById("id_p_1").innerHTML = vlist[i][1].Name;
			break;
		}
	}
}

function ChangedSecond () {
	var cval = document.getElementById("id_sel_2").value;
	for (var i = 0; i < vlist.length; i++) {
		if (vlist[i][1].Name == cval) {
			document.getElementById("id_p_2").innerHTML = vlist[i][0];
			break;
		}
	}
}

function IndexOf (cv) {
	for (var i = 0; i < vlist.length; i++) {
		if (vlist[i][0] == cv) {
			return i;
		}
	}
	return -1;
}

document.getElementById("btn_calc").onclick = function () {
	var content = document.getElementById("id_converted");
	var cur_val = document.getElementById("id_cur_val").value;
	var val_1 = document.getElementById("btn_val_1").innerHTML;
	var val_2 = document.getElementById("btn_val_2").innerHTML;
	var index_1 = IndexOf(val_1);
	var index_2 = IndexOf(val_2);
	if (cur_val == "") {
		alert("Empty Field!");
		return;
	}
	content.innerHTML = (vlist[index_1][1].Value / vlist[index_2][1].Value * vlist[index_2][1].Nominal / vlist[index_1][1].Nominal * parseFloat(cur_val)).toFixed(2);
}