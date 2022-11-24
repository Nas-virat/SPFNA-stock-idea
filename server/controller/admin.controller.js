const Announce = require("../model/Announce");

// // GET all Publish announces
// // Page: Home Page
const getAllPublishAnnounces = async (req, res) => {
    try {
        const announces = await Announce.find({ status: "publish" }).sort({ date: -1 });
        res.json({
            success: true,
            count: announces.length,
            announces: announces,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // GET all Draft announces
// // Page: Admin control Page
const getAllDraftAnnounces = async (req, res) => {
    try {
        const draft = await Announce.find({ status: "draft" }).sort({ date: -1 });
        res.json({
            success: true,
            count: draft.length,
            draft: draft,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // Add a new announce
// // Page: Admin control Page
const addAnnounce = async (req, res) => {
    const { title, details, status } = req.body;
    const announce = await Announce.findOne({ title })
    if (announce && announce.title === title) {
        res.json({success:false,message: "Title already exists"});
    }
    else {
        const newAnnounce = await Announce.create({
            title,
            details,
            status,
            date: Date.now(),
        });
        res.json({ success: true, message: "Announce created successfully" });
    }
}

// // get draft announce by id
// // Page: Admin control Page
const getDraftAnnounceById = async (req, res) => {
    try {
        const draft = await Announce.findById(req.params.id);
        res.json({
            success: true,
            draft: draft,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // Update an announce
// // Page: Admin control Page
const updateDraftAnnounceById = async (req, res) => {
    const { title, details, status, announceID } = req.body;
    const announce = await Announce.findById(announceID);
    announce.title = title;
    announce.details = details;
    announce.status = status;
    announce.date = Date.now();
    await announce.save();
    res.json({ success: true, message: "Announce updated successfully" });
}


module.exports = {
    getAllPublishAnnounces,
    getAllDraftAnnounces,
    addAnnounce,
    getDraftAnnounceById,
    updateDraftAnnounceById
};
