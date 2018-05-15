/*
 * JSONStringify.js
   @LinWei
   2018-04-26

   This is a function like native JSON.stringify.
   
   For example:

   var obj={
       key1:12,
       key2:null,
       key3:[1,2,3],
       key4:{a:1,b:2},
       key5:'linwei',
       key6:true
   };

   console.log(JSONStringify(obj)); 
   => '{"key1":12,"key2":null,"key3":[1,2,3],"key4":{"a":1,"b":2},"key5":"linwei","key6":true}'


   var array=[ 12, null, [1,2,3], {a:1,b:2}, 'linwei', true ];

   console.log(JSONStringify(array));
   =>'[12,null,[1,2,3],{a:1,b:2},"linwei",true]'
 */


if(!window.JSONStringify){
    var JSONStringify=(function(){
        "use strict";

        var str;     // The final result.

        // Check if it is a boolean value.
        var isBoolean=function(value){
            return typeof value==='boolean';
        };

        // Check if it is a number.
        var isNumber=function(value){
            return typeof value==='number'&&isFinite(value);
        };

        // Check if it is a string.
        var isString=function(value){
            return typeof value==='string';
        };

        // Check if it is a null value.
        var isNull=function(value){
            return typeof value==='object'&&value==undefined;
        };

        // Check if it is an object literal.
        var isObject=function(obj){
            var toString=Object.prototype.toString;
            return toString.apply(obj)==='[object Object]';
        };

        // Check if it is an array.
        var isArray=function(array){
            var toString=Object.prototype.toString;
            return toString.apply(array)==='[object Array]';
        };

        // Get the property name of all enumerable properties.
        var keys=function(obj){
            return Object.keys(obj);
        };

        // Splicing string.

        // Object.
        var objectToString=function(obj){
            var names=keys(obj);
            str+='{';
            for(var i=0;i<names.length;i+=1){
                str+='"';
                str+=names[i];
                str+='":';
                switch(true){
                    case isBoolean(obj[names[i]]):
                         booleanToString(obj[names[i]]);
                         break;
                    case isNumber(obj[names[i]]):
                         numberToString(obj[names[i]]);
                         break;
                    case isString(obj[names[i]]):
                         stringToString(obj[names[i]]);
                         break;
                    case isNull(obj[names[i]]):
                         nullToString();
                         break;
                    case isObject(obj[names[i]]):
                         objectToString(obj[names[i]]);
                         break;
                    case isArray(obj[names[i]]): 
                         arrayToString(obj[names[i]]);
                         break;
                    default:
                         throw new TypeError('This type is not supported by JSON.');                             
                }
                if(i!==names.length-1){
                    str+=',';
                }
            }
            str+='}';
        };

        // Array.
        var arrayToString=function(array){
            str+='[';
            for(var i=0;i<array.length;i+=1){
                switch(true){
                    case isBoolean(array[i]):
                         booleanToString(array[i]);
                         break;
                    case isNumber(array[i]):
                         numberToString(array[i]);
                         break;
                    case isString(array[i]):
                         stringToString(array[i]);
                         break;
                    case isNull(array[i]):
                         nullToString(array[i]);
                         break;
                    case isObject(array[i]):
                         objectToString(array[i]); 
                         break;
                    case isArray(array[i]):
                         arrayToString(array[i]);
                         break;
                    default:
                         throw new TypeError('This type is not supported by JSON.');                             
                }
                if(i!==array.length-1){
                    str+=',';
                }
            }
            str+=']';
        };

        // Boolean value.
        var booleanToString=function(value){
            str+=value?'true':'false';
        };

        // Number.
        var numberToString=function(value){
            str+=value.toString();
        };

        // String.
        var stringToString=function(value){
            str+='"'+value+'"';
        };

        // null
        var nullToString=function(){
            str+='null';
        };
        return function(obj){
            if(isObject(obj)||isArray(obj)){
                str='';
                if(isObject(obj)){
                    objectToString(obj);
                } else{
                    arrayToString(obj);
                }
            }
            return str;
        };
    })();
}