"use strict";

const TsReader = require("../reader");
const TsDescriptorBase = require("./base");

class TsDescriptorLogoTransmission extends TsDescriptorBase {
    constructor(buffer) {
        super(buffer);
    }

    decode() {
        const reader = new TsReader(this._buffer);
        const objDescriptor = {};

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.logo_transmission_type = reader.uimsbf(8);

        if (objDescriptor.logo_transmission_type === 1) {
            reader.next(7);    // reserved_future_use
            objDescriptor.logo_id = reader.uimsbf(9);
            reader.next(4);    // reserved_future_use
            objDescriptor.logo_version = reader.uimsbf(12);
            objDescriptor.download_data_id = reader.uimsbf(16);
        } else if (objDescriptor.logo_transmission_type === 2) {
            reader.next(7);    // reserved_future_use
            objDescriptor.logo_id = reader.uimsbf(9);
        } else if (objDescriptor.logo_transmission_type === 3) {
            objDescriptor.logo = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        }

        return objDescriptor;
    }
}

module.exports = TsDescriptorLogoTransmission;
