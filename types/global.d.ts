// types/global.d.ts
export {};

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: any;
  };
}
