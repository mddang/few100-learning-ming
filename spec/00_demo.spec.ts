describe('Writing a basic spec', () => {
    it('allow you to expect stuff ', () => {
        expect('JOE').toBe('joe'.toLocaleUpperCase());
    });
});

describe('Writing another one', () => {
    it('is fun!', () => {
        expect(35).toEqual(20 + 15);
    });
});
