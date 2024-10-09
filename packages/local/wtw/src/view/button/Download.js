Ext.define('WTW.view.button.Download', {
    extend: "Ext.button.Button",
    xtype: 'wtw-grid-download-button',
    iconCls: 'x-fas fa-download',
    tooltip: "Select the export file format",
    text: "Select the export file format",

    initComponent: function () {
        this.on('menushow', this.onMenuShow, this);
        this.callParent();
    },
    onExportTo: function (button) {
        // This  may be in a grid, or in a container holding a toolbar and 
        var grid = button.up('grid');
        var fileName;

        fileName = grid.title ? grid.title.replace(/\s/g, "_"): grid.attributeName;

        if (grid.up('tabpanel[attributeName = "employeeDetailPanel"]')) {
            fileName = grid.up('tabpanel').title + ', ' + fileName;
        }
        var cfg = Ext.merge({
            title: grid.title || "Export",
            fileName: fileName +" - " + "." + (button.cfg.ext || button.cfg.type)
        },
            button.cfg
        );

        if (grid.gridExportTitle === false) {
            delete cfg.title;
        }
        if (button.cfg.ext === 'pdf') {
            var gridData = [],
                gridColumns = grid.columnManager.columns;
                grid.getStore().each(function (record) {
                    gridData.push(record.getData());
                });
            
            var pdfContent = this.generatePDF(gridData, gridColumns);
            this.downloadPDF(pdfContent, fileName);
        }
        else if (this.fireEvent('beforeexport', this, cfg) !== false) grid.saveDocumentAs(cfg);
        // grid.saveDocumentAs(cfg)
    },

    getGridData: function () {
        // Implement this method to fetch or prepare grid data
        // For example, you might get the grid data from an ExtJS store
        return []; // Replace with actual data retrieval logic
    },

    generatePDF: function(gridData, gridColumns) {
        var header = '%PDF-1.4\n',
            objects = [],
            pageWidth = 570,
            pageHeight = 800,
            margin = 30,
            lineHeight = 15,
            headerHeight = 20,
            minCellWidth = 100,
            baseFontSize = 10,
            columns = gridColumns.map(col => col.dataIndex),
            columntext = gridColumns.map(col => col.text);

        // Define a function to estimate text width in PDF points
        function getTextWidth(text, fontSize) {
            var width = text.length * fontSize * 0.6;
            return width;
        }

        // Calculate maximum width for each column header and data
        var columnWidths = this.calculateColumnWidths(columns, gridData, getTextWidth, baseFontSize, minCellWidth),
            totalWidth = columnWidths.reduce((sum, width) => sum + width, 0), 
            scalingFactor = (pageWidth - 2 * margin) / totalWidth,
            adjustedColumnWidths = columnWidths.map(width => width * scalingFactor), 
            fontSize = baseFontSize * scalingFactor, 
            pageCount = Math.ceil(gridData.length / (Math.floor((pageHeight - margin - headerHeight) / lineHeight)));

            objects.push(this.createCatalogObject());
            objects.push(this.createPagesObject(pageCount));

        for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
            // Start of a new page
            var pageContent = this.createPageContent(columns, adjustedColumnWidths, gridData, pageIndex, pageWidth, pageHeight, margin, headerHeight, lineHeight, fontSize, getTextWidth, pageCount, columntext);
            objects.push(this.createPageObject(pageIndex));
            objects.push(this.createStreamObject(pageIndex, pageContent));
        }

        objects.push(this.createFontObject(pageCount));
        return this.compilePDFContent(header, objects);
    },

    calculateColumnWidths: function(columns, gridData, getTextWidth, baseFontSize, minCellWidth) {
        return columns.map(col => {
            var headerWidth = getTextWidth(col, baseFontSize),
            dataWidth = Math.max(...gridData.map(row => (row[col] !== undefined ? getTextWidth(row[col].toString(), baseFontSize) : 0)));

            return Math.max(minCellWidth, Math.max(headerWidth, dataWidth));
        });
    },

    createCatalogObject: function() {
        return '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
    },

    createPagesObject: function(pageCount) {
        return '2 0 obj\n<< /Type /Pages /Kids [' + Array(pageCount).fill().map((_, i) => `${3 + i * 2} 0 R`).join(' ') + '] /Count ' + pageCount + ' >>\nendobj\n';
    },

    createPageObject: function(pageIndex) {
        return `${3 + pageIndex * 2} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 800] /Contents ${4 + pageIndex * 2} 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`;
    },

    createStreamObject: function(pageIndex, pageContent) {
        var stream = `${4 + pageIndex * 2} 0 obj\n<< /Length ${pageContent.length} >>\nstream\n`;
        stream += pageContent;
        stream += 'endstream\nendobj\n';
        return stream;
    },

    createFontObject: function(pageCount) {
        return `${3 + pageCount * 2} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;
    },

    compilePDFContent: function(header, objects) {
        var pdfContent = header;

        objects.forEach(function (obj) {
            pdfContent += obj;
        });

        var xref = 'xref\n0 ' + (objects.length + 1) + '\n0000000000 65535 f \n',
            offset = pdfContent.length;

        objects.forEach(function (obj) {
            xref += ('0000000000' + offset).slice(-10) + ' 00000 n \n';
            offset += obj.length;
        });

        pdfContent += xref;
        pdfContent += 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + offset + '\n%%EOF';

        return pdfContent;
    },

    createPageContent: function(columns, adjustedColumnWidths, gridData, pageIndex, pageWidth, pageHeight, margin, headerHeight, lineHeight, fontSize, getTextWidth, pageCount, columntext) {
        var pageContent = `BT\n/F1 ${fontSize} Tf\n`,
            startY = pageHeight - margin,
            startX = margin,
            currentX = startX,
            currentRow = pageIndex * (Math.floor((pageHeight - margin - headerHeight) / lineHeight)),
            rowCount = 0,
            pageNumberText = `Page ${pageIndex + 1} of ${pageCount}`,
            pageNumberFontSize = fontSize * 0.8,
            pageNumberWidth = getTextWidth(pageNumberText, pageNumberFontSize),
            pageNumberX = pageWidth - margin - pageNumberWidth,
            pageNumberY = margin - 10;
    
            // Draw column header background and text
            columntext.forEach(function (header, index) {
                var headerWidth = adjustedColumnWidths[index];
    
                // Draw the header cell background (grey)
                pageContent += `0.75 0.75 0.75 rg\n`; 
                pageContent += `${currentX} ${startY - headerHeight+5} ${headerWidth} ${headerHeight} re\n`;
                pageContent += 'f\n';

                // Draw the header text (black)
                pageContent += '0 0 0 rg\n';
                pageContent += 'BT\n';
                pageContent += `${currentX + (headerWidth - getTextWidth(header, fontSize)) / 2} ${startY - headerHeight + (headerHeight + fontSize) / 2} Td\n`; // Center text
                pageContent += `(${header}) Tj\n`;
                pageContent += 'ET\n';
    
                // Draw vertical white line between header cells
                if (index < columns.length - 1) { 
                    var lineX = currentX-5 + headerWidth;
                    pageContent += `1 1 1 rg\n`;
                    pageContent += `${lineX} ${startY - headerHeight} 1 ${headerHeight+6} re\n`;
                    pageContent += 'f\n';
                }
    
                currentX += headerWidth;
            });

            startY -= headerHeight;

        while (startY - lineHeight > margin) { 
            if (currentRow >= gridData.length) break;
    
            var row = gridData[currentRow],
                currentX = startX;
    
            columns.forEach(function (col, colIndex) {
                var cell = row[col] !== undefined ? row[col].toString() : '',
                    cellWidth = adjustedColumnWidths[colIndex],
                    cellFontSize = fontSize, 
                    textWidth = getTextWidth(cell, cellFontSize),
                    textX = currentX + (cellWidth - textWidth) / 2,
                    textY = startY - (lineHeight - cellFontSize) / 2;
    
                // Reduce font size if text width exceeds cell width
                while (getTextWidth(cell, cellFontSize) > cellWidth && cellFontSize > 2) {
                    cellFontSize -= 0.5;
                }
    
                // Add text inside the cell
                pageContent += `BT\n/F1 ${cellFontSize} Tf\n`;
                pageContent += `0 0 0 rg\n`;
                pageContent += `${textX} ${textY} Td\n`;
                pageContent += `(${cell}) Tj\n`;
                pageContent += 'ET\n';
                currentX += cellWidth;
            });
    
            // Draw thin grey line after each row
            pageContent += `0.75 0.75 0.75 rg\n`;
            pageContent += `${startX} ${startY - lineHeight+3} ${adjustedColumnWidths.reduce((sum, width) => sum + width, 0)} 0.5 re\n`;
            pageContent += 'f\n';
    
            startY -= lineHeight;
            currentRow++;
            rowCount++;
        }
    
        // Add a line at the bottom of the page
        pageContent += `0.75 0.75 0.75 rg\n`;
        pageContent += `${startX} ${startY+2} ${adjustedColumnWidths.reduce((sum, width) => sum + width, 0)} 0.5 re\n`;
        pageContent += 'f\n';
        pageContent += `BT\n/F1 ${pageNumberFontSize} Tf\n`;
        pageContent += '0 0 0 rg\n';
        pageContent += `${pageNumberX} ${pageNumberY} Td\n`;
        pageContent += `(${pageNumberText}) Tj\n`;
        pageContent += 'ET\n';

        return pageContent;
    },

    downloadPDF: function(pdfContent, fileName) {
        var blob = new Blob([pdfContent], { type: 'application/pdf' }),
            link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    },

    onMenuShow: function (menu) {
        var grid = menu.up('grid'),
            isGrouped = grid.getStore().isGrouped();
            
        if (!grid) return;
        menu.query('[groupRelated]').forEach(item => item.setHidden(!isGrouped));
    },

    menu: {
        defaults: {
            handler: "up.onExportTo"
        },
        plain: true,
        items: [{
            text: "Excel xlsx",
            cfg: {
                type: "excel07",
                ext: "xlsx"
            }
        }, {
            text: "Excel xlsx (include groups)",
            groupRelated: true,
            cfg: {
                type: "excel07",
                ext: "xlsx",
                includeGroups: true,
                includeSummary: true
            }
        }, {
            text: "CSV",
            cfg: {
                ext: 'csv',
                type: "csv"
            }
        }, {
            text: "TSV",
            cfg: {
                type: "tsv",
                ext: "tsv"
            }
        }, {
            text: "HTML",
            cfg: {
                ext: 'html',
                type: "html"
            }
        }, {
            text: "HTML (include groups)",
            groupRelated: true,
            cfg: {
                ext: 'html',
                type: "html",
                includeGroups: true,
                includeSummary: true
            }
        },{
            text: "PDF",
            cfg: {
                ext: 'pdf',
                type: "csv"
            }
        }]
    }
});
