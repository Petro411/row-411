import Label from "@/config/Label"

const GetApiErrorMessage = (error?:any)=>{
    return error?.response?.data?.message ?? error?.message ?? Label.SomethingWentWrong;
}

export default GetApiErrorMessage;