
var cafe = {
        version: "0.1",
        author: "Austin Fish",
        /**
         * Takes two objects, one user-provided, and one of supported options with
         * default values. Returns object containing all supported options set to
         * either default, or user-provided value. The latter takes precedence.
         *
         * @param  {object} provided Options provided to override defaults
         * @param  {object} supports Default options
         * @return {object}          All supported options with provided substitutions,
         *                           extraneous provided options are ignored
         */
        optionSupport: function(provided, supports){
            options = {};
            if(provided){
                for(option in supports){
                    if(option in provided){
                        options[option] = provided[option];
                    } else {
                        options[option] = supports[option];
                    }
                }
                return options;
            }
            return supports;
        },
        /**
         *
         * Takes item a and item b, compares them (if single values), or
         * compares their children (if an array or object).
         *
         * @param  {*}  a                   Any variable to compare to b
         * @param  {*}  b                   Any variable to compare with a
         * @param  {Boolean} [types=false]  compare data-types of variables, instead
         *                                  of values. This is useful for making
         *                                  sure that merged values, using optionSupport
         *                                  for instance, are the correct data-types, if
         *                                  you don't care about the actual value.
         * @param  {Boolean} [exists=false] Only for objects (including arrays).
         *                                  Forces comparison of ONLY items with that
         *                                  exist (items with matching indexes). This
         *                                  means that when you use this parameter with
         *                                  an array, it will use each array's numerical
         *                                  keys, matching against the same numerical
         *                                  index in the second array. When used,
         *                                  extraneous keys/indexes, those which do not
         *                                  exist in the paired object, will NOT prompt
         *                                  a false return.
         * @return {Boolean}                False if discrepancies found between
         *                                  'a' and 'b', in accordance with
         *                                  options set, True otherwise.
         */
        compare: function(a, b, types = false, exists = false){
            if(a === b){
                //save a lot of processing if they just so happen to be exactly the same
                return true;
            }
            if(a === null && b === null){
                //Avoid issue with typeof null == object
                return true;
            } else if(a === null || b === null){
                //If either is null, but previous condition didn't catch, then not
                //the same
                return false;
            }
            //Make sure we can actually compare
            if(typeof a === typeof b){
                if(typeof a === "object"){
                    if(exists){
                        for(item in a){
                            if(types){
                                //Don't return false if item's not in b, because we're
                                //checking items that exist
                                if(item in b){
                                    if(!(typeof a[item] === typeof b[item])){
                                        return false;
                                    }
                                }
                            } else {
                                //Don't return false if item's not in b, because we're
                                //checking items that exist
                                if(item in b){
                                    if(!(a[item] == b[item]) ||
                                        (a[item] === null && b[item] === undefined) ||
                                        (b[item] === null && a[item] === undefined)){
                                        return false;
                                    }
                                }
                            }
                        }
                        return true;
                    } else {
                        if(Object.keys(a).length != Object.keys(b).length){
                            //exists not true, so can't be different
                            //lengths and still the same
                            return false;
                        }
                        for(item in a){
                            if(!(item in b)){
                                return false;
                            }
                            if(types){
                                if(!(typeof a[item] === typeof b[item])){
                                    return false;
                                }
                            } else {
                                //If the two values don't match, then false. But run a special check
                                //for null and undefined combinations since the difference between
                                //those has to be checked by type, and all other values we'd like to
                                //leave open to type i.e. "1" should equal 1
                                if(!(a[item] == b[item]) ||
                                    (a[item] === null && b[item] === undefined) ||
                                    (b[item] === null && a[item] === undefined) ){
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                } else {
                    if(types){
                        if(typeof a === typeof b){
                            return true;
                        }
                        return false;
                    }
                    if(a == b){
                        return true;
                    }
                    return false;
                }
            }
            //So long as types isn't explicitly set to true, a & b can still match
            //if they're, for instance, a string and number with equal values
            else if(a == b && !types){
                return true;
            }
            return false;
        },
        /**
         * Finds node on page, using reference, returns the node,
         * and deletes it from the DOM.
         *
         * @param  {HTMLElement} reference   Node passed in to Extract
         * @param  {Boolean} [deep=true]     Deep value to be passed to cloneNode().
         *                                   Setting to false will only extract node
         *                                   passed in, deleting children.
         * @return {HTMLElement|Boolean}     Node extracted from DOM, false if node
         *                                   not passed.
         */
        nodeExtract: function(reference, deep = true){
            let clone = false;
            if(reference && reference.nodeType){

            }
            return clone;
        },
        nodeWrap: function(){

        },
        init: function(){
            /*
            if ( document.addEventListener ) {
                Object.prototype.on = document.addEventListener;
            } else if ( document.attachEvent ) {
                Object.prototype.on = document.attachEvent;
            }
            Boolean.prototype.cafe = {

            }
            Number.prototype.cafe = {

            }
            String.prototype.cafe = {

            }
            Symbol.prototype.cafe = {

            }
            Object.prototype.cafe = {

            }
            */

            //Initialization message
            console.log("\n" +
                        "\n" +
                        "%c  (( %c    ___    \n" +
                        "%c   )) %c \\___/_  \n" +
                        "%c  |~~| /~~~\\ \\  " +  "%c Café " + this.version + " - Part of the Café series \n" +
                        "%c C|__| \\___/    " +  "%c by " + this.author + " - Initialized \n" +
                        "       `'`'`    \n" +
                        "\n" +
                        "\n",
                        "color: #c0c0c0",
                        "color: #865A3E",
                        "color: #c0c0c0",
                        "color: #865A3E",
                        "color: #865A3E",
                        "color: #000",
                        "color: #865A3E",
                        "color: #000");

        },
        /**
         * This is the callback that should wrap all javascript content.
         *
         * @callback runOnLoad
         */
        /**
         * Executes callback when DOM has finished loading. Should wrap any code
         * that requires the use of Cafe methods, or access to loaded nodes.
         *
         * @param  {runOnLoad} callback Callback to execute when DOM has finished loading
         * @return {Boolean}            Returns true once event listeners have been set
         */
        serve: function(callback){
            this.init();
            window.onload = callback;
            return true;
        }

    }
