function Triangle(a, b, c) {
	this.a = a == undefined ? 0.0 : a;
	this.b = b == undefined ? 0.0 : b;
	this.c = c == undefined ? 0.0 : c;
	this.perimeter = function() {
		return parseFloat(this.a) + parseFloat(this.b) + parseFloat(this.c);
	};
	this.area = function() {
        return (0.25*Math.sqrt((parseFloat(this.a) + parseFloat(this.b) + parseFloat(this.c))*(parseFloat(this.a) + parseFloat(this.b) - parseFloat(this.c))*(parseFloat(this.a) + parseFloat(this.c) - parseFloat(this.b))*(parseFloat(this.b) + parseFloat(this.c) - parseFloat(this.a)))).toFixed(5);
	};
	this.corn = function(a1,a2,a3) {
        return (Math.acos((a1*a1 + a2*a2 - a3*a3) / (2 * a1*a2)) * 180 / 3.14159265).toFixed(5);
	};
	this.IncreaseSide = function (rowIndex){
			var koef = document.getElementById("increase"+rowIndex).value;
			this.a = this.a*koef;
			this.b = this.b*koef;
			this.c = this.c*koef;
	};
	this.DecreaseSide = function (rowIndex){
			var koef = document.getElementById("decrease"+rowIndex).value;
			this.a = this.a/koef;
			this.b = this.b/koef;
			this.c = this.c/koef;
	};
}

function TriangleView(a, b, c) {
	Triangle.call(this, a, b, c);

    this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);

		return view;
	}

	this.inputincr = function (rowIndex){
		var view = document.createDocumentFragment();
		var input = document.createElement("input");
		var sup = this;
		input.id = "increase" + rowIndex;
		input.addEventListener("change", function() {
			sup.IncreaseSide(rowIndex);
		});
		input.addEventListener("focus", function() {
			keyBox.style.borderColor = "blue";
		});
		view.appendChild(input);
		return view;
	}
	this.inputdecr = function (rowIndex){
		var view = document.createDocumentFragment();
		var input = document.createElement("input");
		var sup = this;
		input.id = "decrease" + rowIndex;
		input.addEventListener("change", function() {
			sup.DecreaseSide(rowIndex);
		});
		input.addEventListener("focus", function() {
			keyBox.style.borderColor = "blue";
		});
		view.appendChild(input);
		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode(rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.a));
	    td2.id = "a-"+ rowIndex;
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
	    td3.id = "b-"+ rowIndex;
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.c));
	    td4.id = "c-"+ rowIndex;
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(document.createTextNode(this.perimeter()));
	    td5.id = "perimetr-"+ rowIndex;
		tr.appendChild(td5);

		var td6 = document.createElement('td');
	    td6.appendChild(document.createTextNode(this.area()));
	    td6.id = "area-"+ rowIndex;
		tr.appendChild(td6);

		var td7 = document.createElement('td');
	    td7.appendChild(document.createTextNode(this.corn(this.a,this.c,this.b)));
	    td7.id = "cornacb-"+ rowIndex;
		tr.appendChild(td7);

		var td8 = document.createElement('td');
	    td8.appendChild(document.createTextNode(this.corn(this.a,this.b,this.c)));
	    td8.id = "cornabc-"+ rowIndex;
		tr.appendChild(td8);

        var td9 = document.createElement('td');
	    td9.appendChild(document.createTextNode(this.corn(this.b,this.c, this.a)));
	    td9.id = "cornbca-"+ rowIndex;
		tr.appendChild(td9);

		var td10 = document.createElement('td');
		td10.appendChild(this.inputincr(rowIndex));
		tr.appendChild(td10);

		var td11 = document.createElement('td');
		td11.appendChild(this.inputdecr(rowIndex));
		tr.appendChild(td11);

		var td12 = document.createElement('td');
	    td12.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td12);

		return tr;
	}

}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}

var data = {
	triangles : [],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, b, c) {
		this.triangles.push(new TriangleView(a, b, c));
		this.refreshTable();
	},

	addRandom : function() {
		var one = getRandom();
		var two = getRandom();
		var three = getRandom();
        if(one + two > three & one + three > two & two + three > one) {
		    this.add(one, two, three);
	    }
	    else{this.addRandom();}
	},

	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	},

	AddMy : function(){
		var one1 = document.getElementById("edge1").value;
		var two1 = document.getElementById("edge2").value;
		var three1 = document.getElementById("edge3").value;
		this.add(one1,two1,three1);
	}
}

