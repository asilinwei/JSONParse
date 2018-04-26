/*
 * JSONParse.js
   @LinWei
   2018-04-18

   This is a function of JSON parser.
   You can use it like native JSON.parse in JavaScript.

   For example:

   console.log(JSONParse('{"key1":12,"key2":"linwei","key3":[1,2,3],"key4":{"num":36}}'));

   => { key1:12, key2:"linwei", key3:[1,2,3], key4:{num:36} }

   Also,it can process the white space like this:

   console.log(JSONParse('   {   "key1"  :  12  ,  "key2"  :  "linwei"   }   '));

   => { key1:12, key2:"linwei" }
 */  
  

var JSONParse=(function(){
    "use strict";

    var ch;        // The current character.
    var at;        // The index of character.
    var text;      // The JSON text.
    var result;    // The result of parsing.
    

    var parseValue=function(){
    
    // Parse a JSON value.
    // It could be a object, an array, a number, a string, a boolean value and a null value.

        blank();
        switch(true){
            case ch==='{':
                 return object();
            case ch==='[':
                 return array();
            case /[0-9+.-]/.test(ch):
                 return number();
            case ch==='\"':
                 return string();
            case ch==='t'||ch==='f':
                 return boolean();
            case ch==='n':
                 return parseNull();     
            default:
                 throw new TypeError('The type of value is error.');                          
        }
    };

    var next=function(c){

        // Eat a character.
        // If a c parameter is provided, check if it matches the current character.

        if(c&&c!==ch){
            if(ch==='u'){
                throw new TypeError('Cannot receive function.');
            } else{
                throw new Error('Cannot match.');
            }
        }
        ch=text.charAt(at);
        at+=1;
        return ch;
    };

    var blank=function(){

        // Process the control character whilch is in ASCII.
        // All entires in the ACSII table below code 32(the ASCII code of ' ') are of this kind.

        while(ch&&ch<=' '){
            next();
        }
    };

    var object=function(){

        // Parse a object.

        var key;
        var obj={};
        next();
        blank();
        if(ch==='}'){
            next('}');
            return obj;
        }
        while(ch){
            key='';
            next('\"');   
            while(ch!=='\"'){
                key+=ch;
                next();
            }
            next('\"');
            blank();
            next(':');
            blank();
            obj[key]=parseValue();
            blank();
            if(ch==='}'){
                next('}');
                return obj;
            }
            next(',');
            blank();
        }
    };

    var array=function(){

        // Parse an array.

        var arr=[];
        while(ch!==']'){
            next();
            blank();
            if(ch===']'){
                next(']');
                return arr;
            }
            if(ch!==','){
                arr.push(parseValue());
            }
            blank();
        }
        if(ch===']'){
            next(']');
            return arr;
        }    
        next(',');
    };

    var number=function(){

        // Parse a number.

        var value='';
        var num;
        while(/[0-9+.-]/.test(ch)){
            value+=ch;
            next();
        }
        num= +value;  
        return num;
    };

    var string=function(){

        // Parse a string.

        var value='';
        next();
        while(ch!=='\"'){
            value+=ch;
            next();
        }
        if(ch==='\"'){
            next('\"');
            return value;
        }
    };

    var boolean=function(){

        // Parse a boolean value.

        switch(ch){
            case 't':
                 next('t');
                 next('r');
                 next('u');
                 next('e');
                 return true;
            case 'f':
                 next('f');
                 next('a');
                 next('l');
                 next('s');
                 next('e'); 
                 return false;     
        }
    };

    var parseNull=function(){

        // Parse a null value.

        next('n');
        next('u');
        next('l');
        next('l');
        return null;
    };

    // Return a function which parse a JSON text.

    return function(sourse){
        if(typeof sourse==='string'){
            at=0;
            ch=' ';
            text=sourse;
            next();
            result=parseValue();
            blank();
            if(ch){
                throw new SyntaxError('JSON syntax error.');
            }
        } else{
            throw new TypeError('The argument is not a JSON string.');
        }
        return result;
    };
})();


var JSONStringify=(function(){
    var str;
    var isBoolean=function(value){
        return typeof value==='boolean';
    };
    var isNumber=function(value){
        return typeof value==='number'&&isFinite(value);
    };
    var isString=function(value){
        return typeof value==='string';
    };
    var isNull=function(value){
        return typeof value==='object'&&value==undefined;
    };
    var isObject=function(obj){
        var toString=Object.prototype.toString;
        return toString.apply(obj)==='[object Object]';
    };
    var isArray=function(array){
        var toString=Object.prototype.toString;
        return toString.apply(array)==='[object Array]';
    };
    var keys=function(obj){
        return Object.keys(obj);
    };
    var objectToString=function(obj){
        var names=keys(obj);
        str+='{';
        for(var i=0;i<names.length;i+=1){
            str+='"';
            str+=names[i];
            str+='":';
            // 处理属性值
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
    var booleanToString=function(value){
        str+=value?'true':'false';
    };
    var numberToString=function(value){
        str+=value.toString();
    };
    var stringToString=function(value){
        str+='"'+value+'"';
    };
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