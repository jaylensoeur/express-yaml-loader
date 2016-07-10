import yaml from 'yamljs';
import _ from 'lodash';

class YamlWithImport {

    /**
     * @param fileName
     * @returns {Object}
     */
    read(fileName) {
        let json = yaml.load(fileName);
        if (!!json && !!(json.imports)) {
            let importedFile = {};
            if (json.imports.length > 1) {
                let tmp = {};
                _.forEach(json.imports, (yamlDoc) => {
                    delete json.imports;
                    tmp = yaml.load(yamlDoc.resource);
                    if (!!json && json != null) {
                        tmp = _.merge(json, tmp);
                    }
                });
                importedFile = tmp;
            } else {
                importedFile = this.read(json.imports[0].resource);
                if (!!importedFile) {
                    delete json.imports;
                    importedFile =  _.merge(importedFile, json);
                }
            }

            return importedFile;
        }

        return json;
    }
}

export default YamlWithImport;
