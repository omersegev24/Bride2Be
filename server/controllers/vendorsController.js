const Vendor = require("../models/Vendor");

exports.vendorsController = {
    async getAllVendors(req, res) {
        try {
            const vendors = await Vendor.find({});
            res.json(vendors);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch vendors", error });
        }
    },
};
