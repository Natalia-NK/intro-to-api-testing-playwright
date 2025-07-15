export class OrderDto {
  //define files of the class
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number
  //new parameter
  //crate a constructor

  constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = 0
  }
}
