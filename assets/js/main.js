
window.jackpot = window.classApp || {};

(function() {
    var app = angular.module('classApp', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/templates/home.htm"
            })
            .when("/teachers", {
                templateUrl: "/templates/teachers.htm"
            })
            .when("/subjects", {
                templateUrl: "/templates/subjects.htm"
            });
    });
    class Temp {
        constructor(id, name) {
        }
    }

    class Subject extends Temp {
        constructor(id, name, category) {
            super(id, name);
            this.id = id;
            this.name = name;
            this.category = category;
        }
    }

    class Teacher extends Temp {
        constructor(id, name, nat_id) {
            super(id, name);
            this.id = id;
            this.name = name;
            this.nat_id = nat_id;
        }
    }

    class Schedule {
        constructor(id, teacher, subject, time) {
            this.id = id;
            this.teacher = teacher;
            this.subject = subject;
            this.time = time;
        }
    }

    app.controller('classController', function ($scope, classFactory) {
        $scope.title="Hi SMB";
        $scope.subjects = classFactory.getSubjects();
        $scope.teachers = classFactory.getTeachers();
        $scope.schedules = classFactory.getSchedules();

        $scope.addSubject = function () {
            var infoContainer = document.getElementById('i-con');
            var subj_id = document.getElementById('subj_id').value;
            var subj_name = document.getElementById('subj_name').value;
            var subj_category = document.getElementById('subj_category').value;
            if ((subj_id.trim()).length < 1 || (subj_name.trim()).length < 1 || (subj_category.trim()).length < 1) {
                showEl(infoContainer);
                infoContainer.classList.remove("suc");
                infoContainer.classList.add("err");
                infoContainer.innerHTML = "\n Please fill all info  to continue";
                return;
            }
            var result = classFactory.addSubject(subj_id, subj_name, subj_category);
            $scope.subjects = classFactory.getSubjects();
            infoContainer.classList.remove("err");
            infoContainer.classList.add("suc");
            infoContainer.innerHTML = result;
            showEl(infoContainer);
        };
        $scope.addTeacher = function () {
            var infoContainer = document.getElementById('i-con');
            var teach_id = document.getElementById('teach_id').value;
            var teach_name = document.getElementById('teach_name').value;
            var teach_nat_id = document.getElementById('teach_nat_id').value;
            if ((teach_id.trim()).length < 1 || (teach_name.trim()).length < 1 || (teach_nat_id.trim()).length < 1) {
                showEl(infoContainer);
                infoContainer.classList.remove("suc");
                infoContainer.classList.add("err");
                infoContainer.innerHTML = "\n Please fill all info  to continue";
                return;
            }
            var result = classFactory.addTeacher(teach_id, teach_name, teach_nat_id);
            $scope.teachers = classFactory.getTeachers();
            infoContainer.classList.remove("err");
            infoContainer.classList.add("suc");
            infoContainer.innerHTML = result;
            showEl(infoContainer);
        };
        $scope.addSchedule = function () {
            var infoContainer = document.getElementById('i-con');
            var sch_id = document.getElementById('sch_id').value.trim();
            var teachr = document.getElementById('sch_teacher')
            var sch_teacher = teachr.options[teachr.selectedIndex].innerHTML;
            var sub = document.getElementById('sch_subject');
            var sch_subject = sub.options[sub.selectedIndex].innerHTML;
            var sch_time = document.getElementById('sch_time').value.trim();
            alert("the teacher is " + sch_teacher);
            if ((sch_id.trim()).length < 1 || (sch_teacher.trim()).length < 1 || (sch_time.trim()).length < 1 || (sch_time.trim()).length < 1) {
                showEl(infoContainer);
                infoContainer.classList.remove("suc");
                infoContainer.classList.add("err");
                infoContainer.innerHTML = "\n Please fill all info  to continue";
                return;
            }
            var result = classFactory.addSchedule(sch_id, sch_teacher, sch_subject, sch_time);
            $scope.teachers = classFactory.getSchedules();
            infoContainer.classList.remove("err");
            infoContainer.classList.add("suc");
            infoContainer.innerHTML = result;
            showEl(infoContainer);
        }
    });
    app.factory("classFactory", function () {
        var factory = {};
        factory.teachers = [];
        factory.addTeacher = function (id, name, nat_id) {
            try {
                var teacher = new Teacher(id, name, nat_id);
                factory.teachers.push(teacher);
                return "add teacher success";
            } catch (e) {
                return "add teacher error";
            }
        }
        factory.getTeachers = function () {
            return factory.teachers;
        };
        factory.subjects = [];
        factory.addSubject = function (id, name, category) {
            try {
                var subject = new Subject(id, name, category);
                factory.subjects.push(subject);
                return "add subject success";
            } catch (e) {
                return "add subject error";
            }
        };
        factory.getSubjects = function () {
            return factory.subjects;
        };
        factory.schedules = [];
        factory.addSchedule = function (id, teacher, subject, time) {
            try {
                var schedule = new Schedule(id, teacher, subject, time);
                factory.schedules.push(schedule);
                return "add schedule success";
            } catch (e) {
                return "add schedule error";
            }
        }
        factory.getSchedules = function () {
            return factory.schedules;
        }
        return factory;
    });

    var laststate = false;

    function formToggler() {

        var fom = document.getElementById("flexform");
        if (!laststate) {
            showEl(fom);
        } else {
            hideEl(fom);
        }
        laststate = !laststate;
    }

    function hideEl(elem) {
        elem.classList.add("hiddenform");
        elem.classList.remove('shownform');
    }

    function showEl(elem) {
        elem.classList.remove("hiddenform");
        elem.classList.add("shownform");
    }
}());
