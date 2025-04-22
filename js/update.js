function updateGroup(d, i) {
    const g = d3.select(this);

    if (g.selectAll('*').empty()) {
        g.append('circle');
        g.append('text').classed('label', true);
    }

    g.classed('country', true)
        .attr('transform', `translate(${d.x}, ${d.y})`);
    
    g.select('circle')
        .attr('r', d.radius);

    g.select('.label')
        .attr('y', d.labelOffset)
        .text(d.labelText);
}

function update() {
    d3.select('#chart')
        .selectAll('g')
        .data(layout(data))
        .join('g')
        .each(updateGroup);
}
