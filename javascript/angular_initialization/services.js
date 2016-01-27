"use strict";


angular
    .module(APP_NAME)
    .service("ServiceTextConverter", ServiceTextConverter);


function ServiceTextConverter ( $http )
{
    let _mapWordConversions = {};
    
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
                    let data = response.data;
                    
                    let wordConversions = data.split("\n");
            
                    let lengthWordConversions = wordConversions.length;
                    for ( let idx = 0; idx < lengthWordConversions; ++idx )
                    {
                        let wordConversion = wordConversions[idx].split(",");
                        
                        let unconvertedWord = wordConversion[0];
                        let convertedWord   = wordConversion[1];
                        
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
            let convertedText = "";
            
            let startTokenIndex = 0;
            
            let lengthUnconvertedText = unconvertedText.length;
            for ( let idx = 0; idx < lengthUnconvertedText; ++idx )
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
                    let unconvertedToken          = unconvertedText.substring(startTokenIndex, idx);
                    let unconvertedTokenLowercase = unconvertedToken.toLowerCase();
                    
                    let convertedTokenLowercase = _mapWordConversions[unconvertedTokenLowercase];
                    
                    let filterConversionTokenLowercase = checkFilterOptions(options, unconvertedTokenLowercase);
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
                    let characterAtIndex = unconvertedText[idx];
                    
                    let stringSentenceEnding = checkSentenceEnding(options.sentenceEnding, idx, characterAtIndex, unconvertedText);
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
        let filterTokenLowercase = "";
        
        let enabledBroFilter = options.broMode;
        
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
        let stringSentenceEnding = "";
        
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
        let convertedTokenWithCase = convertedTokenLowercase;
        
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
