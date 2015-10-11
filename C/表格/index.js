/**
 * Created by 斌 on 2015/10/11.
 */

angular.module('myApp', ['ui.bootstrap'])
    .filter('paging', function () {
        return function (items, index, pageSize) {
            if (!items) return [];

            var offset = (index - 1) * pageSize;
            return items.slice(offset, offset + pageSize);
        }
    })
    .filter('size', function () {
        return function (items) {
            if (!items) return 0;
            return items.length || 0
        }
    })
    .filter('orderClass', function () {
        return function (direction) {
            if (direction === -1) {
                return 'glyphicon-chevron-down';
            } else {
                return 'glyphicon-chevron-up';
            }
        }
    })
    .controller('TableController', function ($scope) {
        var vm = $scope.vm = {};
        vm.page = {
            size: 5,
            index: 1
        };
        vm.sort = {
            column: 'id',
            direction: -1,
            toggle: function (column) {
                if (column.sortable === false) return;
                if (this.column === column.name) {
                    this.direction = -this.direction || -1;
                } else {
                    this.column = column.name;
                    this.direction = -1;
                }
            }
        };
        vm.columns = [
            {
                label: 'ID',
                name:'id',
                type:'string'
            },
            {
                label:'姓名',
                name:'name',
                type:'string'
            },
            {
                label:'粉丝数',
                name:'followers',
                type:'number'
            },
            {
                label:'收入',
                name:'income',
                type:'currency'
            },
            {
                label:'',
                name:'actions',
                sortable:false
            }
        ];

        vm.age = function (birthday) {
            return moment().diff(birthday, 'years');
        };

        vm.items = [];
        var MAX_NUM = 10 * 100;

        function rand(min, max) {
            return min + Math.round(Math.random() * (max -min));
        }

        for (var i = 0; i < MAX_NUM; ++i) {
            var id = rand(0, MAX_NUM);
            vm.items.push({
                id:i+1,
                name: 'Name' + id,
                followers: rand(0, 100*1000*1000),
                birthday: moment().subtract('day', rand(365, 365*50)).toDate(),
                summary:'这是一个测试' + i,
                income:rand(1000, 100000)
            });
        }

    });