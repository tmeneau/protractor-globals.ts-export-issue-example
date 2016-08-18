import { by } from 'protractor/globals';

export const about: string = "this is compiled to "
    + "\"compiled/incorrect/src-with-globals.ts/test/\" when it should be compiled to: "
    + "\"compiled/incorrect/\".";