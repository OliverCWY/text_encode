function encode(string,key){
	var key_=[];
	for(var i of Array.from(key))
		if(key_.indexOf(i)==-1)key_.push(i)
	key=key_;
	console.log(key);
	var system=key.length-1,encoded=key.join("");
	for(var i in string){
		var tmp=[],num=string.charCodeAt(i);
		while(num>0){
			tmp.unshift(num%system);
			num=Math.floor(num/system);
		}
		for(var j=0;j<tmp.length;j++){
			encoded+=key[tmp[j]]
		}
		encoded+=key[system];
	}
	return encoded;
}
function decode(string){
	var string_=[];
	for(var i of Array.from(string))string_.push(i);
	string=string_;
	var key_dict={},i=0,key="";
	while(i<string.length){
		if(key_dict[string[i]]!=undefined)break;
		key_dict[string[i]]=i;
		key+=string[i];
		i++;
	}
	var stop=string[i-1];
	var system=i-1,decoded="";
	while(i<string.length){
		var num=0;
		while(string[i]!=stop){
			num=num*system+key_dict[string[i]];
			i++;
		}
		decoded+=String.fromCodePoint(num);
		i++;
	}
	return {text:decoded,key:key};
}