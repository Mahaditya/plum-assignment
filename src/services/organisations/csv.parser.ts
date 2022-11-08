import helper from 'csvtojson';

import { EmployeeCSVParser } from './domain';

type CSVHandler = typeof helper;

export class EmployeeCSVParserImp implements EmployeeCSVParser {
  constructor(private csvHandler: CSVHandler) {}

  async parse(csvText: string) {
    if (!csvText) {
      throw new Error('Received Empty CSV');
    }
    const convertedJSON = await this.csvHandler({
      output: 'json',
      noheader: false,
      headers: [
        'employee_id',
        'first_name',
        'middle_name',
        'last_name',
        'email_id',
        'date_of_birth',
        'gender',
      ],
    }).fromString(csvText);

    return convertedJSON;
  }
}
