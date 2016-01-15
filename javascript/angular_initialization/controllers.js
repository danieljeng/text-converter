"use strict";


angular
    .module("appTextConverter")
    .controller("controllerTextConverter", controllerTextConverter)


function controllerTextConverter ( $scope, $http, ServiceTextConverter )
{
    $scope.textUnconverted = "";
    $scope.textConverted   = "";
    
    $scope.convertText =
        function ()
        {
            $scope.textConverted = ServiceTextConverter.processTextConversion($scope.textUnconverted);
        };
    
    function initializeController()
    {
        ServiceTextConverter.readWordConversionsFromFile();
    }
    
    initializeController();
}