'use client'

import {PostgrestError} from "@supabase/supabase-js";
import {toast} from "sonner";

type FormClientComponentProps = {
    serverAction: (formData: FormData) => Promise<| {
        data: null;
        error: PostgrestError | null;
    } | undefined>
}

export default function FormClient({serverAction}: FormClientComponentProps) {
    const handleSubmitTweet = async (data: any) => {
        try {
            const res = await serverAction(data);

            if (res?.error) {
                return toast.error(res.error.message);
            }

            toast.success('Tweet sent successfully!');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form action={handleSubmitTweet as any} className="flex flex-col w-full h-full">
            <input name="tweet" type="text" className="w-full h-full border-b-[0.5px] border-gray-600 bg-transparent
                                                          p-4 outline-none border-none text-2xl placeholder:text-gray-600"
                   placeholder="What's happening?"/>
            <div className="w-full justify-between items-center flex">
                <div>

                </div>

                <div className="w-full max-w-[100px]">
                    <button type="submit" className="rounded-full bg-primary text-lg text-center px-4 py-2 w-full
                                                       hover:bg-opacity-70 transition duration-200 font-bold">
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}
