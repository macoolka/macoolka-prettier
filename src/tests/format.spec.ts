import { format, monadFormat } from '../format'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as MN from 'macoolka-app/lib/MonadNode'
describe('format', () => {

    it('typescript', () => {
        const tsx = readFileSync(resolve(__dirname, 'formats', 'Modal.tsx'), { encoding: 'utf8' });
        expect(format({ parser: 'typescript', content: tsx })).toMatchSnapshot()


    });
    it('object', () => {
        const json = {
            a: 1,
            b: 2,
            scripts: {
                prepublishOnly: "npm run clean && npm run reinstall && npm run lint  && npm run test && npm run build"
            }
        }

        expect(format({ parser: 'json', content: json })).toMatchSnapshot()


    });
    it('json', () => {
        const json = `{
            "scripts": {
                         "prepush": "npm run test",
"prepublishOnly": "npm run clean && npm run reinstall && npm run lint  && npm run test && npm run build",
        "coverage": "rimraf coverage && jest --config jest.config.json --coverage"
              },

        }
 `
        expect(format({ parser: 'json', content: json })).toMatchSnapshot()

    });


});

describe('monadFormat', () => {

    it('typescript', async () => {
        const tsx = readFileSync(resolve(__dirname, 'formats', 'Modal.tsx'), { encoding: 'utf8' });
        const result = await pipe(
            monadFormat({ parser: 'typescript', content: tsx }),
            MN.map(a => {
                expect(a).toMatchSnapshot()
            }),
        )()
        expect(E.isRight(result))


    });
    it('object', async () => {
        const json = {
            a: 1,
            b: 2,
            scripts: {
                prepublishOnly: "npm run clean && npm run reinstall && npm run lint  && npm run test && npm run build"
            }
        }
        const result = await pipe(
            monadFormat({ parser: 'json', content: json }),
            MN.map(a => {
                expect(a).toMatchSnapshot()
            }),
        )()
        expect(E.isRight(result))



    });
    it('json', async () => {
        const json = `{
            "scripts": {
                         "prepush": "npm run test",
"prepublishOnly": "npm run clean && npm run reinstall && npm run lint  && npm run test && npm run build",
        "coverage": "rimraf coverage && jest --config jest.config.json --coverage"
              },

        }
 `
        const result = await pipe(
            monadFormat({ parser: 'json', content: json }),
            MN.map(a => {
                expect(a).toMatchSnapshot()
            }),
        )()
        expect(E.isRight(result))

    });
    it('json error', async () => {
        const json = `{
            "scripts": 
                         "prepush": "npm run test",
"prepublishOnly": "npm run clean && npm run reinstall && npm run lint  && npm run test && npm run build",
        "coverage": "rimraf coverage && jest --config jest.config.json --coverage"
              },

        }
 `
        const result = await pipe(
            monadFormat({ parser: 'json', content: json }),
            MN.mapLeft(a => {
                expect(a({})).toMatchSnapshot()
            }),
        )()
        expect(E.isLeft(result))

    });

});

