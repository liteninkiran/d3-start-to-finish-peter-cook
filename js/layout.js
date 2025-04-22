function layout(data) {
    const cellWidth = config.width / config.numColumns;
    const cellHeight = cellWidth;
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
            radius: radiusScale(d.renewable),
        }
    });
}
