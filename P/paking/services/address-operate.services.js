/**
 * Created by jtun02 on 15/11/6.
 */
(function () {
    angular.module('app.services.addressOperate',[
        'app.services.http'
    ])
        .factory('addressOperate', addressOperate);

    addressOperate.$inject = ['$http', '$q', 'commonData'];
    function addressOperate($http, $q, commonData) {
        var service = {
            addresses: [],
            chosenAdr: {},
            getAddresses: getAddresses,
            setAdrToDe: setAdrToDe,

            setDefaultToChosenAdr:setDefaultToChosenAdr,
            setChosenAdr:setChosenAdr,

            addAddress:addAddress,
            updateAddress:updateAddresss,
            deleteAddress:deleteAddress
        };

        return service;

        /**
         * 获取所有地址
         * @returns {promise}
         */
        function getAddresses() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                params: {openid: commonData.OPENID},
                url: commonData.BASE_URL + 'selectAddressAds!selectAddress'
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    service.addresses = data['result'];
                    defer.resolve(service.addresses);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        /**
         * 将某个地址设为默认收货地址
         * @param id
         * @returns {promise}
         */
        function setAdrToDe(id) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                params: {id: id, openid: commonData.OPENID},
                url: commonData.BASE_URL + 'updateAddressAds!updateAddress'
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    defer.resolve(data);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        /**
         * 如果有默认收货地址，则将其设置为收货地址
         */
        function setDefaultToChosenAdr() {
            if (!service.chosenAdr.name) {
                for (var i = 0; i < service.addresses.length; i++) {
                    var _a = service.addresses[i];
                    if (_a.status === 1) {
                        service.chosenAdr = _a;
                        break;
                    }
                }
            }
        }

        /**
         * 选择收货地址
         * @param address
         */
        function setChosenAdr(adr) {
            service.chosenAdr = adr;
        }


        /**
         * 新增收货地址
         * @param params
         */
        function addAddress(params) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:params,
                url:commonData.BASE_URL + 'saveAddressAds!saveAddress'
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    defer.resolve(data);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        function updateAddresss(params) {
            var defer = $q.defer();
            $http({
                metho:'GET',
                params:params,
                url:commonData.BASE_URL + 'updateAddressOneAds!updateAddressOne',
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    defer.resolve(data);
                    if(params.id === service.chosenAdr.id) {
                        angular.extend(service.chosenAdr, params);
                    }
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        function deleteAddress(id) {
            var defer = $q.defer();
            $http({
                metho:'GET',
                params:{id:id},
                url:commonData.BASE_URL + 'delAddressAds!delAddress',
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    defer.resolve(data);
                    if (id === service.chosenAdr.id) {
                        service.chosenAdr = {};
                    }
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }
    }
})();