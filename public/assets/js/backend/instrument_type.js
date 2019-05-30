define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'instrument_type/index' + location.search,
                    add_url: 'instrument_type/add',
                    edit_url: 'instrument_type/edit',
                    del_url: 'instrument_type/del',
                    multi_url: 'instrument_type/multi',
                    table: 'instrument_type',
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
                        {field: 'name', title: __('名称')},
                        {field: 'low_temp', title: __('最低温度')},
                        {field: 'high_temp', title: __('最高温度')},
                        {field: 'low_humidity', title: __('最低湿度')},
                        {field: 'high_humidity', title: __('最高湿度')},
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