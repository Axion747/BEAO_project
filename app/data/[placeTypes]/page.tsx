' use client '

import {NextResponse} from 'next/server'
import { createClient } from '@/utils/supabase/server'

export type locationInfo = {
    id: number
    type: string
    name: String
    address: String
    zipCode: number
    borough: String
}

async function GET() {
    const supabase = createClient();
  
    supabase.auth.getUser();
    let { data: locations, error } = await supabase
        .from('locations')
        .select('*')
    process.on('uncaughtException', function (err) {
        console.log(err);
    }); 
    return NextResponse.json(locations);
    
}


export default async function searchPage( {params,} : {params: {placeType: string}} ) {
    const data = await GET().then((res) => res.json());

    const filteredData = data.map((item: locationInfo) => (item.type === params.placeType ? item : null))

    return {
        props: {
            data: filteredData
        }
    }
}