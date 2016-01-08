"use strict";


function isValidObject ( object )
{
    if ( (null === object)
         || (undefined === object) )
    {
        return false;
    }
    
    return true;
}

function isValidString ( string )
{
    if ( "" === string )
    {
        return false;
    }
    
    return isValidObject(string);
}

function isValidCharacter ( character )
{
    if ( (('a' <= character) && ('z' >= character))
         || (('A' <= character) && ('Z' >= character)) )
    {
        return true;
    }
    
    return false;
}