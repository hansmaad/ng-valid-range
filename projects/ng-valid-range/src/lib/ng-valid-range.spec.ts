import { validRangeFactory } from './ng-valid-range.directive';


describe('validRange', () => {

    const NAME = 'ngValidRange';

    function tester(arg: string) {
        const v = validRangeFactory(arg) as any;
        return (value: string|number) => v({ value });
    }

    it('open max interval', () => {
        const test = tester('1,');
        expect(test('1')[NAME]).toBeDefined();
        expect(test('0')[NAME]).toBeDefined();
        expect(test('-1')[NAME]).toBeDefined();
        expect(test('2')).toBeNull();
    });

    it('open less interval', () => {
        const test = tester(',10');
        expect(test('1')).toBeNull();
        expect(test('0')).toBeNull();
        expect(test('-1')).toBeNull();
        expect(test('10')[NAME]).toBeDefined();
        expect(test('10.1')[NAME]).toBeDefined();
        expect(test(10.11)[NAME]).toBeDefined();
    });

    it('open less interval include max', () => {
        const test = tester(',10]');
        expect(test('1')).toBeNull();
        expect(test('0')).toBeNull();
        expect(test('-1')).toBeNull();
        expect(test('10')).toBeNull();
        expect(test('10.1')[NAME]).toBeDefined();
        expect(test(10.11)[NAME]).toBeDefined();
    });

    it('open less interval include min and max', () => {
        const test = tester('[,10]');
        expect(test('1')).toBeNull();
        expect(test('0')).toBeNull();
        expect(test('-1')).toBeNull();
        expect(test('10')).toBeNull();
        expect(test('10.1')[NAME]).toBeDefined();
        expect(test(10.11)[NAME]).toBeDefined();
    });

    it('open greater interval', () => {
        const test = tester('1,');
        expect(test('2')).toBeNull();
        expect(test('1.1')).toBeNull();
        expect(test('1')[NAME]).toBeDefined();
        expect(test('0')[NAME]).toBeDefined();
        expect(test(-10)[NAME]).toBeDefined();
    });

    it('open greater interval include min', () => {
        const test = tester('[1,');
        expect(test('1')).toBeNull();
        expect(test('1.1')).toBeNull();
        expect(test('0')[NAME]).toBeDefined();
        expect(test('-1')[NAME]).toBeDefined();
    });

    it('open greater interval include min and max', () => {
        const test = tester('[1,]');
        expect(test('1')).toBeNull();
        expect(test('1.1')).toBeNull();
        expect(test('0')[NAME]).toBeDefined();
        expect(test('-1')[NAME]).toBeDefined();
    });

    it('closed exclude both interval', () => {
        const test = tester('1,10');
        expect(test('1')[NAME]).toBeDefined();
        expect(test('10')[NAME]).toBeDefined();
        expect(test(0)[NAME]).toBeDefined();
        expect(test(11)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('closed exclude both interval', () => {
        const test = tester(']1,10[');
        expect(test('1')[NAME]).toBeDefined();
        expect(test('10')[NAME]).toBeDefined();
        expect(test(0)[NAME]).toBeDefined();
        expect(test(11)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('closed include both interval', () => {
        const test = tester('[1,10]');
        expect(test(1)).toBeNull();
        expect(test(10)).toBeNull();
        expect(test(0)[NAME]).toBeDefined();
        expect(test(11)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('closed include min interval', () => {
        const test = tester('[1,10');
        expect(test(1)).toBeNull();
        expect(test(10)[NAME]).toBeDefined();
        expect(test(0)[NAME]).toBeDefined();
        expect(test(11)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('closed include max interval', () => {
        const test = tester('1,10]');
        expect(test(1)[NAME]).toBeDefined();
        expect(test(10)).toBeNull();
        expect(test(0)[NAME]).toBeDefined();
        expect(test(11)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('floating point interval', () => {
        const test = tester('1.1,10.0');
        expect(test('1.1')[NAME]).toBeDefined();
        expect(test('10')[NAME]).toBeDefined();
        expect(test(5)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('floating point interval include min max', () => {
        const test = tester('[1.1,10.0]');
        expect(test(0)[NAME]).toBeDefined();
        expect(test(10.1)[NAME]).toBeDefined();
        expect(test(1.1)).toBeNull();
        expect(test(10)).toBeNull();
        expect(test(5)).toBeNull();
        expect(test(9.9)).toBeNull();
    });

    it('scientific interval', () => {
        const test = tester('-1e-3,1e3');
        expect(test(-1e-2)[NAME]).toBeDefined();
        expect(test(1e4)[NAME]).toBeDefined();
        expect(test(0)).toBeNull();
        expect(test(-1e-4)).toBeNull();
        expect(test(1e-2)).toBeNull();
        expect(test(1e2)).toBeNull();
    });

});
