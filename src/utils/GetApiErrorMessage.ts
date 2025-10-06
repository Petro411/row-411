import { label } from "@/branding";


const GetApiErrorMessage = (error?:any)=>{
    return error?.response?.data?.message ?? error?.message ?? label.SomethingWentWrong;
}

export default GetApiErrorMessage;