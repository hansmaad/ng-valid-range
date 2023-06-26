# NgValidRange

A tiny Angular module for range validation on inputs. https://www.npmjs.com/package/ng-valid-range

```
npm install ng-valid-range
```

Example:
```html
<form #exampleForm="ngForm">
  <input type="number" name="valueField" [(ngModel)]="value" #valueField="ngModel" ngValidRange="0, 10" >
  <div *ngIf="valueField.invalid && valueField.errors.ngValidRange">
    <span *ngIf="valueField.errors.ngValidRange.tooLarge">
      Value is too large
    </span>
    <span *ngIf="valueField.errors.ngValidRange.tooSmall">
      Value is too small
    </span>
  </div>
</form>
```

Attribute syntax:
```
"0, 10"      // is valid between 0 an 10 
"[0, 10"     // is valid between 0 an 10, including 0
"[0, 10]"    // is valid between 0 an 10, including 0 and 10
"]0, 10["    // same as "0, 10"
"0,"         // must be greater than 0
"[0,"        // must be greater or equal to 0
",10"        // must be less than 10
",10]"       // must be less or equal to 10
```
