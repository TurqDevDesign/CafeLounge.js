
var cafe = {
        version: "0.1",
        author: "Austin Fish",
        html: '',
        is: {
            /**
             * [what description]
             * @param  {*} item        Item to check
             * @return {string|array}  Single string or array of matching types.
             *                         Matchable types include node, string,
             *                         number, boolean, object, array,undefined,
             *                         null.
             */
            what: function(item){

            },
            /**
             * Check if passed item is a node
             *
             * @param  {*} item                   Item to check against specified type
             * @param  {number|string} [inDOM=2]  Three values: 0, 1, or 2.
             *                                    0 = Check that item is node, but return
             *                                        false if it is in the DOM.
             *                                    1 = Check that item is node, but return
             *                                        false if it is NOT in the DOM.
             *                                    2 = Only check if the item is a node,
             *                                        doesn't matter where it's stored.
             * @param  {string} [tag=false]       Supply tag name to check for specific type.
             *                                    For instance cafe.is.node(item, 'div'); will
             *                                    return true only if item is a div.
             * @return {boolean}                  Returns true if item is of specified type
             */
            node: function(item, inDOM = 2, tag = false){
                if(item.nodeType){
                    let found = cafe.html.contains(item);
                    if(inDOM == 0 && found){
                        return false;
                    }
                    if(inDOM == 1 && !found){
                        return false;
                    }
                    if(tag){
                        if(item.tagName.toLowerCase() === tag){
                            return true;
                        }
                        return false
                    }
                    return true
                }
                return false;
            },
            /**
             * Check if passed item is a string
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            string: function(item){

            },
            /**
             * Check if passed item is a number
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            number: function(item){

            },
            /**
             * Check if passed item is a boolean
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            boolean: function(item){

            },
            /**
             * Check if passed item is an object
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            object: function(item){

            },
            /**
             * Check if passed item is an array
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            array: function(item){

            },
            /**
             * Check if passed item is undefined
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            undefined: function(item){

            },
            /**
             * Check if passed item is null
             * @param  {*} item   Item to check against specified type
             * @return {boolean}  Returns true if item is of specified type
             */
            null: function(item){

            }
        },
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
         * @param  {boolean} [types=false]  compare data-types of variables, instead
         *                                  of values. This is useful for making
         *                                  sure that merged values, using optionSupport
         *                                  for instance, are the correct data-types, if
         *                                  you don't care about the actual value.
         * @param  {boolean} [exists=false] Only for objects (including arrays).
         *                                  Forces comparison of ONLY items with that
         *                                  exist (items with matching indexes). This
         *                                  means that when you use this parameter with
         *                                  an array, it will use each array's numerical
         *                                  keys, matching against the same numerical
         *                                  index in the second array. When used,
         *                                  extraneous keys/indexes, those which do not
         *                                  exist in the paired object, will NOT prompt
         *                                  a false return.
         * @return {boolean}                False if discrepancies found between
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
         * Allows you to pass a node reference to remove from DOM
         *
         * @param  {HTMLElement} node Node reference to remove
         * @return {boolean}          Returns true if successful, false otherwise
         */
        nodeRemove: function(node){
            if(node && this.is.node(node, 1)){
                node.parentNode.removeChild(node);
                return true;
            }
            return false;
        },
        /**
         * Finds node on page, using reference, returns the node,
         * and deletes it from the DOM.
         *
         * @param  {HTMLElement} reference  Node passed in to Extract
         * @param  {boolean} [deep=true]    Deep value to be passed to cloneNode().
         *                                  Setting to false will only extract node
         *                                  passed in, deleting children.
         * @return {HTMLElement|Boolean}    Node extracted from DOM, false if node
         *                                  not passed.
         */
        nodeExtract: function(reference, deep = true){
            let clone = false;
            if(reference && this.is.node(reference)){
                clone = reference.cloneNode(deep);
            }
            if(clone != false){
                this.nodeRemove(reference);
            }
            return clone;
        },
        /**
         * Takes a node and wraps it in a newly created parent. If the node is
         * in the DOM (instead of simply stored in a variable), then nodeWrap()
         * will place the new nodes back into the same DOM position. Otherwise,
         * it simply returns the new nodes.
         *
         * @param  {HTMLElement} child              Child node to wraps
         * @param  {string}      [parentTag='div']  String representing tag to wrap
         *                                          around child. You may pass in
         *                                          any value that's valid for
         *                                          createElement().
         * @return {HTMLElement|boolean}            Resulting element (Child wrapped
         *                                          in new parent element), false
         *                                          upon failure.
         */
        nodeWrap: function(child, parentTag = 'div'){
            let newNode = false;
            //If child is passed, and it's a node, and it's not in the DOM
            if(child && this.is.node(child, 0)){
                newNode   = document.createElement(parentTag);
                childNode = newNode.appendChild(child);
                return newNode;
            //If child is passed, and it's a node, and it is in the DOM
            } else if(child && this.is.node(child, 1)){
                newNode   = document.createElement(parentTag);
                this.putAfter(child, newNode);
                newNode.appendChild(this.nodeExtract(child));
                console.log("testing");
            }
            return newNode;
        },
        /**
         * Inserts a node before another
         *
         * @param  {HTMLElement} existingNode Node that already exists in DOM
         * @param  {HTMLElement} toInsert     Node to insert before existingNode
         * @return {boolean}                  True if successful, false otherwise
         */
        putBefore: function(existingNode, toInsert){
            if(existingNode && this.is.node(existingNode, 1)){
                if(toInsert && this.is.node(toInsert)){
                    existingNode.parentNode.insertBefore(toInsert, existingNode);
                    return true;
                }
                return false
            }
            return false;
        },
        /**
         * Cleverly runs putBefore() twice to insert the new node
         * after the other.
         *
         * @param  {HTMLElement} existingNode Node that already exists in DOM
         * @param  {HTMLElement} toInsert     Node to insert after existingNode
         * @return {boolean}                  True if successful, false otherwise
         */
        putAfter: function(existingNode, toInsert){
            if(this.putBefore(existingNode, toInsert)){
                this.putBefore(toInsert, existingNode);
                return true;
            }
            return false;
        },
        init: function(){

            //Populate now that the document has loaded
            cafe.html = document.getElementsByTagName('html')[0];

            //Initialization message
            console.log("\n" +
                        "\n" +
                        "%c  (( %c    ___    \n" +
                        "%c   )) %c \\___/_  \n" +
                        "%c  |~~| /~~~\\ \\  " +  "%c Café Lounge " + this.version + " - Part of the Café series \n" +
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
         * @return {boolean}            Returns true once event listeners have been set
         */
        serve: function(callback){
            window.onload = function(){
                //Initialize some things after DOM has loaded
                cafe.init();
                //Run callback (all of user code)
                callback();
            }
            return true;
        }

    }
