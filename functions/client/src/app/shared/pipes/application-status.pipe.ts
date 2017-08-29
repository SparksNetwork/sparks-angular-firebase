import { Pipe, PipeTransform } from "@angular/core";

import { ApplicationStatus } from "../../../../../universal/domain/application";

@Pipe({ name: 'snApplicationStatus' })
export class ApplicationStatusPipe implements PipeTransform {
    transform(value: ApplicationStatus) {
        switch (value) {
            case ApplicationStatus.Incomplete:
                return "Incomplete";
            case ApplicationStatus.Pending:
                return "Pending";
            default: return null;
        }
    }
}