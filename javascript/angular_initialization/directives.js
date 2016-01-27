"use strict";


angular
    .module(APP_NAME)
    .directive("optionSwitch", optionSwitch)
    .directive("modalHeaderCloseButton", modalHeaderCloseButton)
    .directive("modalFooterCloseButton", modalFooterCloseButton);


function optionSwitch ()
{
    let _uniqueID = 1;
    
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
                let itemID = "idOptionSwitch" + _uniqueID;
                _uniqueID++;
                
                elem.find("input").attr("id" , itemID);
                elem.find("label").attr("for", itemID);
            }
    };
}

function modalHeaderCloseButton ()
{
    return {
        restrict : "AE",
        scope :
        {
            closeModalFunction : "=",
        },
        template : '<button type="button" class="close modal-close-button" ng-click="closeModalFunction()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
    };
}

function modalFooterCloseButton ()
{
	return {
        restrict : "AE",
        scope :
        {
            closeModalFunction : "=",
        },
        template : '<button type="button" class="btn btn-default pull-left" ng-click="closeModalFunction()">Close</button>',
    };
}
