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

function checkFilterOptions ( unconvertedToken, unconvertedTokenLowercase, convertedToken )
{
    var filterToken = "";
    
    var enabledBroFilter = $('#idCheckboxBroFilter').is(':checked');
    
    if ( enabledBroFilter
         && ("o" === unconvertedTokenLowercase.charAt(0))
         && (3 < unconvertedTokenLowercase.length) )
    {
        filterToken = "br" + unconvertedTokenLowercase;
        
        return setCaseOfConvertedToken(unconvertedToken, filterToken);
    }
    
    return null;
}

function setCaseOfConvertedToken ( unconvertedToken, convertedToken )
{
    if ( unconvertedToken === unconvertedToken.toLowerCase() )
    {
        // no case adjustment needed
    }
    else if ( unconvertedToken === unconvertedToken.toUpperCase() )
    {
        convertedToken = convertedToken.toUpperCase();
    }
    else if ( unconvertedToken.charAt(0) === unconvertedToken.charAt(0).toUpperCase() )
    {
        convertedToken = convertedToken.charAt(0).toUpperCase() + convertedToken.substring(1);
    }
    
    return convertedToken;
}

function processTextConversion ( unconvertedText )
{
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
            
            var filterConversion = checkFilterOptions(unconvertedToken, unconvertedTokenLowercase, convertedToken);
            
            if ( isValidString(filterConversion) )
            {
                convertedText += filterConversion;
            }
            else if ( isValidString(convertedToken) )
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
            var characterAtIndex = unconvertedText[idx];
            
            var enabledSentenceEnding = $('#idCheckboxSentenceEnding').is(':checked');
            if ( enabledSentenceEnding )
            {
                if ( isCharacterPunctuation(characterAtIndex)
                     && isValidCharacter(unconvertedText[idx - 1]) )
                {
                    convertedText += " in my diapers";
                }
            }
            
            convertedText += characterAtIndex;
            
            startTokenIndex = idx + 1;
        }
    }
    
    return convertedText;
}

function convertText()
{
    var unconvertedText = $("#textareaUnconverted").val();
    
    var convertedText = processTextConversion(unconvertedText);
	
	$("#textareaConverted").val(convertedText);
}