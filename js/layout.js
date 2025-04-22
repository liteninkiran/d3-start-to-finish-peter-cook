function getTruncatedLabel(text) {
    return text.length <= 10 ? text : text.slice(0, 10) + '...';
}

function layout(data) {
    const labelHeight = 20;
    const cellWidth = config.width / config.numColumns;
    const cellHeight = cellWidth + labelHeight;
    const maxRadius = 0.35 * cellWidth;
    const radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, maxRadius]);
    
    return data.map((d, i) => {
        const column = i % config.numColumns;
        const row = Math.floor(i / config.numColumns);
        return {
            x: (column + 0.5) * cellWidth,
            y: (row + 0.5) * cellHeight,
            renewableRadius: radiusScale(d.renewable),
            oilgascoalRadius: radiusScale(d.oilgascoal),
            nuclearRadius: radiusScale(d.nuclear),
            hydroelectricRadius: radiusScale(d.hydroelectric),
            labelText: getTruncatedLabel(d.name),
            labelOffset: maxRadius + labelHeight,
            popupOffset: -0.8 * maxRadius,
            popupData: {
                name: d.name,
                renewable: d.renewable,
                oilgascoal: d.oilgascoal,
                nuclear: d.nuclear,
                hydroelectric: d.hydroelectric,
            }
        }
    });
}
