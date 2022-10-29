const Announce = require("../model/Announce");


// // GET all announces
// // Page: Home Page
const getAllAnnounces = async (req, res) => {
    try {
        const announces = await Announce.find();
        res.json(announces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // Add a new announce
// // Page: Admin control Page
const addAnnounce = async (req, res) => {
    const { title, details, status } = req.body;
    const newAnnounce = await Announce.create({
        title,
        details,
        status
    });
    res.json({ success: true, message: "Announce created successfully" });
}

// // update status announce
// // Page: Admin control Page
const updateStatus = async (req, res) => {
    const { status } = req.body;
    const announce = await Announce.findById(req.params.id);
    announce.status = status;
    await announce.save();
    res.json({ success: true, message: "Announce updated successfully" });
}


module.exports = {
    getAllAnnounces,
    addAnnounce,
    updateStatus
};
