function DOSCG() {
    this.missing_list = [];
    this.a = 0
    this.ans_b = 0
    this.ans_c = 0
}

DOSCG.prototype.setMissingList = function(missing_list) {
    this.missing_list = missing_list;
};

DOSCG.prototype.setAnswer = function(a,ans_b,ans_c) {
    this.a = a;
    this.ans_b = ans_b;
    this.ans_c = ans_c;
};

DOSCG.prototype.getXYZ = function() {
    for (var i = 0; i < this.missing_list.length; i++) {
        // var obj = myArray[i]
        if (this.missing_list[i] == ''){
            this.missing_list[i] = (Math.pow(i, 2)-i)+3
        }
    }
    return this.missing_list
};

DOSCG.prototype.getBC = function() {
    var b = this.ans_b-this.a
    var c = this.ans_c-this.a
    return {'b':b,'c':c}
};

module.exports = DOSCG;