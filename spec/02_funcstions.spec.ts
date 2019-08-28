import { isEven } from './utils';

describe('writing functions', () => {
    describe('three ways of creating them', () => {
        it('the syntax', () => {

            // "Named Function"
            function add(a: number, b: number) {
                return a + b;
            }

            // anonymous functions (two ways)
            const subtract = function (a: number, b: number) {
                return a - b;
            };

            // "arrow" function (expression bodied)
            const multiply = (a: number, b: number) => a * b;

            // "arrow" function (block body)
            const devide = (a: number, b: number) => {
                if (b === 0) {
                    throw new Error('are you tyring to open a black hole');
                }
                return a / b;
            };

            expect(add(2, 2)).toBe(4);
            expect(subtract(10, 2)).toBe(8);
            expect(multiply(3, 3)).toBe(9);
            expect(devide(20, 2)).toBe(10);
        });
    });

    describe('something about parameters to functions', () => {
        it('cannot overload', () => {

            function formatName(first: string, last: string, mi?: string) {
                let fullName = `${last}, ${first}`;
                if (mi) {
                    fullName += ` ${mi}.`;
                }
                return fullName;
            }
            expect(formatName('Han', 'Solo', null)).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });

        it('default values and rest', () => {
            function add(a: number = 10, b: number = 5, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo);
            }

            expect(add(2, 2)).toBe(4);
            expect(add(2)).toBe(7);
            expect(add(undefined, 7)).toBe(17);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
    });
});

describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('you can take a look at each one of them', () => {
        numbers.forEach(n => console.log(n));
    });

    describe('that returan other arrays', () => {
        it('has filter', () => {

            const evens = numbers.filter(n => n % 2 === 0);
            const evens1 = numbers.filter(n => isEven(n));
            const evens2 = numbers.filter(isEven);
            expect(evens).toEqual([2, 4, 6, 8]);
            expect(evens1).toEqual([2, 4, 6, 8]);
            expect(evens2).toEqual([2, 4, 6, 8]);
        });

        it('has a map', () => {
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
            const stringedNumbers = numbers.map(n => n.toString());    // return string of arrays
            const doubleEvents = numbers
                .filter(isEven)
                .map(n => n * 2);

            expect(doubleEvents).toEqual([4, 8, 12, 16]);
        });
    });

    describe('methods that return a single value', () => {
        it('for checking memebership of an array', () => {
            const hasSomeEvents = numbers.some(isEven);
            expect(hasSomeEvents).toBe(true);
            const allEvent = numbers.every(isEven);
            expect(allEvent).toBe(false);
        });

        it('has a reduce method', () => {
            const total = numbers.reduce((s, n) => s + n);     // state, next
            expect(total).toBe(45);
            const total2 = numbers.reduce((s, n) => s + n, 100);
            expect(total2).toBe(145);
        });
    });

    describe('quick practice', () => {

        interface Vehicle { vin: string; make: string; year: number; mileage: number; }
        const data: Vehicle[] = [
            { vin: '3938983', make: 'Ford Explorer', year: 2013, mileage: 100_013 },
            { vin: '378493739', make: 'Honda Pilot', year: 2019, mileage: 823 },
            { vin: '3843978', make: 'Chevy Camaro', year: 1973, mileage: 200_232 }
        ];

        it('practice 1', () => {
            const answer = data.filter(n => n.mileage > 100_000).map(a => a.make);
            expect(answer).toEqual(['Ford Explorer', 'Chevy Camaro']);
        });
    });

    describe('redux for dummies', () => {

        interface Action { type: string; }
        class Increment implements Action {
            readonly type = 'Increment';
        }

        class Decrement implements Action {
            readonly type = 'Decrement';
        }

        class Reset implements Action {
            readonly type = 'Reset';
        }

        it('demo', () => {
            const historyOfActions: Action[] = [
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Decrement(),
                new Decrement(),
                new Reset(),
                new Increment(),
                new Increment()
            ];

            interface State {
                count: number;
            }

            const initialState: State = {
                count: 0
            };

            const finalAnswer = historyOfActions.reduce((s: State, n: Action) => {
                switch (n.type) {
                    case 'Increment': {
                        return {
                            count: s.count + 1
                        };
                    }
                    case 'Decrement': {
                        return { count: s.count - 1 };
                    }
                    case 'Reset': {
                        return initialState;
                    }
                }
            }, initialState);

            expect(finalAnswer.count).toBe(2);
        });
    });

});
