

 export async function getPosts() {
    const res = await fetch('api/posts')
    const json = await res.json()
    return json

}

export async function getPost(id){
    const res = await fetch('/api/posts/'+id)
    const post = await res.json()
    return post
}

export async function createPost(post, token){
   
    const res = await fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer '+token
        }
      })
  
      return res
}

export async function updatePost(id, post){
    const res = await fetch('/api/posts/'+id, {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: {
          'Content-Type':'application/json'
        }
      })

      return res

}

export async function deletePost(id){
    const res = await fetch('/api/posts/'+id, {
        method: 'DELETE'
      })

      const json = await res.json()
      return json
}

