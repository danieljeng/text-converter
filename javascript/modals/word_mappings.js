"use strict";

function controllerModalWordMappings ( $scope, $uibModalInstance, $http, mapWordConversions )
{
    $scope.stringWordMappings = JSON.stringify(mapWordConversions, null, 4);
    
    $scope.cancel =
        function ()
        {
            $uibModalInstance.dismiss("cancel");
        };
}