import supabase from "./supabase"
//일단 통채로 들고 왔는데 로그 보면서 필터링 할겁니다!
export const getComments = async() =>{
    const { data,error } = await supabase.from('comments').select('*')
    console.log(data)
    if (error) throw error
}

export const updateComment = async( cafe_id, cafe_name, comments, user_uid ) =>{
    const { data,error } = await supabase.from('comments').insert([{
        cafe_id,
        cafe_name,
        comments,
        user_uid
    }])
    if (error) throw error
}

export const deleteComment = async(id) =>{
    const { data,error } = await supabase.from('comments').delete().eq("id",id)
    if (error) throw error
}