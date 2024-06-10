import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {randomUUID} from "crypto";
import {SupabaseClient} from '@supabase/supabase-js'
import FormClient from "./FormClient";
import {cookies, headers} from "next/headers";

export default function ComposeTweet() {
    async function submitTweet(formData: FormData) {
        'use server'

        const tweet = formData.get('tweet');

        if (!tweet) return;

        const supabaseClient = createServerComponentClient({
            cookies,
            headers
        })

        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_SECRET_SUPABASE_KEY;

        const supabaseServer = new SupabaseClient(url, key);
        const {data: userData, error: userError} = await supabaseClient.auth.getUser();

        if (userError) return

        const {data, error} = await supabaseServer.from('tweets').insert({
            profile_id: userData.user.id,
            text: tweet.toString(),
            id: randomUUID()
        });

        return {data, error}
    }

    return (
        <FormClient serverAction={submitTweet}/>
    )
}