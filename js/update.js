function initialiseGroup(g) {
    g.classed('country', true)
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

function updateGroup(d, _i) {
    const g = d3.select(this);

    if (g.selectAll('*').empty()) {
        initialiseGroup(g);
    }

    g.attr('transform', `translate(${d.x}, ${d.y})`);
    
    g.select('.popup-centre')
        .attr('cy', d.popupOffset);

    g.select('.renewable').attr('r', d.renewableRadius);
    g.select('.oilgascoal').attr('r', d.oilgascoalRadius);
    g.select('.nuclear').attr('r', d.nuclearRadius);
    g.select('.hydroelectric').attr('r', d.hydroelectricRadius);

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
