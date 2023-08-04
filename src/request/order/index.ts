import service from "@/request";
import { ListQueryInt } from "@/type/order/index";

export function getOrderList(params: ListQueryInt): Promise<any> {
  // let fd = new FormData();
  // fd.append("page", data.page);
  // fd.append("size", data.size);
  return service({
    url: "/express/list",
    method: "get",
    params
  });
}
