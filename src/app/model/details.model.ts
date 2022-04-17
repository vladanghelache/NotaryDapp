export class DetailsModel{
  constructor(
    public hash?:string,
    public date?:Date,
    public type?:string,
    public size?:number,
    public account?:string
  ) {
  }
}
