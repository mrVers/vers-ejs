angular.module('app').controller('HomeCtrl',function($scope, itemService){

	$scope.items = itemService.model.list;	
});