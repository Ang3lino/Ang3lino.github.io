
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
        let newInner = "";
        for (let i = 0; i < 10; ++i) {
            let tmp = template.split("N").join(i); // replace all ocurrences
            newInner += tmp;
        }
        console.log(newInner);
        collapsibleSig1.innerHTML = '<tr>' + newInner + '</tr>';
        console.log(collapsibleSig1);
    });

/**
 * This function will create dynamically a table of restrictions to fill.
 * @param {A string of the alphabet ab...z} vars 
 * @param {integer of the amount of variables used} varCount 
 * @param {An HTMLObject (container) of the restrictions table} tableHTML 
 */
function createHTMLLimits(vars, varCount, tableHTML) {
    const template = '<tr> <td> <input type="number" id="low-X"> </td> \
        <td>var</td> \
        <td> <input type="number" id="high-X"> </td> </tr>';
    let mainBody = tableHTML.getElementsByTagName("table")[0]
                            .getElementsByTagName("tbody")[0];
    let newStr = "";
    for (let i = 0; i < varCount; ++i) {
        let buff = template.replace("X", i);
        newStr += buff.replace("X", i).replace("var", vars[i]);
    }
    mainBody.innerHTML = newStr;
}

});
