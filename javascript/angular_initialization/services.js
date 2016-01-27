"use strict";


angular
    .module(APP_NAME)
    .service("ServiceTextConverter", ServiceTextConverter);


function ServiceTextConverter ( $http )
{
    var _mapWordConversions = {};
    
    this.getMapWordConversions =
        function ()
        {
            return _mapWordConversions;
        };
    
    this.readWordConversionsFromFile =
        function ()
        {
            _mapWordConversions = {};
            
            $http(
                {
                    url    : "files/word_conversions.csv",
                    method : "GET",
                }
            )
            .then(
                // Successful response
                function ( response )
                {
                    var data = response.data;
                    
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
                            
                            _mapWordConversions[unconvertedWord] = convertedWord;
                        }
                    }
                }
            );
        };
    
    this.processTextConversion =
        function ( unconvertedText, options )
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
                    
                    var convertedTokenLowercase = _mapWordConversions[unconvertedTokenLowercase];
                    
                    var filterConversionTokenLowercase = checkFilterOptions(options, unconvertedTokenLowercase);
                    if ( isValidString(filterConversionTokenLowercase) )
                    {
                        convertedTokenLowercase = filterConversionTokenLowercase;
                    }
                    
                    if ( isValidString(convertedTokenLowercase) )
                    {
                        convertedText += setCaseOfConvertedToken(unconvertedToken, convertedTokenLowercase);
                    }
                    else
                    {
                        convertedText += unconvertedToken;
                    }
                }
                
                if ( idx !== lengthUnconvertedText )
                {
                    var characterAtIndex = unconvertedText[idx];
                    
                    var stringSentenceEnding = checkSentenceEnding(options.sentenceEnding, idx, characterAtIndex, unconvertedText);
                    if ( isValidString(stringSentenceEnding) )
                    {
                        convertedText += stringSentenceEnding;
                    }
                    
                    convertedText += characterAtIndex;
                    
                    startTokenIndex = idx + 1;
                }
            }
            
            return convertedText;
        };
    
    function checkFilterOptions ( options, unconvertedTokenLowercase )
    {
        var filterTokenLowercase = "";
        
        var enabledBroFilter = options.broMode;
        
        if ( enabledBroFilter
             && ("o" === unconvertedTokenLowercase.charAt(0))
             && (3 < unconvertedTokenLowercase.length) )
        {
            filterTokenLowercase = "br" + unconvertedTokenLowercase;
            
            return filterTokenLowercase;
        }
        
        return null;
    }
    
    function checkSentenceEnding ( enabledSentenceEnding, index, characterAtIndex, unconvertedText )
    {
        var stringSentenceEnding = "";
        
        if ( enabledSentenceEnding )
        {
            if ( isCharacterPunctuation(characterAtIndex)
                 && isValidLowercaseCharacter(unconvertedText[index - 1]) )
            {
                stringSentenceEnding = " in my diapers";
            }
        }
        
        return stringSentenceEnding;
    }
    
    function setCaseOfConvertedToken ( unconvertedToken, convertedTokenLowercase )
    {
        var convertedTokenWithCase = convertedTokenLowercase;
        
        if ( unconvertedToken === unconvertedToken.toLowerCase() )
        {
            convertedTokenWithCase = convertedTokenLowercase;
        }
        else if ( unconvertedToken === unconvertedToken.toUpperCase() )
        {
            convertedTokenWithCase = convertedTokenLowercase.toUpperCase();
        }
        else if ( unconvertedToken.charAt(0) === unconvertedToken.charAt(0).toUpperCase() )
        {
            convertedTokenWithCase = convertedTokenLowercase.charAt(0).toUpperCase() + convertedTokenLowercase.substring(1);
        }
        
        return convertedTokenWithCase;
    }
}
