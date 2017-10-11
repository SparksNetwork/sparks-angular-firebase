import { Pipe, PipeTransform } from '@angular/core';

import { ApplicationStatus } from '../../../../../universal/domain/application';

@Pipe({ name: 'snApplicationStatus' })
export class ApplicationStatusPipe implements PipeTransform {
    transform(value: ApplicationStatus) {
        switch (value) {
            case ApplicationStatus.Incomplete:
                return 'Finish Applying';
            case ApplicationStatus.Pending:
                return 'Awaiting Approval';
            case ApplicationStatus.Accepted:
                return 'Join Now!';
            default: return null;
        }
    }
}
