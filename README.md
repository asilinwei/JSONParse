# JSONParse

LinWei   
2018-04-19  

There are two JavaScript files in this repository and each file has a function. The function named JSONParse is about the JSON text parsing to a real JavaScript object literal. And the function named JSONStringify is the opposite.
You can download it from this [JSONParse](https://github.com/linweinb/JSONParse.git).

You can use JSONParse.js to parse a JSON text. For example :  
```
console.log(JSONParse('{"key1":12,"key2":"linwei","key3":[1,2,3],"key4":{"num":36}}')); 
// => { key1:12, key2:"linwei", key3:[1,2,3], key4:{num:36} }

console.log(typeof JSONParse('{"key1":12,"key2":"linwei","key3":[1,2,3],"key4":{"num":36}}'));
// => object
```  
Also, it can process the white space like this :
```
console.log(JSONParse('   {   "key1"  :  12  ,  "key2"  :  "linwei"   }   '));
// => { key1:12, key2:"linwei" }

console.log(typeof JSONParse('   {   "key1"  :  12  ,  "key2"  :  "linwei"   }   '));
// => object
```


You can use JSONStringify.js to make an real object or array to the JSON string. For example :
```
var obj={
    key1:12,
    key2:null,
    key3:[1,2,3],
    key4:{a:1,b:2},
    key5:'linwei',
    key6:true
};

console.log(JSONStringify(obj)); 
// => '{"key1":12,"key2":null,"key3":[1,2,3],"key4":{"a":1,"b":2},"key5":"linwei","key6":true}'

var array=[ 12, null, [1,2,3], {a:1,b:2}, 'linwei', true ];

console.log(JSONStringify(array));
// => '[12,null,[1,2,3],{a:1,b:2},"linwei",true]'