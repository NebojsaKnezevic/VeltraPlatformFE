import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../api/axios-client";



export function useRegister(){
    return useMutation({
        mutationFn: async function(payload: {email: string, password: string, name: string}){
            const res = await axiosClient.post("/register",payload)
            return res.data;
        }
    });
}