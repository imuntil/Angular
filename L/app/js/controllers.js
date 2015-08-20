/**
 * Created by jtun02 on 15/8/18.
 */
var bookStoreCtrls = angular.module('bookStoreCtrls', []);
bookStoreCtrls.controller('HelloCtrl', ['$scope', function ($scope) {
        $scope.greeting  ={
            text:'Hello'
        }
}]);
bookStoreCtrls.controller('BookListCtrl', ['$scope', function($scope) {
    $scope.books = [
        {title:'angular', author:'dmqq'},
        {title:'backbone', author:'ancd'},
        {title:'create', author:'khgn'}
    ]
}]);