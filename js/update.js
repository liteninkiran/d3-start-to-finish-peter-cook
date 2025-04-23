function initialiseGroup(g, d) {
    g.classed('country', true)
        .style('opacity', 0)
        .attr('transform', `translate(${d.x}, ${d.y})`)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

    g.append('circle')
        .classed('popup-centre', true)
        .attr('r', 1);

    g.append('circle').classed('renewable', true);
    g.append('circle').classed('oilgascoal', true);
    g.append('circle').classed('nuclear', true);
    g.append('circle').classed('hydroelectric', true);
    g.append('text').classed('label', true);
}

function updateGroup(d, i) {
    const g = d3.select(this);

    if (g.selectAll('*').empty()) {
        initialiseGroup(g, d);
    }

    g.transition()
        .duration(config.transitionDuration)
        .delay(i * config.transitionDelay)
        .attr('transform', `translate(${d.x}, ${d.y})`)
        .style('opacity', d.visible ? 1 : 0)
        .style('pointer-events', d.visible ? 'all' : 'none');

    g.attr('transform', `translate(${d.x}, ${d.y})`);
    
    g.select('.popup-centre')
        .attr('cy', d.popupOffset);

    const setRadius = (selector) => {
        g.select(`.${selector}`)
            .transition()
            .duration(config.circleDuration)
            .delay(i * config.transitionDelay)
            .attr('r', d.radii[selector]);
    }

    setRadius('renewable');
    setRadius('oilgascoal');
    setRadius('nuclear');
    setRadius('hydroelectric');

    g.select('.label')
        .attr('y', d.labelOffset)
        .text(d.labelText);
}

function updateChart() {
    d3.select('#chart')
        .selectAll('g')
        .data(layout(data), d => d.id)
        .join('g')
        .each(updateGroup);
}

function updateLegend() {
    d3.select('.legend circle').attr('r', getMaxRadius())
}

function update() {
    updateChart();
    updateMenu();
    updateLegend();
}
