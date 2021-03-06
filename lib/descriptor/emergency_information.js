"use strict";

const TsReader = require("../reader");
const TsDescriptorBase = require("./base");

class TsDescriptorEmergencyInformation extends TsDescriptorBase {
    constructor(buffer) {
        super(buffer);
    }

    decode() {
        const reader = new TsReader(this._buffer);
        const objDescriptor = {};

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.services = [];

        for (const l = 2 + objDescriptor.descriptor_length; reader.position >> 3 < l; ) {
            const service = {};

            service.service_id = reader.uimsbf(16);
            service.start_end_flag = reader.bslbf(1);
            service.signal_level = reader.bslbf(1);
            reader.next(6);    // reserved_future_use
            service.area_code_length = reader.uimsbf(8);
            service.area_codes = [];

            for (const length = (reader.position >> 3) + service.area_code_length; reader.position >> 3 < length; ) {
                const area_code = {};

                area_code.area_code = reader.bslbf(12);
                reader.next(4);    // reserved_future_use

                service.area_codes.push(area_code);
            }

            objDescriptor.services.push(service);
        }

        return objDescriptor;
    }
}

module.exports = TsDescriptorEmergencyInformation;
