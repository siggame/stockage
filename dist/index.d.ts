/// <reference types="node" />
/**
 * API for interacting wtih any Stockage implementation
 */
export declare abstract class StockageApi {
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
export declare class LocalStockage extends StockageApi {
    private _dir;
    constructor(dir?: string);
    /**
     * Gets the directory where files are being stored
     */
    readonly dir: string;
    read(id: string): Promise<string>;
    readBuffer(id: string): Promise<Buffer>;
    readJSON(id: string): Promise<any>;
    write(data: string): Promise<string>;
    writeBuffer(data: Buffer): Promise<string>;
    writeJSON(data: any): Promise<string>;
}
