
var v1, v2, vr;

$(document).ready(() => {
    let lengthSig1 = $('#txt-size-sig-1');
    let lengthSig2 = $('#txt-size-sig-2');

    let offsetSig1 = $('#txt-offset-sig-1');
    let offsetSig2 = $('#txt-offset-sig-2');

    let btnUpdateSig1 = $('#btn-update-sig-1');
    let btnUpdateSig2 = $('#btn-update-sig-2');

    let btnLoadSig1 = $('#load-sig-1');
    let btnLoadSig2 = $('#load-sig-2');

    let inferiorLimSig1, inferiorLimSig2;
    let superiorLimSig1, superiorLimSig2;

    btnUpdateSig1.click(function(e) {
        //console.log(lengthSig1.val());
        let template = '<td> \
                            <div class="input-field"> \
                            <input placeholder="N" id="sig-1-txt-N" type="text" class="validate"> \
                            <label for="first_name">N</label> </div>  \
                        </td> ';
        let collapsibleSig1 = document.getElementById('collapsible-sig-1')
                                      .getElementsByTagName('table')[0]
                                      .getElementsByTagName('tbody')[0];
        this.lengthSig1 = Number(lengthSig1.val());
        this.offsetSig1 = Number(offsetSig1.val());
        console.log(this.lengthSig1);
        console.log(this.offsetSig1);
        inferiorLimSig1 = -this.offsetSig1, superiorLimSig1 = this.lengthSig1 - 1 - this.offsetSig1;
        let newInner = "";
        for (let i = inferiorLimSig1; i <= superiorLimSig1; ++i) {
            let tmp = template.split("N").join(i); // replace all ocurrences
            newInner += tmp;
        }
        console.log(newInner);
        collapsibleSig1.innerHTML = '<tr>' + newInner + '</tr>';
        console.log(collapsibleSig1);
    });

    btnLoadSig1.click(function() {
        let arr = Array();
        for (let i = inferiorLimSig1; i <= superiorLimSig1; ++i) {
            arr.push(Number($('#sig-1-txt-'+i).val()));
        }
        console.log(arr);
        v1 = new vector(arr, Number(offsetSig1.val()));
        graph(v1, document.getElementById("signal-1"));
    });

    btnUpdateSig2.click(function(e) { // si, ya se que me repeti v:
        //console.log(lengthSig1.val());
        let template = '<td> \
                            <div class="input-field"> \
                            <input placeholder="N" id="sig-2-txt-N" type="text" class="validate"> \
                            <label for="first_name">N</label> </div>  \
                        </td> ';
        let collapsibleSig2 = document.getElementById('collapsible-sig-2')
                                      .getElementsByTagName('table')[0]
                                      .getElementsByTagName('tbody')[0];
        this.lengthSig2 = Number(lengthSig2.val());
        this.offsetSig2 = Number(offsetSig2.val());
        console.log(this.lengthSig2);
        console.log(this.offsetSig2);
        inferiorLimSig2 = -this.offsetSig2, superiorLimSig2 = this.lengthSig2 - 1 - this.offsetSig2;
        let newInner = "";
        for (let i = inferiorLimSig2; i <= superiorLimSig2; ++i) {
            let tmp = template.split("N").join(i); // replace all ocurrences
            newInner += tmp;
        }
        console.log(newInner);
        collapsibleSig2.innerHTML = '<tr>' + newInner + '</tr>';
        console.log(collapsibleSig2);
    });

    btnLoadSig2.click(function() {
        let arr = Array();
        for (let i = inferiorLimSig2; i <= superiorLimSig2; ++i) {
            arr.push(Number($('#sig-2-txt-'+i).val()));
        }
        console.log(arr);
        v2 = new vector(arr, Number(offsetSig2.val()));
        graph(v2, document.getElementById("signal-2"));
    });

});

function suma(){
    vr = v1.add(v2);
    update();
}

function resta(){
    vr = v1.subtract(v2);
    update();
}

function multiplicacion(){
    vr = v1.pointwiseMultiplication(v2);
    update();
}

function escalamiento(){
    var k = prompt("Introduce la constante por la cual se escalará la señal 1: ", 1);
    vr = v1.scalarMultiplication(Number(k));
    update();
}

function desplazamiento(){
    var k = prompt("Introduce el número de unidades a la derecha que se desplazará la señal 1:", 1);
    vr = v1.move(Number(k));
    update();
}

function reflejo(){
    vr = v1.reflect();
    update();
}

function diezmacion(){
    var k = prompt("Introduce el valor de k:");
    vr = v1.decimate(Number(k));
    update();
}

function interpolacion(){
    var k = prompt("Introduce el valor de k:");
    vr = v1.interpolate(Number(k));
    update();
}

function convolucion(){
    vr = v1.convolution(v2);
    update();
}

function graph(signal, container){
    var labels = Array();
    var min_value = 1<<30, max_value = -min_value;
    for(var i = -signal.offset; i <= signal.arr.length-1-signal.offset; ++i){
        labels.push(i);
        min_value = Math.min(min_value, signal.at(i));
        max_value = Math.max(max_value, signal.at(i));
    }
    new Chart(container.getContext("2d"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Señal',
                backgroundColor: "#2196F3",
                data: signal.arr
            }],
            fill: false
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    barThickness : 4,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valor'
                    },
                    ticks: {
                        suggestedMin: Math.min(0, min_value),
                        suggestedMax: max_value
                    }
                }]
            }
        }
    });
}

function update(){
    let collapsibleSigR = document.getElementById('collapsible-sig-r')
                                  .getElementsByTagName('table')[0]
                                  .getElementsByTagName('tbody')[0];
    this.lengthSigR = vr.arr.length;
    this.offsetSigR = vr.offset;
    inferiorLimSigR = -this.offsetSigR, superiorLimSigR = this.lengthSigR - 1 - this.offsetSigR;
    let newInner = "";
    for (let i = inferiorLimSigR; i <= superiorLimSigR; ++i) {
        let tmp = '<td> \
                    <div class="input-field"> \
                    <input placeholder="' + i + '" id="sig-r-txt-' + i + '" type="text" readonly class="validate" value="' + vr.at(i) + '"> \
                    <label for="first_name">' + i + '</label> </div>  \
                </td> ';
        newInner += tmp;
    }
    console.log(newInner);
    collapsibleSigR.innerHTML = '<tr>' + newInner + '</tr>';
    console.log(collapsibleSigR);
    $(function() {
        M.updateTextFields();
    });
    graph(vr, document.getElementById("signal-result"));
}