"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fse = require("fs-extra");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
/**
 * API for interacting wtih any Stockage implementation
 */
class StockageApi {
}
exports.StockageApi = StockageApi;
/**
 * Implements the Stockage API on the host's local file system.
 */
class LocalStockage extends StockageApi {
    constructor(dir) {
        super();
        if (lodash_1.isNil(dir)) {
            this._dir = path.join(os.tmpdir(), "stockage");
        }
        else {
            this._dir = dir;
        }
    }
    /**
     * Gets the directory where files are being stored
     */
    get dir() {
        return this._dir;
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.readBuffer(id);
            return data.toString();
        });
    }
    readBuffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(this._dir, id);
            return fse.readFile(filePath);
        });
    }
    readJSON(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.read(id);
            return JSON.parse(data);
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const b = Buffer.from(data);
            return this.writeBuffer(b);
        });
    }
    writeBuffer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = crypto.createHash("sha256");
            hash.update(data);
            const id = hash.digest("hex");
            const filePath = path.join(this._dir, id);
            yield fse.outputFile(filePath, data);
            return id;
        });
    }
    writeJSON(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = JSON.stringify(data);
            return this.write(t);
        });
    }
}
exports.LocalStockage = LocalStockage;
