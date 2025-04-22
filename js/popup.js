const popup = Popup();

function handleMouseover(e, d) {
    const popupCentre = d3.select(this)
        .select('.popup-centre')
        .node();

    popup.point(popupCentre)
        .html(popupTemplate(d))
        .draw();
}

function handleMouseout() {
    popup.hide();
}

function getPopupEntry(d, type, label) {
    const val = d.popupData[type];
    return isNaN(val) ? '' : `<div>${label}: ${val}%</div>`;
}

function popupTemplate(d) {
    let html = '';
    html += `<h3>${d.popupData.name}</h3>`;
    html += getPopupEntry(d, 'renewable', 'Renewable');
    html += getPopupEntry(d, 'oilgascoal', 'Oil, Gas & Coal');
    html += getPopupEntry(d, 'hydroelectric', 'Hydroelectric');
    html += getPopupEntry(d, 'nuclear', 'Nuclear');
    return html;
}
