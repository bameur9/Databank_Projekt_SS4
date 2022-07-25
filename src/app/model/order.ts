export interface Order {
  id?:number;
  orderTrackingNumber?:String;
  totalQuantity:number;
  totalPrice:number;
  status?:string;
  dateCreated?:Date;
  lastUpdated?:Date;


}
