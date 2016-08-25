
'use strict';

/*
 *  TableBlock HansonTable bridge
 *
 *  Code copied from
 *  https://github.com/torchbox/wagtail/blob/master/wagtail/contrib/table_block/static/table_block/js/table.js
 *
 *  Modifications were made to add new form fields to the TableBlock in Wagtail admin.
 */

function initAtomicTable(id, tableOptions) {
    var containerId = id + '-handsontable-container';
    var tableHeaderCheckboxId = id + '-handsontable-header';
    var colHeaderCheckboxId = id + '-handsontable-col-header';
    var isFullWidthCheckboxId = id + '-handsontable-full-width';
    var isTableStripedCheckboxId = id + '-handsontable-striped-rows';
    var isStackedOnMobileCheckboxId = id + '-handsontable-stack-on-mobile';
    var hiddenStreamInput = $('#' + id);
    var tableHeaderCheckbox = $('#' + tableHeaderCheckboxId);
    var colHeaderCheckbox = $('#' + colHeaderCheckboxId);
    var isFullWidthCheckbox = $('#' + isFullWidthCheckboxId);
    var isTableStripedCheckbox = $('#' + isTableStripedCheckboxId);
    var isStackedOnMobileCheckbox = $('#' + isStackedOnMobileCheckboxId);

    var hot;
    var finalOptions = {};
    var persist;
    var cellEvent;
    var structureEvent;
    var dataForForm = null;
    var getWidth = function() {
        return $('.widget-table_input').closest('.sequence-member-inner').width();
    };
    var getHeight = function() {
        var tableParent = $('#' + id).parent();
        return tableParent.find('.htCore').height() + (tableParent.find('.input').height() * 2);
    };
    var height = getHeight();
    var resizeTargets = ['.input > .handsontable', '.wtHider', '.wtHolder'];
    var resizeHeight = function(height) {
        var currTable = $('#' + id);
        $.each(resizeTargets, function() {
            currTable.closest('.field-content').find(this).height(height);
        });
    };

    function resizeWidth(width) {
        $.each(resizeTargets, function() {
            $(this).width(width);
        });
        var parentDiv = $('.widget-table_input').parent();
        parentDiv.find('.field-content').width(width);
        parentDiv.find('.fieldname-table .field-content .field-content').width('80%');
    }

    try {
        dataForForm = $.parseJSON(hiddenStreamInput.val());
    } catch (e) {
        // do nothing
    }

    for (var key in tableOptions) {
        if (tableOptions.hasOwnProperty(key)) {
            finalOptions[key] = tableOptions[key];
        }
    }

    if (dataForForm !== null) {
        if (dataForForm.hasOwnProperty('data')) {
            // Overrides default value from tableOptions (if given) with value from database
            finalOptions.data = dataForForm.data;
        }

        if (dataForForm.hasOwnProperty('first_row_is_table_header')) {
            tableHeaderCheckbox.prop('checked', dataForForm.first_row_is_table_header);
        }
        if (dataForForm.hasOwnProperty('first_col_is_header')) {
            colHeaderCheckbox.prop('checked', dataForForm.first_col_is_header);
        }
        if (dataForForm.hasOwnProperty('is_full_width')) {
            isFullWidthCheckbox.prop('checked', dataForForm.is_full_width);
        }
        if (dataForForm.hasOwnProperty('is_striped')) {
            isTableStripedCheckbox.prop('checked', dataForForm.is_striped);
        }
        if (dataForForm.hasOwnProperty('is_stacked')) {
            isStackedOnMobileCheckbox.prop('checked', dataForForm.is_stacked);
        }
    }

    if (!tableOptions.hasOwnProperty('width') || !tableOptions.hasOwnProperty('height')) {
        // Size to parent .sequence-member-inner width if width is not given in tableOptions
        $(window).resize(function() {
            hot.updateSettings({
                width: getWidth(),
                height: getHeight()
            });
            resizeWidth('100%');
        });
    }

    persist = function() {
        hiddenStreamInput.val(JSON.stringify({
            data: hot.getData(),
            first_row_is_table_header: tableHeaderCheckbox.prop('checked'),
            first_col_is_header: colHeaderCheckbox.prop('checked'),
            is_full_width: isFullWidthCheckbox.prop('checked'),
            is_striped: isTableStripedCheckbox.prop('checked'),
            is_stacked: isStackedOnMobileCheckbox.prop('checked')
        }));
    };

    cellEvent = function(change, source) {
        if (source === 'loadData') {
            return; //don't save this change
        }

        persist();
    };

    structureEvent = function(index, amount) {
        resizeHeight(getHeight());
        persist();
    };

    tableHeaderCheckbox.change(function() {
        persist();
    });

    colHeaderCheckbox.change(function() {
        persist();
    });

    isFullWidthCheckbox.change(function(){
        persist();
    });

    isTableStripedCheckbox.change(function(){
        persist();
    });

    isStackedOnMobileCheckbox.change(function(){
        persist();
    });

    finalOptions.afterChange = cellEvent;
    finalOptions.afterCreateCol = structureEvent;
    finalOptions.afterCreateRow = structureEvent;
    finalOptions.afterRemoveCol = structureEvent;
    finalOptions.afterRemoveRow = structureEvent;
    finalOptions.contextMenu = ['row_above',
                                'row_below',
                                '---------',
                                'col_left',
                                'col_right',
                                '---------',
                                'remove_row',
                                'remove_col',
                                '---------',
                                'undo', 'redo'];

    hot = new Handsontable(document.getElementById(containerId), finalOptions);
    hot.render(); // Call to render removes 'null' literals from empty cells

    // Apply resize after document is finished loading (parent .sequence-member-inner width is set)
    if ('resize' in $(window)) {
        resizeHeight(getHeight());
        $(window).load(function() {
            $(window).resize();
        });
    }
}
