const { parseExpressValidatorErrors } = require("./parseErrors.js")

describe('parseExpressValidatorErrors()', () => {

    it('returns array of error messages extracted from correctly provided argument', () => {
        const objectErr = {
            errors: [
                { code: 400, msg: 'Error 400!!!' },
                { code: 500, msg: 'Error 500!!!' }
            ]
        }
        const result = parseExpressValidatorErrors(objectErr);

        expect(result).toContain('Error 400!!!');
        expect(result).toContain('Error 500!!!');
    });

    it('returns empty array if not correctly argument is provided - without "errors" property', () => {
        const notCorrectArg = { test: 'test' };
        const result = parseExpressValidatorErrors(notCorrectArg);

        expect(result).toHaveLength(0);
    })

    it('returns empty array if not correctly argument is provided - with "errors" property, without error "msg" property', () => {
        const notCorrectArg = { test: 'test', errors: [{ code: 400, code: 500 }] };
        const result = parseExpressValidatorErrors(notCorrectArg);

        expect(result).toHaveLength(0);
    })

    it('returns array of message if not correctly argument is provided - with "errors" property, some errors are without "msg" property', () => {
        const notCorrectArg = { test: 'test', errors: [{ code: 400 }, { code: 500, msg: 'Error 500!!!' }] };
        const result = parseExpressValidatorErrors(notCorrectArg);

        expect(result).toHaveLength(1);
    })
})