"use strict";


angular
    .module("appTextConverter")
    .controller("controllerTextConverter", controllerTextConverter)


function controllerTextConverter ( $scope, $http, ServiceTextConverter )
{
    $scope.textUnconverted = "";
    $scope.textConverted   = "";
    
    $scope.options =
    {
        broMode        : true,
        sentenceEnding : false,
    };
    
    $scope.convertText =
        function ()
        {
            $scope.textConverted = ServiceTextConverter.processTextConversion($scope.textUnconverted, $scope.options);
        };
    
    function initializeController()
    {
        ServiceTextConverter.readWordConversionsFromFile();
    }
    
    initializeController();
}