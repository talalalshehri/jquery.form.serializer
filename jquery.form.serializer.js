// Generated by CoffeeScript 1.7.1

/*
 * jquery.form.serializer
 *
 * @copyright 2014, Rodrigo Díaz V. <rdiazv89@gmail.com>
 * @link https://github.com/rdiazv/jquery.form.serializer
 * @license MIT
 * @version 1.1.0
 */

(function() {
  (function($) {

    /*
     * About the "name" attribute
     * http://www.w3.org/TR/html4/types.html#h-6.2
     */
    var Serializer, castings, regexp, submittable;
    regexp = {
      simple: /^[a-z][\w-:\.]*$/i,
      array: /^([a-z][\w-:\.]*)\[(.*\])$/i
    };
    submittable = {
      selector: 'input, select, textarea',
      filters: {
        enabled: function() {
          return $(this).is(":not(:disabled)");
        },
        checked: function() {
          if ($(this).is(":checkbox, :radio")) {
            return $(this).is(":checked");
          } else {
            return true;
          }
        }
      }
    };
    castings = {
      booleanCheckbox: function() {
        if ($(this).is(":checkbox") && !$(this).attr("value")) {
          return $(this).prop("checked");
        }
      }
    };
    Serializer = (function() {
      function Serializer($this) {
        this.$this = $this;
        this.arrays = {};
      }

      Serializer.prototype.serializeField = function(name, value, fullName) {
        var cleanName, matches, response, _base;
        if (fullName == null) {
          fullName = name;
        }
        response = {};
        if (regexp.simple.test(name)) {
          response[name] = value;
        } else if (matches = name.match(regexp.array)) {
          cleanName = matches[2].replace("]", "");
          if (cleanName === "") {
            if ((_base = this.arrays)[fullName] == null) {
              _base[fullName] = [];
            }
            this.arrays[fullName].push(value);
            response[matches[1]] = this.arrays[fullName];
          } else {
            response[matches[1]] = this.serializeField(cleanName, value, name);
          }
        }
        return response;
      };

      Serializer.prototype.getSubmittableFieldValues = function(options) {
        var $submittable, fields, filter, _, _ref;
        options = $.extend(true, {}, {
          submittable: submittable,
          castings: castings
        }, options);
        fields = [];
        $submittable = this.$this.find(options.submittable.selector).filter(":not(:button, :submit, :file, :reset, :image)[name]");
        _ref = options.submittable.filters;
        for (_ in _ref) {
          filter = _ref[_];
          if (filter === false || (filter == null)) {
            continue;
          }
          $submittable = $submittable.filter(filter);
        }
        $submittable.each(function() {
          var castedValue, casting, name, value, _ref1;
          name = $(this).attr('name');
          if ($(this).is(":checkbox") && !$(this).attr("value")) {
            value = $(this).prop("checked") ? "on" : "off";
          } else {
            value = $(this).val();
          }
          _ref1 = options.castings;
          for (_ in _ref1) {
            casting = _ref1[_];
            if (casting === false || (casting == null)) {
              continue;
            }
            castedValue = casting.apply(this);
            if (castedValue != null) {
              value = castedValue;
              break;
            }
          }
          return fields.push({
            name: name,
            value: value
          });
        });
        return fields;
      };

      Serializer.prototype.serialize = function(options) {
        var field, fields, values, _i, _len;
        if (options == null) {
          options = {};
        }
        values = {};
        fields = this.getSubmittableFieldValues(options);
        for (_i = 0, _len = fields.length; _i < _len; _i++) {
          field = fields[_i];
          $.extend(true, values, this.serializeField(field.name, field.value));
        }
        return values;
      };

      return Serializer;

    })();
    $.fn.getSerializedForm = function(options) {
      if (options == null) {
        options = {};
      }
      return new $.fn.getSerializedForm.Serializer(this.first()).serialize(options);
    };
    $.fn.getSerializedForm.regexp = regexp;
    $.fn.getSerializedForm.submittable = submittable;
    $.fn.getSerializedForm.castings = castings;
    return $.fn.getSerializedForm.Serializer = Serializer;
  })(jQuery);

}).call(this);
