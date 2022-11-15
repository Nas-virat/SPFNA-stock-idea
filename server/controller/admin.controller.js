const Announce = require("../model/Announce");
const ErrorHandler = require("../utils/errorHandler");

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
        return next(new ErrorHandler("Title already exists", 401));
    }
    const newAnnounce = await Announce.create({
        title,
        details,
        status,
        date: Date.now(),
    });
    res.json({ success: true, message: "Announce created successfully" });
}

// // update status announce
// // Page: Admin control Page
const updateStatus = async (req, res) => {
    const { announceId } = req.body;
    const announce = await Announce.findById(announceId);
    announce.status = 'publish';
    announce.date = Date.now();
    await announce.save();
    res.json({ success: true, message: "Announce updated successfully" });
}


module.exports = {
    getAllPublishAnnounces,
    getAllDraftAnnounces,
    addAnnounce,
    updateStatus
};
