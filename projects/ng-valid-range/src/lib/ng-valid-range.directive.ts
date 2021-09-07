import { Directive, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn } from '@angular/forms';


export function validRangeFactory(arg: string): ValidatorFn {
    if (!arg) {
        return () => null;
    }
    const regex = /([\[\]])?(.*),([^\[\]]*)([\[\]])?/;
    const parts = regex.exec(arg);
    const min = +parts[2];
    const max = +parts[3];
    const excludeMin = parts[1] !== '[';
    const excludeMax = parts[4] !== ']';
    const testMin = !!parts[2];
    const testMax = !!parts[3];

    return (c: FormControl) => {
        const value = +c.value;
        if (c.value == null || isNaN(value)) {
            return null;
        }
        if (testMin && (value < min || (excludeMin && value === min))) {
            return { ngValidRange: { value: c.value, tooSmall: 1, min } };
        }
        if (testMax && (value > max || (excludeMax && value === max))) {
            return { ngValidRange: { value: c.value, tooLarge: 1, max } };
        }
        return null;
    };
}

@Directive({
    selector: '[ngValidRange][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: NgValidRangeDirective, multi: true }
    ]
})
export class NgValidRangeDirective implements Validator {
    private validRange: string;
    private validator: ValidatorFn;
    private onChange?: () => void;

    @Input()
    get ngValidRange(): string {
        return this.validRange;
    }

    set ngValidRange(value: string) {
        this.validRange = value;
        this.validator = validRangeFactory(value);
        if (this.onChange) {
            this.onChange();
        }
    }

    validate(c: FormControl) {
        return this.validator ? this.validator(c) : null;
    }

    registerOnValidatorChange(fn: () => void) {
        this.onChange = fn;
    }
}
