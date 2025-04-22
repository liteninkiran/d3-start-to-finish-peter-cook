let data;

function update() {
    d3.select('#chart')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d, i) => i * 10)
        .attr('cy', 100)
        .attr('r', 2);
}

function dataIsReady(csv) {
    data = csv;
    update();
}

d3.csv('data/data.csv').then(dataIsReady);
