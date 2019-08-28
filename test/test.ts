import chaiImageSnapshot from "../src/index";
import chai, { expect } from "chai";
import * as fs from "fs";
import * as util from "util";

// declare namespace Chai 
// {
//     interface Assertion {
//         // matchImageSnapshot: Assertion;
//         matchImageSnapshot(): Assertion;
//     }
// }

const readFile = util.promisify(fs.readFile);

chai.use(chaiImageSnapshot);

describe('Hello function', () => {
    this.update = true;
    it('should return hello world', async () => {
        const file = await readFile("./test/resources/test.png");

        expect(file).to.matchImageSnapshot()
        // expect(file).matchImageSnapshot();
    });
});
