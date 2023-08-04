export interface ListQueryInt {
  page: number,
  size: number,
  status?: number
}

 interface ListInt {
  id: number,
  CreatedAt: string,
  DeletedAt: string,
  UpdatedAt: string,
  address: string,
  code: string,
  create_by: string,
  create_id: string,
  create_img: string,
  create_phone: string,
  good_img: string,
  order_status: number,
  price: string,
  receive_code: string,
  receive_date: string,
  receiver: string,
  receiver_id: string,
  receiver_phone: string,
  status: number,
}

export class InitData {
  list: ListInt[] = []
}

