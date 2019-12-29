
    describe("My Scheduling system", function () {
        var myApp;
        var scope;
        var $controller;
        var factory;
        // var mockNgRoute;
        // beforeEach( function(){
        //     angular.mock.module('ngRoute');
        // });
        //
        // beforeEach(inject(function(_ngRoute_) {
        //     mockNgRoute = _ngRoute_;
        // }));

        // var mockclassApp;
        //  beforeEach( function(){
        //     angular.mock.module('classApp','ngRoute');
        //      inject(function($rootScope,$controller) {
        //           scope = $rootScope.$new();
        //        // var ctrl = $controller('classController');
        //         // console.log(ctrl);
        //      })
        // });
        beforeEach(function(){
            // loads the app module
            module('classApp','ngRoute');
            inject(function(_$controller_,$rootScope,$injector){
                scope=$rootScope;
                // inject removes the underscores and finds the $controller Provider
                $controller = _$controller_;
                factory = $injector.get('classFactory');
            });
        });
        beforeEach(function() {
            //create a simulation div to use for the tests'
            var mydom = '<div id="mydom"><span id="i-con" onclick="hideEl(this)"></span><input type="text" id="sch_id" required pattern="^[0-9]{1,3}$"><select id="sch_teacher"> <option value="" ng-repeat="teach in teachers">{{teach.name}}</option> </select> </div> <div> <label>Subject </label> <select id="sch_subject"> <option value="" ng-repeat="subj in subjects">{{subj.name}}</option> </select> </div> <div> <label>Time </label> <input type="text" id="sch_time" placeholder="eg 11.00 am" pattern="^[0-9]{2}(:)[0-9]{2}( )(am)$|^[0-9]{2}(:)[0-9]{2}( )(pm)$"> </div> <div> <button class="button primary" ng-click="addSchedule()"> Add Subject</button> </div></div>';
            document.body.insertAdjacentHTML(
                'afterbegin',
                mydom);
        });

        it('Scope.title should be "Hi SMB" ', function() {
            var $scope = {};
            var controller = $controller('classController', { $scope: $scope });

            // the assertion checks the expected result
            expect($scope.title).toEqual('Hi SMB');
        });
        it(' Testing  my scope ', function () {
            expect(scope).toBeDefined();
        });
        it(' Testing  my factory functions', function () {
            var $scope = {};
            var controller = $controller('classController', { $scope: $scope });

            var sch_id="1",sch_subject="math",sch_teacher="sam",sch_time="11:10 am";
            // the assertion checks the expected result
            var results =factory.addSchedule(sch_id, sch_teacher, sch_subject, sch_time)
            expect(results).toEqual('add schedule success');
        });
        it(' my controller  ', function () {
            var $scope = {};
            var controller = $controller('classController', { $scope: $scope });

            var infoContainer = document.getElementById('i-con');
            $scope.addSchedule();
            expect(infoContainer.innerHTML).toBe('\n Please fill all info  to continue');
        });
    });