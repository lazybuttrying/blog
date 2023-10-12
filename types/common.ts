export type CategoryObject =
  | {
      [key: string]: (CategoryObject | string)[];
    }
  | string;
