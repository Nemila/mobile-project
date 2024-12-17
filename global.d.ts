type UserDocument = DocumentData & {
  id: string;
  userId: string;
  email: string;
  department?: string;
  picturePath?: string;
  studentId?: string;
  schoolYear?: string;
};
