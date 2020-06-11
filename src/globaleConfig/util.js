
let eventList = {};
window.$on = function(onType,fn){
    if(!eventList[onType]){
        eventList[onType] = [];
    }
    eventList[onType].push(fn);
    //console.log(eventList)
}

window.$emit = function(emitType,data){
    //console.log(data)
    if(eventList[emitType]){
        eventList[emitType].forEach((fn)=>{
            fn.apply(this,[data]);
        })
    }
    
}

window.$off = function(offType,fn){
    if(eventList[offType]){
       delete eventList[offType];
    };
    if(fn){fn.apply(this,arguments)};
    //console.log(eventList)
}
