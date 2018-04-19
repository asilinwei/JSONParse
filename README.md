# JSONParse

LinWei   
2018-04-19     
This is a function which is about the JSON text parsing to a real JavaScript object literal.
You can download it from this [JSONParse](https://github.com/linweinb/JSONParse.git).

You can use JSONParse.js to parse a JSON text. For example :  
```
console.log(JSONParse('{"key1":12,"key2":"linwei","key3":[1,2,3],"key4":{"num":36}}')); 
=> { key1:12, key2:"linwei", key3:[1,2,3], key4:{num:36} }

console.log(typeof JSONParse('{"key1":12,"key2":"linwei","key3":[1,2,3],"key4":{"num":36}}'));
=> object
```  
Also, it can process the white space like this :
```
console.log(JSONParse('   {   "key1"  :  12  ,  "key2"  :  "linwei"   }   '));
=> { key1:12, key2:"linwei" }

console.log(typeof JSONParse('   {   "key1"  :  12  ,  "key2"  :  "linwei"   }   '));
=> object
```
