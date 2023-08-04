import service from "@/request";
import { LoginInt } from "@/type/login/index";

export function login(data: LoginInt): Promise<any> {
  let fd = new FormData();
  fd.append("user_name", data.user_name);
  fd.append("password", data.password);
  return service({
    url: "/admin/login",
    method: "post",
    data: fd
  });
}
