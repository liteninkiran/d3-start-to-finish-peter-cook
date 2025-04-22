function layout(data) {
    const radiusScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 20]);
    
    return data.map((d, i) => ({
        x: i * 10,
        y: 100,
        radius: radiusScale(d.renewable),
    }));
}
