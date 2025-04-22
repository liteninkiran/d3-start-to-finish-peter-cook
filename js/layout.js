const sortAccessor = (d) => {
    const value = d[state.selectedIndicator];
    return isNaN(value) ? 0 : value;
}

const getSortedData = (data) => state.selectedIndicator === 'country'
    ? _.orderBy(data, 'name')
    : _.orderBy(data, sortAccessor, 'desc');

const isVisible = (d) => {
    const ind = state.selectedIndicator;
    return ind === 'country' || d[ind] > 0
}

const getTruncatedLabel = (text) => text.length <= 10 ? text : text.slice(0, 10) + '...';

const getRadii = (d) => ({
    renewable: radiusScale(d.renewable),
    oilgascoal: radiusScale(d.oilgascoal),
    nuclear: radiusScale(d.nuclear),
    hydroelectric: radiusScale(d.hydroelectric),
});

const getPopupData = (d) => ({
    name: d.name,
    renewable: d.renewable,
    oilgascoal: d.oilgascoal,
    nuclear: d.nuclear,
    hydroelectric: d.hydroelectric,
});

const mapFn = (d, i) => ({
    x: (i % config.numColumns + 0.5) * cellWidth,
    y: (Math.floor(i / config.numColumns) + 0.5) * cellHeight,
    visible: isVisible(d),
    labelText: getTruncatedLabel(d.name),
    labelOffset: maxRadius + labelHeight,
    popupOffset: -0.8 * maxRadius,
    popupData: getPopupData(d),
    radii: getRadii(d),
});
const labelHeight = 20;
const cellWidth = config.width / config.numColumns;
const cellHeight = cellWidth + labelHeight;
const maxRadius = 0.35 * cellWidth;
const radiusScale = d3.scaleSqrt().domain([0, 100]).range([0, maxRadius]);
const layout = (data) => getSortedData(data).map(mapFn);
