'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YamlWithImport = function () {
    function YamlWithImport(rootPath) {
        _classCallCheck(this, YamlWithImport);

        this.rootPath = rootPath;
    }

    _createClass(YamlWithImport, [{
        key: 'setRootPath',
        value: function setRootPath(rootPath) {
            this.rootPath = rootPath;
        }
    }, {
        key: 'getRootPath',
        value: function getRootPath() {
            return this.rootPath;
        }
        /**
         * @param fileName
         * @returns {Object}
         */

    }, {
        key: 'read',
        value: function read(fileName) {
            var _this = this;

            var json = _yamljs2.default.load(fileName);
            if (!!json && !!json.imports) {
                var importedFile = {};
                if (json.imports.length > 1) {
                    var tmp = {};
                    _lodash2.default.forEach(json.imports, function (yamlDoc) {
                        delete json.imports;
                        if (!!_this.rootPath) {
                            tmp = _this.read(_path2.default.resolve(_this.rootPath, yamlDoc.resource));
                        } else {
                            tmp = _this.read(yamlDoc.resource);
                        }

                        if (!!json && json != null) {
                            tmp = _lodash2.default.merge(json, tmp);
                        }
                    });
                    importedFile = tmp;
                } else {
                    if (!!this.rootPath) {
                        importedFile = this.read(_path2.default.resolve(this.rootPath, json.imports[0].resource));
                    } else {
                        importedFile = this.read(json.imports[0].resource);
                    }
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