function update() {
    d3.select('#chart')
        .selectAll('circle')
        .data(layout(data))
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
}
