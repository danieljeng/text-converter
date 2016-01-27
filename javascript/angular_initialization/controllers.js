"use strict";


angular
    .module(APP_NAME)
    .controller("controllerTextConverter", controllerTextConverter)


function controllerTextConverter ( $scope, $http, $uibModal, ServiceTextConverter )
{
    $scope.textUnconverted = "";
    $scope.textConverted   = "";
    
    $scope.options =
    {
        broMode        : true,
        sentenceEnding : false,
    };
    
    $scope.launchModalWordMappings =
        function ()
        {
            let modalInstance = $uibModal.open(
                {
                    templateUrl : "views/modals/word_mappings.html",
                    controller  : controllerModalWordMappings,
                    
                    resolve :
                    {
                        mapWordConversions :
                            function ()
                            {
                                return ServiceTextConverter.getMapWordConversions();
                            },
                    },
                }
            );
        };
    
    $scope.convertText =
        function ()
        {
            $scope.textConverted = ServiceTextConverter.processTextConversion($scope.textUnconverted, $scope.options);
        };
    
    function initializeController ()
    {
        ServiceTextConverter.readWordConversionsFromFile();
    }
    
    initializeController();
}
