function vector(data, offset){
	this.arr = data;
	this.offset = offset;

	var self = this;

	this.at = function(idx){
		idx += self.offset;
		if(0 <= idx && idx < self.arr.length){
			return self.arr[idx];
		}else{
			return 0;
		}
	}

	this.scalarMultiplication = function(k){
		var newArr = Array(this.arr.length);
		for(var i = 0; i < self.arr.length; ++i){
			newArr[i] = k * self.arr[i];
		}
		return new vector(newArr, self.offset);
	}

	this.add = function(v){
		var start = Math.min(-self.offset, -v.offset);
		var end = Math.max(self.arr.length - 1 - self.offset, v.arr.length - 1 - v.offset);
		var newOffset = -start;
		var newArr = Array(end - start + 1);
		for(var i = start; i <= end; ++i){
			newArr[i + newOffset] = self.at(i) + v.at(i);
		}
		return new vector(newArr, newOffset);
	}

	this.subtract = function(v){
		return self.add(v.scalarMultiplication(-1));
	}

	this.pointwiseMultiplication = function(v){
		var start = Math.min(-self.offset, -v.offset);
		var end = Math.max(self.arr.length - 1 - self.offset, v.arr.length - 1 - v.offset);
		var newOffset = -start;
		var newArr = Array(end - start + 1);
		for(var i = start; i <= end; ++i){
			newArr[i + newOffset] = self.at(i) * v.at(i);
		}
		return new vector(newArr, newOffset);
	}

	//move k units to the right
	this.move = function(k){
		return new vector(self.arr.slice(), self.offset - k);
	}

	this.reflect = function(){
		return new vector(self.arr.slice().reverse(), self.arr.length - 1 - self.offset);
	}

	this.decimate = function(k){
		var a = -self.offset;
		var b = self.arr.length - 1 - self.offset;
		var newArr = Array(Math.floor(b / k) - Math.floor((a - 1) / k));
		var start = k * Math.ceil(a / k);
		var end = k * Math.floor(b / k);
		var cnt = 0;
		for(var i = start; i <= end; i += k){
			newArr[cnt++] = self.at(i);
		}
		return new vector(newArr, -start / k);
	}

	this.interpolate = function(k){
		var start = -self.offset;
		var end = self.arr.length - 1 - self.offset;
		var newArr = Array(k * self.arr.length);
		var cnt = 0;
		for(var i = start; i <= end; ++i){
			var delta = (self.at(i + 1) - self.at(i)) / k;
			for(var j = 0; j < k; ++j){
				newArr[cnt++] = self.at(i) + j * delta;
			}
		}
		return new vector(newArr, -start * k);
	}

	this.convolution = function(v){
		var newArr = Array(self.arr.length + v.arr.length - 1);
		for(var i = 0; i < newArr.length; ++i){
			newArr[i] = 0;
		}
		for(var i = 0; i < self.arr.length; ++i){
			for(var j = 0; j < v.arr.length; ++j){
				newArr[i + j] += self.arr[i] * v.arr[j];
			}
		}
		return new vector(newArr, self.offset + v.offset);
	}
}