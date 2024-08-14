let fields = [null, 'circle', null, null, null, 'cross', null, null, null];


function init() {
    render();
}



function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let field = fields[i * 3 + j];
            let symbol = '';

            if (field === 'circle') {
                symbol = 'O';
            } else if (field === 'cross') {
                symbol = 'X';
            }

            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.getElementById('content').innerHTML = tableHTML;
}

