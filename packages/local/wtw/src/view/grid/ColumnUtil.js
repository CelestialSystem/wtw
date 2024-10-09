Ext.define('WTW.view.grid.ColumnUtil', {
    alternateClassName: 'ColumnUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            caption: 'text',
            dataKey: 'dataIndex',
            flex: 'flex',
            height: 'height',
            hyperlink: 'hyperlink',
            parentId: 'parentId',
            targetGrid: 'targetGrid',
            viewToLoad: 'viewToLoad',
            width: 'width'
        },
        hyperlink = config.hyperlink,
        targetGrid = config.targetGrid,
        parentId = config.parentId,
        dataKey = config.linkKey || config.dataKey,
        viewToLoad = config.viewToLoad;

        if (config.hyperlink) {
            config.filter = 'string';
            config.renderer = function (value, metaData, record) {
                var recData = record.data,
                    id = recData.personId || record.id,
                    fName = recData.firstName,
                    lName = recData.lastName,
                    title = (fName === undefined ? (recData.recId || recData.id) : `${fName},${lName}(${recData.ssn})`).toLocaleString();

                return `
                <div class="cls-hyperlinkStyle" onclick="Ext.fireEvent('${hyperlink}','${id}', '${targetGrid}', '${dataKey}', '${title.replace(/'/g, "\\'")}', '${parentId}', '${viewToLoad}')" recId="${value}">
                  ${value}
                </div>
              `;
            }.bind(this)
        }

        config.filter = 'string';

        return UTIL.transformObject(config, mapperConfig, 'wtw-column')
    }
});
