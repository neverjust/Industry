define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'instrument/index' + location.search,
                    add_url: 'instrument/add',
                    edit_url: 'instrument/edit',
                    del_url: 'instrument/del',
                    multi_url: 'instrument/multi',
                    table: 'instrument',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'factory_id', title: __('Factory_id')},
                        {field: 'threshold', title: __('Threshold')},
                        {field: 'situation', title: __('Situation')},
                        {field: 'factory.id', title: __('Factory.id')},
                        {field: 'factory.clean_level', title: __('Factory.clean_level')},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});