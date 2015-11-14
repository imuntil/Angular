/**
 * Created by ±ó on 2015/11/14.
 */
define(['angular', 'controller', 'service'], function (angular) {
    return angular.module('myApp', [
        'app.controllers',
        'app.wechatRelated',
        'app.datas'
    ]);
});