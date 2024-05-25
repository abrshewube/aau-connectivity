export class CreateStudentDto {
    readonly studentId: string;
    readonly password: string;
    readonly used?: boolean;
  }
  