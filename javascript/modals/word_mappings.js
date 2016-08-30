"use strict";


function controllerModalWordMappings ( $scope, $uibModalInstance, $http, mapWordConversions )
{
    $scope.wordMappings = [];
    
    $scope.cancel = function ()
    {
        $uibModalInstance.dismiss("cancel");
    };
    
    function initializeController ()
    {
        for ( var idx in mapWordConversions )
        {
            $scope.wordMappings.push(
                {
                    unconvertedWord : idx,
                    convertedWord   : mapWordConversions[idx],
                }
            );
        }
        
        $scope.optionsTableWordMappings =
        {
            paging : false,
        };
    }
    
    initializeController();
}
