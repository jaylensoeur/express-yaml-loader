'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YamlWithImport = function () {
    function YamlWithImport() {
        _classCallCheck(this, YamlWithImport);
    }

    _createClass(YamlWithImport, [{
        key: 'read',


        /**
         * @param fileName
         * @returns {Object}
         */
        value: function read(fileName) {
            var json = _yamljs2.default.load(fileName);
            if (!!json && !!json.imports) {
                var importedFile = {};
                if (json.imports.length > 1) {
                    (function () {
                        var tmp = {};
                        _lodash2.default.forEach(json.imports, function (yamlDoc) {
                            delete json.imports;
                            tmp = _yamljs2.default.load(yamlDoc.resource);
                            if (!!json && json != null) {
                                tmp = _lodash2.default.merge(json, tmp);
                            }
                        });
                        importedFile = tmp;
                    })();
                } else {
                    importedFile = this.read(json.imports[0].resource);
                    if (!!importedFile) {
                        delete json.imports;
                        importedFile = _lodash2.default.merge(importedFile, json);
                    }
                }

                return importedFile;
            }

            return json;
        }
    }]);

    return YamlWithImport;
}();

exports.default = YamlWithImport;