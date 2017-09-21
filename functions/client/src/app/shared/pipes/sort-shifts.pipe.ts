import { Pipe, PipeTransform } from '@angular/core';
import { Shift } from "../../../../../universal/domain/shift";

@Pipe({
    name: 'snSortShiftsByDate'
})
export class SortShiftsByDatePipe implements PipeTransform {
    transform(array: Array<Shift>): Array<Shift> {

        if (!array || array === undefined || array.length === 0) return null;

        array.sort((a: Shift, b: Shift) => {
            if (a.startDateTime < b.startDateTime) {
                return -1;
            } else if (a.startDateTime > b.startDateTime) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}