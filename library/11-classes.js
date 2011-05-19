var ObjectMetaClass = function(cls) {

    this.__call__ = function() {
        var obj = new cls();
        obj.__init__.apply(obj, arguments);
        return obj;
    };

    this.__setattr__ = function(k, v) {
        this.prototype[k] = v;
    };

    this.__getattr__ = function(k) {
        return this.prototype[k];
    };

    this.__delattr__ = function(k) {
        delete this.prototype[k];
    };

    this.prototype = cls.prototype;
};

var object = function() {

    var x = function() { /* Class constructor */ };

    x.prototype.__init__ = function() {
    };

    x.prototype.__setattr__ = function(k, v) {
        this[k] = v;
    };

    x.prototype.__getattr__ = function(k) {
        return this[k];
    };

    x.prototype.__delattr__ = function(k) {
        delete this[k];
    };

    return new ObjectMetaClass(x);
}();

var __inherit = function(cls, name) {

    var x = function() { /* Class constructor */ };

    /* Inheritance from cls */
    for (var o in cls.prototype) {
        x.prototype[o] = cls.prototype[o];
    };

    /* Receive bacon */
    var res = new ObjectMetaClass(x);
    res.__name__ = name;
    res.prototype.__class__ = res;
    return res;
};
