/**
 * Created by jtun02 on 15/12/3.
 */
/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */

(function () {
    angular.module('app.directives.ngThumb', [])
        .directive('ngThumb', ngThumb);
    ngThumb.$inject = ['$window'];
    function ngThumb($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        //return {
        //    restrict: 'A',
        //    template: '<span/><canvas/>',
        //    link: function(scope, element, attributes) {
        //        if (!helper.support) return;
        //
        //        var params = scope.$eval(attributes.ngThumb);
        //        console.log(params);
        //
        //        if (!helper.isFile(params.file)) return;
        //        if (!helper.isImage(params.file)) return;
        //
        //        var canvas = element.find('canvas');
        //        var span = element.find('span');
        //        var reader = new FileReader();
        //
        //        reader.onload = onLoadFile;
        //        reader.readAsDataURL(params.file);
        //
        //        function onLoadFile(event) {
        //            var img = new Image();
        //            img.onload = onLoadImage;
        //            img.src = event.target.result;
        //
        //            span .css({
        //                'background':'url('+ event.target.result +') no-repeat center center',
        //                'backgroundSize':'cover'
        //            });
        //        }
        //
        //        function onLoadImage() {
        //            var width = params.width || this.width / this.height * params.height;
        //            var height = params.height || this.height / this.width * params.width;
        //            canvas.attr({ width: width, height: height });
        //            canvas.css('display','none');
        //            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        //            //attributes.base64s.push(canvas[0].toDataURL().replace('data:image/png;base64,',''));
        //            //console.log(attributes.base64s);
        //        }
        //    }
        //};

        return {
            restrict: 'A',
            template: '<span/><canvas/>',
            scope:{
                file:'=ngThumb',
                size:'=thumbSize',
                base64s:'='
            },
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var f = scope.file._file;
                var params = scope.$eval(scope.size);

                if (!helper.isFile(f)) return;
                if (!helper.isImage(f)) return;

                var canvas = element.find('canvas');
                var span = element.find('span');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(f);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;

                    span .css({
                        'background':'url('+ event.target.result +') no-repeat center center',
                        'backgroundSize':'cover'
                    });
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas.css('display','none');
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    scope.base64s.push(canvas[0].toDataURL().replace('data:image/png;base64,',''));
                }
            }
        };
    }
})();