
$(document).ready(() => {
    function fillPlotsTest() {
        var container = document.getElementById('signal-1');
        var items = [
            {x: '2014-06-11', y: 10},
            {x: '2014-06-12', y: 25},
            {x: '2014-06-13', y: 30},
            {x: '2014-06-14', y: 10},
            {x: '2014-06-15', y: 15},
            {x: '2014-06-16', y: 30}
        ];
        var dataset = new vis.DataSet(items);
        var options = {
            start: '2014-06-10',
            end: '2014-06-18'
        };
        var graph2d = new vis.Graph2d(container, dataset, options);

        var container = document.getElementById('signal-2');
        var items = [
            {x: '2014-06-11', y: 10},
            {x: '2014-06-12', y: 25},
            {x: '2014-06-13', y: 30},
            {x: '2014-06-14', y: 10},
            {x: '2014-06-15', y: 15},
            {x: '2014-06-16', y: 30}
        ];
        var dataset = new vis.DataSet(items);
        var options = {
            start: '2014-06-10',
            end: '2014-06-18'
        };
        var graph2d = new vis.Graph2d(container, dataset, options);

        var container = document.getElementById('signal-result');
        var items = [
            {x: '2014-06-11', y: 10},
            {x: '2014-06-12', y: 25},
            {x: '2014-06-13', y: 30},
            {x: '2014-06-14', y: 10},
            {x: '2014-06-15', y: 15},
            {x: '2014-06-16', y: 30}
        ];
        var dataset = new vis.DataSet(items);
        var options = {
            start: '2014-06-10',
            end: '2014-06-18'
        };
        var graph2d = new vis.Graph2d(container, dataset, options);
    }

    fillPlotsTest();

    let magnitudeSig1 = $('#txt-size-sig-1');
    let magnitudeSig2 = $('#txt-size-sig-2');

    let offsetSig1 = $('#txt-offset-sig-1');
    let offsetSig2 = $('#txt-offset-sig-2');

    let btnUpdateSig1 = $('#btn-update-sig-1');
    let btnUpdateSig2 = $('#btn-update-sig-2');

    let btnLoadSig1 = $('#load-sig-1');
    let btnLoadSig2 = $('#load-sig-2');

    let inferiorLimSig1, inferiorLimSig2;
    let superiorLimSig1, superiorLimSig2;

    btnUpdateSig1.click(function(e) {
        //console.log(magnitudeSig1.val());
        let template = '<td> \
                            <div class="input-field"> \
                            <input placeholder="N" id="sig-1-txt-N" type="text" class="validate"> \
                            <label for="first_name">N</label> </div>  \
                        </td> ';
        let collapsibleSig1 = document.getElementById('collapsible-sig-1')
                                      .getElementsByTagName('table')[0]
                                      .getElementsByTagName('tbody')[0];
        this.magnitudeSig1 = Number(magnitudeSig1.val());
        this.offsetSig1 = Number(offsetSig1.val());
        console.log(this.magnitudeSig1);
        console.log(this.offsetSig1);
        let mid = this.magnitudeSig1 >> 1;
        inferiorLimSig1 = this.offsetSig1 - mid, superiorLimSig1 = this.offsetSig1 + mid;
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
    });

    btnUpdateSig2.click(function(e) { // si, ya se que me repeti v:
        //console.log(magnitudeSig1.val());
        let template = '<td> \
                            <div class="input-field"> \
                            <input placeholder="N" id="sig-2-txt-N" type="text" class="validate"> \
                            <label for="first_name">N</label> </div>  \
                        </td> ';
        let collapsibleSig2 = document.getElementById('collapsible-sig-2')
                                      .getElementsByTagName('table')[0]
                                      .getElementsByTagName('tbody')[0];
        this.magnitudeSig2 = Number(magnitudeSig2.val());
        this.offsetSig2 = Number(offsetSig2.val());
        console.log(this.magnitudeSig2);
        console.log(this.offsetSig2);
        let mid = this.magnitudeSig2 >> 1;
        inferiorLimSig2 = this.offsetSig2 - mid, superiorLimSig2 = this.offsetSig2 + mid;
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
    });

});
