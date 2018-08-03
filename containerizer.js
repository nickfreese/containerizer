/*
* Containerizer - Same data, many views.  Fantastic for containerization off apps with multiple views driven from the same dataset.
*
* - Creates basic globally accesible shells for app functionaility.  Conterizer apps can be deployed to multiple areas in the some dom and be updated together or independantly
*/
var containerizer = function(namespace){
	
	var containerizer = {

        init: function(namespace){

        	var _this = this;

        	

        	_this.id = namespace;
        	_this.domContainer = document.createElement('div');
        	_this.domContainer.className = namespace + " containerizer";
            
            window[namespace] = _this;
        	return _this;
        },

        injectApp: function(query){

        	var _this = this;
            if(typeof _this.appLocations == "undefined"){
                _this.appLocations = [];
            }
            var queryResult = document.querySelectorAll(query);
            if(queryResult.length > 0){
                if(queryResult.length == 1){
                	var clone = _this.domContainer.cloneNode(true);
                	_this.appLocations.push(clone);
                    queryResult[0].appendChild(clone);
                } else if (queryResult.length > 1){
                    
                	for(let i = 0; i < queryResult.length; i++){
                		var clone = _this.domContainer.cloneNode(true);
                        _this.appLocations.push(clone);

                        queryResult[i].appendChild(clone);
                        queryResult[i].getElementsByClassName(_this.id)[0].setAttribute('data-containerizer-group-id', _this.id+"_"+i);
                	}

                }
            }

        },

        apply: function(elem, func){

        	var _this = this;

            return func(elem);
      
        },

        applyFirst: function(func){
        	var _this = this;
            var app = _this.appLocations[0];
        	return _this.apply(_this.appLocations[0], func);
        
        },

        applyByGroupId: function(id, func){

        	var _this = this;
        	var elem = querySelectorAll("[data-containerizer-group-id="+id+"]");
        	return _this.apply(elem[0], func);

        },

        applyAll: function(func){

        	var _this = this;
        	var results = [];
        	for(var i = 0; i < _this.appLocations.length; i++){
        		var app = _this.appLocations[i];
                results.push(_this.apply(app, func));
        	}
        	return results;
        },




        

	};

	return containerizer.init(namespace);
        
};