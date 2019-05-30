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
                        {field: 'threshold', title: __('阈值')},
                        {field: 'situation', title: __('现值')},
                        {field: 'temperature', title: __('温度')},
                        {field: 'humidity', title: __('相对湿度')},
                        {field: 'factory.name', title: __('工厂名')},
                        {field: 'instrumenttype.name', title: __('仪器名')},
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