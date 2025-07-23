"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var node_fetch_1 = require("node-fetch");
var admin = require("firebase-admin");
// Load Firebase Admin credentials from env
var projectId = process.env.FIREBASE_PROJECT_ID;
var clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
var privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey && privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n');
}
if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in environment');
}
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({ projectId: projectId, clientEmail: clientEmail, privateKey: privateKey }),
    });
}
var db = admin.firestore();
// Printful API
var PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
var PRINTFUL_PRODUCT_ID = process.env.PRINTFUL_PRODUCT_ID; // Set this in your .env
if (!PRINTFUL_API_KEY || !PRINTFUL_PRODUCT_ID) {
    throw new Error('Missing PRINTFUL_API_KEY or PRINTFUL_PRODUCT_ID in environment');
}
function fetchPrintfulProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("https://api.printful.com/products/".concat(productId), {
                        headers: { Authorization: "Bearer ".concat(PRINTFUL_API_KEY) },
                    })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Printful API error: ".concat(res.status));
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var result, variantImages, _i, _a, variant, color, defaultImage, productsRef, snapshot, docRef;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetchPrintfulProduct(PRINTFUL_PRODUCT_ID)];
                case 1:
                    result = (_c.sent()).result;
                    variantImages = {};
                    for (_i = 0, _a = result.variants; _i < _a.length; _i++) {
                        variant = _a[_i];
                        color = variant.color;
                        if (color && variant.files && ((_b = variant.files[0]) === null || _b === void 0 ? void 0 : _b.preview_url)) {
                            // Use the first file's preview_url for the color
                            if (!variantImages[color]) {
                                variantImages[color] = variant.files[0].preview_url;
                            }
                        }
                    }
                    defaultImage = Object.values(variantImages)[0] || '';
                    productsRef = db.collection('products');
                    return [4 /*yield*/, productsRef.where('category', '==', 'tees').get()];
                case 2:
                    snapshot = _c.sent();
                    if (snapshot.empty)
                        throw new Error('No tee product found in Firestore');
                    docRef = snapshot.docs[0].ref;
                    return [4 /*yield*/, docRef.update({
                            imagesByColor: variantImages,
                            imageUrl: defaultImage,
                            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                        })];
                case 3:
                    _c.sent();
                    console.log('✅ Synced Printful images to Firestore product:', variantImages);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
    process.exit(1);
});
