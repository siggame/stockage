import * as chai from "chai";
import { expect } from "chai";
import * as stockage from "../../src";

describe("LocalStockage", function() {

    it("should be constructable", async() => {
        const stock = new stockage.LocalStockage();
        expect(stock.dir).to.exist;
    });

    it("should be able to provide a custom directory", async() => {
        const stock = new stockage.LocalStockage("TMP_STOCKAGE");
        expect(stock.dir).to.exist;
    });

    it("should be able to read/write a file given a string", async() => {
        const TEST_STRING = randomString();

        const stock = new stockage.LocalStockage();
        const id = await stock.write(TEST_STRING);
        const data = await stock.read(id);
        expect(data).deep.equals(TEST_STRING);
    });

    it("should be able to read/write a file given a buffer", async() => {
        const TEST_BUFFER = Buffer.from(randomString());

        const stock = new stockage.LocalStockage();
        const id = await stock.writeBuffer(TEST_BUFFER);
        const data = await stock.readBuffer(id);
        expect(data).deep.equals(TEST_BUFFER);
    });

    it("should be able to read/write a file given a JSON", async() => {
        const TEST_JSON = {
            a: randomString(),
            b: randomString()
        };

        const stock = new stockage.LocalStockage();
        const id = await stock.writeJSON(TEST_JSON);
        const data = await stock.readJSON(id);
        expect(data).deep.equals(TEST_JSON);
    });

    it("should fail to read a file if it doesnt exist", async() => {
        const stock = new stockage.LocalStockage();
        const id = randomString();
        try {
            const data = await stock.readJSON(id);
            chai.assert("Expected error.");
        } catch(e) {
            expect(e).is.not.instanceOf(chai.AssertionError);
        }
    });
});

function randomString(): string {
    return Math.random().toString();
}