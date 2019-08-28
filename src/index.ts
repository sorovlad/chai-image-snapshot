import { toMatchImageSnapshot } from "jest-image-snapshot";
import { SnapshotState } from "jest-snapshot";
import path from "path";

declare global {
    namespace Chai {                // tslint:disable-line:no-namespace
        interface Assertion {
            displayed: Assertion;
            present: Assertion;
            enabled: Assertion;
            selected: Assertion;
            text(text: string): Assertion;
        }

        interface PromisedAssertion {
            displayed: PromisedAssertion;
            present: PromisedAssertion;
            enabled: PromisedAssertion;
            selected: PromisedAssertion;
            text(text: string): PromisedAssertion;
        }
    }
}


export default function chaiImageSnapshot(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
    console.log("add to chai")
    chai.Assertion.addMethod("matchImageSnapshot", matchImageSnapshot);
}

function matchImageSnapshot(assertion: Chai.AssertionStatic, ...args: any[]): void {
    // console.log("message", this);
    // const { snapshotFilename, snapshotName, update, ci } = parseArgs(args);

    const snapshotName = "snapshotName";
    const absolutePathToSnapshot = path.join(__dirname, "../test", "filename");
    
    // console.log("this", this.__flags);
    const ci = false;
    const update = process.argv.includes("-u");
    
    const jestThis = {
        testPath: "./testpath",
        currentTestName: "./testname",
        isNot: false,
        snapshotState: new SnapshotState(absolutePathToSnapshot, {
            updateSnapshot: ci ? "none" : (update ? "all" : "new"),
            getBabelTraverse: () => require('@babel/traverse').default,
            getPrettier: () => null,
            // expand?: boolean;
          }),
    }


    const options = {
        customSnapshotIdentifier: '',
        customSnapshotsDir: commonCustomSnapshotsDir,
        customDiffDir: commonCustomDiffDir,
        diffDirection: commonDiffDirection,
        customDiffConfig: {},
        noColors: commonNoColors,
        failureThreshold: commonFailureThreshold,
        failureThresholdType: commonFailureThresholdType,
        updatePassedSnapsho: commonUpdatePassedSnapshot,
    };

    const { message,pass }=  toMatchImageSnapshot.call(jestThis, this.__flags.object, options);
    console.log("message", this.__flags.object);

    this.assert(
      pass,
      `expected value to match snapshot ${snapshotName}`,
      `expected value to not match snapshot ${snapshotName}`,
      `expected.trim()`,
      `actual.trim()`,
      true
    );
};

// function getCounters() {
//     return {
//         data: {},
//         set(testName: string, count: number) {
//             this.data[testName] = count;
//             return this;
//         },
//         get(testName: string) {
//             return this.data[testName];
//         }
//     }
// }