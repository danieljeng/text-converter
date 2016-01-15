"use strict";


angular
    .module("appTextConverter")
    .directive("optionSwitch", optionSwitch);


function optionSwitch()
{
    var uniqueID = 1;
    
	return {
        restrict : "AE",
        scope :
        {
            clickFunction : "=",
            modelVariable : "=",
        },
        
        templateUrl : "views/components/option_switch.html",
        
        link :
            function ( scope, elem, attrs )
            {
                var itemID = "idOptionSwitch" + uniqueID;
                uniqueID++;
                
                elem.find("input").attr("id" , itemID);
                elem.find("label").attr("for", itemID);
            }
    };
}