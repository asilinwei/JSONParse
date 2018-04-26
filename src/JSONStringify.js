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