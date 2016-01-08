"use strict";

var g_mapWordConversion = {};

$(document).ready(
    function()
    {
        readWordConversionsFromFile();
    }
);

function readWordConversionsFromFile()
{
    $.get(
        "files/word_conversions.csv",
        function ( data )
        {
            var wordConversions = data.split("\n");
            
            var lengthWordConversions = wordConversions.length;
            for ( var idx = 0; idx < lengthWordConversions; ++idx )
            {
                var wordConversion = wordConversions[idx].split(",");
                
                var unconvertedWord = wordConversion[0];
                var convertedWord   = wordConversion[1];
                
                if ( isValidString(unconvertedWord)
                     && isValidString(convertedWord) )
                {
                    // remove line breaks from file
                    convertedWord = convertedWord.replace(/(\r\n|\n|\r)/gm, "");
                    
                    g_mapWordConversion[unconvertedWord] = convertedWord;
                }
            }
        }
    );
}

function setCaseOfConvertedToken ( unconvertedToken, convertedToken )
{
    if ( unconvertedToken === unconvertedToken.toLowerCase() )
    {
        // no case adjustment needed
    }
    else if ( unconvertedToken.charAt(0) === unconvertedToken.charAt(0).toUpperCase() )
    {
        convertedToken = convertedToken.charAt(0).toUpperCase() + convertedToken.substring(1);
    }
    else if ( unconvertedToken === unconvertedToken.toUpperCase() )
    {
        convertedToken = convertedToken.toUpperCase();
    }
    
    return convertedToken;
}


function convertText()
{
    var unconvertedText = $("#textareaUnconverted").val();
    
    var convertedText = "";
    
    var startTokenIndex = 0;
    
    var lengthUnconvertedText = unconvertedText.length;
    for ( var idx = 0; idx < lengthUnconvertedText; ++idx )
    {
        if ( isValidCharacter(unconvertedText[idx]) )
        {
            if ( idx === lengthUnconvertedText - 1 )
            {
                idx = idx + 1;
            }
            else
            {
                continue;
            }
        }
        
        if ( startTokenIndex !== idx )
        {
            var unconvertedToken          = unconvertedText.substring(startTokenIndex, idx);
            var unconvertedTokenLowercase = unconvertedToken.toLowerCase();
            
            var convertedToken = g_mapWordConversion[unconvertedTokenLowercase];
            
            if ( isValidString(convertedToken) )
            {
                convertedText += setCaseOfConvertedToken(unconvertedToken, convertedToken);
            }
            else
            {
                convertedText += unconvertedToken;
            }
        }
        
        if ( idx !== lengthUnconvertedText )
        {
            convertedText += unconvertedText[idx];
            
            startTokenIndex = idx + 1;
        }
    }
	
	$("#textareaConverted").val(convertedText);
}