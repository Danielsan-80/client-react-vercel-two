

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

export async function createPost(post, user){
   
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ user.token
        },
        body: JSON.stringify({email:user.email, title:post.title, body:post.body, category:post.category, tags: post.tags})
      })
  
      return res
}

export async function updatePost(id, post){
    const res = await fetch('/api/posts/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify({title:post.title, body:post.body, category:post.category, tags: post.tags})
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

