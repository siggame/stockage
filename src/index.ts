import { isNil } from "lodash";
import * as fse from "fs-extra";
import * as crypto from "crypto";
import * as os from "os";
import * as path from "path";

/**
 * API for interacting wtih any Stockage implementation
 */
export abstract class StockageApi {
    /**
     * Read data as a string
     * @param id
     */
    abstract read(id: string): Promise<string>;

    /**
     * Read data as a Buffer
     * @param id 
     */
    abstract readBuffer(id: string): Promise<Buffer>;

    /**
     * Read data as JSON
     * @param id 
     */
    abstract readJSON(id: string): Promise<any>;

    /**
     * Write a string
     * @param data 
     */
    abstract write(data: string): Promise<string>;

    /**
     * Write a buffer
     * @param data 
     */
    abstract writeBuffer(data: Buffer): Promise<string>;

    /**
     * Write JSON
     * @param data 
     */
    abstract writeJSON(data: any): Promise<string>;
}
    

/**
 * Implements the Stockage API on the host's local file system.
 */
export class LocalStockage extends StockageApi {
    private _dir: string

    constructor(dir?: string) {
        super();

        if(isNil(dir)) {
            this._dir = path.join(os.tmpdir(), "stockage");
        } else {
            this._dir = dir;
        }
    }

    /**
     * Gets the directory where files are being stored
     */
    get dir(): string {
        return this._dir;
    }

    async read(id: string): Promise<string> {
        const data = await this.readBuffer(id); 
        return data.toString();
    }

    async readBuffer(id: string): Promise<Buffer> {
        const filePath = path.join(this._dir, id);
        return fse.readFile(filePath);
    }

    async readJSON(id: string): Promise<any> {
        const data = await this.read(id);
        return JSON.parse(data);
    }

    async write(data: string): Promise<string> {
        const b = Buffer.from(data);
        return this.writeBuffer(b);
    }

    async writeBuffer(data: Buffer): Promise<string> {
        const hash = crypto.createHash("sha256");
        hash.update(data);
        const id = hash.digest("hex");
        const filePath = path.join(this._dir, id);
        await fse.outputFile(filePath, data);
        return id;
    }

    async writeJSON(data: any): Promise<string> {
        const t = JSON.stringify(data);
        return this.write(t);
    }
}