function sortAccessor(d) {
    const value = d[state.selectedIndicator];
    return isNaN(value) ? 0 : value;
}

function getSortedData(data) {
    return state.selectedIndicator === 'country'
        ? _.orderBy(data, 'name')
        : _.orderBy(data, sortAccessor, 'desc');
}

function isVisible(d) {
    const ind = state.selectedIndicator;
    return ind === 'country' || d[ind] > 0
}

function getTruncatedLabel(text) {
    return text.length <= 10 ? text : text.slice(0, 10) + '...';
}

function layout(data) {
    const mapFn = (d, i) => {
        const column = i % config.numColumns;
        const row = Math.floor(i / config.numColumns);
        const popupData = {
            name: d.name,
            renewable: d.renewable,
            oilgascoal: d.oilgascoal,
            nuclear: d.nuclear,
            hydroelectric: d.hydroelectric,
        }
        const radii = {
            renewable: radiusScale(d.renewable),
            oilgascoal: radiusScale(d.oilgascoal),
            nuclear: radiusScale(d.nuclear),
            hydroelectric: radiusScale(d.hydroelectric),
        }
        return {
            x: (column + 0.5) * cellWidth,
            y: (row + 0.5) * cellHeight,
            visible: isVisible(d),
            labelText: getTruncatedLabel(d.name),
            labelOffset: maxRadius + labelHeight,
            popupOffset: -0.8 * maxRadius,
            popupData,
            radii,
        }
    }
    const labelHeight = 20;
    const cellWidth = config.width / config.numColumns;
    const cellHeight = cellWidth + labelHeight;
    const maxRadius = 0.35 * cellWidth;
    const radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, maxRadius]);
    const sortedData = getSortedData(data);
    return sortedData.map(mapFn);
}
