# Containerizer
### Nick Freese
-------------------------------

## Usage
-------------------

```

var myApp = containerizer('myApp');


myApp.injectApp('div'); //adds the app to all div elements

/* count to 100 in all instances */
myApp.applyAll(function(e){
	var i = 0;
    var interval = setInterval(function(){
    	e.innerHTML = i;
    	i++
    	if(i >= 100){
         clearInterval(interval);
    	}
    }, 500);
});

```

