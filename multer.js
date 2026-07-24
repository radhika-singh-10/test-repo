import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const original = typeof file.originalname === "string" ? file.originalname : "";
        // Derive the extension from the base name only, so any directory
        // components (e.g. "../") in the original name are discarded.
        const ext = path.extname(path.basename(original));
        // Never trust the client-supplied name for the on-disk filename:
        // generate a random, path-separator-free name to prevent traversal.
        const safeName = crypto.randomBytes(16).toString("hex") + ext;
        callback(null, safeName)
    }
});

const upload = multer({ storage })

export default upload