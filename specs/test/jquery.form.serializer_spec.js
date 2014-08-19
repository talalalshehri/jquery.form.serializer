// Generated by CoffeeScript 1.7.1
(function() {
  describe('jquery.form.serializer', function() {
    beforeEach(function() {
      return this.sandbox = sinon.sandbox.create();
    });
    afterEach(function() {
      return this.sandbox.restore();
    });
    it('should define a jQuery function named getSerializedForm', function() {
      return expect($()).to.respondTo('getSerializedForm');
    });
    return describe('.getSerializedForm()', function() {
      it('should create an instance of Serializer passing the first form in the matching set', function() {
        var $forms, form1, form2;
        this.sandbox.spy($._jQueryFormSerializer, 'Serializer');
        this.sandbox.stub($._jQueryFormSerializer.Serializer.prototype, "toJSON");
        form1 = $("<form/>").get(0);
        form2 = $("<form/>").get(0);
        $forms = $();
        $forms = $forms.add(form1);
        $forms = $forms.add(form2);
        $forms.getSerializedForm();
        expect($._jQueryFormSerializer.Serializer).to.have.been.calledOnce;
        return expect($._jQueryFormSerializer.Serializer.getCall(0).args[0].get(0)).to.eq(form1);
      });
      return it('should return the toJSON function response', function() {
        this.sandbox.stub($._jQueryFormSerializer.Serializer.prototype, "toJSON").returns("test response");
        return expect($().getSerializedForm()).to.eql("test response");
      });
    });
  });

}).call(this);
