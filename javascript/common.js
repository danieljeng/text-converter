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

function isValidLowercaseCharacter ( character )
{
    if ( ('a' <= character)
         && ('z' >= character) )
    {
        return true;
    }
    
    return false;
}

function isValidCharacterOrNumber ( character )
{
    if ( ('0' <= character)
         && ('9' >= character) )
    {
        return true;
    }
    
    return isValidCharacter(character);
}

function isCharacterPunctuation ( character )
{
    switch ( character )
    {
        case '.' :
        case '!' :
        case '?' :
        {
            return true;
        }
    }
    
    return false;
}